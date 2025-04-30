import { Router } from "express";

const golRouter = Router()

golRouter.get('/gol',(req,res,next)=>{
    res.send('obtener todos los goles')
})

golRouter.get('/gol/:id',(req,res,next)=>{
    res.send('obtener gol por su id')
})

golRouter.post('/gol',(req,res,next)=>{
    res.send('agregar gol')
})

golRouter.get('/gol/:id',(req,res,next)=>{
    res.send('editar un gol por su id')
})

golRouter.delete('/gol/:id',(req,res,next)=>{
    res.send('eliminar gol por su id')
})

export default golRouter