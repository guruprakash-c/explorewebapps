import express, { request } from 'express';
import { query, validationResult, body, matchedData, checkSchema } from 'express-validator';
import { UserValidationSchema } from './utils/ValidationSchema.mjs';

const app = express();
app.use(express.json());
//MIDDLEWARE
const loggingMiddleware = (request, response, next) => {
    console.log(`${request.method} ~ ${request.url}`);
    next();
};
const PORT = process.env.PORT || 3000;

app.get("/",
    (request, response, next) => {
        next();
    },
    (request, response) => {
        response
            .status(200)
            .send({
                message: 'Hello 👋'
            })
    });

app.get("/api/v1/", loggingMiddleware, (request, response) => {
    response
        .status(200)
        .send({
            message: 'Hi 👋'
        })
});
//USERS API
const users = [
    { id: 1, userName: "anson", displayName: "Anson" },
    { id: 2, userName: "jack", displayName: "Jack" },
    { id: 3, userName: "adam", displayName: "Adam" },
    { id: 4, userName: "tina", displayName: "Tina" },
    { id: 5, userName: "daisy", displayName: "Daisy" },
    { id: 6, userName: "henry", displayName: "Henry" },
    { id: 7, userName: "marilyn", displayName: "Marilyn" },
];
// GET:/api/v1/users
// GET:/api/v1/users?filter=userName&value=is
app.get("/api/v1/users",
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
app.get("/api/v1/users/:id", (request, response) => {
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
app.post("/api/v1/users",
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
app.put("/api/v1/users/:id", (request, response) => {
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
app.patch("/api/v1/users/:id", (request, response) => {
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
app.delete("/api/v1/users/:id", (request, response) => {
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

app.listen(PORT, () => {
    console.log(`Running on Port: ${PORT}`);
})