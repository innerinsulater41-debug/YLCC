import React from 'react';
import ProjectFormClient from '@/components/admin/ProjectFormClient';

export const metadata = {
  title: 'Upload Practical Project | YLCC Admin',
};

export default function NewProjectPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <ProjectFormClient isEditing={false} />
    </div>
  );
}
