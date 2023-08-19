const Category = require("../models/Category");

//create Tag ka handler function 
exports.createCategory = async (req, res) => {
    try{
        //fetch data from request body 
        const {name, description} = req.body;

        // validation
        if(!name ){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        const categoryDetails = await Category.create({
            name:name,
            description:description,
        })
        console.log(categoryDetails);

        //return response 
        return res.status(200).json({
            success:true,
            message: 'Categorys created successfully',
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
exports.showAllCategories = async (req, res) => {
    try{
        const allCategorys = await Category.find({});
        return res.status(200).json({
            success:true,
            message: 'All tags',
            allCategorys,
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
//Category Page details 
exports.categoryPageDetails = async (req,res) => {
    try {
        //get categoryId
        const {categoryId} = req.body;
        //get courses for specified categoryId
        const selectedCategory = await Category.findById(categoryId)
                                        .populate("courses")
                                        .exec();
        //validation
        if(!selectedCategory) {
            return res.status(404).json({
                success:false,
                message:'Data Not Found',
            });
        }
        //get coursesfor different categories
        const differentCategories = await Category.find({
                                     _id: {$ne: categoryId},//ne ka matlab not equal 
                                     })
                                     .populate("courses")
                                     .exec();

        //get top 10 selling courses
        //HW - write it on your own

        //return response
        return res.status(200).json({
            success:true,
            data: {
                selectedCategory,
                differentCategories,
            },
        });

      }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}