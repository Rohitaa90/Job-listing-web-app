import JobCard from './JobCard';

export default function JobList({ jobs, selectedJob, onSelect, loading }) {
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-10 text-slate-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
                <p className="text-sm font-medium">Fetching jobs...</p>
            </div>
        );
    }

    if (jobs.length === 0) {
        return (
            <div className="p-10 text-center text-slate-400">
                <p className="text-lg font-bold">No results found.</p>
                <p className="text-sm">Try searching for a different location.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Available Openings</span>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">{jobs.length} found</span>
            </div>
            <div className="flex-grow overflow-y-auto custom-scrollbar p-3 space-y-3 bg-slate-50/30">
                {jobs.map((job) => (
                    <JobCard
                        key={job._id}
                        job={job}
                        isSelected={selectedJob?._id === job._id}
                        onClick={() => onSelect(job)}
                    />
                ))}
            </div>
        </div>
    );
}
