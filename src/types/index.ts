export type UserRole = 'super_admin' | 'admin' | 'editor';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InstituteSettings {
  id: string;
  name: string;
  fullForm: string;
  tagline: string;
  instituteType: string;
  location: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  admissionsEmail: string;
  officeHours: string;
  socialLinks: {
    instagram: string;
    linkedin: string;
    youtube: string;
    facebook: string;
    github?: string;
    twitter?: string;
  };
  announcementBar: {
    enabled: boolean;
    text: string;
    badge: string;
    linkUrl?: string;
    linkText?: string;
  };
  heroConfig: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    titleLine2: string;
    description: string;
  };
  logoUrl?: string;
  mapEmbedUrl?: string;
}

export interface SiteStatistic {
  id: string;
  label: string;
  value: number;
  suffix: string;
  description: string;
  iconName: string;
  order: number;
}

export interface CourseModule {
  id: string;
  title: string;
  durationWeeks: number;
  description: string;
  topics: string[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: 'Software Engineering' | 'Data & AI' | 'Cloud & DevOps' | 'Cybersecurity' | 'Product & Leadership';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  mode: 'Offline' | 'Online' | 'Hybrid';
  duration: string;
  durationWeeks: number;
  fees: number;
  discountedFees?: number;
  instructorName: string;
  instructorRole: string;
  instructorAvatar?: string;
  batchTiming: string;
  startDate: string;
  availableSeats: number;
  totalSeats: number;
  isFeatured: boolean;
  isPublished: boolean;
  hasCertificate: boolean;
  brochureUrl?: string;
  thumbnailUrl: string;
  toolsAndTech: string[];
  learningOutcomes: string[];
  eligibility: string[];
  modules: CourseModule[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectContributor {
  name: string;
  role: string;
  avatarUrl?: string;
  linkedinUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: 'Full-Stack Web' | 'AI & Machine Learning' | 'Mobile Application' | 'Cloud Architecture' | 'IoT & Hardware';
  technologies: string[];
  topics?: string[];
  contributors: ProjectContributor[];
  mentorName: string;
  mentorDesignation: string;
  coverImage: string;
  galleryImages: string[];
  demoVideoUrl?: string;
  liveDemoUrl?: string;
  githubUrl?: string;
  pdfReportUrl?: string;
  zipSourceUrl?: string;
  completionDate: string;
  academicBatch: string;
  isFeatured: boolean;
  isPublished: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Faculty {
  id: string;
  name: string;
  designation: string;
  qualifications: string;
  expertise: string[];
  experienceYears: number;
  bio: string;
  photoUrl: string;
  email?: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  coursesTaught: string[];
  isFeatured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface StudentAchievement {
  id: string;
  studentName: string;
  photoUrl: string;
  achievementTitle: string;
  description: string;
  courseName: string;
  batch: string;
  companyOrOrganizer?: string;
  achievementDate: string;
  evidenceUrl?: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryItem {
  id: string;
  albumId: string;
  title: string;
  imageUrl: string;
  caption?: string;
  takenAt?: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: 'Classrooms' | 'Workshops' | 'Hackathons' | 'Convocations' | 'Campus Life';
  coverImageUrl: string;
  items: GalleryItem[];
  createdAt: string;
  updatedAt: string;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  type: 'Workshop' | 'Seminar' | 'Hackathon' | 'Webinar' | 'Announcement';
  shortDescription: string;
  fullDescription: string;
  bannerUrl: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  venue: string;
  mode: 'In-Person' | 'Online' | 'Hybrid';
  registrationUrl?: string;
  isRegistrationOpen: boolean;
  isFeatured: boolean;
  isPublished: boolean;
  speakerName?: string;
  speakerDesignation?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  studentName: string;
  photoUrl: string;
  courseName: string;
  batch: string;
  currentRole: string;
  company: string;
  rating: number;
  content: string;
  videoUrl?: string;
  isApproved: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Enquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  courseInterest: string;
  subject: string;
  message: string;
  status: 'New' | 'Contacted' | 'In-Progress' | 'Converted' | 'Closed';
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdmissionApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  qualification: string;
  selectedCourse: string;
  preferredMode: 'Offline' | 'Online' | 'Hybrid';
  preferredBatch: 'Morning' | 'Evening' | 'Weekend';
  documentUrl?: string;
  consentAgreed: boolean;
  status: 'Pending' | 'Under Review' | 'Accepted' | 'Waitlisted' | 'Rejected';
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Admissions' | 'Courses' | 'Placements' | 'General';
  order: number;
  isPublished: boolean;
}

export interface ActivityLog {
  id: string;
  userId?: string;
  userName: string;
  action: string;
  details: string;
  entityType: string;
  entityId?: string;
  createdAt: string;
}

export interface CorporateConsultation {
  id: string;
  companyName: string;
  contactPerson: string;
  designation: string;
  email: string;
  phone: string;
  companySize: "1-10" | "11-50" | "51-200" | "201-500" | "500+";
  consultationType:
    | "Corporate Training & Upskilling"
    | "Tech Architecture & AI Consulting"
    | "Campus Recruitment & Hiring"
    | "Custom Project Development";
  budgetRange?: string;
  message: string;
  status: "New" | "Contacted" | "Meeting Scheduled" | "Proposal Sent" | "Closed";
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentUser {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: "student" | "business_client";
  enrolledCourses: string[];
  avatarUrl?: string;
  createdAt: string;
}

