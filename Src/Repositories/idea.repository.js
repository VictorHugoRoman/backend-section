
const BaseRepository = require('./base.repository');
let _idea = null;
class IdeaRepository extends BaseRepository {
    constructor(Idea){
        super(Idea);
        _idea = Idea;
    }
    //metodo adicional para obtener las ideas por author
    async getUserIdeas(author) {
        return await _idea.find({author});
    }
}
module.exports = IdeaRepository;