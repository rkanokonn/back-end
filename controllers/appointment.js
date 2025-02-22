const Appointment = require('../models/Appointment');
const Hospital = require('../models/Hospital');

// get all
exports.getAppointments=async( req , res ,next)=>{

    let query;

    if (req.user.role !== 'admin') {
        query = Appointment.find({user:req.user.id}).populate({
            path:'hospital',
            select:'name province tel'
            });
        console.log(Appointment.find , 'user');
        console.log(query.user , 'user');


    } else {
        
        if(req.params.hospitalId){
            query = Appointment.find({ hospital: req.params.hospitalId}).populate({
                path:'hospital',
                select:'name province tel'
                });

        }else{
            query = Appointment.find().populate({
                path:'hospital',
                select:'name province tel'
                })
        }
    }
    try {
        const appointments = await query;

        res.status(200).json({
            success:true , 
            count:appointments.length,
            data: appointments
            
        });

    } catch (err) {
        console.log(err.stack);
        res.status(500).json({
            success:false,
            message : "Cannot find Appointment"
        })
    };
}

// get single
exports.getAppointment=async( req , res ,next)=>{

    try {
        const appointment = await Appointment.findById(req.params.id).populate({
            path:'hospital',
            select:'name province tel'
        });

        if(!appointment){
            res.status(404).json({
                success:false,
                message : `No appointment with the id of ${req.params.id}`
            })
        }

        res.status(200).json({
            success:true , 
            data: appointment
            
        });

    } catch (err) {
        console.log(err.stack);
        res.status(500).json({
            success:false,
            message : "Cannot find Appointment"
        })
    };
}

// add appointment
exports.createAppointment=async(req,res,next)=>{
    try {
        req.body.hospital = req.params.hospitalId;

        req.body.user = req.user.id;

        console.log("Find Existed Appt...");

        const existedAppointment = await Appointment.find({user : req.user.id});

        if(existedAppointment.length >= 3 && req.user.role !== 'admin'){
            return res.status(400).json({
                success:false,
                message : `The user with ID ${req.user.id} has already made 3 appointments`
            });
        }

        console.log("Create Appointment...");
        console.log(req.body);

        const appointment = await Appointment.create(req.body);

        
        console.log(appointment);

        res.status(200).json({
            success:true , 
            data: appointment
            
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message : "Cannot create Appointment"
        })
    }
}

// update appointment
exports.updateAppointment=async(req,res,next)=>{
    try {

        let appointment = await Appointment.findById(req.params.id);

        if(appointment.user.toString != req.user.id && req.user.role !== 'admin'){
            res.status(401).json({
                success:false,
                message : `User ${req.user.id} is not authrized to update this appointment`
            });
        }
        appointment = await Appointment.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators:true
        });

        res.status(200).json({
            success:true , 
            data: appointment
            
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message : "Cannot update Appointment"
        })
    }
}

// delete appointment
exports.deleteAppointment=async(req,res,next)=>{
    try {

        const appointment = await Appointment.findById(req.params.id);

        if(appointment.user.toString != req.user.id && req.user.role !== 'admin'){
            res.status(401).json({
                success:false,
                message : `User ${req.user.id} is not authrized to update this appointment`
            });
        }
        await appointment.deleteOne();

        res.status(200).json({
            success:true , 
            data: {}
            
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message : "Cannot delete Appointment"
        })
    }
}