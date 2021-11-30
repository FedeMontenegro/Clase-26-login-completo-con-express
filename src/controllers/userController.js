let path = require("path");
const { data, writeDataJSON } = require('../data/data');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

module.exports = {
    login: (req, res)=> {
        res.render("login", {title: "Login"});
    },
    loginProcess: (req, res)=> {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            try {
                let user = data.find(element => element.email === req.body.email);
                req.session.user = {
                    name: user.name,
                    email: user.email,
                    rol: user.rol
                };
                req.session.email = user.email;
                res.cookie("cookieSeniora", req.session.user, {
                    expires: new Date(Date.now() + 9000000),
                    httpOnly: true,
                    secure: true
                });

                //res.locals.user = req.session.user;
                res.redirect("/")
                
            } catch (error) {
                res.send(error)
            }
        }else {
            res.send(errors);
        }
    },
    register: (req, res)=> {
        res.render("register", {title: "Register"});
    },
    registerProcess: (req, res)=>{
        let errors = validationResult(req);
        let newId = 0;
        console.log(errors)
        if(errors.isEmpty()){
            data.forEach(element => {
                if(element.id > newId){
                    newId = element.id;
                }
            });

            newId++;

            let {
                name,
                email,
                pass,
                rePass
            } = req.body;


            let user = {
                id: newId,
                name,
                email,
                password: bcrypt.hashSync(pass),
                rol: "ROL_USER"
            };

            data.push(user);
            writeDataJSON(data);
            
            res.redirect("users/login");
        }else {
            res.send(errors);
        }
    },
    destroySession: (req, res)=> {
        req.session.destroy();
        if(req.cookies.cookieSeniora){
            res.cookie("cookieSeniora", "", {maxAge: -1})
        }
        res.redirect("/users/end")
    },
    end: (req, res)=> {
        res.render("end", {title: "End"});
    }
}