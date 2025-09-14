import express from 'express';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/api/v1/", (request, response) => {
    response
    .status(100)
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
app.get("/api/v1/users", (request, response) =>{
    console.log(request.query);
    const {query: { filter, value}} = request;
    if(!filter && !value) return response.send(users);
    if(filter && value) 
        return response.send(users.filter((user) =>user[filter]?.includes(value)));
});

// GET:/api/v1/users/{id}
app.get("/api/v1/users/:id", (request, response) => {
    if(!isNaN(request.params.id)){
        const id = parseInt(request.params.id);
        const filteredUsers = users.find(
            (u) => u.id === id
        );
        if(filteredUsers) response.send(filteredUsers).status(200);
        else response.sendStatus(404);
    }else{
        response.send([{ message: 'Invalid user ID'}]).sendStatus(400);
    }
}); 

// POST:/api/v1/users
app.post("/api/v1/users", (request, response) => {
    // console.log(request.body);
    const { body } = request;
    const newUser = {
        id: users.length + 1, 
        ...body
    };
    users.push(newUser);
    return response.status(201).send(newUser);

});

// PUT:/api/v1/users
app.put("/api/v1/users/:id", (request, response) => {
    // console.log(request.body, request.params);
    if(!isNaN(request.params.id)){
        const { body } = request;
        const userId = parseInt(request.params.id);
        const oldUser = users.filter((user) => user.id === userId);
        if(oldUser){
            // console.log(oldUser);
            // console.log(users[userId - 1]);
            users[userId - 1].userName = body.userName;
            users[userId - 1].displayName = body.displayName;
            return response.status(201).send(users);
        }
        return response.statusCode(404).statusMessage('Bad Request');
    }
    response.send([{ message: 'Invalid user ID'}]).sendStatus(400);
});


// DELETE:/api/v1/users/{id}
app.delete("/api/v1/users/:id", (request, response) => {
    if(!isNaN(request.params.id)){
        const id = parseInt(request.params.id);
        const removeUser = users.find(
            (u) => u.id === id
        );
        users.pop(removeUser);
        if(removeUser) response.send(users).status(200);
        else response.sendStatus(404);
    }else{
        response.send([{ message: 'Invalid user ID'}]).sendStatus(400);
    }
}); 

app.listen(PORT, ()=>{
    console.log(`Running on Port: ${PORT}`);
})