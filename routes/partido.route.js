import { Router } from "express";

const partidoRouter = Router()

partidoRouter.get('/partidos',(req,res,next)=>{
    res.send('obtener todos los partidos')
})

partidoRouter.get('/partidos/:id',(req,res,next)=>{
    res.send('obtener partido por su id')
})

partidoRouter.post('/partidos',(req,res,next)=>{
    res.send('agregar partido')
})

partidoRouter.get('/partidos/:id',(req,res,next)=>{
    res.send('editar un partido por su id')
})

partidoRouter.delete('/partidos/:id',(req,res,next)=>{
    res.send('eliminar partido por su id')
})

export default partidoRouter