import fs from 'fs';
import path from 'path';
import {
  InstituteSettings,
  Program,
  Project,
  Faculty,
  Testimonial,
  ResourceItem,
  GalleryItem,
  FAQ,
  Enquiry,
  AdmissionApplication,
} from '@/types';
import {
  initialInstituteSettings,
  initialPrograms,
  initialProjects,
  initialFaculty,
  initialTestimonials,
  initialFAQs,
  initialResources,
  initialGallery,
  initialEnquiries,
  initialApplications,
} from './seed-data';

interface DatabaseSchema {
  settings: InstituteSettings;
  programs: Program[];
  projects: Project[];
  faculty: Faculty[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  resources: ResourceItem[];
  gallery: GalleryItem[];
  enquiries: Enquiry[];
  applications: AdmissionApplication[];
}

const IS_VERCEL = !!process.env.VERCEL;
const BASE_DATA_DIR = path.join(process.cwd(), 'data');
const BASE_DB_FILE = path.join(BASE_DATA_DIR, 'ylcc_database.json');
const WRITE_DATA_DIR = IS_VERCEL ? '/tmp' : BASE_DATA_DIR;
const WRITE_DB_FILE = path.join(WRITE_DATA_DIR, 'ylcc_database.json');

// In-memory cache singleton to prevent repeated disk reads & support serverless environments
let memoryDb: DatabaseSchema | null = null;

function getInitialData(): DatabaseSchema {
  return {
    settings: initialInstituteSettings,
    programs: initialPrograms,
    projects: initialProjects,
    faculty: initialFaculty,
    testimonials: initialTestimonials,
    faqs: initialFAQs,
    resources: initialResources,
    gallery: initialGallery,
    enquiries: initialEnquiries,
    applications: initialApplications,
  };
}

function ensureDatabase(): DatabaseSchema {
  if (memoryDb) {
    return memoryDb;
  }

  // Check writable path first (/tmp in Vercel)
  if (fs.existsSync(WRITE_DB_FILE)) {
    try {
      const content = fs.readFileSync(WRITE_DB_FILE, 'utf-8');
      memoryDb = JSON.parse(content) as DatabaseSchema;
      return memoryDb;
    } catch (e) {
      console.warn('Error reading WRITE_DB_FILE, falling back to base:', e);
    }
  }

  // Check base repo path
  if (fs.existsSync(BASE_DB_FILE)) {
    try {
      const content = fs.readFileSync(BASE_DB_FILE, 'utf-8');
      memoryDb = JSON.parse(content) as DatabaseSchema;
      return memoryDb;
    } catch (e) {
      console.warn('Error reading BASE_DB_FILE, re-initializing:', e);
    }
  }

  // Fallback to seed data
  const initialData = getInitialData();
  memoryDb = initialData;

  try {
    if (!fs.existsSync(WRITE_DATA_DIR)) {
      fs.mkdirSync(WRITE_DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(WRITE_DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not write database file on initialization (read-only system):', err);
  }

  return memoryDb;
}

function saveDatabase(data: DatabaseSchema): void {
  memoryDb = data;
  try {
    if (!fs.existsSync(WRITE_DATA_DIR)) {
      fs.mkdirSync(WRITE_DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(WRITE_DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Failed to write database to disk (using memory cache):', err);
  }
}

// Database API helper functions
export const db = {
  // Settings
  getSettings: async (): Promise<InstituteSettings> => {
    const data = ensureDatabase();
    return data.settings;
  },
  updateSettings: async (settings: Partial<InstituteSettings>): Promise<InstituteSettings> => {
    const data = ensureDatabase();
    data.settings = { ...data.settings, ...settings };
    saveDatabase(data);
    return data.settings;
  },

  // Programs
  getPrograms: async (onlyPublished = false): Promise<Program[]> => {
    const data = ensureDatabase();
    let progs = data.programs;
    if (onlyPublished) {
      progs = progs.filter((p) => p.status === 'published');
    }
    return progs.sort((a, b) => a.displayOrder - b.displayOrder);
  },
  getProgramBySlug: async (slug: string): Promise<Program | null> => {
    const data = ensureDatabase();
    return data.programs.find((p) => p.slug === slug) || null;
  },
  saveProgram: async (program: Program): Promise<Program> => {
    const data = ensureDatabase();
    const index = data.programs.findIndex((p) => p.id === program.id);
    if (index >= 0) {
      data.programs[index] = program;
    } else {
      data.programs.push(program);
    }
    saveDatabase(data);
    return program;
  },
  deleteProgram: async (id: string): Promise<boolean> => {
    const data = ensureDatabase();
    data.programs = data.programs.filter((p) => p.id !== id);
    saveDatabase(data);
    return true;
  },

  // Projects
  getProjects: async (onlyPublished = false): Promise<Project[]> => {
    const data = ensureDatabase();
    let projs = data.projects;
    if (onlyPublished) {
      projs = projs.filter((p) => p.status === 'published');
    }
    return projs.sort((a, b) => a.displayOrder - b.displayOrder);
  },
  getProjectBySlug: async (slug: string): Promise<Project | null> => {
    const data = ensureDatabase();
    return data.projects.find((p) => p.slug === slug) || null;
  },
  saveProject: async (project: Project): Promise<Project> => {
    const data = ensureDatabase();
    const index = data.projects.findIndex((p) => p.id === project.id);
    if (index >= 0) {
      data.projects[index] = { ...project, updatedAt: new Date().toISOString() };
    } else {
      data.projects.push({
        ...project,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    saveDatabase(data);
    return project;
  },
  deleteProject: async (id: string): Promise<boolean> => {
    const data = ensureDatabase();
    data.projects = data.projects.filter((p) => p.id !== id);
    saveDatabase(data);
    return true;
  },

  // Faculty
  getFaculty: async (): Promise<Faculty[]> => {
    const data = ensureDatabase();
    return data.faculty.sort((a, b) => a.displayOrder - b.displayOrder);
  },
  saveFaculty: async (fac: Faculty): Promise<Faculty> => {
    const data = ensureDatabase();
    const index = data.faculty.findIndex((f) => f.id === fac.id);
    if (index >= 0) {
      data.faculty[index] = fac;
    } else {
      data.faculty.push(fac);
    }
    saveDatabase(data);
    return fac;
  },
  deleteFaculty: async (id: string): Promise<boolean> => {
    const data = ensureDatabase();
    data.faculty = data.faculty.filter((f) => f.id !== id);
    saveDatabase(data);
    return true;
  },

  // Testimonials
  getTestimonials: async (): Promise<Testimonial[]> => {
    const data = ensureDatabase();
    return data.testimonials;
  },

  // FAQs
  getFAQs: async (): Promise<FAQ[]> => {
    const data = ensureDatabase();
    return data.faqs;
  },

  // Resources
  getResources: async (accessLevel?: 'public' | 'student' | 'admin'): Promise<ResourceItem[]> => {
    const data = ensureDatabase();
    if (!accessLevel || accessLevel === 'admin') {
      return data.resources;
    }
    if (accessLevel === 'public') {
      return data.resources.filter((r) => r.accessLevel === 'public');
    }
    return data.resources.filter((r) => r.accessLevel === 'public' || r.accessLevel === 'student');
  },
  saveResource: async (resource: ResourceItem): Promise<ResourceItem> => {
    const data = ensureDatabase();
    const index = data.resources.findIndex((r) => r.id === resource.id);
    if (index >= 0) {
      data.resources[index] = resource;
    } else {
      data.resources.push(resource);
    }
    saveDatabase(data);
    return resource;
  },
  deleteResource: async (id: string): Promise<boolean> => {
    const data = ensureDatabase();
    data.resources = data.resources.filter((r) => r.id !== id);
    saveDatabase(data);
    return true;
  },

  // Gallery
  getGallery: async (): Promise<GalleryItem[]> => {
    const data = ensureDatabase();
    return data.gallery;
  },

  // Enquiries
  getEnquiries: async (): Promise<Enquiry[]> => {
    const data = ensureDatabase();
    return data.enquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  addEnquiry: async (enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Promise<Enquiry> => {
    const data = ensureDatabase();
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: `enq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    data.enquiries.unshift(newEnquiry);
    saveDatabase(data);
    return newEnquiry;
  },
  updateEnquiryStatus: async (id: string, status: Enquiry['status'], notes?: string): Promise<boolean> => {
    const data = ensureDatabase();
    const item = data.enquiries.find((e) => e.id === id);
    if (item) {
      item.status = status;
      if (notes !== undefined) item.notes = notes;
      saveDatabase(data);
      return true;
    }
    return false;
  },
  deleteEnquiry: async (id: string): Promise<boolean> => {
    const data = ensureDatabase();
    data.enquiries = data.enquiries.filter((e) => e.id !== id);
    saveDatabase(data);
    return true;
  },

  // Admission Applications
  getApplications: async (): Promise<AdmissionApplication[]> => {
    const data = ensureDatabase();
    return data.applications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  addApplication: async (
    application: Omit<AdmissionApplication, 'id' | 'createdAt' | 'status'>
  ): Promise<AdmissionApplication> => {
    const data = ensureDatabase();
    const newApp: AdmissionApplication = {
      ...application,
      id: `app-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    data.applications.unshift(newApp);
    saveDatabase(data);
    return newApp;
  },
  updateApplicationStatus: async (
    id: string,
    status: AdmissionApplication['status'],
    adminNotes?: string
  ): Promise<boolean> => {
    const data = ensureDatabase();
    const item = data.applications.find((a) => a.id === id);
    if (item) {
      item.status = status;
      if (adminNotes !== undefined) item.adminNotes = adminNotes;
      saveDatabase(data);
      return true;
    }
    return false;
  },
  deleteApplication: async (id: string): Promise<boolean> => {
    const data = ensureDatabase();
    data.applications = data.applications.filter((a) => a.id !== id);
    saveDatabase(data);
    return true;
  },
};
