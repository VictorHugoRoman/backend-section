
const BaseRepository = require('./base.repository'); 
let _user = null; //variable privada para este scoupe o contexto
//heredamos la clase BaseRepository del archvio base.repository.js
class UserRepository extends BaseRepository{
    //como la clase padre tiene un constructor q recibe un parametro hay q usarlo en la clase hija de la siguiente manera
    constructor({ User }){
        super(User);//con super usamos el constructor de la clase padre
        _user=User;
    }
    
    async GetUserByUserName(userName){
        return await _user.findOne({userName});//findOne metodos de mongoose 
    }
}

module.exports = UserRepository;