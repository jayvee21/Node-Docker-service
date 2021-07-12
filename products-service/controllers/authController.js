/**
 * Models
 */

const User = require('./../models/UserModel');

exports.signUp = async (req, res) => {
    try{
        const newUser = User.create(req.body);
        return res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
        
    }catch(e){
        return res.status(400).json({
            status: 'fail',
            error: e,
            data: {}
        })
    }
}