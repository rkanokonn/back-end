const express = require('express');
const {getAppointment } = require('../controllers/appointment');

const router = express.Router({mergeParams:true});

const {protect } = require('../middleware/auth');

router.route('/').get(protect , getAppointment);

module.exports = router;