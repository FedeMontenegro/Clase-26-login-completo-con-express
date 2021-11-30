const {check, body} = require("express-validator");
const {data} = require("../data/data");
const bcrypt = require("bcryptjs");

let validations = [
    check("email")
        .isEmail()
        .withMessage("Debes ingresar un mail válido."),

    body("email").custom( value => {
        let user = data.find(element => element.email === value);
        return user?true:false;
    })
    .withMessage("Este email no está registrado."),
    
    body("password", "Las contraseñas no coinciden").custom((value, {req}) => {
        let user = data.find(element => element.email === req.body.email);
        console.log("validator: " + user.email);
        console.log(bcrypt.compareSync(req.body.pass, user.password));
        if(!bcrypt.compareSync(req.body.pass, user.password)){
            return false;
        };
        return true;
    })
]

module.exports = validations;