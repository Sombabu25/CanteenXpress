import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => setUsers(res.data))
    .catch(err => console.error(err));
  }, []);

  const makeAdmin = (id) => {
    axios.put(`http://localhost:5000/api/auth/make-admin/${id}`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(() => alert("User promoted to admin"))
    .catch(err => console.error(err));
  };

  return (
    <div>
      <AdminNavbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} className="border-b">
                <td className="p-2">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.isAdmin ? "✅ Yes" : "❌ No"}</td>
                <td>
                  {!u.isAdmin && (
                    <button
                      onClick={() => makeAdmin(u._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
