/**
 * Models
 */
const Product = require('./../models/productModel')

/**
 * Get all products
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.getAllProducts = async (req, res, next) =>{
    try{
        const products = await Product.find({});
        return res.status(200).json({
            status: 'success',
            results: products.length,
            data: {
                products
            }
        })
    }catch(e){
        return res.status(400).json({
            status: 'fail',
            error: e,
            data: {}
        })
    }
}

exports.getOneProduct = async (req, res, next)=>{
    const id = req.params.id;
    try{
        const product = await Product.findById(id).exec();
        return res.status(200).json({
            status: 'success',
            data: {
                product
            }
        })

    }catch(e){
        return res.status(400).json({
            status: 'fail',
            error: e,
            data: {}
        })
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @params { title as string, price as number, description, cateogory } required
 * @params {image as string} optional
 * @returns 
 */
exports.createProduct = async (req, res, next)=>{
    try{

        const inserted = await Product.create(req.body);
        return res.status(201).json({
            status: 'success',
            data: {
                product: inserted
            }
        })

    }catch(e){
        return res.status(400).json({
            status: 'fail',
            error: e,
            data: {}
        })
    }
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @params payload atleast 1{ title as string, price as number, description, cateogory } required
 * @params param ID
 * @returns 
 */

exports.updateProduct = async (req, res, next) => {
    try{
        await Product.findOneAndUpdate( {_id: req.params.id}, req.body ,{
            new: true,
            runValidators: true
        }).then(data=>{
            res.status(200).send({
                status: 'success',
                data: { data }
            })

        }).catch(e=>{
            throw new Error(e);
        });

    }catch(e){
        return res.status(400).json({
            status: 'fail',
            error: e,
            data: {}
        }) 
    }
}



exports.deleteRecord = async (req, res, next) =>{
    try{
        const id = req.params.id;
        const product = await Product.findByIdAndDelete({  _id: id});
        res.status(200).send({
            status: 'success',
            data: { product }
        })
    }catch(e){
        return res.status(400).json({
            status: 'fail',
            error: e,
            data: {}
        })
    }
}