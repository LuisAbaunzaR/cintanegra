const express = require('express');
const bodyParser = require('body-parser');

const {Restaurant,User,Comentario,Categoria}= require ('./cliente.js')
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
    next();
 });

//---------------------------//
//CRUD Restaurant

// CREATE -> Post One

app.post('/api/restaurant/',(request, response)=>{
    let jsonRestaurant = request.body

    const nuevoRestaurant = Restaurant(jsonRestaurant) 
        nuevoRestaurant
        .save((error,restaurant)=>{
            response
            .status(201)
            .send({
                "mensaje": `Restaurante creado exitosamente con el ID ${restaurant.id}`,
                "body": restaurant,
                "error": error
            })
        })


})

//---------------------------//
// GET ALL RESTAURANTS
app.get('/api/restaurant/',(request, response)=>{

    Restaurant
        .find()
        .exec()
        .then(jsonResultadoRest=>{
            response.status(200)
                .send({
                    "mensaje":"Listado de Restaurantes",
                    "body":{jsonResultadoRest},
                })
                
        })
        .catch(error=> console.log(error))

})

//---------------------------//
// GET ONE RESTAURANT
app.get("/api/restaurant/:id/", (request, response) => {
    const restaurantId = request.params.id;
  
    Restaurant
      .findById(restaurantId)
      .exec()
      .then(restaurante => {
        response.status(200).send(restaurante);
      })
      .catch(error => {
        response.status(404).send(error);
      });
  
  });
  
//UPDATE -> Put One
app.put("/api/restaurant/:id/", (request, response) => {
    const restaurantId = request.params.id;
  
    Restaurant
        .findByIdAndUpdate(restaurantId, {$set: request.body}, { new: true })
        .exec()
        .then(restauranteActualizado => {
        response.status(200).send(restauranteActualizado);
      })
      .catch(error => {
        response.status(400).send(`Error: ${error}`);
      });
  });
  
//   //DELETE ->Delete One
app.delete("/api/restaurant/:id/", (request, response) => {
    const restaurantId = request.params.id;
  
    Restaurant
        .findByIdAndRemove(restaurantId)
        .exec()
        .then(resultado => {
        response.status(204).send({
         message: "eliminado exitosamente",
          body: resultado
        });
      })
      .catch(error => {
        res.status(404).send(error);
      });
  });

//CRUD Category

// CREATE -> Post One

app.post('/api/categoria/',(request, response)=>{
    let jsonCategoria = request.body

    const nuevaCategoria = Categoria(jsonCategoria) 
       nuevaCategoria
        .save((error,categoria)=>{
            response
            .status(201)
            .send({
                "mensaje": `Categoria creada exitosamente con el ID ${categoria.id}`,
                "body": Categoria,
                "error": error
            })
        })
})

// GET ALL -> 

app.get('/api/categoria/',(request, response)=>{

    Categoria
        .find()
        .exec()
        .then(jsonResultadoCat=>{
            response.status(200)
                .send({
                    "mensaje":"Listado de Categoria",
                    "body":{jsonResultadoCat},
                })
                
        })
        .catch(error=> console.log(error))

})

// DELETE ONE 



app.delete('/api/categoria/:id/',(request, response)=>{
    const categoriatId = request.params.id;
    Categoria
        .findByIdAndRemove(categoriatId)
        .exec()
        .then(resultado => {
            response.status(204).send({
             message: "eliminado exitosamente",
              body: resultado
            });
          })
          .catch(error => {
            res.status(404).send(error);
          });

})
// USER
// CREATE ONE USER-> Post One

app.post('/api/user/',(request, response)=>{
    let jsonUser = request.body

    const nuevoUser = User(jsonUser) 
        nuevoUser
        .save((error,usuario)=>{
            response
            .status(201)
            .send({
                "mensaje": `Usuario creado exitosamente con el ID ${usuario.id}`,
                "body": usuario,
                "error": error
            })
        })
})
    
// GET ALL USERS-> 

app.get('/api/user/',(request, response)=>{

    User
        .find()
        .exec()
        .then(jsonResultadoUser=>{
            response.status(200)
                .send({
                    "mensaje":"Listado de Usuario",
                    "body":{jsonResultadoUser},
                })
                
        })
        .catch(error=> console.log(error))
})

// GET ONE USER
app.get("/api/user/:id/", (request, response) => {
    const userId = request.params.id;
  
    User
      .findById(userId)
      .exec()
      .then(usuario => {
        response.status(200).send(usuario);
      })
      .catch(error => {
        response.status(404).send(error);
      });
  
  });

  // DELETE ONE USER

app.delete('/api/user/:id/',(request, response)=>{
    const userId = request.params.id;
    User
        .findByIdAndRemove(userId)
        .exec()
        .then(resultado => {
            response.status(204).send({
             message: "eliminado exitosamente",
              body: resultado
            });
          })
          .catch(error => {
            res.status(404).send(error);
          });

        });

// 
// CREATE ONE COMMENT-> Post One

app.post('/api/comment/',(request, response)=>{
    let jsonComment = request.body


    const nuevoComment = Comentario(jsonComment) 
        nuevoComment
        .save((error,comentario)=>{
            response
            .status(201)
            .send({
                "mensaje": `Comentario creado exitosamente con el ID ${comentario.id}`,
                "body": comentario,
                "error": error
            })
            
        })
})

// GET ALL COMMENT-> 
app.get('/api/comment/',(request, response)=>{
    
    Comentario
        .find()
        .exec()
        .then(jsonResultadoComment=>{
            response.status(200)
                .send({
                    "mensaje":"Listado de Commentarios",
                    "body":{jsonResultadoComment},
                })
                
        })
        .catch(error=> console.log(error))
})


// ----- INSERTANDO VALORACION ------
// app.get('/api/feed/:id/:valor/',(request, response)=>{
  
//     //console.log('Comienza el callback');
    
//      const restId = request.params.id
//      const restVal = request.params.valor

//      let likes, ok, dislikes;
 
//      //console.log("Comienza la petición");
//     // let traer = new Promise(function(resolve,reject){

//     // })
//     //  console.log("Este es el json" + jsonComment)

//      Restaurant
//          .findById(restId)
//          .exec()
//          .then(restaurant=>{
             
//              if (restVal ==1){
//                 likes = restaurant.likes +1
//                 ok=restaurant.ok
//                 dislikes=restaurant.dislikes
//                 //console.log(likes)
//              }else if(restVal ==2){
//                 likes = restaurant.likes 
//                 ok=restaurant.ok +1
//                 dislikes=restaurant.dislikes
//              }else if(restVal ==3){
//                 likes = restaurant.likes 
//                 ok=restaurant.ok
//                 dislikes=restaurant.dislikes+1
//              }else{
//                 likes = restaurant.likes 
//                 ok=restaurant.ok 
//                 dislikes=restaurant.dislikes
//              }
             
//             Restaurant
//                 .findByIdAndUpdate(restaurant._id,
//                     {
//                         likes: likes,
//                         ok: ok,
//                         dislikes: dislikes
//                     },
//                     {new:true})
//                     // .populate('articulos')
//                     .exec()
//                     .then(restaurant=>{
                        
                        
                        
                        
//                         response.status(200)
//                         .send(restaurant)

//                     })
//                     .catch( error => response.status(404).send(error));
//             })
               
//          })
    
// SEARCH RESTAURANT
app.get("/api/search/:categoria/", (request, response) => {
    const categoriaSearch = request.params.categoria;
    var query = { categoria: categoriaSearch };
    Restaurant
      .find(query)
      .exec()
      .then(restaurante => {
        response.status(200).send(restaurante);
      })
      .catch(error => {
        response.status(404).send(error);
      });
  
  });
         
////iniciando desmadre

app.post('/api/feed/:id/:valor/',(request, response)=>{
  
    //console.log('Comienza el callback');
    let jsonComment = request.body
     const restId = request.params.id
     const restVal = request.params.valor


     let likes, ok, dislikes;
 
     //console.log("Comienza la petición");
    // let traer = new Promise(function(resolve,reject){

    // })
    //  console.log("Este es el json" + jsonComment)

     Restaurant
         .findById(restId)
         .exec()
         .then(restaurant=>{
            // console.log(restaurant)
             if (restVal ==1){
                likes = restaurant.likes +1
                ok=restaurant.ok
                dislikes=restaurant.dislikes
                //console.log(likes)
             }else if(restVal ==2){
                likes = restaurant.likes 
                ok=restaurant.ok +1
                dislikes=restaurant.dislikes
             }else if(restVal ==3){
                likes = restaurant.likes 
                ok=restaurant.ok
                dislikes=restaurant.dislikes+1
             }else{
                likes = restaurant.likes 
                ok=restaurant.ok 
                dislikes=restaurant.dislikes
             }
             
            Restaurant
                .findByIdAndUpdate(restaurant._id,
                    {
                        likes: likes,
                        ok: ok,
                        dislikes: dislikes
                    },
                    {new:true})
                    // .populate('articulos')
                    .exec()
                    .then(restaurant=>{
                        jsonComment.restaurant=restaurant._id
                        const nuevoComment = Comentario(jsonComment) 
                        nuevoComment
                        .save((error,comentario)=>{
                            response
                            .status(201)
                            .send({
                                "mensaje": `Comentario creado exitosamente con el ID ${comentario.id}`,
                                "body": comentario,
                                "error": error
                            })
                        
                        
                      //  response.status(200)
                        // .send(restaurant)

                    })
                  //  .catch( error => response.status(404).send(error));
            })
               
         }).catch( error => response.status(404).send(error));
        })

  // GET  COMMENT restaurant-> 
app.get('/api/busqueda/:restaurante/',(request, response)=>{
    const commentSearch = request.params.restaurante;
    var query = { restaurant: commentSearch };
    Comentario
        .find(query)
        .exec()
        .then(jsonResultadoComment=>{
            response.status(200)
                .send({
                    "mensaje":"Listado de Commentarios",
                    "body":{jsonResultadoComment},
                })
                
        })
        .catch(error=> console.log(error))
})





.listen(process.env.PORT || 5000);


//usar en local host
// var PORT = process.env.port || 8801;
//  app.listen(PORT,()=>{
//     console.log(`Servidor Corriendo en el puerto ${PORT}`)
//  })


