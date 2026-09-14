import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Building2,
  Calendar,
  Send,
} from 'lucide-react';
import { db } from '@/lib/db';
import QuickEnquiryForm from '@/components/home/QuickEnquiryForm';

export const metadata = {
  title: 'Contact YLCC | Campus Address, Phone & Counseling Desk',
  description:
    'Visit YLCC Commerce Centre in Jaipur, Rajasthan. Call, WhatsApp, or submit an admission query to speak directly with an accounting faculty counselor.',
};

export default async function ContactPage() {
  const settings = await db.getSettings();

  const phone = settings.phone || '+91 98290 12345';
  const email = settings.email || 'admissions@ylcccommerce.in';
  const whatsapp = settings.whatsapp || '+91 98290 12345';
  const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, '');
  const address =
    settings.address ||
    'YLCC Commerce Centre, 3rd Floor, Corporate Tower, Tonk Road, Jaipur, Rajasthan 302015, India';
  const officeHours =
    settings.officeHours || 'Monday – Saturday: 8:30 AM – 7:30 PM (Sunday Closed)';

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#F7F3E9] to-[#FAF7F0] pt-12 pb-16 border-b border-[#E8DFC8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8C6527] bg-[#ECE4D4] px-3 py-1 rounded-full border border-[#D4C5AD]">
            Admissions & Campus Visits
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#192538]">
            Get in Touch with YLCC
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] max-w-2xl mx-auto leading-relaxed">
            Have questions about course fees, batch schedules, or syllabus suitability? Schedule a campus visit or speak directly with our senior accounting faculty.
          </p>
        </div>
      </section>

      {/* Main Grid: Contact Info + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Coordinates & Map Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2D7C3] shadow-xs space-y-6">
              <h2 className="text-xl font-serif font-bold text-[#192538] border-b border-[#EFE8DD] pb-3">
                Institute Coordinates
              </h2>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#FAF7F0] text-[#8C6527] shrink-0 border border-[#E2D7C3]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-[#192538] block font-serif">Campus Address:</strong>
                    <p className="text-xs text-[#57534E] leading-relaxed mt-0.5">{address}</p>
                    <span className="text-[11px] text-[#8C6527] font-semibold mt-1 block">
                      Landmark: Near Tonk Road Metro Station, Jaipur
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#FAF7F0] text-[#8C6527] shrink-0 border border-[#E2D7C3]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-[#192538] block font-serif">Direct Admissions Hotline:</strong>
                    <a
                      href={`tel:${phone}`}
                      className="text-xs text-[#8C6527] font-bold hover:underline mt-0.5 block"
                    >
                      {phone}
                    </a>
                    <span className="text-[11px] text-[#78716C]">Available during office hours</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 shrink-0 border border-emerald-200">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-[#192538] block font-serif">WhatsApp Academic Support:</strong>
                    <a
                      href={`https://wa.me/${cleanWhatsapp}?text=Hi%20YLCC,%20I%20would%20like%20to%20enquire%20about%20commerce%20courses.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-700 font-bold hover:underline mt-0.5 block"
                    >
                      Chat on WhatsApp ({whatsapp})
                    </a>
                    <span className="text-[11px] text-[#78716C]">Instant syllabus PDF delivery</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#FAF7F0] text-[#8C6527] shrink-0 border border-[#E2D7C3]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-[#192538] block font-serif">Official Inquiries Email:</strong>
                    <a
                      href={`mailto:${email}`}
                      className="text-xs text-[#8C6527] font-bold hover:underline mt-0.5 block"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#FAF7F0] text-[#8C6527] shrink-0 border border-[#E2D7C3]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-[#192538] block font-serif">Office & Lab Hours:</strong>
                    <p className="text-xs text-[#57534E] mt-0.5">{officeHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Campus Location Card */}
            <div className="bg-[#192538] text-white p-6 rounded-2xl border border-[#2C3E5A] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-[#C1AF93] tracking-wider">
                  Jaipur Commerce Centre
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-900 text-emerald-200 font-bold">
                  Open for Walk-ins
                </span>
              </div>
              <h3 className="text-lg font-serif font-bold text-white">
                Visit the Accounting & Practical Lab in Person
              </h3>
              <p className="text-xs text-[#D4C5AD] leading-relaxed">
                Parents, students, and working accountants are welcome to visit our campus, inspect our accounting lab workstations, review sample project ledgers, and sit for a complimentary 1-on-1 counseling session.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-6">
            <QuickEnquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
}
