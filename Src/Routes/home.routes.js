//Aqui van las rutas que estaran configuradas en nuestro home

const {Router} = require("express"); //Usamos el Router de express

//#region 
//function(){} es como el constructor en una clase, ya q las clases en javascritp son funciones
//Es como si crearamos una clase anonima con un constructor de por medio
//#endregion
//le pasamos al constuctor nuestro HomeController q configuramos con awilix por lo tanto awilix s l encargado de pasarle el valor
module.exports = function({HomeController}) 
{ 
    const router = Router();

    //#region 
    //get() corresponde a una peticion http de tipo get
    //Param 1: ruta URI. Param 2: controlador o metodo del controlador q resolverá la ruta pasada en el param 1
    //#endregion
    router.get("/", HomeController.index);//HomeController.index es la funcion q express ejecutara por ello la pasamos de esa manera y no HomeController.index() porque asi se ejecutaria la funcion
    //#region 
    //Normalmente cuando express ejecuta el get o cualquier otra funcion del Router le pasa su scope a la funcion
    //pero como a nuestro controller home le hicimos un bind en nuestro container.js el scope o contexto seguirá 
    //perteneciendo al controller y asi podremos acceder a sus servicios o metodos.
    //#endregion
    return router;
}