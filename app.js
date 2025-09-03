import express from 'express';

import authenticationRoutes from './routes/authenticationRoute.js';
import todoRoutes from './routes/todoRoute.js'

const app = express();
app.use(express.json());


// ROUTES
app.use('/login', authenticationRoutes);
app.use('/todos', todoRoutes);


const PORT = 3000;


// SERVER
app.listen(PORT , () =>{
    console.log("Server started at 3000 port number");
} )