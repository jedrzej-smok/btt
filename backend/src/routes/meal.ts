import {Router} from 'express';
import {Meal} from '../db/models/Meal';
import { keys } from 'ts-transformer-keys';
import { v4 as uuid } from 'uuid';
import {IMeal} from '../types';
import {calcIngredient} from "../utils/calcIngredient";
import {Op, where} from "sequelize";
import {downloadImage, timeout} from "../utils/downloadImage";
export const mealRouter = Router();
const fetch = require('node-fetch');


mealRouter
    .get('/:name', async (req, res, next) => {
        try {
            if( !new RegExp('^[a-zA-Z]*$').test(req.params.name)) {
                res.status(400).json({message: `Invalid request. Name: ${req.params.name} include number or special characters.`});
                return;
            }
            const meals = await Meal.findAll({
                where: {
                    queryName: {
                        [Op.substring]: req.params.name,
                        }
                    },
                attributes:['id','name', 'instructions', 'ingredientsNumber','ytLink']
            });
            if(meals.length > 0) {
                console.log('z bazy');
                res.status(200).json(meals);
            }else{
                const resFetch = await fetch('http://themealdb.com/api/json/v1/1/search.php?s='+req.params.name,{
                    method: 'GET',
                    headers: {},
                    body: null,
                });
                const {meals} = await resFetch.json();
                if(meals!=null){
                    let resMeal:Partial<IMeal> [] = [];
                    for(const meal of meals){
                        console.log(meal);
                        const storedMeal:IMeal = {
                            id: meal.idMeal,
                            name:meal.strMeal,
                            instructions: meal.strInstructions,
                            ingredientsNumber:calcIngredient(meal),
                            ytLink:meal.strYoutube,
                            queryName: req.params.name,
                            imageUrl: meal.strMealThumb,
                            imagePath: ''
                        }
                        const { queryName,imagePath,imageUrl,...simpleMeal} = storedMeal;
                        resMeal.push(simpleMeal);
                        await Meal.create(storedMeal);
                    }

                    res.status(200).json(resMeal);
                } else{
                    res.status(400).json({message: `Not found meal: ${req.params.name}`});
                }


            }
        } catch (e) {
            next(e);
        }
    })
    .get('/:name/img', async (req, res, next) => {
        try {
            const resFetch = await fetch('http://localhost:8080/meal/'+req.params.name,{});
            if(resFetch.status === 200){
                const meals = await Meal.findAll({
                    where: {
                        queryName: {
                            [Op.substring]: req.params.name,
                        }
                    },
                    attributes:['id','name', 'imagePath','imageUrl']
                });
                let htmlResult="<!doctype html>\n" + "<html lang=\"en\">\n" + "<head>\n" + "    <meta charset=\"UTF-8\">\n" + "    <meta name=\"viewport\"\n" + "          content=\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\">\n" + "    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n" + "    <title>page</title>\n" + "<link rel=\"stylesheet\" href=\"/style.css\">" + "</head>\n" + "<body>\n" +"<ol> "


                for(const meal of meals){
                    console.log(`${meal.name}: ${meal.imageUrl} ${meal.imagePath}`);
                    if(meal.imagePath != ""){
                        htmlResult += `<ul>` + " <img src=\'/" + meal.imagePath + "\' alt=\"Flowers in Chania\">" + `${meal.name}` + "</ul>";
                    }else{
                        await downloadImage(meal.imageUrl+'/preview', `./public/${meal.name}.jpg`);
                        await Meal.update({imagePath:`${meal.name}.jpg`},{
                            where: {
                                id:meal.id,
                            }
                        });
                        htmlResult += `<ul>` + " <img src=\'/" + meal.imagePath + "\' alt=\"Flowers in Chania\">" + `${meal.name}` + "</ul>";
                    }
                }
                htmlResult += "</ol>"+"</body>\n" + "</html>";
                res.send(htmlResult);
            }else {
                const {message} = await resFetch.json();
                res.status(400).json({message: message});
            }

        } catch (e) {
            next(e);
        }
    })

