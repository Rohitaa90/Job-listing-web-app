'use client';

export default function JobDetails({ job, loading }) {
    if (loading) return (
        <div className="h-full flex items-center justify-center p-10"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div></div>
    );

    if (!job) return (
        <div className="h-full flex items-center justify-center p-10 text-slate-400 font-bold">
            Select a job listing to see details
        </div>
    );

    // Directly using job.id which is now correctly mapped by backend
    const details = [
        { label: 'Job ID', value: job.id, icon: '🆔' },
        { label: 'Location', value: job.location, icon: '📍' },
        { label: 'Experience', value: job.experience, icon: '💼' },
        { label: 'Employment', value: job.employment_type, icon: '⏱️' },
        { label: 'Country', value: job.country, icon: '🌍' },
        { label: 'Source', value: job.source, icon: '🔗' },
        { label: 'Posted Date', value: job.postedDateTime ? new Date(job.postedDateTime).toLocaleDateString() : 'Recent', icon: '📅' },
        { label: 'Salary', value: 'As per Industry', icon: '💰' },
    ];

    const initial = job.company?.[0]?.toUpperCase() || 'J';

    return (
        <div className="h-full flex flex-col bg-white overflow-hidden">
            {/* Premium Header */}
            <div className="p-8 border-b border-slate-100 bg-slate-50/20">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                    <div className="flex-shrink-0">
                        <div className="relative group">
                            {job.companyImageUrl ? (
                                <img
                                    src={job.companyImageUrl}
                                    className="w-24 h-24 rounded-3xl bg-white border-2 border-slate-100 shadow-sm object-contain p-4 transition-transform group-hover:scale-105"
                                    alt={job.company}
                                    onError={(e) => { e.currentTarget.style.display = 'none'; (e.currentTarget.nextSibling as HTMLElement).style.display = 'flex'; }}
                                />
                            ) : null}
                            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-black text-4xl items-center justify-center shadow-lg shadow-indigo-100" style={{ display: job.companyImageUrl ? 'none' : 'flex' }}>
                                {initial}
                            </div>
                        </div>
                    </div>
                    <div className="flex-grow">
                        <h1 className="text-3xl font-black text-slate-900 leading-tight mb-2 tracking-tight">{job.title}</h1>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                            <span className="text-xl font-bold text-indigo-600">{job.company}</span>
                            <span className="h-5 w-px bg-slate-200 hidden md:block"></span>
                            <span className="text-xs font-black text-slate-500 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">{job.source} Verified</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-grow p-8 overflow-y-auto custom-scrollbar">
                {/* Info Grid - Fixed Alignment */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {details.map((d) => (
                        <div key={d.label} className="bg-slate-50/50 border border-slate-100 p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all group">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-indigo-400">{d.label}</p>
                            <p className="text-sm font-black text-slate-800 break-words">{d.icon} {d.value}</p>
                        </div>
                    ))}
                </div>

                {/* Detailed Section */}
                <div className="mb-10">
                    <h2 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm italic">i</span>
                        Role Description
                    </h2>
                    <div className="text-slate-600 leading-relaxed text-sm">
                        {job.description ? (
                            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm leading-8 text-slate-700">
                                {job.description}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-6 bg-indigo-50/30 rounded-3xl border border-indigo-100/50">
                                    <p className="font-black text-indigo-900 text-sm mb-2 uppercase tracking-wide">💼 Career Opportunity</p>
                                    <p className="text-slate-600 text-xs leading-relaxed">Exciting opening for a <strong>{job.title}</strong> at <strong>{job.company}</strong>. This is a <strong>{job.employment_type}</strong> role suitable for candidates with <strong>{job.experience}</strong> experience.</p>
                                </div>
                                <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100/50">
                                    <p className="font-black text-slate-900 text-sm mb-2 uppercase tracking-wide">📍 Remote/Work-Life</p>
                                    <p className="text-slate-600 text-xs leading-relaxed">Primary work location is <strong>{job.location}</strong>. Benefit from a professional culture and verified employment via <strong>{job.source}</strong>.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Primary Action Button */}
            <div className="p-8 border-t border-slate-100 bg-white">
                <a
                    href={job.job_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-4 bg-indigo-600 hover:bg-slate-900 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-100 hover:-translate-y-1 active:scale-95 text-sm tracking-widest uppercase"
                >
                    Proceed to {job.source?.toUpperCase() || 'EXTERNAL'} PORTAL 🚀
                </a>
            </div>
        </div>
    );
}
