const Appointment = require('../models/Appointment');

exports.getAppointment=async( req , res ,next)=>{

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
            console.log("🚀 ~ res.status ~ appointments:", appointments)
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({
            success:false,
            message : "Cannot find Appointment"
        })
    };
}