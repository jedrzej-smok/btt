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
                // include:['id','name', 'instructions', 'ingredientsNumber','ytLink']
            });
            if(count>0) {
                res.status(200).json(rows);
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
