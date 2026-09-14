import fs from "fs";
import path from "path";
import {
  InstituteSettings,
  SiteStatistic,
  Course,
  Project,
  Faculty,
  StudentAchievement,
  GalleryAlbum,
  EventItem,
  Testimonial,
  Enquiry,
  AdmissionApplication,
  FAQItem,
  AdminUser,
  ActivityLog,
  CorporateConsultation,
  StudentUser,
} from "@/types";
import {
  initialSettings,
  initialSiteStatistics,
  initialCourses,
  initialProjects,
  initialFaculty,
  initialAchievements,
  initialGalleryAlbums,
  initialEvents,
  initialTestimonials,
  initialFAQs,
  initialEnquiries,
  initialApplications,
  initialAdminUsers,
} from "./initial-data";

export interface DatabaseStore {
  settings: InstituteSettings;
  statistics: SiteStatistic[];
  courses: Course[];
  projects: Project[];
  faculty: Faculty[];
  achievements: StudentAchievement[];
  galleryAlbums: GalleryAlbum[];
  events: EventItem[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  enquiries: Enquiry[];
  applications: AdmissionApplication[];
  adminUsers: AdminUser[];
  corporateConsultations: CorporateConsultation[];
  studentUsers: StudentUser[];
  activityLogs: ActivityLog[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "store.json");

function getInitialStore(): DatabaseStore {
  return {
    settings: initialSettings,
    statistics: initialSiteStatistics,
    courses: initialCourses,
    projects: initialProjects,
    faculty: initialFaculty,
    achievements: initialAchievements,
    galleryAlbums: initialGalleryAlbums,
    events: initialEvents,
    testimonials: initialTestimonials,
    faqs: initialFAQs,
    enquiries: initialEnquiries,
    applications: initialApplications,
    adminUsers: initialAdminUsers,
    corporateConsultations: [
      {
        id: "cons-1",
        companyName: "Nexus Financial Technologies",
        contactPerson: "Rajesh Malhotra",
        designation: "VP of Engineering",
        email: "r.malhotra@nexusfintech.com",
        phone: "+91 98200 12345",
        companySize: "51-200",
        consultationType: "Corporate Training & Upskilling",
        budgetRange: "₹5,00,000 - ₹10,00,000",
        message: "We need a customized 6-week hands-on training program in Generative AI, RAG architectures, and vLLM inference for our senior backend engineers.",
        status: "Meeting Scheduled",
        adminNotes: "Discovery call scheduled for Friday with Dr. Rohini.",
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      },
    ],
    studentUsers: [
      {
        id: "student-1",
        email: "student@ylcc.edu.in",
        fullName: "Karan Singhal",
        phone: "+91 98765 11223",
        role: "student",
        enrolledCourses: ["course-1"],
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
        createdAt: new Date().toISOString(),
      },
    ],
    activityLogs: [
      {
        id: "log-init",
        userName: "System",
        action: "INITIALIZE",
        details: "YLCC Platform initialized with verified seed dataset",
        entityType: "system",
        createdAt: new Date().toISOString(),
      },
    ],
  };
}

let inMemoryStore: DatabaseStore | null = null;

function readStore(): DatabaseStore {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(STORE_FILE)) {
      const initial = getInitialStore();
      fs.writeFileSync(STORE_FILE, JSON.stringify(initial, null, 2), "utf-8");
      inMemoryStore = initial;
      return initial;
    }

    const data = fs.readFileSync(STORE_FILE, "utf-8");
    const parsed = JSON.parse(data) as DatabaseStore;
    inMemoryStore = parsed;
    return parsed;
  } catch (error) {
    console.error("Failed to read store from disk, using fallback/in-memory:", error);
    if (!inMemoryStore) {
      inMemoryStore = getInitialStore();
    }
    return inMemoryStore;
  }
}

function writeStore(store: DatabaseStore): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), "utf-8");
    inMemoryStore = store;
  } catch (error) {
    console.error("Failed to write store to disk, updating in-memory:", error);
    inMemoryStore = store;
  }
}

export class DataStore {
  // Activity Logging
  static async logActivity(
    action: string,
    details: string,
    entityType: string,
    entityId?: string,
    userName: string = "Admin"
  ): Promise<void> {
    const store = readStore();
    const log: ActivityLog = {
      id: "log-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      userName,
      action,
      details,
      entityType,
      entityId,
      createdAt: new Date().toISOString(),
    };
    store.activityLogs = [log, ...(store.activityLogs || [])].slice(0, 100);
    writeStore(store);
  }

  static async getActivityLogs(): Promise<ActivityLog[]> {
    const store = readStore();
    return store.activityLogs || [];
  }

  // Settings
  static async getSettings(): Promise<InstituteSettings> {
    const store = readStore();
    return store.settings || initialSettings;
  }

  static async updateSettings(data: Partial<InstituteSettings>): Promise<InstituteSettings> {
    const store = readStore();
    store.settings = { ...store.settings, ...data };
    writeStore(store);
    await this.logActivity("UPDATE", "Updated institute settings & contacts", "settings");
    return store.settings;
  }

  // Statistics
  static async getStatistics(): Promise<SiteStatistic[]> {
    const store = readStore();
    return (store.statistics || []).sort((a, b) => a.order - b.order);
  }

  static async updateStatistic(id: string, data: Partial<SiteStatistic>): Promise<SiteStatistic | null> {
    const store = readStore();
    const index = store.statistics.findIndex((s) => s.id === id);
    if (index === -1) return null;
    store.statistics[index] = { ...store.statistics[index], ...data };
    writeStore(store);
    await this.logActivity("UPDATE", `Updated statistic: ${store.statistics[index].label}`, "statistics", id);
    return store.statistics[index];
  }

  static async addStatistic(data: Omit<SiteStatistic, "id">): Promise<SiteStatistic> {
    const store = readStore();
    const newStat: SiteStatistic = {
      ...data,
      id: "stat-" + Date.now(),
    };
    store.statistics.push(newStat);
    writeStore(store);
    await this.logActivity("CREATE", `Added statistic: ${newStat.label}`, "statistics", newStat.id);
    return newStat;
  }

  static async deleteStatistic(id: string): Promise<boolean> {
    const store = readStore();
    const initialLen = store.statistics.length;
    store.statistics = store.statistics.filter((s) => s.id !== id);
    if (store.statistics.length !== initialLen) {
      writeStore(store);
      await this.logActivity("DELETE", `Deleted statistic ID ${id}`, "statistics", id);
      return true;
    }
    return false;
  }

  // Courses
  static async getCourses(includeUnpublished = false): Promise<Course[]> {
    const store = readStore();
    if (includeUnpublished) return store.courses || [];
    return (store.courses || []).filter((c) => c.isPublished);
  }

  static async getCourseBySlug(slug: string): Promise<Course | null> {
    const store = readStore();
    return store.courses.find((c) => c.slug === slug) || null;
  }

  static async getCourseById(id: string): Promise<Course | null> {
    const store = readStore();
    return store.courses.find((c) => c.id === id) || null;
  }

  static async createCourse(data: Omit<Course, "id" | "createdAt" | "updatedAt">): Promise<Course> {
    const store = readStore();
    const newCourse: Course = {
      ...data,
      id: "course-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.courses.unshift(newCourse);
    writeStore(store);
    await this.logActivity("CREATE", `Created course: ${newCourse.title}`, "course", newCourse.id);
    return newCourse;
  }

  static async updateCourse(id: string, data: Partial<Course>): Promise<Course | null> {
    const store = readStore();
    const index = store.courses.findIndex((c) => c.id === id);
    if (index === -1) return null;
    store.courses[index] = {
      ...store.courses[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    writeStore(store);
    await this.logActivity("UPDATE", `Updated course: ${store.courses[index].title}`, "course", id);
    return store.courses[index];
  }

  static async deleteCourse(id: string): Promise<boolean> {
    const store = readStore();
    const course = store.courses.find((c) => c.id === id);
    if (!course) return false;
    store.courses = store.courses.filter((c) => c.id !== id);
    writeStore(store);
    await this.logActivity("DELETE", `Deleted course: ${course.title}`, "course", id);
    return true;
  }

  // Projects
  static async getProjects(includeUnpublished = false): Promise<Project[]> {
    const store = readStore();
    if (includeUnpublished) return store.projects || [];
    return (store.projects || []).filter((p) => p.isPublished);
  }

  static async getProjectBySlug(slug: string): Promise<Project | null> {
    const store = readStore();
    return store.projects.find((p) => p.slug === slug) || null;
  }

  static async getProjectById(id: string): Promise<Project | null> {
    const store = readStore();
    return store.projects.find((p) => p.id === id) || null;
  }

  static async createProject(data: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<Project> {
    const store = readStore();
    const newProject: Project = {
      ...data,
      id: "proj-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.projects.unshift(newProject);
    writeStore(store);
    await this.logActivity("CREATE", `Published project: ${newProject.title}`, "project", newProject.id);
    return newProject;
  }

  static async updateProject(id: string, data: Partial<Project>): Promise<Project | null> {
    const store = readStore();
    const index = store.projects.findIndex((p) => p.id === id);
    if (index === -1) return null;
    store.projects[index] = {
      ...store.projects[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    writeStore(store);
    await this.logActivity("UPDATE", `Updated project: ${store.projects[index].title}`, "project", id);
    return store.projects[index];
  }

  static async deleteProject(id: string): Promise<boolean> {
    const store = readStore();
    const project = store.projects.find((p) => p.id === id);
    if (!project) return false;
    store.projects = store.projects.filter((p) => p.id !== id);
    writeStore(store);
    await this.logActivity("DELETE", `Deleted project: ${project.title}`, "project", id);
    return true;
  }

  // Faculty
  static async getFaculty(): Promise<Faculty[]> {
    const store = readStore();
    return (store.faculty || []).sort((a, b) => a.order - b.order);
  }

  static async getFacultyById(id: string): Promise<Faculty | null> {
    const store = readStore();
    return store.faculty.find((f) => f.id === id) || null;
  }

  static async createFaculty(data: Omit<Faculty, "id" | "createdAt" | "updatedAt">): Promise<Faculty> {
    const store = readStore();
    const newFaculty: Faculty = {
      ...data,
      id: "fac-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.faculty.push(newFaculty);
    writeStore(store);
    await this.logActivity("CREATE", `Added faculty member: ${newFaculty.name}`, "faculty", newFaculty.id);
    return newFaculty;
  }

  static async updateFaculty(id: string, data: Partial<Faculty>): Promise<Faculty | null> {
    const store = readStore();
    const index = store.faculty.findIndex((f) => f.id === id);
    if (index === -1) return null;
    store.faculty[index] = {
      ...store.faculty[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    writeStore(store);
    await this.logActivity("UPDATE", `Updated faculty: ${store.faculty[index].name}`, "faculty", id);
    return store.faculty[index];
  }

  static async deleteFaculty(id: string): Promise<boolean> {
    const store = readStore();
    const fac = store.faculty.find((f) => f.id === id);
    if (!fac) return false;
    store.faculty = store.faculty.filter((f) => f.id !== id);
    writeStore(store);
    await this.logActivity("DELETE", `Deleted faculty: ${fac.name}`, "faculty", id);
    return true;
  }

  // Achievements
  static async getAchievements(): Promise<StudentAchievement[]> {
    const store = readStore();
    return store.achievements || [];
  }

  static async createAchievement(data: Omit<StudentAchievement, "id" | "createdAt" | "updatedAt">): Promise<StudentAchievement> {
    const store = readStore();
    const item: StudentAchievement = {
      ...data,
      id: "ach-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.achievements.unshift(item);
    writeStore(store);
    await this.logActivity("CREATE", `Added achievement: ${item.achievementTitle}`, "achievement", item.id);
    return item;
  }

  static async updateAchievement(id: string, data: Partial<StudentAchievement>): Promise<StudentAchievement | null> {
    const store = readStore();
    const index = store.achievements.findIndex((a) => a.id === id);
    if (index === -1) return null;
    store.achievements[index] = {
      ...store.achievements[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    writeStore(store);
    await this.logActivity("UPDATE", `Updated achievement: ${store.achievements[index].achievementTitle}`, "achievement", id);
    return store.achievements[index];
  }

  static async deleteAchievement(id: string): Promise<boolean> {
    const store = readStore();
    const item = store.achievements.find((a) => a.id === id);
    if (!item) return false;
    store.achievements = store.achievements.filter((a) => a.id !== id);
    writeStore(store);
    await this.logActivity("DELETE", `Deleted achievement: ${item.achievementTitle}`, "achievement", id);
    return true;
  }

  // Gallery
  static async getGalleryAlbums(): Promise<GalleryAlbum[]> {
    const store = readStore();
    return store.galleryAlbums || [];
  }

  static async createGalleryAlbum(data: Omit<GalleryAlbum, "id" | "createdAt" | "updatedAt" | "items">): Promise<GalleryAlbum> {
    const store = readStore();
    const album: GalleryAlbum = {
      ...data,
      id: "album-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.galleryAlbums.push(album);
    writeStore(store);
    await this.logActivity("CREATE", `Created gallery album: ${album.title}`, "gallery", album.id);
    return album;
  }

  static async addGalleryItem(albumId: string, item: { title: string; imageUrl: string; caption?: string; takenAt?: string }): Promise<GalleryAlbum | null> {
    const store = readStore();
    const album = store.galleryAlbums.find((a) => a.id === albumId);
    if (!album) return null;
    const newItem = {
      ...item,
      id: "item-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      albumId,
      takenAt: item.takenAt || new Date().toISOString().split("T")[0],
    };
    album.items.push(newItem);
    album.updatedAt = new Date().toISOString();
    writeStore(store);
    await this.logActivity("CREATE", `Added image to album: ${album.title}`, "gallery", albumId);
    return album;
  }

  static async deleteGalleryItem(albumId: string, itemId: string): Promise<boolean> {
    const store = readStore();
    const album = store.galleryAlbums.find((a) => a.id === albumId);
    if (!album) return false;
    album.items = album.items.filter((i) => i.id !== itemId);
    writeStore(store);
    return true;
  }

  // Events
  static async getEvents(includeUnpublished = false): Promise<EventItem[]> {
    const store = readStore();
    if (includeUnpublished) return store.events || [];
    return (store.events || []).filter((e) => e.isPublished);
  }

  static async getEventBySlug(slug: string): Promise<EventItem | null> {
    const store = readStore();
    return store.events.find((e) => e.slug === slug) || null;
  }

  static async createEvent(data: Omit<EventItem, "id" | "createdAt" | "updatedAt">): Promise<EventItem> {
    const store = readStore();
    const event: EventItem = {
      ...data,
      id: "event-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.events.unshift(event);
    writeStore(store);
    await this.logActivity("CREATE", `Created event: ${event.title}`, "event", event.id);
    return event;
  }

  static async updateEvent(id: string, data: Partial<EventItem>): Promise<EventItem | null> {
    const store = readStore();
    const index = store.events.findIndex((e) => e.id === id);
    if (index === -1) return null;
    store.events[index] = {
      ...store.events[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    writeStore(store);
    await this.logActivity("UPDATE", `Updated event: ${store.events[index].title}`, "event", id);
    return store.events[index];
  }

  static async deleteEvent(id: string): Promise<boolean> {
    const store = readStore();
    const item = store.events.find((e) => e.id === id);
    if (!item) return false;
    store.events = store.events.filter((e) => e.id !== id);
    writeStore(store);
    await this.logActivity("DELETE", `Deleted event: ${item.title}`, "event", id);
    return true;
  }

  // Testimonials
  static async getTestimonials(approvedOnly = true): Promise<Testimonial[]> {
    const store = readStore();
    if (!approvedOnly) return store.testimonials || [];
    return (store.testimonials || []).filter((t) => t.isApproved);
  }

  static async createTestimonial(data: Omit<Testimonial, "id" | "createdAt" | "updatedAt">): Promise<Testimonial> {
    const store = readStore();
    const item: Testimonial = {
      ...data,
      id: "test-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.testimonials.unshift(item);
    writeStore(store);
    await this.logActivity("CREATE", `Added testimonial by ${item.studentName}`, "testimonial", item.id);
    return item;
  }

  static async updateTestimonial(id: string, data: Partial<Testimonial>): Promise<Testimonial | null> {
    const store = readStore();
    const index = store.testimonials.findIndex((t) => t.id === id);
    if (index === -1) return null;
    store.testimonials[index] = {
      ...store.testimonials[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    writeStore(store);
    await this.logActivity("UPDATE", `Updated testimonial by ${store.testimonials[index].studentName}`, "testimonial", id);
    return store.testimonials[index];
  }

  static async deleteTestimonial(id: string): Promise<boolean> {
    const store = readStore();
    const item = store.testimonials.find((t) => t.id === id);
    if (!item) return false;
    store.testimonials = store.testimonials.filter((t) => t.id !== id);
    writeStore(store);
    await this.logActivity("DELETE", `Deleted testimonial by ${item.studentName}`, "testimonial", id);
    return true;
  }

  // FAQs
  static async getFAQs(): Promise<FAQItem[]> {
    const store = readStore();
    return (store.faqs || []).sort((a, b) => a.order - b.order);
  }

  static async createFAQ(data: Omit<FAQItem, "id">): Promise<FAQItem> {
    const store = readStore();
    const faq: FAQItem = {
      ...data,
      id: "faq-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
    };
    store.faqs.push(faq);
    writeStore(store);
    await this.logActivity("CREATE", `Added FAQ: ${faq.question}`, "faq", faq.id);
    return faq;
  }

  static async updateFAQ(id: string, data: Partial<FAQItem>): Promise<FAQItem | null> {
    const store = readStore();
    const index = store.faqs.findIndex((f) => f.id === id);
    if (index === -1) return null;
    store.faqs[index] = { ...store.faqs[index], ...data };
    writeStore(store);
    await this.logActivity("UPDATE", `Updated FAQ: ${store.faqs[index].question}`, "faq", id);
    return store.faqs[index];
  }

  static async deleteFAQ(id: string): Promise<boolean> {
    const store = readStore();
    const item = store.faqs.find((f) => f.id === id);
    if (!item) return false;
    store.faqs = store.faqs.filter((f) => f.id !== id);
    writeStore(store);
    await this.logActivity("DELETE", `Deleted FAQ: ${item.question}`, "faq", id);
    return true;
  }

  // Enquiries
  static async getEnquiries(): Promise<Enquiry[]> {
    const store = readStore();
    return store.enquiries || [];
  }

  static async createEnquiry(data: Omit<Enquiry, "id" | "status" | "createdAt" | "updatedAt">): Promise<Enquiry> {
    const store = readStore();
    const enquiry: Enquiry = {
      ...data,
      id: "enq-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      status: "New",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.enquiries.unshift(enquiry);
    writeStore(store);
    await this.logActivity("CREATE", `New enquiry received from ${enquiry.fullName} (${enquiry.courseInterest})`, "enquiry", enquiry.id, "Public Lead");
    return enquiry;
  }

  static async updateEnquiryStatus(
    id: string,
    status: Enquiry["status"],
    adminNotes?: string
  ): Promise<Enquiry | null> {
    const store = readStore();
    const index = store.enquiries.findIndex((e) => e.id === id);
    if (index === -1) return null;
    store.enquiries[index].status = status;
    if (adminNotes !== undefined) store.enquiries[index].adminNotes = adminNotes;
    store.enquiries[index].updatedAt = new Date().toISOString();
    writeStore(store);
    await this.logActivity("UPDATE", `Enquiry #${id} marked as ${status}`, "enquiry", id);
    return store.enquiries[index];
  }

  static async deleteEnquiry(id: string): Promise<boolean> {
    const store = readStore();
    const item = store.enquiries.find((e) => e.id === id);
    if (!item) return false;
    store.enquiries = store.enquiries.filter((e) => e.id !== id);
    writeStore(store);
    await this.logActivity("DELETE", `Deleted enquiry from ${item.fullName}`, "enquiry", id);
    return true;
  }

  // Applications
  static async getApplications(): Promise<AdmissionApplication[]> {
    const store = readStore();
    return store.applications || [];
  }

  static async createApplication(
    data: Omit<AdmissionApplication, "id" | "status" | "createdAt" | "updatedAt">
  ): Promise<AdmissionApplication> {
    const store = readStore();
    const app: AdmissionApplication = {
      ...data,
      id: "app-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      status: "Pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.applications.unshift(app);
    writeStore(store);
    await this.logActivity(
      "CREATE",
      `New admission application submitted by ${app.fullName} for ${app.selectedCourse}`,
      "application",
      app.id,
      "Applicant"
    );
    return app;
  }

  static async updateApplicationStatus(
    id: string,
    status: AdmissionApplication["status"],
    adminNotes?: string
  ): Promise<AdmissionApplication | null> {
    const store = readStore();
    const index = store.applications.findIndex((a) => a.id === id);
    if (index === -1) return null;
    store.applications[index].status = status;
    if (adminNotes !== undefined) store.applications[index].adminNotes = adminNotes;
    store.applications[index].updatedAt = new Date().toISOString();
    writeStore(store);
    await this.logActivity("UPDATE", `Application #${id} status changed to ${status}`, "application", id);
    return store.applications[index];
  }

  static async deleteApplication(id: string): Promise<boolean> {
    const store = readStore();
    const item = store.applications.find((a) => a.id === id);
    if (!item) return false;
    store.applications = store.applications.filter((a) => a.id !== id);
    writeStore(store);
    await this.logActivity("DELETE", `Deleted application from ${item.fullName}`, "application", id);
    return true;
  }

  // Admin Users
  static async getAdminUsers(): Promise<AdminUser[]> {
    const store = readStore();
    return store.adminUsers || [];
  }

  static async findAdminByEmail(email: string): Promise<AdminUser | null> {
    const store = readStore();
    return (
      store.adminUsers.find((u) => u.email.toLowerCase() === email.toLowerCase()) ||
      null
    );
  }

  // Corporate & Business Consultations
  static async getConsultations(): Promise<CorporateConsultation[]> {
    const store = readStore();
    return store.corporateConsultations || [];
  }

  static async createConsultation(
    data: Omit<CorporateConsultation, "id" | "status" | "createdAt" | "updatedAt">
  ): Promise<CorporateConsultation> {
    const store = readStore();
    const item: CorporateConsultation = {
      ...data,
      id: "cons-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      status: "New",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.corporateConsultations = [item, ...(store.corporateConsultations || [])];
    writeStore(store);
    await this.logActivity(
      "CREATE",
      `New enterprise consultation request from ${item.companyName} (${item.contactPerson})`,
      "consultation",
      item.id,
      "Corporate Client"
    );
    return item;
  }

  static async updateConsultationStatus(
    id: string,
    status: CorporateConsultation["status"],
    adminNotes?: string
  ): Promise<CorporateConsultation | null> {
    const store = readStore();
    const index = (store.corporateConsultations || []).findIndex((c) => c.id === id);
    if (index === -1) return null;
    store.corporateConsultations[index].status = status;
    if (adminNotes !== undefined) store.corporateConsultations[index].adminNotes = adminNotes;
    store.corporateConsultations[index].updatedAt = new Date().toISOString();
    writeStore(store);
    await this.logActivity("UPDATE", `Consultation #${id} status changed to ${status}`, "consultation", id);
    return store.corporateConsultations[index];
  }

  static async deleteConsultation(id: string): Promise<boolean> {
    const store = readStore();
    const item = (store.corporateConsultations || []).find((c) => c.id === id);
    if (!item) return false;
    store.corporateConsultations = store.corporateConsultations.filter((c) => c.id !== id);
    writeStore(store);
    await this.logActivity("DELETE", `Deleted consultation for ${item.companyName}`, "consultation", id);
    return true;
  }

  // Student Portal Users
  static async getStudentUsers(): Promise<StudentUser[]> {
    const store = readStore();
    return store.studentUsers || [];
  }

  static async findStudentByEmail(email: string): Promise<StudentUser | null> {
    const store = readStore();
    return (
      (store.studentUsers || []).find((u) => u.email.toLowerCase() === email.toLowerCase()) ||
      null
    );
  }

  static async createStudentUser(data: Omit<StudentUser, "id" | "createdAt">): Promise<StudentUser> {
    const store = readStore();
    const student: StudentUser = {
      ...data,
      id: "std-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toISOString(),
    };
    store.studentUsers = [student, ...(store.studentUsers || [])];
    writeStore(store);
    await this.logActivity("CREATE", `New student user registered: ${student.fullName} (${student.email})`, "user", student.id);
    return student;
  }
}

