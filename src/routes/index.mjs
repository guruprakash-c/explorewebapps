import { Router } from 'express';
import userRoutes from './users.mjs';

const commonRouter = Router();

commonRouter.get("/",
    (request, response, next) => {
        next();
    },
    (request, response) => {
        response.cookie("howdy", "DEVstoc", { maxAge: 30000, signed: true })
        response
            .status(200)
            .send({
                message: 'Hello 👋'
            })
});

commonRouter.get("/api/v1/", (request, response) => {
    response
        .status(200)
        .send({
            message: 'Hi 👋'
        })
});

//USERS API
commonRouter.use(userRoutes);

export default commonRouter;