import { Router } from "express";

const estadisticaRouter = Router()

estadisticaRouter.get('/estadisticas',(req,res,next)=>{
    res.send('obtener todos las estadisticas')
})

estadisticaRouter.get('/estadisticas/:id',(req,res,next)=>{
    res.send('obtener estadistica por su id')
})

estadisticaRouter.post('/estadisticas',(req,res,next)=>{
    res.send('agregar estadistica')
})

estadisticaRouter.get('/estadisticas/:id',(req,res,next)=>{
    res.send('editar un estadistica por su id')
})

estadisticaRouter.delete('/estadisticas/:id',(req,res,next)=>{
    res.send('eliminar estadistica por su id')
})

export default estadisticaRouter