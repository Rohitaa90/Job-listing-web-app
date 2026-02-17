import connectDB from '@/lib/db';
import Job from '@/models/Job';

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const job = await Job.findById(id).lean();
    if (!job) {
      return Response.json({ success: false, message: 'Job not found' }, { status: 404 });
    }

    return Response.json({ success: true, data: job });
  } catch (error) {
    console.error('Error fetching job:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}