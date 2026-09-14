import { DataStore } from "@/lib/db/store";
import PublicLayout from "@/components/layout/PublicLayout";
import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import PopularCourses from "@/components/home/PopularCourses";
import WhyChooseYLCC from "@/components/home/WhyChooseYLCC";
import LearningJourney from "@/components/home/LearningJourney";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import FacultySpotlight from "@/components/home/FacultySpotlight";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import EventsPreview from "@/components/home/EventsPreview";
import FAQAccordion from "@/components/home/FAQAccordion";
import EnquiryCTA from "@/components/home/EnquiryCTA";

export default async function HomePage() {
  const [settings, statistics, courses, projects, faculty, testimonials, events, faqs] =
    await Promise.all([
      DataStore.getSettings(),
      DataStore.getStatistics(),
      DataStore.getCourses(false),
      DataStore.getProjects(false),
      DataStore.getFaculty(),
      DataStore.getTestimonials(true),
      DataStore.getEvents(false),
      DataStore.getFAQs(),
    ]);

  return (
    <PublicLayout>
      <HeroSection heroConfig={settings.heroConfig} />
      <StatsBar statistics={statistics} />
      <PopularCourses courses={courses} />
      <WhyChooseYLCC />
      <LearningJourney />
      <FeaturedProjects projects={projects} />
      <FacultySpotlight faculty={faculty} />
      <TestimonialsSection testimonials={testimonials} />
      <EventsPreview events={events} />
      <FAQAccordion faqs={faqs} />
      <EnquiryCTA />
    </PublicLayout>
  );
}
