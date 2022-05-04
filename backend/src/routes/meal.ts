import {Router} from 'express';
import {Meal} from '../db/models/Meal';
import { keys } from 'ts-transformer-keys';
import { v4 as uuid } from 'uuid';
import {IMeal} from '../types';
import {calcIngredient} from "../utils/calcIngredient";
import {Op} from "sequelize";
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
                            imagePath: meal.strMealThumb
                        }
                        const { queryName,imagePath,...simpleMeal} = storedMeal;
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
    // .get('/:name/', async (req, res, next) => {
    //     try {
    //         const user = await Meal.create({
    //             userId: uuid(),
    //             email: `${req.params.name}@example.com`,
    //             name:`${req.params.name}`,
    //             birthday: new Date(2000,1,1),
    //         });
    //         res.status(201).json(user);
    //     } catch (e) {
    //         next(e);
    //     }
    // });
