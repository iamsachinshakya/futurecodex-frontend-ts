"use client";

import { useState } from "react";
import {
  Edit,
  Trash2,
  Search,
  Plus,
  Ban,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { UserModal } from "@/app/modules/dashboard/components/modals/UserModal";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "User" | "Moderator";
  status: "Active" | "Inactive";
  bio?: string;
  joinedDate: string;
  posts: number;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah@example.com",
    role: "Admin",
    status: "Active",
    bio: "Tech enthusiast and blogger",
    joinedDate: "2024-01-15",
    posts: 45,
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    role: "User",
    bio: "Passionate writer",
    status: "Active",
    joinedDate: "2024-02-20",
    posts: 12,
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Moderator",
    bio: "Content moderator",
    status: "Active",
    joinedDate: "2024-03-10",
    posts: 28,
  },
  {
    id: 4,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "User",
    bio: "",
    status: "Inactive",
    joinedDate: "2024-04-05",
    posts: 5,
  },
];

export function UsersTable() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Handle creating new user
  const handleCreateUser = () => {
    setEditingUser(null);
    setShowUserModal(true);
  };

  // Handle editing existing user
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowUserModal(true);
  };

  // Handle saving user (create or update)
  const handleSaveUser = async (userData: User) => {
    try {
      if (userData.id) {
        // Update existing user
        setUsers(
          users.map((u) => (u.id === userData.id ? { ...userData } : u))
        );
        console.log("User updated:", userData);
      } else {
        // Create new user with auto-generated ID
        const newUser = {
          ...userData,
          id: Math.max(...users.map((u) => u.id)) + 1,
          joinedDate: new Date().toISOString().split("T")[0],
          posts: 0,
        };
        setUsers([...users, newUser]);
        console.log("User created:", newUser);
      }

      // Close modal and reset
      setShowUserModal(false);
      setEditingUser(null);
    } catch (error) {
      console.error("Error saving user:", error);
      throw error;
    }
  };

  // Filtered users based on search
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id));
    }
  };

  // Handle individual checkbox
  const handleSelectUser = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Show delete confirmation for single user
  const handleDeleteUserClick = (user: User) => {
    setUserToDelete(user);
    setShowDeleteAlert(true);
  };

  // Confirm single user deletion
  const confirmDeleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter((user) => user.id !== userToDelete.id));
      setShowDeleteAlert(false);
      setUserToDelete(null);
    }
  };

  // Handle bulk delete with confirmation
  const handleBulkDelete = () => {
    if (
      confirm(
        `Are you sure you want to delete ${selectedUsers.length} selected user${
          selectedUsers.length > 1 ? "s" : ""
        }?\n\nThis action cannot be undone.`
      )
    ) {
      setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
    }
  };

  return (
    <>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users..."
                className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:border-cyan-500 transition-all text-white placeholder-gray-400"
              />
            </div>
            {selectedUsers.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="flex items-center gap-2 px-4 py-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all"
              >
                <Trash2 size={18} />
                Delete ({selectedUsers.length})
              </button>
            )}
          </div>
          <button
            onClick={handleCreateUser}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl hover:scale-105 transition-all shadow-lg shadow-cyan-500/25"
          >
            <Plus size={20} />
            Add User
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    checked={
                      selectedUsers.length === filteredUsers.length &&
                      filteredUsers.length > 0
                    }
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-700 checked:bg-cyan-500"
                  />
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-300">
                  User
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-300">
                  Role
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-300">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-300">
                  Joined
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-300">
                  Posts
                </th>
                <th className="text-right p-4 text-sm font-semibold text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="w-4 h-4 rounded border-gray-600 bg-gray-700 checked:bg-cyan-500"
                    />
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-semibold text-white">{user.name}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === "Admin"
                          ? "bg-purple-500/20 text-purple-400"
                          : user.role === "Moderator"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`flex items-center gap-1 w-fit px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === "Active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {user.status === "Active" ? (
                        <CheckCircle size={12} />
                      ) : (
                        <Ban size={12} />
                      )}
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-300">
                    {user.joinedDate}
                  </td>
                  <td className="p-4 text-sm text-gray-300">{user.posts}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="p-2 hover:bg-cyan-500/10 text-cyan-400 rounded-lg transition-all"
                        title="Edit user"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteUserClick(user)}
                        className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-all"
                        title="Delete user"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No users found</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            Showing {filteredUsers.length} of {users.length} users
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all text-sm">
              Previous
            </button>
            <button className="px-4 py-2 bg-cyan-500 rounded-lg hover:bg-cyan-600 transition-all text-sm">
              1
            </button>
            <button className="px-4 py-2 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all text-sm">
              2
            </button>
            <button className="px-4 py-2 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all text-sm">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* User Create/Edit Modal */}
      <UserModal
        isOpen={showUserModal}
        onClose={() => {
          setShowUserModal(false);
          setEditingUser(null);
        }}
        user={editingUser}
        onSave={handleSaveUser}
      />

      {/* Delete Confirmation Alert */}
      {showDeleteAlert && userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl border border-red-500/30 shadow-2xl shadow-red-500/20 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-red-500/20 rounded-full">
                <AlertTriangle className="text-red-400" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  Delete User?
                </h3>
                <p className="text-gray-300 mb-1">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-white">
                    {userToDelete.name}
                  </span>
                  ?
                </p>
                <p className="text-sm text-gray-400">
                  This will permanently delete the user and all associated data.
                  This action cannot be undone.
                </p>
                {userToDelete.posts > 0 && (
                  <div className="mt-3 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                    <p className="text-sm text-orange-300">
                      ⚠️ This user has {userToDelete.posts} blog post
                      {userToDelete.posts > 1 ? "s" : ""} that will be affected.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={confirmDeleteUser}
                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 rounded-xl transition-all font-semibold text-white"
              >
                Delete User
              </button>
              <button
                onClick={() => {
                  setShowDeleteAlert(false);
                  setUserToDelete(null);
                }}
                className="flex-1 px-4 py-3 bg-gray-700/50 hover:bg-gray-700/70 rounded-xl transition-all font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
