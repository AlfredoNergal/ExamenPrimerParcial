var express = require('express'); 
var router = express.Router();
var uuidv4 = require('uuid/v4');  

var Cursos = [];  //Arreglo
var Cursos = {  //Estructurar
    curso:"",
    nombreC:"",
    cupo: "",
    facultad:"",
    cantidadA: ""
}

Cursos.push(  //Rellenado
    {
    curso:"11101",
    nombreC:"Matematica",
    cupo: "1",
    facultad:"Sistemas",
    cantidadA: "20"
    }
);

Cursos.push(  //Rellenado
    {
    curso:"222201",
    nombreC:"Informatica",
    cupo: "10",
    facultad:"Sistemas",
    cantidadA: "22"
    }
);

router.get('/', function( req, res, next){  //ruta que da la expecificacion de la api  
    res.json({
        "cuenta": "0611-1996-00120",
        "nombre": "Carlos Alfredo Diaz Carbajal",
        "version":"1.0"
    });
}); // get /

router.get('/all', function( req, res, next){
    res.json(Cursos);
}); //get /all


router.post('/new', function( req, res, next){
    var _newCursos = Object.assign({}, CursosTemplate, req.body);

    _newCursos.curso = uuidv4();

    Cursos.push(_newCursos);
    res.json(_newCursos);
}); //post /new

router.put('/atendee/:curso', function( req, res, next){
    var curso = req.params.curso;
    var modifiedCursos = null;

    Cursos = Cursos.map(
        function( Cursos, index){
            if( Cursos.curso === curso){
                modifiedCursos = Object.assign( Cursos, req.body);
                return modifiedCursos;
            } else {
                return Cursos;
            }
        }
    );//map

    res.json(modifiedCursos);
}); //put /atendee

router.delete('/atendee/:curso', function( req, res, next){
    var curso = req.params.curso;

    Cursos = Cursos.filter(
        function( Cursos, index){
            return Cursos.curso !== curso;

            }
    );
    
    res.json({deleted:true});
}); //delete /atendee

router.get('/atendee/:curso', function( req, res, next){
    var curso = req.params.curso;

    var filter = Cursos.filter(
        function( Cursos, index){
            return Cursos.curso === curso;

            }
    );
    
    res.json(filter);
}); //delete /atendee




module.exports = router;  //exportar el objeto que genera las rutas