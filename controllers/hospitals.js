const Hospital = require("../models/Hospital");

// get all
exports.getHospitals= async (req ,res,next) =>{
    try {
        let query;
        const reqQuery = {...req.query};

        const removeField=['select','sort' , 'page','limit'];

        removeField.forEach(param=>delete reqQuery[param]);
        console.log(reqQuery);

        let queryStr = JSON.stringify(req.query);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match =>`$${match}`);

        query = Hospital.find(JSON.parse(queryStr)).populate('appointments');
        //select
        if(req.query.select){
            const fields = req.query.select.split(',').join(' ');
            query = query.select(fields);   
        }
        
        
        //sort
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }else{
            query = query.sort('-createdAt');
        }

        //pagination
        const page = parseInt(req.query.page,10) || 1;
        const limit = parseInt(req.query.limit,10) || 25;
        const startIndex = (page-1)*limit;
        const endIndex = page*limit;
        const total = await Hospital.countDocuments();

        query=query.skip(startIndex).limit(limit);

        const hospitals = await query;

        const pagination = {};

        if(endIndex<total){
            pagination.next={
                page:page+1,
                limit
            }
        }

        if(endIndex>0){
            pagination.prev={
                page:page-1,
                limit
            }
        }

        res.status(200).json({
            success:true , 
            count:hospitals.length, pagination,
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
        const hospitals = await Hospital.findById(req.params.id);

        if (!hospitals) { 
            return res.status(400).json({success:false})
        }
        await hospitals.deleteOne();
        res.status(200).json({ success:true ,data: {} });

    } catch (err) {
        console.log(err.stack);
        res.status(400).json({success:false})
    };
};