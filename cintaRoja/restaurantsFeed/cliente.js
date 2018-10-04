console.log('Cargando el Servicio de Moongoo')
const mongoose =require('mongoose');
const url='mongodb://restuser:master01@ds121163.mlab.com:21163/restaurants'

mongoose.connect(url,{useNewUrlParser: true,},()=>{
    console.log("Conexion exitosa con la base de Datos")
})

const Schema= mongoose.Schema
const ObjectId= mongoose.Schema.ObjectId

const restaurantSchema = Schema({
    restauranteId:ObjectId,
    datecreate:{type:Date, default:Date.now},
    name:{type: String, require: true},
    address:{type: String, require: true},
    hours:{type: String, require: true},
    categoria:{type:ObjectId, ref:'Categoria', required:true},
    precio:{type: Number, default:0},
    likes:{type: Number, default:0},
    ok:{type: Number, default:0},
    dislikes:{type: Number, default:0}
})

const userSchema = Schema({
    userId: ObjectId,
    name: {type: String, require: true},
    sexo: {type: String, require: true},
    edad: {type:Number, require: true}
});

const comentarioSchema = Schema({
    comentarioId: ObjectId,
    user:{type:ObjectId, ref:'User', required:true},
    restaurant: {type:ObjectId, ref:'Restaurant', required:true},
    comentario:{type: String, require: true},
    

});

const categoriaSchema = Schema({
    categoriaId: ObjectId,
    name: {type: String, require: true}

});

const Restaurant = mongoose.model('Restaurant',restaurantSchema) 
const User = mongoose.model('User', userSchema)
const Comentario = mongoose.model('Comentario',comentarioSchema) 
const Categoria = mongoose.model('Categoria', categoriaSchema)



module.exports={Restaurant,User,Comentario,Categoria}
