const express = require('express');
const cors = require('cors');
const cookiePaser = require('cookie-parser');



const databaseconnection = require('./connection');
const bodyParser = require('body-parser');
const userrouter = require('./routers/user')
const adminrouter = require('./routers/admin')
const salemangerrouter = require('./routers/salemanagr');
const emprouter = require('./routers/emp')




const app = express();

const PORT = 9000


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
}));
app.use(cookiePaser())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


databaseconnection('mongodb://localhost:27017/')





app.use('/user' , userrouter);
app.use('/admin' , adminrouter)





app.listen(PORT , () => console.log("server started"))