const express = require('express');
const router = express.Router();
const { getCourses, getCourseById } = require('../controllers/courseController');

router.route('/').get(getCourses);
router.route('/:id').get(getCourseById);

module.exports = router;
