import { useState } from "react";
import { motion } from "framer-motion";
import { FiEdit2, FiSearch, FiTrash2 } from "react-icons/fi";
import { useTheme } from "../../Context/ThemeContext";
import { useProperties } from "../../hooks/useProperties";
import { addDocument, updateDocument, deleteDocument } from "../../api/firestore";
import type { FirestoreProperty } from "../../store/types";
import { Button } from "../../components/ui/Button";
import { PropertyFormModal } from "../../components/sections/dashboard/PropertyFormModal";
import { ConfirmDialog } from "../../components/sections/dashboard/ConfirmDialog";
import { DetailModal, type DetailField } from "../../components/sections/dashboard/DetailModal";
import { DashboardPageShell, staggerItem, rowStagger, rowVariants } from "../../components/dashboard/DashboardPageShell";

type FormModalState = { mode: "add" } | { mode: "edit"; property: FirestoreProperty } | null;

function formatCreatedAt(createdAt: FirestoreProperty["createdAt"]): string {
  if (!createdAt) return "—";
  const value: unknown = createdAt;
  if (value !== null && typeof value === "object" && "toDate" in value && typeof (value as { toDate: unknown }).toDate === "function") {
    return (value as { toDate: () => Date }).toDate().toLocaleString();
  }
  const parsed = new Date(createdAt);
  return Number.isNaN(parsed.getTime()) ? String(createdAt) : parsed.toLocaleString();
}

function buildPropertyDetailFields(property: FirestoreProperty): DetailField[] {
  return [
    { label: "ID", value: `#${property.id}` },
    { label: "Image", value: <img src={property.image} alt={property.name} className="w-full max-w-xs h-32 object-cover rounded-lg" />, fullWidth: true },
    { label: "Name", value: property.name },
    { label: "Marketing Tag", value: property.tag || "—" },
    { label: "Short Description", value: property.descriptionShort, fullWidth: true },
    { label: "Long Description", value: property.descriptionLong, fullWidth: true },
    { label: "Bedrooms", value: <span className="flex items-center gap-2">{property.bedroomIcon && <img src={property.bedroomIcon} alt="" className="w-4 h-4" />}{property.bedrooms ?? "—"}</span> },
    { label: "Bathrooms", value: <span className="flex items-center gap-2">{property.bathroomIcon && <img src={property.bathroomIcon} alt="" className="w-4 h-4" />}{property.bathrooms ?? "—"}</span> },
    { label: "Property Type", value: <span className="flex items-center gap-2">{property.propertyTypeIcon && <img src={property.propertyTypeIcon} alt="" className="w-4 h-4" />}{property.propertyType ?? "—"}</span> },
    { label: "Price — Home Page", value: `${property.currency ?? "USD"} ${property.priceHome.toLocaleString()}` },
    { label: "Price — Properties Page", value: `${property.currency ?? "USD"} ${property.priceProperties.toLocaleString()}` },
    { label: "Location", value: property.location || "—" },
    { label: "Size", value: property.size !== undefined ? `${property.size.toLocaleString()} sq ft` : "—" },
    { label: "Build Year", value: property.buildYear ?? "—" },
    { label: "Featured", value: property.featured ? "Yes" : "No" },
    { label: "Amenities", value: property.amenities && property.amenities.length > 0 ? <div className="flex flex-wrap gap-2">{property.amenities.map((a) => <span key={a} className="px-2.5 py-1 rounded-full text-xs font-medium border border-gray-500/20 bg-gray-500/10 text-current">{a}</span>)}</div> : "—", fullWidth: true },
    { label: "Created At", value: formatCreatedAt(property.createdAt) },
  ];
}

export const PropertiesManagement = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { properties, status } = useProperties();
  const [searchTerm, setSearchTerm] = useState("");
  const [formModal, setFormModal] = useState<FormModalState>(null);
  const [deleteTarget, setDeleteTarget] = useState<FirestoreProperty | null>(null);
  const [detailTarget, setDetailTarget] = useState<FirestoreProperty | null>(null);

  const filteredProperties = properties.filter((p) => p.name.toLowerCase().includes(searchTerm.trim().toLowerCase()));

  const openAddModal = () => setFormModal({ mode: "add" });
  const openEditModal = (p: FirestoreProperty) => setFormModal({ mode: "edit", property: p });
  const closeFormModal = () => setFormModal(null);

  const handleFormSubmit = async (values: Omit<FirestoreProperty, "id">) => {
    try {
      if (formModal?.mode === "edit") await updateDocument<FirestoreProperty>("properties", formModal.property.id, values);
      else await addDocument<FirestoreProperty>("properties", values);
      setFormModal(null);
    } catch (error) {
      console.error("Failed to save property:", error);
      alert(`Failed to save: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      try { await deleteDocument("properties", deleteTarget.id); setDeleteTarget(null); }
      catch (error) { console.error("Failed to delete property:", error); alert(`Failed to delete: ${error instanceof Error ? error.message : String(error)}`); setDeleteTarget(null); }
    } else { setDeleteTarget(null); }
  };

  const openRowDetail = (p: FirestoreProperty) => setDetailTarget(p);
  const handleRowKeyDown = (e: React.KeyboardEvent, p: FirestoreProperty) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openRowDetail(p); }
  };

  const panelClass = isDark ? "bg-bg-dark-1 border-bg-gray-1" : "bg-white border-gray-200";
  const inputClass = `w-full rounded-xl border outline-none transition-colors ${isDark ? "bg-bg-dark border-bg-gray-1 text-white placeholder-gray-500 focus:border-primary" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary"}`;
  const rowHoverClass = isDark ? "hover:bg-bg-gray-1/40" : "hover:bg-gray-50";

  return (
    <DashboardPageShell>
      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className={`text-sm ${isDark ? "text-gray" : "text-gray-500"}`}>
          Manage every property listing shown across the site — add new listings, update details, or retire ones that are no longer available.
        </p>
        <Button text="Add Property" variant="primary" onClick={openAddModal} />
      </motion.div>

      <motion.div variants={staggerItem} className="relative">
        <FiSearch className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-gray" : "text-gray-400"}`} />
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by property name" aria-label="Search by property name" className={`${inputClass} pl-11 pr-4 py-3`} />
      </motion.div>

      {status === "loading" && properties.length === 0 && (
        <motion.div variants={staggerItem} className={`rounded-2xl border py-16 text-center text-sm ${panelClass} ${isDark ? "text-gray" : "text-gray-500"}`}>Loading properties…</motion.div>
      )}
      {status === "failed" && (
        <motion.div variants={staggerItem} className="rounded-2xl border border-rose-500/30 bg-rose-500/10 py-16 text-center text-sm text-rose-500">Couldn't load properties. Please try again.</motion.div>
      )}

      {properties.length > 0 && (
        <motion.div variants={staggerItem} className={`hidden lg:block rounded-2xl border ${panelClass}`}>
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b text-left ${isDark ? "border-bg-gray-1 text-gray" : "border-gray-200 text-gray-500"}`}>
                <th className="px-5 py-3.5 font-medium">ID</th>
                <th className="px-5 py-3.5 font-medium">Image</th>
                <th className="px-5 py-3.5 font-medium">Name</th>
                <th className="px-5 py-3.5 font-medium">Type</th>
                <th className="px-5 py-3.5 font-medium">Price</th>
                <th className="px-5 py-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <motion.tbody variants={rowStagger} initial="hidden" animate="visible">
              {filteredProperties.map((property) => (
                <motion.tr key={property.id} variants={rowVariants}
                  tabIndex={0} aria-label={`View details for ${property.name}`}
                  onClick={() => openRowDetail(property)} onKeyDown={(e) => handleRowKeyDown(e, property)}
                  className={`border-b last:border-b-0 cursor-pointer transition-colors ${isDark ? "border-bg-gray-1" : "border-gray-200"} ${rowHoverClass}`}>
                  <td className={`px-5 py-3 ${isDark ? "text-gray" : "text-gray-600"}`}>#{property.id}</td>
                  <td className="px-5 py-3">
                    <img src={property.image} alt={property.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                  </td>
                  <td className={`px-5 py-3 font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                    <span className="inline-flex items-center gap-1.5">
                      {property.name}
                      {property.featured && <span title="Featured" aria-label="Featured" className="text-primary-light text-xs">★</span>}
                    </span>
                  </td>
                  <td className={`px-5 py-3 ${isDark ? "text-gray" : "text-gray-600"}`}>{property.propertyType ?? "—"}</td>
                  <td className={`px-5 py-3 font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{property.currency ?? "USD"} {property.priceProperties.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" onClick={(e) => { e.stopPropagation(); openEditModal(property); }} aria-label={`Edit ${property.name}`}
                        className={`p-2 rounded-lg transition-colors cursor-pointer ${isDark ? "text-gray hover:bg-bg-gray-1 hover:text-white" : "text-gray-500 hover:bg-gray-100"}`}>
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={(e) => { e.stopPropagation(); setDeleteTarget(property); }} aria-label={`Delete ${property.name}`}
                        className={`p-2 rounded-lg text-rose-500 transition-colors cursor-pointer ${isDark ? "hover:bg-rose-500/10" : "hover:bg-rose-50"}`}>
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filteredProperties.length === 0 && (
                <tr><td colSpan={6} className={`px-5 py-12 text-center ${isDark ? "text-gray" : "text-gray-500"}`}>No properties match your search.</td></tr>
              )}
            </motion.tbody>
          </table>
        </motion.div>
      )}

      {properties.length > 0 && (
        <motion.div variants={rowStagger} initial="hidden" animate="visible" className="lg:hidden flex flex-col gap-4">
          {filteredProperties.map((property) => (
            <motion.div key={property.id} variants={rowVariants}
              tabIndex={0} role="button" aria-label={`View details for ${property.name}`}
              onClick={() => openRowDetail(property)} onKeyDown={(e) => handleRowKeyDown(e, property)}
              className={`rounded-2xl border p-4 cursor-pointer transition-colors ${panelClass} ${rowHoverClass}`}>
              <div className="flex items-start gap-3">
                <img src={property.image} alt={property.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold truncate flex items-center gap-1.5 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {property.name}
                    {property.featured && <span title="Featured" aria-label="Featured" className="text-primary-light text-xs">★</span>}
                  </h3>
                  <p className={`text-sm truncate ${isDark ? "text-gray" : "text-gray-500"}`}>{property.propertyType ?? "—"} · {property.bedrooms ?? "—"} bd / {property.bathrooms ?? "—"} ba</p>
                </div>
              </div>
              <div className={`mt-4 flex items-center justify-between text-sm ${isDark ? "text-gray" : "text-gray-600"}`}>
                <span>Price</span>
                <span className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{property.currency ?? "USD"} {property.priceProperties.toLocaleString()}</span>
              </div>
              <div className={`mt-4 grid grid-cols-2 gap-2 pt-4 border-t ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
                <button type="button" onClick={(e) => { e.stopPropagation(); openEditModal(property); }}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${isDark ? "border-bg-gray-1 text-white hover:bg-bg-gray-1" : "border-gray-200 text-gray-700 hover:bg-gray-100"}`}>
                  <FiEdit2 className="w-4 h-4" /> Edit
                </button>
                <button type="button" onClick={(e) => { e.stopPropagation(); setDeleteTarget(property); }}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-rose-500 transition-colors cursor-pointer border ${isDark ? "border-bg-gray-1 hover:bg-rose-500/10" : "border-gray-200 hover:bg-rose-50"}`}>
                  <FiTrash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </motion.div>
          ))}
          {filteredProperties.length === 0 && (
            <div className={`rounded-2xl border py-12 text-center text-sm ${panelClass} ${isDark ? "text-gray" : "text-gray-500"}`}>No properties match your search.</div>
          )}
        </motion.div>
      )}

      {formModal && <PropertyFormModal key={formModal.mode === "edit" ? formModal.property.id : "add"} mode={formModal.mode} initialData={formModal.mode === "edit" ? formModal.property : undefined} onClose={closeFormModal} onSubmit={handleFormSubmit} />}
      {detailTarget && <DetailModal title={detailTarget.name} fields={buildPropertyDetailFields(detailTarget)} onClose={() => setDetailTarget(null)} />}
      <ConfirmDialog open={deleteTarget !== null} title="Delete this property?"
        description={deleteTarget ? `"${deleteTarget.name}" will be permanently removed from the listings. This can't be undone.` : ""}
        confirmLabel="Delete" onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} />
    </DashboardPageShell>
  );
};

export default PropertiesManagement;
