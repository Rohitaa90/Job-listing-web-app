const Job = require('../models/Job');

const getJobs = async (req, res) => {
    try {
        const { location } = req.query;
        let filter = {};

        if (location && location.trim() !== '') {
            filter.location = { $regex: location, $options: 'i' };
        }

        const jobs = await Job.find(filter)
            .sort({ postedDateTime: -1 })
            .limit(100)
            .lean();

        const cleanedJobs = jobs.map(job => ({
            _id: job._id,
            id: job['Job ID (Numeric)'] || 'N/A',
            title: job.title || 'Untitled Role',
            company: job.company || 'Unknown Company',
            location: job.location || 'India',
            description: job.description || '',
            employment_type: job.employment_type || 'Full-time',
            experience: job.experience || 'Not Specified',
            source: job.source || 'Direct',
            country: job.country || 'India',
            postedDateTime: job.postedDateTime,
            companyImageUrl: job.companyImageUrl || null,
            company_url: job.company_url || job.job_link || '#',
            job_link: job.job_link || '#'
        }));

        res.json({
            success: true,
            count: cleanedJobs.length,
            data: cleanedJobs
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).lean();
        if (!job) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, data: job });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getJobs,
    getJobById
};
