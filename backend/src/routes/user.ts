import {Router} from 'express';
import {User} from '../db/models/User';
import { v4 as uuid } from 'uuid';
export const userRouter = Router();

userRouter
    .get('/', async (req, res, next) => {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (e) {
            next(e);
        }
    })
    .post('/:name', async (req, res, next) => {
        try {
            const user = await User.create({
                userId: uuid(),
                email: `${req.params.name}@example.com`,
                name:`${req.params.name}`,
                birthday: new Date(2000,1,1),
            });
            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    });
