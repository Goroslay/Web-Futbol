import { Router } from "express";

const tecnicoRouter = Router()

tecnicoRouter.get('/tecnicos',(req,res,next)=>{
    res.send('obtener todos los tecnicos')
})

tecnicoRouter.get('/tecnicos/:id',(req,res,next)=>{
    res.send('obtener tecnicos por su id')
})

tecnicoRouter.post('/tecnicos',(req,res,next)=>{
    res.send('agregar tecnicos')
})

tecnicoRouter.get('/tecnicos/:id',(req,res,next)=>{
    res.send('editar un tecnicos por su id')
})

tecnicoRouter.delete('/tecnicos/:id',(req,res,next)=>{
    res.send('eliminar tecnicos por su id')
})

export default tecnicoRouter