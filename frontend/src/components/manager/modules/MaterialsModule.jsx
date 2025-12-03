import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import "../../styles/MaterialsModule.css"; // adjust path if needed

const MaterialsModule = ({
  materials = [],
  materialTransactions = [],
  onOpenModal,
  onAddMaterial,
  onAddTransaction,
  // NEW props (may be undefined if not passed — fallback included)
  materialRequests: materialRequestsProp,
  onApproveMaterialRequest,
  onDeclineMaterialRequest,
}) => {
  // fallback state if props not provided
  const [localRequests, setLocalRequests] = useState(() => {
    try {
      const raw = localStorage.getItem("materialRequests");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // if parent passed materialRequests prop, prefer it; else use localRequests
  const materialRequests = materialRequestsProp !== undefined ? materialRequestsProp : localRequests;

  // helper to persist localRequests (only used when parent not passing handlers)
  const persistLocalRequests = (newList) => {
    setLocalRequests(newList);
    try {
      localStorage.setItem("materialRequests", JSON.stringify(newList));
    } catch {}
  };

  // Approve handler wrapper: call parent handler if exists, else update local storage
  const approveMaterialReq = (id) => {
    if (typeof onApproveMaterialRequest === "function") {
      onApproveMaterialRequest(id);
      return;
    }

    const updated = materialRequests.map((r) => (r.id === id ? { ...r, status: "approved", approvedAt: new Date().toISOString() } : r));
    persistLocalRequests(updated);
    // optionally notify with a toast in UI
  };

  const declineMaterialReq = (id) => {
    if (typeof onDeclineMaterialRequest === "function") {
      onDeclineMaterialRequest(id);
      return;
    }

    const updated = materialRequests.map((r) => (r.id === id ? { ...r, status: "declined", declinedAt: new Date().toISOString() } : r));
    persistLocalRequests(updated);
  };

  // load up-to-date localRequests when storage changes externally
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "materialRequests") {
        try {
          const raw = localStorage.getItem("materialRequests");
          setLocalRequests(raw ? JSON.parse(raw) : []);
        } catch {}
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <div className="materials-module">
      <div className="materials-header">
        <h2>Materials</h2>
        <div className="materials-actions">
          <button className="btn orange" onClick={() => onOpenModal && onOpenModal("transaction")}>Record Transaction</button>
          <button className="btn blue" onClick={() => onOpenModal && onOpenModal("material")}>+ New Material</button>
        </div>
      </div>

      {/* KPIs - unchanged layout */}
      <div className="materials-kpi-grid">
        <div className="kpi-card"> <h3>{materials.length}</h3> <p>Total Materials</p> </div>
        <div className="kpi-card"> <h3>{materials.filter(m => Number(m.quantity || 0) <= Number(m.minimumStock || 0)).length}</h3> <p>Low Stock</p> </div>
        <div className="kpi-card"> <h3>${materials.reduce((s,m)=> s + (Number(m.quantity || 0) * Number(m.unitPrice || 0)), 0)}</h3> <p>Inventory Value</p> </div>
        <div className="kpi-card"> <h3>{materialTransactions.length}</h3> <p>Transactions</p> </div>
      </div>

     {/* Pending Material Requests */}
<div className="pending-requests-container">
  <h3 className="section-title">Pending Material Requests</h3>

  {(!materialRequests || materialRequests.length === 0) && (
    <p className="no-requests-text">No requests</p>
  )}

  {materialRequests && materialRequests.length > 0 && (
    <div className="requests-grid">
      {materialRequests.map((r) => (
        <div className="material-request-card" key={r.id}>
          <div className="request-info">
            <div className="req-top">
              <h4 className="req-material">{r.material}</h4>
              <span className={`status-badge ${r.status}`}>
                {r.status.toUpperCase()}
              </span>
            </div>

            <div className="req-details">
              <p><strong>Employee:</strong> {r.employeeName}</p>
              <p><strong>Quantity:</strong> {r.quantity}</p>
              <p><strong>Date:</strong> {new Date(r.date).toLocaleString()}</p>
            </div>
          </div>

          {r.status === "pending" && (
            <div className="request-actions">
              <button
                className="btn-approve"
                onClick={() => approveMaterialReq(r.id)}
              >
                Approve
              </button>
              <button
                className="btn-decline"
                onClick={() => declineMaterialReq(r.id)}
              >
                Decline
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )}
</div>


      {/* Current Stock table (unchanged UI) */}
      <div className="material-inventory">
        <h3>Material Inventory</h3>
        {/* table header */}
        <div className="table">
          <div className="thead">
            <div>Material</div>
            <div>Category</div>
            <div>Current Stock</div>
            <div>Minimum Stock</div>
            <div>Unit Price</div>
            <div>Total Value</div>
            <div>Status</div>
          </div>

          <div className="tbody">
            {materials.length === 0 ? (
              <div className="empty-row">No Materials</div>
            ) : (
              materials.map((m) => (
                <div className="row" key={m.id}>
                  <div>{m.name}</div>
                  <div>{m.category || "-"}</div>
                  <div>{m.quantity || 0}</div>
                  <div>{m.minimumStock || 0}</div>
                  <div>{m.unitPrice || 0}</div>
                  <div>{(Number(m.quantity || 0) * Number(m.unitPrice || 0)).toLocaleString()}</div>
                  <div>{(Number(m.quantity || 0) <= Number(m.minimumStock || 0)) ? "Low" : "OK"}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

MaterialsModule.propTypes = {
  materials: PropTypes.array,
  materialTransactions: PropTypes.array,
  onOpenModal: PropTypes.func,
  onAddMaterial: PropTypes.func,
  onAddTransaction: PropTypes.func,
  materialRequests: PropTypes.array,
  onApproveMaterialRequest: PropTypes.func,
  onDeclineMaterialRequest: PropTypes.func,
};

export default MaterialsModule;
