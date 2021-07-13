/**
 * Models
 */

const User = require('./../models/UserModel');
const bcrypt = require('bcryptjs');

exports.signUp = async (req, res) => {
    try{
        const{username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            username,
            password: hashedPassword
        });
        req.session.user = newUser;
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


exports.login = async (req, res) => {
    try{
        const{username, password} = req.body;
        const user = await User.findOne({ username });
        if(!user){
            return res.status(400).json({
                status: 'fail',
                error: 'User not found'
            });
        }

        const isCorrect = await bcrypt.compare( password, user.password );
        if( isCorrect ){
            req.session.user = user;
            return res.status(200).json({
                status: 'success'
            })
        }else{
            return res.status(400).json({
                status: 'fail',
                error: 'Password did not match.'
            })
        }

    }catch(e){
        console.log(e)
        return res.status(400).json({
            status: 'fail',
            error: e,
            data: {}
        })
    }
}