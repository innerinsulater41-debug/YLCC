import PublicLayout from "@/components/layout/PublicLayout";
import { DataStore } from "@/lib/db/store";
import { Award, Sparkles, Calendar, Building2, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function AchievementsPage() {
  const achievements = await DataStore.getAchievements();

  return (
    <PublicLayout>
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white border-b border-slate-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Hall of Fame & Placements</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Celebrating Exceptional Student Milestones
          </h1>
          <p className="text-slate-300 text-base leading-relaxed">
            From national hackathon championships and tier-1 tech placements to open-source contributions used by thousands of developers.
          </p>
        </div>
      </section>

      {/* Achievements Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs card-hover flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.photoUrl}
                    alt={item.studentName}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {item.studentName}
                    </h3>
                    <div className="text-xs text-blue-600 font-semibold">
                      {item.courseName}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {item.batch}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-slate-900 leading-snug">
                    {item.achievementTitle}
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{formatDate(item.achievementDate)}</span>
                </div>

                {item.companyOrOrganizer && (
                  <div className="font-semibold text-slate-700">
                    {item.companyOrOrganizer}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
