import connectDB from '@/lib/db';
import Job from '@/models/Job';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');

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

    return Response.json({
      success: true,
      count: cleanedJobs.length,
      data: cleanedJobs
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}