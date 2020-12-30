//#region 
    //createContainer: funcion
    //asValue: metodo para inyectar un objeto como una valor
    //asClass: metodo para inyectar un objeto como un clase
    //asFunction: metodo para inyectar un objeto como una funcion
//#endregion
const {createContainer, asClass, asValue, asFunction} = require("awilix");

//services
const {HomeService} = require("../Services");//por default node toma el index.js

//config
const config = require("../Config");
const app = require('.'); //es lo mismo q require('./index');

//controller
const{HomeController} = require("../Controllers");//por default node toma el index.js

//routes
const {HomeRoutes} = require("../Routes/index.routes");
const Routes = require('../Routes');//no estructuramos porque simplemente exportamos una funcion

const container = createContainer();

//inyectamos el objeto HomService como una clase al contenedor
//register(): le mandamos un objeto con el key HomeService y la inyeccion del objeto como una clase en modo singleton para tener la misma instancia
container.register({//register para la configuracion principal de la aplicacion
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config) //pasamos com un objeto
})
.register({//register para config todos los servicios
    HomeService: asClass(HomeService).singleton()
})
.register({//register para config todos los controllers
    HomeController: asClass(HomeController.bind(HomeController)).singleton() 
    /*HomeController.bind(HomeController), con bind le decimos a express q no cambie el scope(contexto) al de él
        cuando mande llamar a HomeController, es decir, se mantendra el contexto del controller Home.*/
})
.register({//register para config todas las rutas
    HomeRoutes: asFunction(HomeRoutes).singleton()
    //registramos como funcion ya q eso declaramos en el module.export de home.routes.js
});
//Se puede meter todo en un metodo register para efectos de segmentacion se me hace mas comodo

module.exports = container;