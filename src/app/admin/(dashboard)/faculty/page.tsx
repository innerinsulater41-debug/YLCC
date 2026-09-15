import React from 'react';
import { db } from '@/lib/db';
import { Award, Plus, Edit2, Trash2, Mail, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Manage Faculty Mentors | YLCC Admin',
};

export default async function AdminFacultyPage() {
  const faculty = await db.getFaculty();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B]">
          Academic Mentorship
        </span>
        <h1 className="text-2xl font-serif font-bold text-[#2A1810]">
          Chartered Accountants & Faculty Mentors
        </h1>
        <p className="text-xs text-[#57534E] mt-0.5">
          Manage faculty member profiles, qualifications, areas of expertise, and assigned courses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faculty.map((fac) => (
          <div
            key={fac.id}
            className="bg-white p-6 rounded-2xl border border-[#E5D8CA] shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#2A1810] text-white flex items-center justify-center font-serif text-lg font-bold">
                  {fac.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-[#2A1810]">{fac.name}</h3>
                  <p className="text-xs font-semibold text-[#8B5A2B]">{fac.designation}</p>
                  <p className="text-[11px] text-[#78716C]">{fac.qualifications}</p>
                </div>
              </div>

              <p className="text-xs text-[#57534E] leading-relaxed line-clamp-3">{fac.bio}</p>

              <div className="text-xs text-[#2A1810]">
                <strong className="block mb-1">Expertise:</strong>
                <div className="flex flex-wrap gap-1">
                  {fac.expertiseAreas.map((exp, i) => (
                    <span key={i} className="text-[10px] bg-[#FAF6F0] border border-[#E5D8CA] px-2 py-0.5 rounded">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#EFE6DD] flex items-center justify-between text-xs">
              <span className="text-emerald-700 font-bold">{fac.experienceYears}+ Years Experience</span>
              <span className="text-[#78716C]">{fac.programsTaught.length} Courses Assigned</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
