import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit2, FiSearch, FiTrash2 } from "react-icons/fi";
import { HiOutlineEye } from "react-icons/hi2";
import { useTheme } from "../../Context/ThemeContext";
import { useEffortlessPropertyManagement } from "../../hooks/useEffortlessPropertyManagement";
import { addDocument, updateDocument, deleteDocument } from "../../api/firestore";
import { notifySuccess, notifyError, getErrorMessage } from "../../utils/notify";
import type { FirestoreEffortlessPropertyManagementCard } from "../../store/types";
import { Button } from "../../components/ui/Button";
import { EffortlessPropertyManagementFormModal } from "../../components/sections/dashboard/EffortlessPropertyManagementFormModal";
import { ConfirmDialog } from "../../components/sections/dashboard/ConfirmDialog";
import { DetailModal, type DetailField } from "../../components/sections/dashboard/DetailModal";
import {
  DashboardPageShell, staggerItem, iconBtnHover, deleteBtnHover, cardHoverProps, SkeletonRow,
  tableRowVariants,
} from "../../components/dashboard/DashboardPageShell";

const shortId = (id: string) => id.length > 8 ? id.slice(0, 8) : id;

type FormModalState = { mode: "add" } | { mode: "edit"; card: FirestoreEffortlessPropertyManagementCard } | null;

function buildCardDetailFields(card: FirestoreEffortlessPropertyManagementCard): DetailField[] {
  return [
    { label: "ID", value: `#${card.id}` },
    { label: "Icon", value: <img src={card.icon} alt="" className="w-16 h-16 object-contain" /> },
    { label: "Title", value: card.title },
    { label: "Description", value: card.description, fullWidth: true },
  ];
}

export const EffortlessPropertyManagementManagement = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { effortlessPropertyManagement, status } = useEffortlessPropertyManagement();
  const [searchTerm, setSearchTerm] = useState("");
  const [formModal, setFormModal] = useState<FormModalState>(null);
  const [deleteTarget, setDeleteTarget] = useState<FirestoreEffortlessPropertyManagementCard | null>(null);
  const [detailTarget, setDetailTarget] = useState<FirestoreEffortlessPropertyManagementCard | null>(null);

  const filteredCards = effortlessPropertyManagement.filter((c) => c.title.toLowerCase().includes(searchTerm.trim().toLowerCase()));

  const openAddModal = () => setFormModal({ mode: "add" });
  const openEditModal = (c: FirestoreEffortlessPropertyManagementCard) => setFormModal({ mode: "edit", card: c });
  const closeFormModal = () => setFormModal(null);

  const handleFormSubmit = async (values: Omit<FirestoreEffortlessPropertyManagementCard, "id">) => {
    try {
      if (formModal?.mode === "edit") {
        await updateDocument<FirestoreEffortlessPropertyManagementCard>("effortlessPropertyManagement", formModal.card.id, values);
        notifySuccess("Management card updated");
      } else {
        await addDocument<FirestoreEffortlessPropertyManagementCard>("effortlessPropertyManagement", values);
        notifySuccess("Management card added");
      }
    } catch (error) {
      console.error("Failed to save card:", error);
      notifyError(getErrorMessage(error, "Couldn't save the card."));
    }
    setFormModal(null);
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      try {
        await deleteDocument("effortlessPropertyManagement", deleteTarget.id);
        notifySuccess("Management card deleted");
      } catch (error) {
        console.error("Failed to delete card:", error);
        notifyError(getErrorMessage(error, "Couldn't delete the card."));
      }
    }
    setDeleteTarget(null);
  };

  const openRowDetail = (c: FirestoreEffortlessPropertyManagementCard) => setDetailTarget(c);
  const handleRowKeyDown = (e: React.KeyboardEvent, c: FirestoreEffortlessPropertyManagementCard) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openRowDetail(c); }
  };

  const panelClass = isDark ? "bg-bg-dark-1 border-bg-gray-1" : "bg-white border-gray-200";
  const inputClass = `w-full rounded-xl border outline-none transition-colors ${isDark ? "bg-bg-dark border-bg-gray-1 text-white placeholder-gray-500 focus:border-primary" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary"}`;
  const rowHoverClass = isDark ? "hover:bg-bg-gray-1/40" : "hover:bg-gray-50";
  const iconBtnClass = `p-2 rounded-lg transition-colors cursor-pointer ${isDark ? "text-gray hover:bg-bg-gray-1 hover:text-white" : "text-gray-500 hover:bg-gray-100"}`;

  return (
    <DashboardPageShell>
      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className={`text-sm ${isDark ? "text-gray" : "text-gray-500"}`}>
          Manage the cards in the "Effortless Property Management" section on the Services page — add, update, or remove them. The section's header text and banner stay fixed.
        </p>
        <Button text="Add Card" variant="primary" onClick={openAddModal} />
      </motion.div>

      <motion.div variants={staggerItem} className="relative">
        <FiSearch className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-gray" : "text-gray-400"}`} />
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title" aria-label="Search by title" className={`${inputClass} pl-11 pr-4 py-3`} />
      </motion.div>

      {status !== "succeeded" && status !== "failed" && (
        <motion.div variants={staggerItem} className={`rounded-2xl border py-16 text-center text-sm ${panelClass} ${isDark ? "text-gray" : "text-gray-500"}`}>Loading cards…</motion.div>
      )}
      {status === "failed" && (
        <motion.div variants={staggerItem} className="rounded-2xl border border-rose-500/30 bg-rose-500/10 py-16 text-center text-sm text-rose-500">Couldn't load cards. Please try again.</motion.div>
      )}

      {status === "succeeded" && (
        <motion.div variants={staggerItem} className={`hidden lg:block overflow-x-auto table-scroll rounded-2xl border ${panelClass}`}>
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b text-left ${isDark ? "border-bg-gray-1 text-gray" : "border-gray-200 text-gray-500"}`}>
                <th className="px-5 py-3.5 font-medium">ID</th>
                <th className="px-5 py-3.5 font-medium">Icon</th>
                <th className="px-5 py-3.5 font-medium">Title</th>
                <th className="px-5 py-3.5 font-medium">Description</th>
                <th className="px-5 py-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <AnimatePresence mode="wait"><motion.tbody initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {filteredCards.map((card) => (
                <motion.tr key={card.id} variants={tableRowVariants}
                  tabIndex={0} aria-label={`View details for ${card.title}`}
                  onClick={() => openRowDetail(card)} onKeyDown={(e) => handleRowKeyDown(e, card)}
                  className={`border-b last:border-b-0 cursor-pointer transition-colors ${isDark ? "border-bg-gray-1" : "border-gray-200"} ${rowHoverClass}`}>
                  <td className={`px-5 py-3 ${isDark ? "text-gray" : "text-gray-600"}`}><span title={`Full ID: ${card.id}`} className="cursor-help font-mono">#{shortId(card.id)}</span></td>
                  <td className="px-5 py-3">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0 border ${isDark ? "bg-bg-dark border-bg-gray-1" : "bg-gray-50 border-gray-200"}`}>
                      <img src={card.icon} alt="" className="w-5 h-5 object-contain" />
                    </div>
                  </td>
                  <td className={`px-5 py-3 font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{card.title}</td>
                  <td className={`px-5 py-3 max-w-md truncate ${isDark ? "text-gray" : "text-gray-600"}`} title={card.description}>{card.description}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <motion.a href="/services#effortless-property-management" onClick={(e) => e.stopPropagation()} aria-label="View on site" title="View on site" {...iconBtnHover} className={iconBtnClass}>
                        <HiOutlineEye className="w-4 h-4" />
                      </motion.a>
                      <motion.button type="button" onClick={(e) => { e.stopPropagation(); openEditModal(card); }} aria-label={`Edit ${card.title}`} {...iconBtnHover} className={iconBtnClass}>
                        <FiEdit2 className="w-4 h-4" />
                      </motion.button>
                      <motion.button type="button" onClick={(e) => { e.stopPropagation(); setDeleteTarget(card); }} aria-label={`Delete ${card.title}`} {...deleteBtnHover}
                        className={`p-2 rounded-lg text-rose-500 transition-colors cursor-pointer ${isDark ? "hover:bg-rose-500/10" : "hover:bg-rose-50"}`}>
                        <FiTrash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filteredCards.length === 0 && (
                <tr><td colSpan={5} className={`px-5 py-12 text-center ${isDark ? "text-gray" : "text-gray-500"}`}>No cards match your search.</td></tr>
              )}
            </motion.tbody></AnimatePresence>
          </table>
        </motion.div>
      )}

      {status === "succeeded" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="lg:hidden flex flex-col gap-4">
          {filteredCards.map((card) => (
            <motion.div key={card.id} variants={tableRowVariants} {...cardHoverProps} tabIndex={0} role="button" aria-label={`View details for ${card.title}`}
              onClick={() => openRowDetail(card)} onKeyDown={(e) => handleRowKeyDown(e, card)}
              className={`rounded-2xl border p-4 cursor-pointer transition-colors ${panelClass} ${rowHoverClass}`}>
              <div className="flex items-start gap-3">
                <div className={`flex items-center justify-center w-14 h-14 rounded-lg shrink-0 border ${isDark ? "bg-bg-dark border-bg-gray-1" : "bg-gray-50 border-gray-200"}`}>
                  <img src={card.icon} alt="" className="w-7 h-7 object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold truncate ${isDark ? "text-white" : "text-gray-900"}`}>{card.title}</h3>
                  <p className={`text-sm line-clamp-2 ${isDark ? "text-gray" : "text-gray-500"}`}>{card.description}</p>
                </div>
              </div>
              <div className={`mt-4 grid grid-cols-2 gap-2 pt-4 border-t ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
                <motion.button type="button" onClick={(e) => { e.stopPropagation(); openEditModal(card); }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.15 }}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${isDark ? "border-bg-gray-1 text-white hover:bg-bg-gray-1" : "border-gray-200 text-gray-700 hover:bg-gray-100"}`}>
                  <FiEdit2 className="w-4 h-4" /> Edit</motion.button>
                <motion.button type="button" onClick={(e) => { e.stopPropagation(); setDeleteTarget(card); }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.15 }}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-rose-500 transition-colors cursor-pointer border ${isDark ? "border-bg-gray-1 hover:bg-rose-500/10" : "border-gray-200 hover:bg-rose-50"}`}>
                  <FiTrash2 className="w-4 h-4" /> Delete</motion.button>
              </div>
            </motion.div>
          ))}
          {filteredCards.length === 0 && (
            <div className={`rounded-2xl border py-12 text-center text-sm ${panelClass} ${isDark ? "text-gray" : "text-gray-500"}`}>No cards match your search.</div>
          )}
        </motion.div>
      )}

      {formModal && <EffortlessPropertyManagementFormModal mode={formModal.mode} initialData={formModal.mode === "edit" ? formModal.card : undefined} onClose={closeFormModal} onSubmit={handleFormSubmit} />}
      {detailTarget && <DetailModal title={detailTarget.title} fields={buildCardDetailFields(detailTarget)} onClose={() => setDetailTarget(null)} />}
      <ConfirmDialog open={deleteTarget !== null} title="Delete this card?"
        description={deleteTarget ? `"${deleteTarget.title}" will be permanently removed from the Services page. This can't be undone.` : ""}
        confirmLabel="Delete" onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} />
    </DashboardPageShell>
  );
};

export default EffortlessPropertyManagementManagement;
