import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import ProjectFormClient from '@/components/admin/ProjectFormClient';

interface EditProjectProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: 'Edit Practical Project | YLCC Admin',
};

export default async function EditProjectPage({ params }: EditProjectProps) {
  const { id } = await params;
  const projects = await db.getProjects();
  const project = projects.find((p) => p.id === id || p.slug === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto">
      <ProjectFormClient initialProject={project} isEditing={true} />
    </div>
  );
}
