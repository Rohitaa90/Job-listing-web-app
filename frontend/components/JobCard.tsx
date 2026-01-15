'use client';

export default function JobCard({ job, isSelected, onClick }) {
    const initial = job.company ? job.company.charAt(0).toUpperCase() : 'J';

    return (
        <div
            onClick={onClick}
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${isSelected
                    ? 'bg-white border-indigo-600 shadow-md transform scale-[1.01]'
                    : 'bg-white border-slate-100 hover:border-indigo-100'
                }`}
        >
            <div className="flex gap-4">
                <div className="flex-shrink-0">
                    {job.companyImageUrl ? (
                        <img
                            src={job.companyImageUrl}
                            alt={job.company}
                            className="w-12 h-12 rounded-lg object-contain bg-white border border-slate-100"
                            onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
                        />
                    ) : null}
                    <div className="w-12 h-12 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold flex items-center justify-center" style={{ display: job.companyImageUrl ? 'none' : 'flex' }}>
                        {initial}
                    </div>
                </div>
                <div className="flex-grow min-w-0">
                    <h3 className="font-bold text-sm text-slate-900 truncate">{job.title}</h3>
                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-tight truncate">{job.company}</p>
                    <div className="mt-2 flex gap-2">
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">📍 {job.location?.split(',')[0]}</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">💼 {job.experience}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
