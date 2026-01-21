const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'fas fa-book' },
    level: { type: String, required: true }, // e.g., 'Beginner'
    lessons: [{
        title: { type: String },
        content: { type: String },
        videoSignUrl: { type: String } // Optional: URL for custom sign video
    }]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
