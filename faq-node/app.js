const express = require('express');
const route = require('./router');
const dotnev = require('dotenv');
dotnev.config();
const app = express();
const port = 5001;
// app.get('/',(req,res) =>{
//     res.send("Hello World!")
// })
app.use(express.json());
app.use('/faq-route',route)
app.listen(port,() => {
    console.log(`Server is running port ${port}`);
});