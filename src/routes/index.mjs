import e, { Router } from 'express';
import userRoutes from './users.mjs';
import mockusers  from '../utils/constants.mjs';
import passport from 'passport';

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

// commonRouter.post("/api/v1/auth", (request, response) => {
//     console.log(request.body);
//     const { body : {username,password} } = request;
//     const findUser = mockusers.find(user => user.userName === username);
//     if(!findUser || findUser.password !== password)
//         return response.status(401).send({ message: 'Invalid Credentials!!!!'});

//     request.session.user = findUser;
//     return response.status(200).send(findUser);
    
// });
commonRouter.post("/api/v1/auth", passport.authenticate("local"), 
(request, response) => {
    //console.log(request.session);
    response.sendStatus(200);
}
);

commonRouter.get("/api/v1/auth/status", (request, response) =>{
    // console.log('Inside "/api/v1/auth/status" endpoint');
    // console.log(request.user);
    // console.log(request.session);
    return request.user ? response.send(request.user) : response.sendStatus(401);
});

// commonRouter.get("/api/v1/auth/status", (request, response) =>{
//     request.sessionStore.get(request.session.id, (err, sessionData)=>{
//         console.log(sessionData);
//     })
//     return request.session.user ? response.status(200).send(request.session.user) : response.status(401).send({ message: 'Not Authenticated'});
// });

commonRouter.post("/api/v1/auth/logout", 
    (request, response) => {
        if(!request.user) return response.sendStatus(401);
        request.logOut((err) => {
            if(err) return response.sendStatus(500);
            return response.sendStatus(200);
        }); 
    });

//USERS API
commonRouter.use(userRoutes);

export default commonRouter;