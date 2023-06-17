const Tag = require('../models/tags');

//create Tag ka handler function 
exports.createTage = async (req, res) => {
    try{
        //fetch data from request body 
        const {name, description} = req.body;

        // validation
        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        const tagDetails = await Tag.create({
            name:name,
            description:description,
        })
        console.log(tagDetails);

        //return response 
        return res.status(200).json({
            success:true,
            message: 'Tag created successfully',
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message ,
        })
    }
}

//get all tags ka handler function
exports.showAllTags = async (req, res) => {
    try{
        const allTags = await Tag.find({},{name:true , description:true});
        return res.status(200).json({
            success:true,
            message: 'All tags',
            allTags,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message ,
        })
    }
}