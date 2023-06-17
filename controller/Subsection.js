const SubSection = require('../models/SubSection');
const Section = require('../models/Section');

exports.Subsection = async (req,res) =>{
    try{
        const {title , timeDuration , description , videoUrl , sectionId} = req.body;
        if(!name || !timeDuration || !description || !videoUrl || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            })
        }
        //42:37
    }
    catch(error){}
}