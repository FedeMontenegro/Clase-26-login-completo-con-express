let path = require("path")
const { data } = require('../data/data');
module.exports = {
    home: (req, res)=> {
        let user = req.session.user;
        console.log(user)
        /* if(req.session.user){
            user = data.filter(element = element.email === req.session.user);
            console.log(user)
        } */
        res.render(path.join(__dirname, "../../src/views/home"), {title: "home", user})
    }
}