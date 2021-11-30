const {check, body} = require("express-validator");
const {data} = require("../data/data");

let validations = [
    check("email")
        .isEmail()
        .withMessage("Debes ingresar un email."),

    body("email").custom(value => {
        let user = data.find(element => element.email === value)

        return user?false:true;
    })
    .withMessage("Email ya registrado."),

    check("name")
        .notEmpty()
        .withMessage("Debes ingresar un nombre."),

    check("pass")
        .notEmpty()
        .withMessage("Ingresa una contraseña")
        .isLength({
            min: 6,
            max: 15
        })
        .withMessage("La contraseña debe tener entre 6 y 15 caracteres."),

    body("rePass").custom((value, {req}) => {
       return value !== req.body.pass?false:true
    })
    .withMessage("Las contraseñas no coinciden.")
]

module.exports = validations