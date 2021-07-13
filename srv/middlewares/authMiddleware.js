const protect = async function(req, res, next){
    const {user} = req.session;
    if(!user){
        res.status(401).send({
            status: 'fail',
            message: 'Unauthorized'
        });
    }

    req.user = user;
    next();

}

module.exports = protect;