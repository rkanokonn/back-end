// get all
exports.getHospitals=(req ,res,next)=>{
    res.status(200).json({success:true , msg:'Show all hospitals'})
};

// get by id
exports.getHospital=(req ,res,next)=>{
    res.status(200).json({success:true , msg:`Show hospital ${req.params.id}`})
};

// post
exports.createHospitals=(req ,res,next)=>{
    res.status(200).json({success:true , msg:'Create new hospitals'})
};

// put
exports.updateHospitals=(req ,res,next)=>{
    res.status(200).json({success:true , msg:`Update hospital ${req.params.id}`})
};

// delete
exports.deleteHospitals=(req ,res,next)=>{
    res.status(200).json({success:true , msg:`Delete hospital ${req.params.id}`})
};