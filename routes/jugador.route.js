import { Router } from "express";

const jugadorRouter = Router()

jugadorRouter.get('/jugadores',(req,res,next)=>{
    res.send('obtener todos los jugadores')
})

jugadorRouter.get('/jugadores/:id',(req,res,next)=>{
    res.send('obtener jugador por su id')
})

jugadorRouter.post('/jugadores',(req,res,next)=>{
    res.send('agregar jugador')
})

jugadorRouter.get('/jugadores/:id',(req,res,next)=>{
    res.send('editar un jugador por su id')
})

jugadorRouter.delete('/jugadores/:id',(req,res,next)=>{
    res.send('eliminar jugador por su id')
})

export default jugadorRouter