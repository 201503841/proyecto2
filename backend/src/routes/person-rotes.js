
var cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const { Router } = require('express');
const router = Router();
fs = require('fs');
const BD = require('../config/configbd');
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());
var parser = require('xml2json');
const fileUpload = require('express-fileupload');
var nodemailer = require('nodemailer');
require('dotenv').config
const jwt = require("jsonwebtoken");
router.use(cors())
router.use(fileUpload());

const { Console } = require('console');


let pathArchivo;
//-----objeto para manejar el envio de correos
let transport = nodemailer.createTransport({
    service: 'gmail',
    port: 2525,
    secure: false,
    auth: {
        type: "login",
        user: 'archivos2semestre@gmail.com',
        pass: 'Hola1234'  //-activar el acceso de aplicaciones no seguras a su cuenta de google
    }
})




//LOGIN ADMINISTRADOR
router.post('/login/administrador', async (req, res) => {

    const username = req.body.nombre;
    console.log("entre");

    const { nombre, password } = req.body;
    // const username = req.body.nombre;
    console.log(nombre);
    console.log(password);

    try {

        sql = "select password from persona where rol= 'administrador' and estado='contratado' and nombre= '" + nombre + "'";
        console.log("hice la consulta");
        let result = await BD.Open(sql, [], false);
        console.log(result.rows);
        var contraseña = result.rows[0];
        var pas = password;

        if(pas.value===contraseña.value){
            const user = { name: username }
            const accesToken = generateAcessToken(user);
            //const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
           // res.json({ accesToken: accesToken, refreshToken: refreshToken })       
            return res.status(200).json({accesToken});
            
        }else{
            return res.status(500).send("error");
        }

    } catch (error) {
        res.send("error" + error);
    }

});



 generateAcessToken = (user)=> {
    console.log("entre a generar token");
    console.log(user);
    let minutos=3;
    return jwt.sign(user, 'regenerando', { expiresIn: 60*minutos });

}


function generateRefreshToken(user){
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}


//LOGIN COORDINADOR
router.post('/login/coordinador', async (req, res) => {
    console.log("entre");
    const { nombre, password } = req.body;
    console.log(nombre);
    console.log(password);

    try {

        sql = "select password from persona where rol= 'coordinador' and estado='contratado' and nombre= '" + nombre + "'";

        let result = await BD.Open(sql, [], false);
        console.log(result.rows);
        var contraseña = result.rows[0];
        var pas = password;

        if (pas.value === contraseña.value) {
            const user = { name: nombre }
            //const accesToken = generateAcessToken(user);
            //const refreshToken = generateRefreshToken(user);
            //res.json({ accesToken: accesToken, refreshToken: refreshToken })               
            return res.status(200).json({ password });
        } else {
            return res.status(500).send("error");
        }

    } catch (error) {
        res.send("error" + error);
    }

});


//LOGIN REVISOR
router.post('/login/revisor', async (req, res) => {
    console.log("entre");
    const { nombre, password } = req.body;
    console.log(nombre);
    console.log(password);

    try {

        sql = "select password from persona where rol= 'revisor' and estado='contratado' and nombre= '" + nombre + "'";

        let result = await BD.Open(sql, [], false);
        console.log(result.rows);
        var contraseña = result.rows[0];
        var pas = password;

        if (pas.value === contraseña.value) {
            const user = { name: nombre }
            // const accesToken = generateTokenAcceso(user);
            // const refreshToken = generateTokenRefresco(user);
            //res.json({ accesToken: accesToken, refreshToken: refreshToken })               
            return res.status(200).json({ password });
        } else {
            return res.status(500).send("error");
        }

    } catch (error) {
        res.send("error" + error);
    }

});



let nombrecarpetas = "";
//REGISTRO POSTULANTE
router.post('/agregar/aplicante', async (req, res) => {
    console.log("entre");
    const { cui, nombres, apellidos, correo, direccion, telefono } = req.body;

    try {

        sql = "insert into aplicante(cui,nombres,apellidos,correo,direccion,telefono,estado) values (:cui,:nombres,:apellidos,:correo,:direccion,:telefono,'pendiente')";

        let result = await BD.Open(sql, [cui, nombres, apellidos, correo, direccion, telefono], true);
        console.log(result.rowsAffected);
        return res.status(200).json({ result });

    } catch (error) {
        res.send("error" + error);
    }

});

//-------END POINT CORREO
router.post('/correoapertura', async function (req, res) {
    const { nombres, apellidos, correo } = req.body;

    nombrecarpetas = nombres + apellidos;
    console.log("soy nombre_carpetas: " + nombrecarpetas);

    const message = {
        from: 'archivos2semestre@gmail.com', // direccion que colocaron en el transport
        to: correo,         // direccion a la que van a enviar el correo
        subject: 'Bienvenido a TOTONET', // asunto del correo
        text: 'Hola ' + nombres + ' ' + apellidos + ' Gracias por aplicar a una de nuestras plazas, uno de nuestros reclutadores se pondra en contacto contigo para seguir con el proceso.' // contenido
    };

    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).json({ correo });
            console.log(info);
        }
    });
});

//endpoint sube cv
router.post('/upload', (req, res) => {
    console.log("soy nombre_carpetas: " + nombrecarpetas);
    let EDFile = req.files.file
    pathArchivo = EDFile.name;
    console.log(pathArchivo)
    EDFile.mv(`./files/${EDFile.name}`, err => {
        if (err) {
            return console.log("oh oh algo ocurrio");
        }
        return console.log("todo bien");
    });
    fs.mkdirSync('./files/postulantes/' + nombrecarpetas, { recursive: true });
    fs.rename('./files/' + pathArchivo, './files/postulantes/' + nombrecarpetas + "/" + pathArchivo, (err) => {
        if (err) {
            throw (err);
        }
    });
});

//READ



router.get('/getUsers', async (req, res) => {
    sql = "select * from person where state=1";

    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "codu": user[0],
            "username": user[1],
            "firstname": user[2],
            "lastname": user[3]
        }
        console.log("soy admin1: " + contraseña);
    })

    res.json(Users);
})


//CREATE

router.post('/insertar', async (req, res) => {

    try {
        const { idpersona, nombre, contraseña } = req.body;

        sql = "insert into persona(idpersona,nombre,contraseña) values (:idpersona,:nombre,:contraseña)";

        await BD.Open(sql, [idpersona, nombre, contraseña], true);

        /* res.status(200).json({
             "idusuario": idusuario,
             "nombre": nombre,
             "contraseña": contraseña
         })*/

        sql1 = "select * from persona";

        let result = await BD.Open(sql1, [], false);
        Users = [];

        result.rows.map(user => {
            let userSchema = {
                "idpersona": user[0],
                "nombre": user[1],
                "contraseña": user[2]

            }
            Users.push(userSchema);
        })
        console.log("Numero de filas insertadas:", result.rowsAffected);
        console.log(result.metaData);
        console.log(result.rows);
        // res.send(JSON.stringify(result.rows));
        res.status(200).json(Users);
    } catch (error) {
        res.send("error" + error);
    }

})

//UPDATE
router.put("/updateUser", async (req, res) => {
    const { codu, username, firstname, lastname } = req.body;

    sql = "update person set username=:username, firstname=:firstname, lastname=:lastname where codu=:codu";

    await BD.Open(sql, [username, firstname, lastname, codu], true);

    res.status(200).json({
        "codu": codu,
        "username": username,
        "firstname": firstname,
        "lastname": lastname
    })

})


//DELETE
router.delete("/deleteUser/:codu", async (req, res) => {
    const { codu } = req.params;

    sql = "update person set state=0 where codu=:codu";

    await BD.Open(sql, [codu], true);

    res.json({ "msg": "Usuario Eliminado" })
})

//CARGA MASIVA
var estructuracompleta;
var archivo;
router.post('/cargamasiva', (req,res)=>{
    let file = req.files.file;
    file.mv(`./files/carga/${file.name}`, err=>{
        if(err){
            return console.log("fallo");
        }
        return console.log("todo bien");
    });
    fs.readFile('./files/carga/'+file.name, "utf8", function (err, data) {
        if (err) return res.status(500).send({ message: err })


        var json = parser.toJson(data);
        archivo=data;
        console.log("to json ->", json);

        console.log("to json ->", JSON.parse(json));
        estructuracompleta = JSON.parse(json);
       // formato(estructuracompleta);
    });

});

router.post('/cargarinformacion', async function(req,res){
    console.log("estamos pensando como hacerlo....")
    const token = req.headers['authorization'];
    jwt.verify(token,'regenerando',(err,user)=> {
        if(err){
            return res.status(403).json({msg: 'No autorizado'});
        }else {
            formato(estructuracompleta);
            res.status(200).json({msg: "se cargo correctamente",user})
        }
    })
})

function formato(arreglito){
    console.log("entre");
    arreglito["departamentos"]["departamento"].forEach(element => {
        if(element["nombre"]!==undefined && element["capital_total"]!==undefined){
            console.log("nombre depto: "+element["nombre"]);
            console.log("capital tot depto: "+element["capital_total"]);
        }
        if(element["puestos"]!==undefined){
            if(element["puestos"]["puesto"]!==undefined){
                element["puestos"]["puesto"].forEach(element1 => {
                    if(element1["nombre"]!==undefined && element1["salario"]!==undefined && element1["imagen"]!==undefined){
                        console.log("nombre puesto: "+element1["nombre"]);
                        console.log("salario puesto: "+element1["salario"]);
                        console.log("imagen puesto: "+element1["imagen"]);
                    }
                    if(element1["categorias"]!==undefined){
                        if(element1["categorias"]["categoria"]!==undefined){
                            element1["categorias"]["categoria"].forEach(element2 =>{
                                if(element2["nombre"]!==undefined){
                                    console.log("nombre categoria: "+element2["nombre"]);
                                }                                
                            });
                        }
                    }
                    if(element1["requisitos"]!==undefined){
                        if(element1["requisitos"]["requisito"]!==undefined){
                            element1["requisitos"]["requisito"].forEach(element2 =>{
                                if(element2["nombre"]!==undefined){
                                    console.log("nombre requisito: "+element2["nombre"]);
                                }
                                if(element2["formatos"]!==undefined){
                                    if(element2["formatos"]["formato"]!==undefined){
                                        element2["formatos"]["formato"].forEach(element3 => {
                                            if(element3["nombre"]!==undefined){
                                                console.log("nombre formato: "+element3["nombre"]);
                                            }
                                        });
                                    }
                                }
                                if(element2["tamaño"]!==undefined){
                                    console.log("tamaño formato: "+element2["tamaño"]);
                                }
                                if(element2["obligatorio"]!==undefined){
                                    console.log("formato obligatorio: "+element2["obligatorio"]);
                                }
                            });
                        }
                    }
                });
            }
        }
        if(element["departamentos"]!==undefined){
            if(element["departamentos"]["departamento"]!==undefined){
                console.log("estoy aqui en otro depto");
                recorrer(element)
            }
        }
    });
    
}



router.post('/tokenrefresco', (req,res)=>{
    console.log("generandoTokenRefresco");
    const username = req.body.usuario;
    const user = { name: username }
    const refreshToken = generateTokenRefresco(user);              
    return res.status(200).json({refreshToken});
});

router.post('/visualizarArchivo',(req,res)=> {
    console.log("entrando a visualizar Archivo")
    const token = req.headers['authorization'];
    jwt.verify(token,'regenerando',(err,user)=> {
        if (err){
            return res.status(403).json({msg: 'No autorizado'});
        } else {
            res.status(200).json({msg: archivo})
        }
    })
})


router.get('/', async (req, res) => {

    sql = "select * from persona where nombre='susesof'";

    let result = await BD.Open(sql, [], false);
    console.log(result.rows);

    res.status(200).json({
        msg: "todo okidoki"
    })
})

router.post('/subirxml', async (req, res) => {
    let EDFile = req.files.file
    // let buffer= base64_encode(EDFile);
    console.log(EDFile)
    fs.readFile(EDFile.name, "utf8", function (err, data) {
        if (err) return res.status(500).send({ message: err })

        //---aqui se convierte en un archivo JSON pero solo texto
        var json = parser.toJson(data);
        console.log("to json ->", json);

        console.log("OBJETO\n");
        //---AHORA AQUI EL TEXTO LO VUELVO OBJETO
        console.log("to json ->", JSON.parse(json));
        let array = JSON.parse(json)
        array["taxonomy"]["page"].forEach(element => {
            console.log(element["title"])
        });
        return res.status(200).send({ message: 'File upload' })
    });
})

module.exports = router;