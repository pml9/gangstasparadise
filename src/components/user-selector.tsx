'use client';

import { useUser } from '@/context/user-context';
import { mockUsers } from '../../mocks/users';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function UserSelector() {
  const { currentUser, setUserById } = useUser();

  return (
    <div className="flex flex-col space-y-2 p-4 bg-gray-100 rounded-md shadow-sm">
      <div className="text-sm font-semibold">Current User:</div>
      <div className="flex items-center space-x-2">
        <span className="font-medium">{currentUser.name}</span>
        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
          {currentUser.role}
        </span>
      </div>

      <div className="text-sm font-semibold mt-2">Switch User:</div>
      <Select
        value={currentUser.id.toString()}
        onValueChange={(value) => setUserById(parseInt(value))}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a user" />
        </SelectTrigger>
        <SelectContent>
          {mockUsers.map((user) => (
            <SelectItem key={user.id} value={user.id.toString()}>
              {user.name} ({user.role})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
