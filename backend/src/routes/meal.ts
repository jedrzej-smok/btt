import {Router} from 'express';
import {Meal} from '../db/models/Meal';
import { keys } from 'ts-transformer-keys';
import { v4 as uuid } from 'uuid';
import {IMeal} from '../types';
import {calcIngredient} from "../utils/calcIngredient";
export const mealRouter = Router();
const fetch = require('node-fetch');


mealRouter
    .get('/:name', async (req, res, next) => {
        try {
            const meal = await Meal.findOne({
                where: {name: req.params.name},
                attributes:['id','name', 'instructions', 'ingredientsNumber','ytLink']
            });
            if(meal!=null) {
                res.status(200).json(meal);
            }else{
                const resFetch = await fetch('http://themealdb.com/api/json/v1/1/search.php?s='+req.params.name,{
                    method: 'GET',
                    headers: {},
                    body: null,
                });
                const {meals} = await resFetch.json();
                if(meals!=null){
                    const meal:IMeal = {
                        id: meals[0].idMeal,
                        name:meals[0].strMeal,
                        instructions: meals[0].strInstructions,
                        ingredientsNumber:calcIngredient(meals[0]),
                        ytLink:meals[0].strYoutube,
                        queryName: req.params.name,
                        imagePath: meals[0].strMealThumb
                    }
                    const { queryName,imagePath,...resMeal} = meal;
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
    //         next(e);;
    //     }
    // });
