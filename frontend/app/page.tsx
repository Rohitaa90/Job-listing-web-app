'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import JobList from '@/components/JobList';
import JobDetails from '@/components/JobDetails';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);


  // Use the environment variable, but ensure it doesn't have a trailing slash
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

  const fetchJobs = async (location = '') => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/jobs?location=${location}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      if (data.success) {
        setJobs(data.data);
        if (data.data.length > 0) setSelectedJob(data.data[0]);
        else setSelectedJob(null);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <Navbar />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-8">
          <SearchBar onSearch={(loc: string) => fetchJobs(loc)} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-280px)] min-h-[600px]">
          <section className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
            <JobList
              jobs={jobs}
              selectedJob={selectedJob}
              onSelect={setSelectedJob}
              loading={loading}
            />
          </section>

          <section className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden sticky top-24">
            <JobDetails job={selectedJob} loading={loading} />
          </section>
        </div>
      </main>

      <footer className="py-6 border-t border-slate-200 bg-white text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
        &copy; 2026 Mployee.me • Built for Technical Assessment
      </footer>
    </div>
  );
}
