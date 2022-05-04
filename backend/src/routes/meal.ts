import {Router} from 'express';
import {Meal} from '../db/models/Meal';
import { v4 as uuid } from 'uuid';
export const mealRouter = Router();

mealRouter
    .get('/', async (req, res, next) => {
        try {
            const users = await Meal.findAll();
            res.status(200).json(users);
        } catch (e) {
            next(e);
        }
    })
    // .post('/:name', async (req, res, next) => {
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
