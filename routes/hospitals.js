const express = require('express');
const {getHospitals , getHospital , createHospitals , updateHospitals , deleteHospitals} = require('../controllers/hospitals');
const router = express.Router();

router.route('/').get(getHospitals).post(createHospitals);
router.route('/:id').get(getHospital).put(updateHospitals).delete(deleteHospitals);

module.exports = router;