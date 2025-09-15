import { Router } from 'express';
import { query, validationResult, body, matchedData, checkSchema } from 'express-validator';
import { UserValidationSchema } from '../utils/ValidationSchema.mjs';
import { users } from '../utils/constants.mjs';


const userRoutes = Router();

//MIDDLEWARE
const loggingMiddleware = (request, response, next) => {
    console.log(`${request.method} ~ ${request.url}`);
    next();
};

// GET:/api/v1/users
// GET:/api/v1/users?filter=userName&value=is
userRoutes.get("/api/v1/users",
    query("value").isString()
        .notEmpty()
        .withMessage("Required `value`")
        .isLength({
            min: 3,
            max: 10
        }).withMessage("Must be 3-10 characters"),
    (request, response) => {
        const result = validationResult(request);
        console.log(result);
        //console.log(request.query);
        const { query: { filter, value } } = request;
        if (!filter && !value) return response.send(users);
        if (filter && value)
            return response.send(users.filter((user) => user[filter]?.includes(value)));
});

// GET:/api/v1/users/{id}
userRoutes.get("/api/v1/users/:id", (request, response) => {
    if (!isNaN(request.params.id)) {
        const id = parseInt(request.params.id);
        const filteredUsers = users.find(
            (u) => u.id === id
        );
        if (filteredUsers) response.send(filteredUsers).status(200);
        else response.sendStatus(404);
    } else {
        response.send([{ message: 'Invalid user ID' }]).sendStatus(400);
    }
});

// POST:/api/v1/users
userRoutes.post("/api/v1/users",
    checkSchema(UserValidationSchema),
    (request, response) => {
        const result = validationResult(request);
        // console.log(result);
        if(result.errors.length === 0){
            // console.log(request.body);
            const data = matchedData(request);
            //console.log(data);
            //const { body } = request;
            const newUser = {
                id: users.length + 1,
                ...data
            };
            users.push(newUser);
            return response.status(201).send(newUser);
        }
        return response.status(400).send({ error: result.array() });
});

// PUT:/api/v1/users/{id}
userRoutes.put("/api/v1/users/:id", (request, response) => {
    // console.log(request.body, request.params);
    if (!isNaN(request.params.id)) {
        const { body, params: { id } } = request;
        const userId = parseInt(id);
        const oldUserId = users.findIndex((user) => user.id === userId);
        if (oldUserId === -1) response.sendStatus(404);

        users[oldUserId] = { id: oldUserId, ...body };

        return response.status(200).send(users[oldUserId]);

    }
    return response.send([{ message: 'Invalid user ID' }]).sendStatus(400);
});

// PATCH:/api/v1/users{id}
userRoutes.patch("/api/v1/users/:id",loggingMiddleware, (request, response) => {
    // console.log(request.body, request.params);
    if (!isNaN(request.params.id)) {
        const { body, params: { id } } = request;
        const userId = parseInt(id);
        const oldUserId = users.findIndex((user) => user.id === userId);
        //console.log('old user id: ', oldUserId);
        if (oldUserId === -1) response.sendStatus(404);

        users[oldUserId] = { ...users[oldUserId], ...body };

        return response.status(200).send(users[oldUserId]);

    }
    return response.send([{ message: 'Invalid user ID' }]).sendStatus(400);
});

// DELETE:/api/v1/users/{id}
userRoutes.delete("/api/v1/users/:id", (request, response) => {
    const { params: { id } } = request;
    if (!isNaN(id)) {
        const uId = parseInt(id);
        const uIdx = users.findIndex((u) => u.id === uId)
        if (uIdx === -1) return response.sendStatus(404);
        users.splice(uIdx, 1);
        return response.send(users).status(200);
    }
    return response.send([{ message: 'Invalid user ID' }]).sendStatus(400);
});

export default userRoutes;