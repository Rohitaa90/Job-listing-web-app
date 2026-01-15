const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Job = require('./models/Job');

dotenv.config();

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        // Read JSON file
        const jobsData = JSON.parse(
            fs.readFileSync('../Mployee.me Task Data.json', 'utf-8')
        );

        console.log(`Total jobs in file: ${jobsData.length}`);

        // Clear existing data
        await Job.deleteMany();
        console.log('Existing data cleared');

        // Process data in batches to avoid memory issues
        const batchSize = 1000;
        let imported = 0;

        for (let i = 0; i < jobsData.length; i += batchSize) {
            const batch = jobsData.slice(i, i + batchSize);

            // Clean data - convert $date objects to Date
            const cleanedBatch = batch.map(job => ({
                ...job,
                postedDateTime: job.postedDateTime?.$date
                    ? new Date(job.postedDateTime.$date)
                    : job.postedDateTime
            }));

            await Job.insertMany(cleanedBatch, { ordered: false });
            imported += cleanedBatch.length;
            console.log(`Imported ${imported} / ${jobsData.length} jobs`);
        }

        console.log(`✅ Successfully imported ${imported} jobs!`);
        process.exit();
    } catch (error) {
        console.error('Error importing data:', error.message);
        process.exit(1);
    }
};

importData();
