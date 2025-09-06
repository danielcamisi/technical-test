require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const routes = require('./routes/routes')
const app = express();
const cors = require("cors")
const PORT = process.env.PORT
require("./config/config");
const path = require("path");

// SWAGGER - ADICIONE ESSAS LINHAS
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Technical Test API',
      version: '1.0.0',
      description: 'API para gerenciamento de usuários e notícias',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    }
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(swaggerOptions);

app.use(express.json());
app.use(cors({
    origin: "*",
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials:true
}));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// SWAGGER ROUTE 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/', routes);

app.get('/', (req,res)=>{
    res.status(200).send("Technical Test API")
})

app.listen(PORT, ()=> {
    console.log(`Servidor rodando na porta ${PORT}`)
    console.log(`Documentação Swagger disponível em: http://localhost:${PORT}/api-docs`)
})