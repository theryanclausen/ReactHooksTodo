const express = require('express');
const server = express();
const knex = require('./knexfile')

const port = proces.env.PORT || 3334;
const middleware = require('./config/middleware');
const db = knex(knexConfig.development)

middleware(server)

server.get('/' , (req,res)=>{
    res.send('<h1>built by Ryan Clausen</h1>')
})

server.listen(port, ()=> console.log(`we hear you ${port}`))