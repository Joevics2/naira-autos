'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Bell } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
        <p className="text-gray-600">Stay updated with your activities</p>
      </div>

      <Card>
        <CardContent className="pt-6 text-center py-12">
          <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Notifications</h3>
          <p className="text-gray-600">You're all caught up! Notifications will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
