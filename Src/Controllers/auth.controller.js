//Aqui van los controllers disponibles para la autenticacion, usa la capa Services
let _authService = null;
class AuthController {
    //AuthService obtenemos el valor por iyenccion de dependencias
    constructor({ AuthService }) {
        _authService = AuthService;
    }
    async SignUp(req, res) {
        const { body } = req;
        const createdUser = await _authService.SignUp(body);
        return res.status(201).send(createdUser);
    }
    async SignIn(req, res) {
        const { body } = req;
        const creds = await _authService.SignIn(body);
        return res.send(creds); //por defualt el metodo send retorno el status 200
    }
}
module.exports = AuthController;