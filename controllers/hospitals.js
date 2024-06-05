const Hospital = require("../models/Hospital");


// get all
exports.getHospitals=async (req ,res,next)=>{
    try {
        const hospitals = await query;
        res.status(200).json({
            success:true , 
            count:hospitals.length,
            data: hospitals
        });
    } catch (err) {
        console.log(err.stack);
        res.status(400).json({success:false})
    };
};

// get by id
exports.getHospital= async (req ,res,next)=>{
    try {
        const hospital = await Hospital.findById(req.params.id);
        
        if (!hospital) {
            return res.status(400).json({success:false})
        }
        res.status(200).json({
            success:true ,
            data: hospital
        });
    } catch (err) {
        console.log(err.stack);
        res.status(400).json({success:false})
    };
};

// post
exports.createHospital=async (req ,res,next)=>{
    const hospital = await Hospital.create(req.body);
    res.status(200).json({
        success:true , 
        data:hospital})
};

// put
exports.updateHospital=async(req ,res,next)=>{
    try {
        const hospital = await Hospital.findByIdAndUpdate(req.params.id , req.body ,{
            new: true,
            runValidators:true
    });
        if (!hospital) {
            return res.status(400).json({success:false})
        }
        res.status(200).json({
            success:true ,
            data: hospital
        });
    } catch (err) {
        console.log(err.stack);
        res.status(400).json({success:false})
    };
};

// delete
exports.deleteHospital=async (req ,res,next)=>{
    try {
        const hospital = await Hospital.findByIdAndDelete(req.params.id);
        if (!hospital) {
            return res.status(400).json({success:false})
        }
        res.status(200).json({
            success:true ,
            data: {}
        });
    } catch (err) {
        console.log(err.stack);
        res.status(400).json({success:false})
    };
};