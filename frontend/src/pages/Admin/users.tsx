import AdminLayout from "@/components/admin/AdminLayout";
import { useState } from "react";
import { Search, UserPlus, X } from "lucide-react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  cpuSaved: number;
  energySaved: number;
  co2Reduced: number;
};

const mockUsers: User[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@email.com",
    role: "User",
    status: "Active",
    cpuSaved: 120,
    energySaved: 45,
    co2Reduced: 12,
  },
  {
    id: 2,
    name: "Priya Verma",
    email: "priya@email.com",
    role: "Admin",
    status: "Active",
    cpuSaved: 80,
    energySaved: 30,
    co2Reduced: 8,
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [banReason, setBanReason] = useState("");

  const handleTerminate = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
    setSelectedUser(null);
  };

  const handleBan = () => {
    if (!banReason) return alert("Please provide reason for ban.");
    alert(`User banned for: ${banReason}`);
    setBanReason("");
    setSelectedUser(null);
  };

  const handleRevoke = () => {
    alert("User access revoked.");
    setSelectedUser(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Users Management</h2>
          <button
            onClick={() => setShowAddUser(true)}
            className="eco-gradient px-4 py-2 rounded-xl text-primary-foreground flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Add User
          </button>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className="border-t border-border hover:bg-muted transition cursor-pointer"
                >
                  <td className="py-3 px-4">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* USER DETAILS MODAL */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-card w-[500px] rounded-2xl p-6 space-y-4">

              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {selectedUser.name}
                </h3>
                <X
                  className="cursor-pointer"
                  onClick={() => setSelectedUser(null)}
                />
              </div>

              <div className="text-sm space-y-2">
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>CPU Saved:</strong> {selectedUser.cpuSaved}%</p>
                <p><strong>Energy Saved:</strong> {selectedUser.energySaved} kWh</p>
                <p><strong>CO₂ Reduced:</strong> {selectedUser.co2Reduced} kg</p>
              </div>

              {/* Ban reason input */}
              <input
                type="text"
                placeholder="Enter ban reason (if banning)"
                className="w-full p-2 border border-border rounded-xl"
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
              />

              {/* Actions */}
              <div className="flex justify-between pt-4">

                <button
                  onClick={handleRevoke}
                  className="px-4 py-2 rounded-xl bg-[hsl(var(--status-warning)/0.2)] text-[hsl(var(--status-warning))]"
                >
                  Revoke
                </button>

                <button
                  onClick={handleBan}
                  className="px-4 py-2 rounded-xl bg-[hsl(var(--status-danger)/0.2)] text-[hsl(var(--status-danger))]"
                >
                  Ban
                </button>

                <button
                  onClick={() => handleTerminate(selectedUser.id)}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white"
                >
                  Terminate
                </button>

                <button
                  onClick={() => setSelectedUser(null)}
                  className="px-4 py-2 rounded-xl bg-muted"
                >
                  Close
                </button>

              </div>
            </div>
          </div>
        )}

        {/* ADD USER MODAL */}
        {showAddUser && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-card w-[400px] rounded-2xl p-6 space-y-4">

              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Add User</h3>
                <X
                  className="cursor-pointer"
                  onClick={() => setShowAddUser(false)}
                />
              </div>

              <input
                placeholder="Name"
                className="w-full p-2 border border-border rounded-xl"
              />
              <input
                placeholder="Email"
                className="w-full p-2 border border-border rounded-xl"
              />

              <button
                onClick={() => setShowAddUser(false)}
                className="eco-gradient w-full py-2 rounded-xl text-primary-foreground"
              >
                Create User
              </button>

            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
