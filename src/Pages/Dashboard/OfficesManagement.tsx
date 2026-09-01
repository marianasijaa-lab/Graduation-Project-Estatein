import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiEdit2, FiSearch, FiTrash2 } from "react-icons/fi";
import { useTheme } from "../../Context/ThemeContext";
import { useOffices } from "../../hooks/useOffices";
import { addDocument, updateDocument, deleteDocument } from "../../api/firestore";
import type { FirestoreOffice } from "../../store/types";
import { Button } from "../../components/ui/Button";
import { OfficeFormModal } from "../../components/sections/dashboard/OfficeFormModal";
import { ConfirmDialog } from "../../components/sections/dashboard/ConfirmDialog";
import { DetailModal, type DetailField } from "../../components/sections/dashboard/DetailModal";
import { DashboardPageShell, staggerItem, rowStagger, rowVariants } from "../../components/dashboard/DashboardPageShell";

const ALL_TYPES = "All";
type FormModalState = { mode: "add" } | { mode: "edit"; office: FirestoreOffice } | null;

function buildOfficeDetailFields(office: FirestoreOffice): DetailField[] {
  return [
    { label: "ID", value: `#${office.id}` },
    { label: "Photo", value: office.image ? <img src={office.image} alt={office.name} loading="lazy" decoding="async" className="w-full max-w-xs h-32 object-cover rounded-lg" /> : "—", fullWidth: true },
    { label: "Name", value: office.name },
    { label: "Type", value: office.type },
    { label: "Address", value: office.address, fullWidth: true },
    { label: "City", value: office.city },
    { label: "Country", value: office.country },
    { label: "Phone", value: office.phone },
    { label: "Email", value: office.email },
    { label: "Description", value: office.description || "—", fullWidth: true },
    { label: "Directions URL", value: office.directionsUrl || "—", fullWidth: true },
    { label: "Latitude", value: office.latitude ?? "—" },
    { label: "Longitude", value: office.longitude ?? "—" },
    { label: "Order", value: office.order ?? "—" },
  ];
}

export const OfficesManagement = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { allOffices: offices, status } = useOffices();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState(ALL_TYPES);
  const [formModal, setFormModal] = useState<FormModalState>(null);
  const [deleteTarget, setDeleteTarget] = useState<FirestoreOffice | null>(null);
  const [detailTarget, setDetailTarget] = useState<FirestoreOffice | null>(null);

  const typeOptions = useMemo(() => [ALL_TYPES, ...Array.from(new Set(offices.map((o) => o.type))).sort()], [offices]);

  const filteredOffices = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return offices
      .filter((o) => {
        const matchesSearch = o.name.toLowerCase().includes(term) || o.city.toLowerCase().includes(term) || o.country.toLowerCase().includes(term);
        const matchesType = typeFilter === ALL_TYPES || o.type === typeFilter;
        return matchesSearch && matchesType;
      })
      .slice()
      .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER));
  }, [offices, searchTerm, typeFilter]);

  const openAddModal = () => setFormModal({ mode: "add" });
  const openEditModal = (o: FirestoreOffice) => setFormModal({ mode: "edit", office: o });
  const closeFormModal = () => setFormModal(null);

  const handleFormSubmit = async (values: Omit<FirestoreOffice, "id">) => {
    try {
      if (formModal?.mode === "edit") await updateDocument<FirestoreOffice>("offices", formModal.office.id, values);
      else await addDocument<FirestoreOffice>("offices", values);
      setFormModal(null);
    } catch (error) {
      console.error("Failed to save office:", error);
      alert(`Failed to save: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      try { await deleteDocument("offices", deleteTarget.id); setDeleteTarget(null); }
      catch (error) { console.error("Failed to delete office:", error); alert(`Failed to delete: ${error instanceof Error ? error.message : String(error)}`); setDeleteTarget(null); }
    } else { setDeleteTarget(null); }
  };

  const openRowDetail = (o: FirestoreOffice) => setDetailTarget(o);
  const handleRowKeyDown = (e: React.KeyboardEvent, o: FirestoreOffice) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openRowDetail(o); }
  };

  const panelClass = isDark ? "bg-bg-dark-1 border-bg-gray-1" : "bg-white border-gray-200";
  const inputClass = `w-full rounded-xl border outline-none transition-colors ${isDark ? "bg-bg-dark border-bg-gray-1 text-white placeholder-gray-500 focus:border-primary" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary"}`;
  const rowHoverClass = isDark ? "hover:bg-bg-gray-1/40" : "hover:bg-gray-50";

  return (
    <DashboardPageShell>
      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className={`text-sm ${isDark ? "text-gray" : "text-gray-500"}`}>
          Manage the offices shown in the "Discover Our Office Locations" tabs on the Contact page — add new locations, update details, or remove closed offices.
        </p>
        <Button text="Add Office" variant="primary" onClick={openAddModal} />
      </motion.div>

      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-gray" : "text-gray-400"}`} />
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, city or country" aria-label="Search by name, city or country" className={`${inputClass} pl-11 pr-4 py-3`} />
        </div>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} aria-label="Filter by type"
          className={`${inputClass} px-4 py-3 cursor-pointer sm:w-64`}>
          {typeOptions.map((o) => (
            <option key={o} value={o} className={isDark ? "bg-bg-dark" : "bg-white"}>{o === ALL_TYPES ? "All Types" : o}</option>
          ))}
        </select>
      </motion.div>

      {status === "loading" && offices.length === 0 && (
        <motion.div variants={staggerItem} className={`rounded-2xl border py-16 text-center text-sm ${panelClass} ${isDark ? "text-gray" : "text-gray-500"}`}>Loading offices…</motion.div>
      )}
      {status === "failed" && (
        <motion.div variants={staggerItem} className="rounded-2xl border border-rose-500/30 bg-rose-500/10 py-16 text-center text-sm text-rose-500">Couldn't load offices. Please try again.</motion.div>
      )}

      {offices.length > 0 && (
        <motion.div variants={staggerItem} className={`hidden lg:block overflow-x-auto rounded-2xl border ${panelClass}`}>
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b text-left ${isDark ? "border-bg-gray-1 text-gray" : "border-gray-200 text-gray-500"}`}>
                <th className="px-5 py-3.5 font-medium">ID</th>
                <th className="px-5 py-3.5 font-medium">Name</th>
                <th className="px-5 py-3.5 font-medium">Location</th>
                <th className="px-5 py-3.5 font-medium">Type</th>
                <th className="px-5 py-3.5 font-medium">Phone</th>
                <th className="px-5 py-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <motion.tbody variants={rowStagger} initial="hidden" animate="visible">
              {filteredOffices.map((office) => (
                <motion.tr key={office.id} variants={rowVariants}
                  tabIndex={0} aria-label={`View details for ${office.name}`}
                  onClick={() => openRowDetail(office)} onKeyDown={(e) => handleRowKeyDown(e, office)}
                  className={`border-b last:border-b-0 cursor-pointer transition-colors ${isDark ? "border-bg-gray-1" : "border-gray-200"} ${rowHoverClass}`}>
                  <td className={`px-5 py-3 ${isDark ? "text-gray" : "text-gray-600"}`}>#{office.id}</td>
                  <td className={`px-5 py-3 font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{office.name}</td>
                  <td className={`px-5 py-3 ${isDark ? "text-gray" : "text-gray-600"}`}>{office.city}, {office.country}</td>
                  <td className={`px-5 py-3 ${isDark ? "text-gray" : "text-gray-600"}`}>{office.type}</td>
                  <td className={`px-5 py-3 ${isDark ? "text-gray" : "text-gray-600"}`}>{office.phone}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" onClick={(e) => { e.stopPropagation(); openEditModal(office); }} aria-label={`Edit ${office.name}`}
                        className={`p-2 rounded-lg transition-colors cursor-pointer ${isDark ? "text-gray hover:bg-bg-gray-1 hover:text-white" : "text-gray-500 hover:bg-gray-100"}`}>
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={(e) => { e.stopPropagation(); setDeleteTarget(office); }} aria-label={`Delete ${office.name}`}
                        className={`p-2 rounded-lg text-rose-500 transition-colors cursor-pointer ${isDark ? "hover:bg-rose-500/10" : "hover:bg-rose-50"}`}>
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filteredOffices.length === 0 && (
                <tr><td colSpan={6} className={`px-5 py-12 text-center ${isDark ? "text-gray" : "text-gray-500"}`}>No offices match your search or filter.</td></tr>
              )}
            </motion.tbody>
          </table>
        </motion.div>
      )}

      {offices.length > 0 && (
        <motion.div variants={rowStagger} initial="hidden" animate="visible" className="lg:hidden flex flex-col gap-4">
          {filteredOffices.map((office) => (
            <motion.div key={office.id} variants={rowVariants}
              tabIndex={0} role="button" aria-label={`View details for ${office.name}`}
              onClick={() => openRowDetail(office)} onKeyDown={(e) => handleRowKeyDown(e, office)}
              className={`rounded-2xl border p-4 cursor-pointer transition-colors ${panelClass} ${rowHoverClass}`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{office.name}</h3>
                  <p className={`text-sm ${isDark ? "text-gray" : "text-gray-500"}`}>{office.city}, {office.country}</p>
                </div>
                <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium border ${isDark ? "border-bg-gray-1 text-gray" : "border-gray-200 text-gray-600"}`}>{office.type}</span>
              </div>
              <div className={`mt-3 flex flex-col gap-1 text-sm ${isDark ? "text-gray" : "text-gray-600"}`}>
                <span><span className="font-medium">Phone:</span> {office.phone}</span>
                <span className="truncate"><span className="font-medium">Email:</span> {office.email}</span>
              </div>
              <div className={`mt-4 grid grid-cols-2 gap-2 pt-4 border-t ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
                <button type="button" onClick={(e) => { e.stopPropagation(); openEditModal(office); }}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${isDark ? "border-bg-gray-1 text-white hover:bg-bg-gray-1" : "border-gray-200 text-gray-700 hover:bg-gray-100"}`}>
                  <FiEdit2 className="w-4 h-4" /> Edit
                </button>
                <button type="button" onClick={(e) => { e.stopPropagation(); setDeleteTarget(office); }}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-rose-500 transition-colors cursor-pointer border ${isDark ? "border-bg-gray-1 hover:bg-rose-500/10" : "border-gray-200 hover:bg-rose-50"}`}>
                  <FiTrash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </motion.div>
          ))}
          {filteredOffices.length === 0 && (
            <div className={`rounded-2xl border py-12 text-center text-sm ${panelClass} ${isDark ? "text-gray" : "text-gray-500"}`}>No offices match your search or filter.</div>
          )}
        </motion.div>
      )}

      {formModal && <OfficeFormModal mode={formModal.mode} initialData={formModal.mode === "edit" ? formModal.office : undefined} onClose={closeFormModal} onSubmit={handleFormSubmit} />}
      {detailTarget && <DetailModal title={detailTarget.name} fields={buildOfficeDetailFields(detailTarget)} onClose={() => setDetailTarget(null)} />}
      <ConfirmDialog open={deleteTarget !== null} title="Delete this office?"
        description={deleteTarget ? `"${deleteTarget.name}" will be permanently removed from the Contact page. This can't be undone.` : ""}
        confirmLabel="Delete" onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} />
    </DashboardPageShell>
  );
};

export default OfficesManagement;
