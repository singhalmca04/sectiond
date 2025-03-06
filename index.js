const express = require('express');
const Student = require('./students');
const bodyParser = require('body-parser');

const app = express();
require('./db');
app.get('/', (req, res)=>{
    res.status(200).send("Hello world");
})

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.post('/save/data', async (req, res)=>{
    try{
        let stu = new Student();
        let { marks, name, age, subject } = req.body;
        stu.marks = marks;
        stu.name = name;
        stu.age = age;
        stu.subject = subject;
        stu = await stu.save();
        res.status(200).send({data: stu, msg: "Data saved 23444"});
    } catch(err) {
        console.log(err);
        res.status(500).send({data: err, msg: "Not Saved"});
    }
})

app.listen(6000, ()=>{
    console.log("Server Started again");
})