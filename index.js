const express = require('express');
const server = express();
const knex = require('knex')
const knexConfig = require('./knexfile');
const routeMaker = require('./config/routeMaker')

const port = process.env.PORT || 3334;
const middleware = require('./config/middleware');
const db = knex(knexConfig.development)

middleware(server)

server.get('/' , (req,res)=>{
    res.send('<h1>built by Ryan Clausen</h1>')
})

server.use('/api/todos', routeMaker(db, 'todos'))
server.use('/api/subitems', routeMaker(db, 'subitems'))

server.listen(port, ()=> console.log(`we hear you ${port}`))