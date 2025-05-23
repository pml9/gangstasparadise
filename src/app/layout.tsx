import type React from 'react';
import '@/app/globals.css';
import { UserProvider } from '@/context/user-context';

export const metadata = {
  title: 'OpenDesk - Workplace Management Platform',
  description: 'Streamline your workplace processes with OpenDesk',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
