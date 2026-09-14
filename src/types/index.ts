export type ProgramStatus = 'draft' | 'published' | 'archived';
export type ProjectStatus = 'draft' | 'published' | 'archived';
export type CourseMode = 'Offline Classroom' | 'Online Live' | 'Hybrid';
export type DifficultyLevel = 'Foundational' | 'Intermediate' | 'Advanced' | 'Executive';
export type ApplicationStatus = 'pending' | 'under_review' | 'approved' | 'rejected';
export type EnquiryStatus = 'new' | 'contacted' | 'resolved';
export type ResourceAccessLevel = 'public' | 'student' | 'admin';

export interface InstituteSettings {
  instituteName: string;
  fullForm: string;
  tagline: string;
  instituteType: string;
  location: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  officeHours: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    linkedin: string;
    youtube: string;
  };
  stats: {
    studentsTrained: number;
    practicalProjectsCount: number;
    trainingModulesCount: number;
    yearsExperience: number;
    practicalLabHours: number;
    partnerEnterprises: number;
  };
  heroTitle?: string;
  heroSubtitle?: string;
  announcementBarText?: string;
  showAnnouncementBar: boolean;
}

export interface ProgramModule {
  id: string;
  title: string;
  topics: string[];
  durationHours: number;
}

export interface Program {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  detailedDescription: string;
  duration: string;
  mode: CourseMode;
  fees: number;
  discountedFees?: number;
  eligibility: string;
  softwareTools: string[];
  facultyId?: string;
  facultyName?: string;
  batchTiming: string;
  availableSeats: number;
  startDate: string;
  brochureUrl?: string;
  certificateInfo: string;
  isFeatured: boolean;
  status: ProgramStatus;
  displayOrder: number;
  modules: ProgramModule[];
  learningOutcomes: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface ProjectMedia {
  id: string;
  url: string;
  name: string;
  type: string;
  size: string;
  caption?: string;
}

export interface ProjectResource {
  id: string;
  title: string;
  url: string;
  fileType: 'pdf' | 'xlsx' | 'docx' | 'pptx' | 'zip';
  fileSize: string;
  isDownloadable: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  industryCategory: string;
  accountingCategory: string;
  difficultyLevel: DifficultyLevel;
  skillsCovered: string[];
  softwareUsed: string[];
  learningObjectives: string[];
  businessScenario: string;
  tasksToComplete: string[];
  expectedOutcomes: string[];
  coverImageUrl: string;
  media: ProjectMedia[];
  resources: ProjectResource[];
  videoUrl?: string;
  practiceTimeHours: number;
  academicYear: string;
  facultyMentor?: string;
  isFeatured: boolean;
  status: ProjectStatus;
  displayOrder: number;
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
  experienceYears: number;
  expertiseAreas: string[];
  programsTaught: string[];
  bio: string;
  photoUrl: string;
  linkedinUrl?: string;
  email?: string;
  isFeatured: boolean;
  displayOrder: number;
}

export interface Testimonial {
  id: string;
  studentName: string;
  courseTaken: string;
  currentRole: string;
  company: string;
  quote: string;
  rating: number;
  avatarUrl: string;
  isFeatured: boolean;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'Course Brochures' | 'Sample Accounting Formats' | 'Practice Worksheets' | 'GST Compliance' | 'TDS/TCS Resources' | 'Payroll Templates' | 'Excel Practice Files' | 'MIS Reports';
  description: string;
  fileUrl: string;
  fileType: string;
  fileSize: string;
  accessLevel: ResourceAccessLevel;
  downloadCount: number;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  albumCategory: 'Classroom & Accounting Lab' | 'GST & Taxation Workshops' | 'Advanced Excel Masterclass' | 'Project Presentations' | 'Seminars & Guest Lectures';
  title: string;
  caption: string;
  imageUrl: string;
  date: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  programOfInterest: string;
  preferredBatch: string;
  message: string;
  status: EnquiryStatus;
  notes?: string;
  createdAt: string;
}

export interface AdmissionApplication {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  qualification: string;
  commerceBackground: boolean;
  selectedProgram: string;
  preferredMode: CourseMode;
  preferredBatch: string;
  currentOccupation: string;
  careerGoal: string;
  documentUrls: string[];
  consent: boolean;
  status: ApplicationStatus;
  adminNotes?: string;
  createdAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'Admissions' | 'Practical Projects' | 'Curriculum & Software' | 'Certification & Placement' | 'Batches & Timings';
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'editor';
}
