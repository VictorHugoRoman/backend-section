//este archivo sera una base o plantila para un CRUD cuya responsabilidad sera heredada para otros repositorios
//no colocamos esta clase en el index.js de esta carpeta para q no pueda ser visto en las otras capas
class BaseRepository{
    constructor(model){
        this.model = model;//model sera un modelo de los q creamos pero tendra el contexto de mongoose en tiempo de ejecucuion
    }
    async get(id){
        return await this.model.findById(id); //findById metodo de mongoose 
    }
    async getAll(){
        return await this.model.find();
    }
    async create(entity){
        return await this.model.create(entity);
    }
    async update(id, entity){
        return await  this.model.findByIdAndUpdate(id, entity, {new: true});//con new = true le decimos a mongo q nos retorne la entidad q a sido actualizada con los cambios
    }
    async delete(id){
        return await this.model.findByIdAndDelete(id);
    }
}

module.exports = BaseRepository;