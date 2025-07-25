import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { InviteProductOwnerModal } from "@/components/product-owner/InviteProductOwnerModal";
import { EditProductOwnerModal } from "@/components/product-owner/EditProductOwnerModal"; // ✅ new

interface ProductOwner {
  UserId: number;
  FirstName: string;
  LastName: string;
  UserTypeId: number;
  Email: string;
  IsActive: number;
}

export const ProductOwnerManager = () => {
  const [owners, setOwners] = useState<ProductOwner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [editingOwner, setEditingOwner] = useState<ProductOwner | null>(null); // ✅ new

  const fetchProductOwners = async () => {
    try {
      const res = await axios.get("/api/user");
      const filtered = res.data.filter((u: ProductOwner) => u.UserTypeId === 1);
      setOwners(filtered);
    } catch (err) {
      console.error("Failed to fetch product owners:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductOwners();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Product Owner Management</h2>
        <Button onClick={() => setShowInviteModal(true)}>
          + Invite Product Owner
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : owners.length === 0 ? (
        <p className="text-gray-500">No product owners found.</p>
      ) : (
        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">First Name</th>
              <th className="p-2 border">Last Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Active</th>
              <th className="p-2 border">Actions</th> {/* ✅ */}
            </tr>
          </thead>
          <tbody>
            {owners.map((owner) => (
              <tr key={owner.UserId}>
                <td className="p-2 border">{owner.FirstName}</td>
                <td className="p-2 border">{owner.LastName}</td>
                <td className="p-2 border">{owner.Email}</td>
                <td className="p-2 border">{owner.IsActive ? "Yes" : "No"}</td>
                <td className="p-2 border">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingOwner(owner)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Invite Modal */}
      <InviteProductOwnerModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onSuccess={() => {
          setShowInviteModal(false);
          fetchProductOwners();
        }}
      />

      {/* ✅ Edit Modal */}
      {editingOwner && (
        <EditProductOwnerModal
          owner={editingOwner}
          onClose={() => setEditingOwner(null)}
          onUpdated={fetchProductOwners}
        />
      )}
    </div>
  );
};
