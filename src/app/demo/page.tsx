'use client';

import { UserSelector } from '@/components/user-selector';
import { useUser } from '@/context/user-context';
import { useState } from 'react';
import { User } from '@/types';

// Define API response type
interface ApiResponse {
  currentUser: User;
  items: unknown[];
}

export default function DemoPage() {
  const { currentUser } = useUser();
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // Example of fetching from our API
  const fetchApiData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/example');
      const data = await response.json();
      setApiData(data);
    } catch (error) {
      console.error('Error fetching API data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">
        Supabase Development User Demo
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">User Selector</h2>
          <UserSelector />
        </div>

        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Current User</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Name:</span> {currentUser.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {currentUser.email}
            </p>
            <p>
              <span className="font-medium">Role:</span> {currentUser.role}
            </p>
            <p>
              <span className="font-medium">ID:</span> {currentUser.id}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 border rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">API Example</h2>
        <button
          onClick={fetchApiData}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Fetch API Data'}
        </button>

        {apiData && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium mb-2">API Response:</h3>
            <pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">
              {JSON.stringify(apiData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
