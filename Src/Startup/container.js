//Archivo q funciona como el contenedor de inyeccion de dependencias en este caso usamos awilix

//#region Funcion de las variables 
    //createContainer: funcion que crea un contenedor y lo retorna
    //asValue: metodo para inyectar un objeto como un valor
    //asClass: metodo para inyectar un objeto como un clase
    //asFunction: metodo para inyectar un objeto como una funcion
//#endregion
const {createContainer, asClass, asValue, asFunction} = require("awilix");

//services
const {HomeService, UserService, IdeaService, CommentService} = require("../Services");//por default node toma el index.js

//config
const config = require("../Config");
const app = require('.'); //es lo mismo q require('./index');

//controller
const{HomeController} = require("../Controllers");//por default node toma el index.js

//routes
const {HomeRoutes} = require("../Routes/index.routes");
const Routes = require('../Routes');//no estructuramos porque simplemente exportamos una funcion

//models
const {User, Comment, Idea} = require('../Models');//Desestructuración en Javascript.

//repositories
const {UserRepository, IdeaRepository, CommentRepository} = require('../Repositories');

const container = createContainer();

//inyectamos el objeto HomService como una clase al contenedor
//register(): le mandamos un objeto con el key HomeService y la inyeccion del objeto como una clase en modo singleton para tener la misma instancia
container.register({//register para la configuracion principal de la aplicacion
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config) //pasamos com un objeto
})
.register({//register para config todos los servicios
    HomeService: asClass(HomeService).singleton(),
    UserService: asClass(UserService).singleton(),
    IdeaService: asClass(IdeaService).singleton(),
    CommentService: asClass(CommentService).singleton()
})
.register({//register para config todos los controllers
    HomeController: asClass(HomeController.bind(HomeController)).singleton() 
    /*HomeController.bind(HomeController), con bind le decimos a express q no cambie el scope(contexto) al de él
        cuando mande llamar a HomeController, es decir, se mantendra el contexto del controller Home.*/
})
.register({//register para config todas las rutas
    HomeRoutes: asFunction(HomeRoutes).singleton()
    //registramos como funcion ya q eso declaramos en el module.export de home.routes.js
}).register({
    User: asValue(User), //usamos asValue para pasarle un valor como tal en este caso de tipo model.User y asi con los demas
    Idea: asValue(Idea),
    Comment: asValue(Comment)
}). register({
    UserRepository: asClass(UserRepository).singleton(),
    IdeaRepository: asClass(IdeaRepository).singleton(),
    CommentRepository: asClass(CommentRepository).singleton()
})
;
//Se puede meter todo en un metodo register para efectos de segmentacion se me hace mas comodo

module.exports = container;