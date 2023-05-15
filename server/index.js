const express = require('express');
const mongoose = require("mongoose");
const app = express();
const Blog = require('./models/Blog');
const cors = require("cors");

var corsOptions = {
    origin: "https://blog-app-two-beryl.vercel.app"
};

app.use(cors(corsOptions));

mongoose.connect('mongodb+srv://riteshbmsingh:n2oTmQBQUzI5lHLf@cluster0.cay8nvi.mongodb.net/?retryWrites=true&w=majority');
app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});


app.put('/', async (req, res) => {
    const { id, title, imageUrl, content, author, quote } = req.body;
    try {
        const filter = { _id: id };
        const update = req.body;
        const blogDoc = await Blog.findOneAndUpdate(filter, update);
        res.json(blogDoc);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
});

app.get('/', async (req, res) => {
    res.json(await Blog.find());
});


app.listen(4000);