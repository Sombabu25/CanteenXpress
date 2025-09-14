import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

export default function ManageMenu() {
  const [menu, setMenu] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", description: "", price: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/api/menu")
      .then(res => setMenu(res.data))
      .catch(err => console.error(err));
  }, []);

  const addItem = () => {
    axios.post("http://localhost:5000/api/menu", newItem, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
      setMenu([...menu, res.data.item]);
      setNewItem({ name: "", description: "", price: "" });
    })
    .catch(err => console.error(err));
  };

  const deleteItem = (id) => {
    axios.delete(`http://localhost:5000/api/menu/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(() => setMenu(menu.filter(item => item._id !== id)))
    .catch(err => console.error(err));
  };

  return (
    <div>
      <AdminNavbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Manage Menu</h2>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={e => setNewItem({ ...newItem, name: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={newItem.description}
            onChange={e => setNewItem({ ...newItem, description: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={e => setNewItem({ ...newItem, price: e.target.value })}
            className="border p-2 mr-2"
          />
          <button
            onClick={addItem}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Item
          </button>
        </div>

        <ul>
          {menu.map(m => (
            <li key={m._id} className="flex justify-between border-b py-2">
              <span>{m.name} - ₹{m.price}</span>
              <button
                onClick={() => deleteItem(m._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
