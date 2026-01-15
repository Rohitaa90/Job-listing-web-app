'use client';

import { useState } from 'react';

export default function SearchBar({ onSearch }) {
    const [val, setVal] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(val);
    };

    return (
        <form onSubmit={handleSearch} className="flex gap-3 max-w-2xl mx-auto lg:mx-0">
            <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    placeholder="Filter by location (e.g. Bengaluru, Remote...)"
                    className="block w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all"
                />
            </div>
            <button
                type="submit"
                className="px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-md active:scale-95"
            >
                Search
            </button>
        </form>
    );
}
