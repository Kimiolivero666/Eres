import Siderbar from '@/components/adminComponent/Siderbar';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: LayoutProps) {
  return (
    <div style={{ display: 'flex' }}>
      <Siderbar />
      <main style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  );
}
