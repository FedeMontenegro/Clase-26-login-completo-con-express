function sessionMiddleware(req, res, next){
    if(req.session.user){
        next();
    }else {
        res.redirect("/users/login");
    }
}

module.exports = sessionMiddleware;