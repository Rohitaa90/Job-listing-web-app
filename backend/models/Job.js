const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    'Job ID (Numeric)': { type: String },
    title: { type: String },
    company: { type: String },
    location: { type: String },
    job_link: { type: String },
    employment_type: { type: String },
    experience: { type: String },
    source: { type: String },
    country: { type: String },
    postedDateTime: { type: Date },
    companyImageUrl: { type: String },
    company_url: { type: String },
    min_exp: { type: Number },
    max_exp: { type: Number },
    seniority_level: { type: String },
    companytype: { type: String },
    description: { type: String }
}, {
    timestamps: true,
    strict: false // This ensures if there are extra fields, they won't be dropped
});

module.exports = mongoose.model('Job', jobSchema);
