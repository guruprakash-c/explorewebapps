import { Router } from 'express';
import userRoutes from './users.mjs';
import mockusers  from '../utils/constants.mjs';

const commonRouter = Router();

commonRouter.get("/",
    (request, response, next) => {
        next();
    },
    (request, response) => {
        console.log(request.session);
        console.log(request.session.id);
        request.session.visited = true;
        //SET COOKIE
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

commonRouter.post("/api/v1/auth", (request, response) => {
    console.log(request.body);
    const { body : {username,password} } = request;
    const findUser = mockusers.find(user => user.userName === username);
    if(!findUser || findUser.password !== password)
        return response.status(401).send({ message: 'Invalid Credentials!!!!'});

    request.session.user = findUser;
    return response.status(200).send(findUser);
    
});

commonRouter.get("/api/v1/auth/status", (request, response) =>{
    request.sessionStore.get(request.session.id, (err, sessionData)=>{
        console.log(sessionData);
    })
    return request.session.user ? response.status(200).send(request.session.user) : response.status(401).send({ message: 'Not Authenticated'});
})

//USERS API
commonRouter.use(userRoutes);

export default commonRouter;