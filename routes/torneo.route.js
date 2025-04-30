import { Router } from "express";

const torneoRouter = Router()

torneoRouter.get('/torneos',(req,res,next)=>{
    res.send('obtener todos los torneos')
})

torneoRouter.get('/torneos/:id',(req,res,next)=>{
    res.send('obtener torneos por su id')
})

torneoRouter.post('/torneos',(req,res,next)=>{
    res.send('agregar torneos')
})

torneoRouter.get('/torneos/:id',(req,res,next)=>{
    res.send('editar un torneos por su id')
})

torneoRouter.delete('/torneos/:id',(req,res,next)=>{
    res.send('eliminar torneos por su id')
})

export default torneoRouter