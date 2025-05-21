import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

const options = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Web Futbol",
            version:"1.0.0"
        }
    },
    apis:[
        './docs/*.js'
    ]
}

const swaggerSpec = swaggerJsdoc(options)

export const swaggerDocs = (app,port)=>{
    app.use('/api/v1/docs',swaggerUiExpress.serve,swaggerUiExpress.setup(swaggerSpec))
    app.get('/api/v1/docs.json',(req,res)=>{
        res.setHeader('Content-Type','application/json')
        res.send(swaggerSpec)
    })
}