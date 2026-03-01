import { useEffect, useMemo, useState, useCallback } from "react";
import axios from "axios";
import { MaterialReactTable } from "material-react-table";
import { MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown"; // Import the markdown handler
import "./Inventory.css";

const API_BASE = "http://localhost:8000/api/centre";

const InventoryDashboard = ({ centreId }) => {
  const [inventory, setInventory] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const [newItem, setNewItem] = useState({
    itemName: "",
    quantity: "",
    quantityUnit: "units",
    minimumThreshold: "",
  });

  const navigate = useNavigate();

  // --- API CALLS ---

  const fetchInventory = useCallback(async () => {
    if (!centreId) return;
    try {
      const res = await axios.get(`${API_BASE}/getinventory/${centreId}`);
      setInventory(res.data.data);
    } catch (err) {
      console.error("Error fetching inventory:", err);
    }
  }, [centreId]);

  const fetchAnalysis = useCallback(async () => {
    if (!centreId) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/analysis/${centreId}`);
      setAnalysis(res.data.aiSummary);
    } catch (err) {
      console.error("Error fetching AI analysis:", err);
      setAnalysis("Could not load AI analysis at this time.");
    } finally {
      setLoading(false);
    }
  }, [centreId]);

  useEffect(() => {
    if (centreId) {
      fetchInventory();
      fetchAnalysis();
    }
  }, [centreId, fetchInventory, fetchAnalysis]);

  // --- HANDLERS ---

  const handleAddInventory = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newItem,
        centreId,
        quantity: Number(newItem.quantity) || 0,
        minimumThreshold: Number(newItem.minimumThreshold) || 0,
      };

      await axios.post(`${API_BASE}/add`, payload);
      setNewItem({ itemName: "", quantity: "", quantityUnit: "units", minimumThreshold: "" });
      fetchInventory();
      fetchAnalysis();
    } catch (err) {
      alert(err.response?.data?.message || "Adding Error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await axios.delete(`${API_BASE}/deleteinventory/${id}`);
      fetchInventory();
      fetchAnalysis();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const updateStock = async (id, type) => {
    const qty = prompt(`Enter quantity to ${type}:`);
    if (!qty) return;
    try {
      const endpoint = type === "INCREASE" ? "increase" : "consume";
      await axios.put(`${API_BASE}/${endpoint}/${id}`, { quantity: Number(qty) });
      fetchInventory();
      fetchAnalysis();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating stock");
    }
  };

  /* ---------- TABLE COLUMNS ---------- */
  const columns = useMemo(
    () => [
      { accessorKey: "itemName", header: "Item Name" },
      {
        accessorKey: "quantity",
        header: "Stock",
        Cell: ({ row }) => (
          <span
            style={{
              color: row.original.quantity <= row.original.minimumThreshold ? "red" : "inherit",
              fontWeight: row.original.quantity <= row.original.minimumThreshold ? "bold" : "normal",
            }}
          >
            {row.original.quantity}
          </span>
        ),
      },
      { accessorKey: "quantityUnit", header: "Unit" },
      { accessorKey: "minimumThreshold", header: "Min. Threshold" },
      {
        id: "status",
        header: "Status",
        accessorFn: (row) => (row.quantity <= row.minimumThreshold ? "Low Stock" : "Sufficient"),
        Cell: ({ cell }) => (
          <span
            style={{
              padding: "3px 10px",
              borderRadius: "12px",
              fontSize: "0.8rem",
              backgroundColor: cell.getValue() === "Low Stock" ? "#ffe5e5" : "#e5f7ee",
              color: cell.getValue() === "Low Stock" ? "#c0392b" : "#27ae60",
              fontWeight: "600",
            }}
          >
            {cell.getValue()}
          </span>
        ),
      },
    ],
    []
  );

  return (
    <div className="inventory-section">
      <button className="back-btn" onClick={() => navigate(-1)} style={{ marginBottom: "20px", cursor: "pointer" }}>
        ← Back
      </button>

      <h3>Inventory Management</h3>

      {/* AI Analysis Section */}
      <div className="ai-analysis-card">
        <h4 style={{ margin: "0 0 10px 0", color: "#2c3e50" }}>✨ AI Stock Analysis</h4>
        <div className="ai-response-box">
          {loading ? (
            <p style={{ fontStyle: "italic", color: "#7f8c8d" }}>Analyzing inventory trends...</p>
          ) : (
            analysis && (
              <div className="markdown-content">
                <ReactMarkdown>{analysis}</ReactMarkdown>
              </div>
            )
          )}
        </div>
      </div>

      {/* Add Item Form */}
      <form className="add-inventory-form" onSubmit={handleAddInventory}>
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.itemName}
          onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Qty"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          required
        />
        <select value={newItem.quantityUnit} onChange={(e) => setNewItem({ ...newItem, quantityUnit: e.target.value })}>
          <option value="units">Units</option>
          <option value="kg">KG</option>
          <option value="liters">Liters</option>
        </select>
        <input
          type="number"
          placeholder="Min Threshold"
          value={newItem.minimumThreshold}
          onChange={(e) => setNewItem({ ...newItem, minimumThreshold: e.target.value })}
        />
        <button type="submit">Add Item</button>
      </form>

      <MaterialReactTable
        columns={columns}
        data={inventory}
        getRowId={(row) => row._id}
        enableSorting
        enableGlobalFilter
        enablePagination
        enableRowActions
        positionActionsColumn="last"
        initialState={{ sorting: [{ id: "itemName", desc: false }] }}
        renderRowActionMenuItems={({ row }) => [
          <MenuItem key="increase" onClick={() => updateStock(row.original._id, "INCREASE")}>
            ➕ Increase Stock
          </MenuItem>,
          <MenuItem key="consume" onClick={() => updateStock(row.original._id, "CONSUME")}>
            ➖ Consume Stock
          </MenuItem>,
          <MenuItem key="delete" onClick={() => handleDelete(row.original._id)} style={{ color: "red" }}>
            🗑 Delete
          </MenuItem>,
        ]}
      />
    </div>
  );
};

export default InventoryDashboard;