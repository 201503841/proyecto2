const bodyParser = require('body-parser');
const { Router } = require('express');
const router = Router();
fs = require('fs');
const BD = require('../config/configbd');
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());
var parser= require('xml2json');


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

        Users.push(userSchema);
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

    await BD.Open(sql, [username, firstname, lastname,codu], true);

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

router.get('/', async (req, res) => {

    sql= "select * from usuario where nombre='kevin'";

    let result =await BD.Open(sql, [],false);
    console.log(result);

    res.status(200).json({
        msg:"todo okidoki"
    })
})

router.post('/subirxml',async (req,res) => {
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