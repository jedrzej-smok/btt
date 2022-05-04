import {Router} from 'express';
import {Meal} from '../db/models/Meal';
import { keys } from 'ts-transformer-keys';
import { v4 as uuid } from 'uuid';
import {IMeal} from '../types';
export const mealRouter = Router();

mealRouter
    .get('/:name', async (req, res, next) => {
        try {
            const {count, rows} = await Meal.findAndCountAll({
                where: {name: req.params.name},
                attributes:['id','name', 'instructions', 'ingredientsNumber','ytLink']
            });
            if(count>0) {
                res.status(200).json(rows);
            }else{
                const meals = await fetch('www.themealdb.com/api/json/v1/1/search.php?s='+req.params.name,{
                    method: 'GET',
                    headers: {},
                    body: null,
                });
                console.log(meals);
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
