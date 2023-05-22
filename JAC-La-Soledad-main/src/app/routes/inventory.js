const { createPool } = require('mysql');
const app = require('../../config/server')
const pool = require('../../config/db');
const { connect } = require('../../config/server');
const e = require('express');

var datos_usuario;

module.exports = app => {
    app.get('/', (req, res) => {
        /*pool.query('SELECT * FROM users', (err, result) => {
            console.log(result);
            res.render("../views/index.ejs", {
                inventario: result

            })
        })*/
        if(req.session.loggedin){
            res.render("../views/index.ejs")
        }else{
            res.render("../views/login.ejs")
        }
    })
    app.get('/logout', (req, res) => {
       req.session.destroy(()=>{
           res.redirect("/")
       })
    })
    app.get('/registro', (req, res) => {
        res.render('../views/registro.ejs')
    })
    app.get('/index', (req, res) => {
        res.render('db/registro')
    })

    app.post('/registro', async(req, res) => {
        const { nombre, apellido, correo, telefono, pass, grupo, } = req.body;

        /*console.log(req.body);*/

        const newUser = {
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            telefono: telefono,
            pass: pass,
            grupo: grupo
        };

        pool.query('INSERT INTO usuarios set ?', newUser, (err, results) => {
            if (err) {
              console.log(err);
            } else {
              res.redirect("/");
            }
          });

        //res.send(` Insertado el usuario: ${newUser.nombre}`);
    })

    app.post('/login', (req,res) => {
        const {email,password} = req.body
        if(email && password){
            pool.query('SELECT * FROM usuarios WHERE correo = ?', [email], async (error,result) => {
                if(result.length === 0 || !(password === result[0].pass)){
                    
                    res.redirect("/")
                }else
                {
                    datos_usuario=result[0];
                   // console.log(datos_usuario);
                    req.session.loggedin=true; 
                    req.session.name=result[0].nombre 
                    res.redirect("/")
                    
                }
            })
        }
    });

    //pides los datos a la base de datos (Del titulo y del contenido del blog)
    //res.render('adulto mayor.ejs',{titulo: titulo(Traida de la base de datos), contenido})

    app.post('/contactanos', (req,res) => {
        const {inputName,inputEmail,inputPhone,inputMessage} = req.body
        pool.query('INSERT INTO contactanos SET ?', {
            nombre_completo: inputName,
            correo: inputEmail,
            telefono: inputPhone,
            mensaje: inputMessage
        },(err, result)=> {
            if(err) {
                console.log(err);
            }else{
                res.redirect('/')
            }
        });
        
    });
    app.post('/Unirme', (req,res) => {
        const {inputName,inputEmail,inputGrupo} = req.body
        pool.query('INSERT INTO grupo SET ?', {
            nombre_completo: inputName,
            correo: inputEmail,
            grupo: inputGrupo
        },(err, result)=> {
            if(err) {
                console.log(err);
            }else{
                res.redirect('/')
            }
        });
    });


    app.post("/AdultoMayor", (req, res) =>{
        let id_usuario= req.session.id;
        let id_grupo = req.param.id;

       // console.log(id_usuario, id_usuario);

        connect.query("INSERT INTO r_usuarios_grupo SET ?",{
            id_usuario:id_usuario,
            id_grupo: id_grupo,
        },
            (error, result) =>{
                if(error, result){
                    console.log("Error: "+ error);
                }else{
                    res.redirect("/AdultoMayor");
                }
            }
        )
    })


    app.get("/AdultoMayor", (req, res) => {
        res.render("../views/post/AdultoMayor.ejs");
    });
    app.get("/Baile", (req, res) => {
        res.render("../views/post/Baile.ejs");
    });
    app.get("/BuenComienzo", (req, res) => {
        res.render("../views/post/BuenComienzo.ejs");
    });
    app.get("/Manualidades", (req, res) => {
        res.render("../views/post/Manualidades.ejs");
    });
    app.get("/SinLimites", (req, res) => {
        res.render("../views/post/SinLimites.ejs");
    });
    app.get("/Telecentro", (req, res) => {
        res.render("../views/post/Telecentro.ejs");
    });
}
