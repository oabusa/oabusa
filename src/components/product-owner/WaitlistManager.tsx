import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { EditWaitlistModal } from "./EditWaitlistModal";

interface WaitlistEntry {
  id: number;
  FullName: string;
  Email: string;
  Company: string | null;
  Role: string | null;
}

interface Props {
  refresh: boolean;
  triggerRefresh: () => void;
}

export const WaitlistManager = ({ refresh, triggerRefresh }: Props) => {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<WaitlistEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEntries = async () => {
    try {
      const res = await axios.get("/api/waitlist");
      setEntries(res.data);
    } catch (err) {
      console.error("Failed to load waitlist contacts:", err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [refresh]);

  const handleEdit = (entry: WaitlistEntry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} className="border-t">
                <td className="px-4 py-2">{entry.FullName}</td>
                <td className="px-4 py-2">{entry.Email}</td>
                <td className="px-4 py-2">{entry.Company}</td>
                <td className="px-4 py-2">{entry.Role}</td>
                <td className="px-4 py-2 space-x-2">
                  <Button size="sm" onClick={() => handleEdit(entry)}>Edit</Button>
                  <Button size="sm" variant="outline" onClick={() => console.log("Invite logic here")}>Invite</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedEntry && (
        <EditWaitlistModal
          entry={selectedEntry}
          onClose={() => setIsModalOpen(false)}
          onUpdated={triggerRefresh}
        />
      )}
    </div>
  );
};
