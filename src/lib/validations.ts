import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const EnquirySchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\s()-]+$/, "Invalid phone number format"),
  courseInterest: z.string().min(1, "Please select or enter a course of interest"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const ApplicationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\s()-]+$/, "Invalid phone number format"),
  dateOfBirth: z.string().min(1, "Please provide date of birth"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  qualification: z.string().min(2, "Please specify your qualification"),
  selectedCourse: z.string().min(1, "Please select a course"),
  preferredMode: z.enum(["Offline", "Online", "Hybrid"]),
  preferredBatch: z.enum(["Morning", "Evening", "Weekend"]),
  documentUrl: z.string().optional(),
  consentAgreed: z.boolean().refine((val) => val === true, "You must agree to the terms"),
});

export const CourseModuleSchema = z.object({
  id: z.string().default(() => "mod-" + Math.random().toString(36).substring(2, 8)),
  title: z.string().min(2, "Module title is required"),
  durationWeeks: z.coerce.number().min(1, "Duration must be at least 1 week"),
  description: z.string().min(5, "Description is required"),
  topics: z.array(z.string()).min(1, "At least one topic is required"),
});

export const CourseSchema = z.object({
  title: z.string().min(3, "Course title is required"),
  slug: z.string().min(2, "Slug is required"),
  shortDescription: z.string().min(10, "Short description must be at least 10 characters"),
  fullDescription: z.string().min(20, "Full description must be at least 20 characters"),
  category: z.enum([
    "Software Engineering",
    "Data & AI",
    "Cloud & DevOps",
    "Cybersecurity",
    "Product & Leadership",
  ]),
  level: z.enum(["Beginner", "Intermediate", "Advanced", "All Levels"]),
  mode: z.enum(["Offline", "Online", "Hybrid"]),
  duration: z.string().min(1, "Duration string is required (e.g. 16 Weeks)"),
  durationWeeks: z.coerce.number().min(1, "Duration in weeks is required"),
  fees: z.coerce.number().min(0, "Fees must be a positive number"),
  discountedFees: z.coerce.number().optional(),
  instructorName: z.string().min(2, "Instructor name is required"),
  instructorRole: z.string().min(2, "Instructor role is required"),
  instructorAvatar: z.string().optional(),
  batchTiming: z.string().min(2, "Batch timing is required"),
  startDate: z.string().min(1, "Start date is required"),
  availableSeats: z.coerce.number().min(0, "Seats must be >= 0"),
  totalSeats: z.coerce.number().min(1, "Total seats must be >= 1"),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  hasCertificate: z.boolean().default(true),
  brochureUrl: z.string().optional(),
  thumbnailUrl: z.string().min(1, "Course thumbnail is required"),
  toolsAndTech: z.array(z.string()).min(1, "At least one tool or technology is required"),
  learningOutcomes: z.array(z.string()).min(1, "At least one learning outcome is required"),
  eligibility: z.array(z.string()).min(1, "At least one eligibility criterion is required"),
  modules: z.array(CourseModuleSchema).min(1, "At least one syllabus module is required"),
});

export const ProjectSchema = z.object({
  title: z.string().min(3, "Project title is required"),
  slug: z.string().min(2, "Slug is required"),
  shortDescription: z.string().min(10, "Short description must be at least 10 characters"),
  fullDescription: z.string().min(20, "Detailed description is required"),
  category: z.enum([
    "Full-Stack Web",
    "AI & Machine Learning",
    "Mobile Application",
    "Cloud Architecture",
    "IoT & Hardware",
  ]),
  technologies: z.array(z.string()).min(1, "Select or enter at least one technology"),
  topics: z.array(z.string()).default([]),
  contributors: z.array(
    z.object({
      name: z.string().min(1, "Contributor name is required"),
      role: z.string().min(1, "Contributor role is required"),
      avatarUrl: z.string().optional(),
      linkedinUrl: z.string().optional(),
    })
  ).min(1, "At least one contributor is required"),
  mentorName: z.string().min(2, "Mentor name is required"),
  mentorDesignation: z.string().min(2, "Mentor designation is required"),
  coverImage: z.string().min(1, "Cover image is required"),
  galleryImages: z.array(z.string()).default([]),
  demoVideoUrl: z.string().optional(),
  liveDemoUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  pdfReportUrl: z.string().optional(),
  zipSourceUrl: z.string().optional(),
  completionDate: z.string().min(1, "Completion date is required"),
  academicBatch: z.string().min(2, "Academic batch is required (e.g. Batch 2025-26)"),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const FacultySchema = z.object({
  name: z.string().min(2, "Faculty name is required"),
  designation: z.string().min(2, "Designation is required"),
  qualifications: z.string().min(2, "Qualifications are required"),
  expertise: z.array(z.string()).min(1, "At least one area of expertise is required"),
  experienceYears: z.coerce.number().min(0, "Experience years must be >= 0"),
  bio: z.string().min(20, "Bio must be at least 20 characters"),
  photoUrl: z.string().min(1, "Photo URL is required"),
  email: z.string().email().optional().or(z.literal("")),
  socialLinks: z.object({
    linkedin: z.string().optional(),
    github: z.string().optional(),
    twitter: z.string().optional(),
    website: z.string().optional(),
  }),
  coursesTaught: z.array(z.string()).default([]),
  isFeatured: z.boolean().default(false),
  order: z.coerce.number().default(0),
});

export const AchievementSchema = z.object({
  studentName: z.string().min(2, "Student name is required"),
  photoUrl: z.string().min(1, "Photo URL is required"),
  achievementTitle: z.string().min(3, "Achievement title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  courseName: z.string().min(2, "Course name is required"),
  batch: z.string().min(2, "Batch is required"),
  companyOrOrganizer: z.string().optional(),
  achievementDate: z.string().min(1, "Date is required"),
  evidenceUrl: z.string().optional(),
  isFeatured: z.boolean().default(false),
});

export const EventSchema = z.object({
  title: z.string().min(3, "Event title is required"),
  slug: z.string().min(2, "Slug is required"),
  type: z.enum(["Workshop", "Seminar", "Hackathon", "Webinar", "Announcement"]),
  shortDescription: z.string().min(10, "Short description is required"),
  fullDescription: z.string().min(20, "Detailed description is required"),
  bannerUrl: z.string().min(1, "Banner URL is required"),
  eventDate: z.string().min(1, "Event date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  venue: z.string().min(2, "Venue is required"),
  mode: z.enum(["In-Person", "Online", "Hybrid"]),
  registrationUrl: z.string().optional(),
  isRegistrationOpen: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  speakerName: z.string().optional(),
  speakerDesignation: z.string().optional(),
});

export const TestimonialSchema = z.object({
  studentName: z.string().min(2, "Student name is required"),
  photoUrl: z.string().min(1, "Photo URL is required"),
  courseName: z.string().min(2, "Course name is required"),
  batch: z.string().min(2, "Batch is required"),
  currentRole: z.string().min(2, "Current role is required"),
  company: z.string().min(2, "Company is required"),
  rating: z.coerce.number().min(1).max(5),
  content: z.string().min(15, "Review content must be at least 15 characters"),
  videoUrl: z.string().optional(),
  isApproved: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
});

export const FAQSchema = z.object({
  question: z.string().min(5, "Question is required"),
  answer: z.string().min(10, "Answer is required"),
  category: z.enum(["Admissions", "Courses", "Placements", "General"]),
  order: z.coerce.number().default(0),
  isPublished: z.boolean().default(true),
});

export const SiteStatisticSchema = z.object({
  label: z.string().min(2, "Label is required"),
  value: z.coerce.number().min(0, "Value is required"),
  suffix: z.string().default("+"),
  description: z.string().min(2, "Description is required"),
  iconName: z.string().default("TrendingUp"),
  order: z.coerce.number().default(0),
});

export const CorporateConsultationSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactPerson: z.string().min(2, "Contact person name is required"),
  designation: z.string().min(2, "Designation is required"),
  email: z.string().email("Valid work email is required"),
  phone: z
    .string()
    .min(10, "Valid phone number is required")
    .regex(/^[0-9+\s()-]+$/, "Invalid phone format"),
  companySize: z.enum(["1-10", "11-50", "51-200", "201-500", "500+"]),
  consultationType: z.enum([
    "Corporate Training & Upskilling",
    "Tech Architecture & AI Consulting",
    "Campus Recruitment & Hiring",
    "Custom Project Development",
  ]),
  budgetRange: z.string().optional(),
  message: z.string().min(10, "Please describe your business needs"),
});

export const StudentAuthSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Full name is required").optional(),
  phone: z.string().optional(),
});

