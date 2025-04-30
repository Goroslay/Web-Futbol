import { Router } from "express";

const equiposRouter = Router()

equiposRouter.get('/equipos',(req,res,next)=>{
    res.send('obtener todos los equipos')
})

equiposRouter.get('/equipos/:id',(req,res,next)=>{
    res.send('obtener equipo por su id')
})

equiposRouter.post('/equipos',(req,res,next)=>{
    res.send('agregar equipo')
})

equiposRouter.get('/equipos/:id',(req,res,next)=>{
    res.send('editar un equipos por su id')
})

equiposRouter.delete('/equipos/:id',(req,res,next)=>{
    res.send('eliminar equipo por su id')
})

export default equiposRouter