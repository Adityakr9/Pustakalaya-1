const express = require("express");

const app = express();

const port = 8000;

app.get("/", (req, res) => {
    return res.send("Home page");
});

const admin = (req, res) => {
    return res.send("Admin Dashboard");
};

const isAdmin = (req,res,next) => {
    return res.send("isAdmin is running");
    next();
};

const isLoggedIn = (req,res,next) =>{
    return res.send("isLoggedIn is running");
    next();
};

app.get("/admin", isLoggedIn, isAdmin, admin);

app.get("/login", (req, res) => {
    return res.send("You are visiting login route");
});

app.get("/signup", (req, res) => {
    return res.send("You are visiting signup route");
});

app.listen(port, () => {
    console.log("Server is up and running...");
});

// const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
