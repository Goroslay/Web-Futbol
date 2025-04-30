import { Router } from "express";

const tarjetaRouter = Router()

tarjetaRouter.get('/tarjetas',(req,res,next)=>{
    res.send('obtener todos las tarjetas')
})

tarjetaRouter.get('/tarjetas/:id',(req,res,next)=>{
    res.send('obtener tarjetas por su id')
})

tarjetaRouter.post('/tarjetas',(req,res,next)=>{
    res.send('agregar tarjetas')
})

tarjetaRouter.get('/tarjetas/:id',(req,res,next)=>{
    res.send('editar un tarjeta por su id')
})

tarjetaRouter.delete('/tarjetas/:id',(req,res,next)=>{
    res.send('eliminar tarjetas por su id')
})

export default tarjetaRouter