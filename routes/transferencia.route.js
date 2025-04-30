import { Router } from "express";

const transferenciaRouter = Router()

transferenciaRouter.get('/transferencias',(req,res,next)=>{
    res.send('obtener todas las transferencias')
})

transferenciaRouter.get('/transferencias/:id',(req,res,next)=>{
    res.send('obtener transferencias por su id')
})

transferenciaRouter.post('/transferencias',(req,res,next)=>{
    res.send('agregar transferencias')
})

transferenciaRouter.get('/transferencias/:id',(req,res,next)=>{
    res.send('editar un transferencias por su id')
})

transferenciaRouter.delete('/transferencias/:id',(req,res,next)=>{
    res.send('eliminar transferencias por su id')
})

export default transferenciaRouter