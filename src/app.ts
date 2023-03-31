import { PrismaClient } from "@prisma/client";
import express from "express";

var cors = require('cors')

const app = express()

const prisma = new PrismaClient

app.use(express.json())

app.use(cors())

const port = 3333


app.get("/task/", async (req, res) => {

    const result = await prisma.task.findMany()

    res.json(result)
})

// ------- CRIA A TAREFA  --------

app.post("/task/create", async (request, response) =>{

    console.log('entrei na rota')
            
    const { name } = request.body

    console.log(request.body)
        
    const taskCreate = await prisma.task.create({
        data:{
            name
        }
    })

    response.json(taskCreate)
})


//  ----------- DELETA TAREFA --------
app.delete('/task/:id', async (request, response) => {
    const { id } = request.params

    const deleteTask = await prisma.task.delete({
        where:{
            id: Number(id)
        }
    })

    response.json(deleteTask)
})


app.listen(port, () => {
    console.log("server running = http://localhost:3333")
})