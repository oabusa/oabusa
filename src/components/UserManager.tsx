import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { InviteUserModal } from "@/components/InviteUserModal";


interface User {
  UserId: number;
  FirstName: string;
  LastName: string;
  Email: string;
  IsActive: number;
}

const UserManager = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);


  const fetchUsers = async () => {
  try {
    const res = await axios.get("/api/user");
    console.log("✅ API response:", res.data);

    // Ensure data is an array before setting
    if (Array.isArray(res.data)) {
      setUsers(res.data);
    } else {
      console.error("❌ Unexpected response format:", res.data);
      setUsers([]); // fallback to empty
    }
  } catch (err) {
    console.error("Failed to fetch users:", err);
  } finally {
    setLoading(false);
  }
};


  /*

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/user");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
*/
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Manage Users</h1>
        <Button onClick={() => setShowInviteModal(true)}>+ Invite User</Button>
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">First Name</th>
              <th className="p-2 border">Last Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Active</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user) => (
                <tr key={user.UserId}>
                  <td className="p-2 border">{user.FirstName}</td>
                  <td className="p-2 border">{user.LastName}</td>
                  <td className="p-2 border">{user.Email}</td>
                  <td className="p-2 border">{user.IsActive ? "Yes" : "No"}</td>
                  <td className="p-2 border">
                    <Button variant="outline" size="sm">Edit</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">No users found.</td>
              </tr>
            )}
          </tbody>

        </table>
      )}

      <InviteUserModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onSuccess={() => {
          setShowInviteModal(false);
          fetchUsers(); // refresh list
        }}
      />
    </div>
  );
};

export default UserManager;
