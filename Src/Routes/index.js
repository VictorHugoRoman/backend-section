//***Este index el encargado de inyectar los middlewares q queramos,de las configuraciones de todas las rutas.

const express = require('express');
require('express-async-errors');//para capturar las excepciones asincronas en los middlewares q producen las promesas

//middlewares
const cors = require('cors'); //este lo instalamos como dependencia de produccion
const helmet = require('helmet'); //para resolver algunas brechas de seguridad q por defecto vienen en express, ir a la doc para ver las brechas
const compression = require('compression'); //para comprimir las peticiones http
const { NotFoundMiddleware, ErrorMiddleware } = require('../Middlewares'); //middlewares para cachar errores y status code, por lo tanto van abajo de los endpoint

//#region require('../Middlewares') Sin Destructuracion de objetos
//Esto es lo mismo q la linea de arriba, aqui lo llamamos directamente y arriba con las destructuracion de objetos mediente su index.js
//const notFoundMiddleware = require('../Middlewares/not-found.middleware');
//const errorMiddleware = require('../Middlewares/error.middleware');
//#endregion 

//como estamos usando awilix exportamos en una funcion las rutas necesarias o las q queramos
//ver funcionamiento de "function ({}){ }" en  home.route.js
module.exports = function ({ HomeRoutes, UserRoutes, IdeaRoutes, CommentRoutes }) { //HomeRoutes esta controlado por awlix este le pasa el valor
    const router = express.Router();
    const apiRoutes = express.Router(); //variable para los middlewares 

    //Configurando nuestros middlewares con configuracion por default
    //cors, helmet, compression usamos la conf default ir a la doc para las configs., usamos las funciones defualt q serviran como middleware
    //express.json() convierte las peticiones de tipo post en formato json en la propiedad body
    apiRoutes
        .use(express.json())
        .use(cors())
        .use(helmet())
        .use(compression());
    //algunps de estos middlewares se ejecutan antes de nuestra logica de rutas q estan abajo, otros durante y otros despues

    //apiRoutes usara las rutas de home con las HomeRoutes de awilix, es decir q configuramos en el container
    apiRoutes.use("/home", HomeRoutes);
    //apiRoutes usara las rutas de home con las userRoutes de awilix,es decir q configuramos en el container
    apiRoutes.use("/user", UserRoutes);
    //apiRoutes usara las rutas de home con las IdeaRoutes de awilix,es decir q configuramos en el container
    apiRoutes.use("/idea", IdeaRoutes);
    //apiRoutes usara las rutas de home con las CommentRoutes de awilix,es decir q configuramos en el container
    apiRoutes.use("/comment", CommentRoutes);

    //le pasamos al router todas las rutas de apiRoutes, y le mandamos un prefijo "param 1" para que todas las rutas o end point los muestre
    router.use("/v1/api", apiRoutes);

    router.use(NotFoundMiddleware);
    router.use(ErrorMiddleware);

    return router;
}