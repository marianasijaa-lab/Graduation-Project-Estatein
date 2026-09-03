import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit2, FiSearch, FiTrash2, FiHash } from "react-icons/fi";
import { useTheme } from "../../Context/ThemeContext";
import { useAchievements } from "../../hooks/useAchievements";
import { addDocument, updateDocument, deleteDocument, renameDocumentId } from "../../api/firestore";
import type { FirestoreAchievement } from "../../store/types";
import { Button } from "../../components/ui/Button";
import { AchievementFormModal } from "../../components/sections/dashboard/AchievementFormModal";
import { ConfirmDialog } from "../../components/sections/dashboard/ConfirmDialog";
import { RenameIdDialog } from "../../components/sections/dashboard/RenameIdDialog";
import { DetailModal, type DetailField } from "../../components/sections/dashboard/DetailModal";
import {
  DashboardPageShell, staggerItem, iconBtnHover, deleteBtnHover, cardHoverProps, SkeletonRow, SkeletonCard,
  tableRowVariants,
} from "../../components/dashboard/DashboardPageShell";

const shortId = (id: string) => id.length > 8 ? id.slice(0, 8) : id;

type FormModalState = { mode: "add" } | { mode: "edit"; achievement: FirestoreAchievement } | null;

function buildAchievementDetailFields(achievement: FirestoreAchievement): DetailField[] {
  return [
    { label: "ID", value: `#${achievement.id}` },
    { label: "Title", value: achievement.title },
    { label: "Description", value: achievement.description, fullWidth: true },
  ];
}

export const AchievementsManagement = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { achievements, status } = useAchievements();
  const [searchTerm, setSearchTerm] = useState("");
  const [formModal, setFormModal] = useState<FormModalState>(null);
  const [deleteTarget, setDeleteTarget] = useState<FirestoreAchievement | null>(null);
  const [detailTarget, setDetailTarget] = useState<FirestoreAchievement | null>(null);
  const [renameTarget, setRenameTarget] = useState<FirestoreAchievement | null>(null);

  const filteredAchievements = achievements.filter((a) =>
    a.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );

  const openAddModal = () => setFormModal({ mode: "add" });
  const openEditModal = (a: FirestoreAchievement) => setFormModal({ mode: "edit", achievement: a });
  const closeFormModal = () => setFormModal(null);

  const handleFormSubmit = async (values: Omit<FirestoreAchievement, "id">) => {
    try {
      if (formModal?.mode === "edit") await updateDocument<FirestoreAchievement>("achievements", formModal.achievement.id, values);
      else await addDocument<FirestoreAchievement>("achievements", values);
    } catch (error) { console.error("Failed to save achievement:", error); }
    setFormModal(null);
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      try { await deleteDocument("achievements", deleteTarget.id); }
      catch (error) { console.error("Failed to delete achievement:", error); }
    }
    setDeleteTarget(null);
  };

  const handleRename = async (newId: string) => {
    if (!renameTarget) return;
    await renameDocumentId("achievements", renameTarget.id, newId);
    setRenameTarget(null);
  };

  const openRowDetail = (a: FirestoreAchievement) => setDetailTarget(a);
  const handleRowKeyDown = (e: React.KeyboardEvent, a: FirestoreAchievement) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openRowDetail(a); }
  };

  const panelClass = isDark ? "bg-bg-dark-1 border-bg-gray-1" : "bg-white border-gray-200";
  const inputClass = `w-full rounded-xl border outline-none transition-colors ${isDark ? "bg-bg-dark border-bg-gray-1 text-white placeholder-gray-500 focus:border-primary" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary"}`;
  const rowHoverClass = isDark ? "hover:bg-bg-gray-1/40" : "hover:bg-gray-50";
  const renameBtnClass = `p-2 rounded-lg transition-colors cursor-pointer ${isDark ? "text-gray hover:bg-bg-gray-1 hover:text-white" : "text-gray-500 hover:bg-gray-100"}`;

  return (
    <DashboardPageShell>
      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className={`text-sm ${isDark ? "text-gray" : "text-gray-500"}`}>
          Manage the achievement cards shown on the About Us page — add, update, or remove the milestones Estatein highlights.
        </p>
        <Button text="Add Achievement" variant="primary" onClick={openAddModal} />
      </motion.div>

      <motion.div variants={staggerItem} className="relative">
        <FiSearch className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-gray" : "text-gray-400"}`} />
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title" aria-label="Search by title"
          className={`${inputClass} pl-11 pr-4 py-3`} />
      </motion.div>

      {status !== "succeeded" && status !== "failed" && (
        <>
          <motion.div variants={staggerItem} className={`hidden lg:block rounded-2xl border overflow-hidden ${panelClass}`}>
            <table className="w-full text-sm"><tbody>{Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} cols={4} isDark={isDark} />)}</tbody></table>
          </motion.div>
          <motion.div variants={staggerItem} className="lg:hidden flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} isDark={isDark} />)}
          </motion.div>
        </>
      )}
      {status === "failed" && (
        <motion.div variants={staggerItem} className="rounded-2xl border border-rose-500/30 bg-rose-500/10 py-16 text-center text-sm text-rose-500">
          Couldn't load achievements. Please try again.
        </motion.div>
      )}

      {status === "succeeded" && (
        <motion.div variants={staggerItem} className={`hidden lg:block overflow-x-auto table-scroll rounded-2xl border ${panelClass}`}>
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b text-left ${isDark ? "border-bg-gray-1 text-gray" : "border-gray-200 text-gray-500"}`}>
                <th className="px-5 py-3.5 font-medium">ID</th>
                <th className="px-5 py-3.5 font-medium">Title</th>
                <th className="px-5 py-3.5 font-medium">Description</th>
                <th className="px-5 py-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <AnimatePresence mode="wait">
              <motion.tbody initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                {filteredAchievements.map((achievement) => (
                  <motion.tr key={achievement.id} variants={tableRowVariants}
                    tabIndex={0} aria-label={`View details for ${achievement.title}`}
                    onClick={() => openRowDetail(achievement)} onKeyDown={(e) => handleRowKeyDown(e, achievement)}
                    className={`border-b last:border-b-0 cursor-pointer transition-colors ${isDark ? "border-bg-gray-1" : "border-gray-200"} ${rowHoverClass}`}>
                    <td className={`px-5 py-3 ${isDark ? "text-gray" : "text-gray-600"}`}>
                      <span title={`Full ID: ${achievement.id}`} className="cursor-help font-mono">#{shortId(achievement.id)}</span>
                    </td>
                    <td className={`px-5 py-3 font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{achievement.title}</td>
                    <td className={`px-5 py-3 max-w-md truncate ${isDark ? "text-gray" : "text-gray-600"}`} title={achievement.description}>{achievement.description}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <motion.button type="button" onClick={(e) => { e.stopPropagation(); setRenameTarget(achievement); }}
                          aria-label={`Rename ID of ${achievement.title}`} {...iconBtnHover} className={renameBtnClass}>
                          <FiHash className="w-4 h-4" />
                        </motion.button>
                        <motion.button type="button" onClick={(e) => { e.stopPropagation(); openEditModal(achievement); }}
                          aria-label={`Edit ${achievement.title}`} {...iconBtnHover}
                          className={`p-2 rounded-lg transition-colors cursor-pointer ${isDark ? "text-gray hover:bg-bg-gray-1 hover:text-white" : "text-gray-500 hover:bg-gray-100"}`}>
                          <FiEdit2 className="w-4 h-4" />
                        </motion.button>
                        <motion.button type="button" onClick={(e) => { e.stopPropagation(); setDeleteTarget(achievement); }}
                          aria-label={`Delete ${achievement.title}`} {...deleteBtnHover}
                          className={`p-2 rounded-lg text-rose-500 transition-colors cursor-pointer ${isDark ? "hover:bg-rose-500/10" : "hover:bg-rose-50"}`}>
                          <FiTrash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {filteredAchievements.length === 0 && (
                  <tr><td colSpan={4} className={`px-5 py-12 text-center ${isDark ? "text-gray" : "text-gray-500"}`}>No achievements match your search.</td></tr>
                )}
              </motion.tbody>
            </AnimatePresence>
          </table>
        </motion.div>
      )}

      {status === "succeeded" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="lg:hidden flex flex-col gap-4">
          {filteredAchievements.map((achievement) => (
            <motion.div key={achievement.id} variants={tableRowVariants} {...cardHoverProps}
              tabIndex={0} role="button" aria-label={`View details for ${achievement.title}`}
              onClick={() => openRowDetail(achievement)} onKeyDown={(e) => handleRowKeyDown(e, achievement)}
              className={`rounded-2xl border p-4 cursor-pointer transition-colors ${panelClass} ${rowHoverClass}`}>
              <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{achievement.title}</h3>
              <p className={`mt-1 text-sm line-clamp-3 ${isDark ? "text-gray" : "text-gray-500"}`}>{achievement.description}</p>
              <div className={`mt-4 grid grid-cols-3 gap-2 pt-4 border-t ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
                <motion.button type="button" onClick={(e) => { e.stopPropagation(); setRenameTarget(achievement); }}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.15 }}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${isDark ? "border-bg-gray-1 text-white hover:bg-bg-gray-1" : "border-gray-200 text-gray-700 hover:bg-gray-100"}`}>
                  <FiHash className="w-4 h-4" /> ID
                </motion.button>
                <motion.button type="button" onClick={(e) => { e.stopPropagation(); openEditModal(achievement); }}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.15 }}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${isDark ? "border-bg-gray-1 text-white hover:bg-bg-gray-1" : "border-gray-200 text-gray-700 hover:bg-gray-100"}`}>
                  <FiEdit2 className="w-4 h-4" /> Edit
                </motion.button>
                <motion.button type="button" onClick={(e) => { e.stopPropagation(); setDeleteTarget(achievement); }}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.15 }}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-rose-500 transition-colors cursor-pointer border ${isDark ? "border-bg-gray-1 hover:bg-rose-500/10" : "border-gray-200 hover:bg-rose-50"}`}>
                  <FiTrash2 className="w-4 h-4" /> Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
          {filteredAchievements.length === 0 && (
            <div className={`rounded-2xl border py-12 text-center text-sm ${panelClass} ${isDark ? "text-gray" : "text-gray-500"}`}>No achievements match your search.</div>
          )}
        </motion.div>
      )}

      {formModal && (
        <AchievementFormModal mode={formModal.mode}
          initialData={formModal.mode === "edit" ? formModal.achievement : undefined}
          onClose={closeFormModal} onSubmit={handleFormSubmit} />
      )}
      {detailTarget && (
        <DetailModal title={detailTarget.title} fields={buildAchievementDetailFields(detailTarget)} onClose={() => setDetailTarget(null)} />
      )}
      <RenameIdDialog
        open={renameTarget !== null}
        currentId={renameTarget?.id ?? ""}
        collectionName="achievements"
        onConfirm={handleRename}
        onCancel={() => setRenameTarget(null)}
      />
      <ConfirmDialog open={deleteTarget !== null} title="Delete this achievement?"
        description={deleteTarget ? `"${deleteTarget.title}" will be permanently removed. This can't be undone.` : ""}
        confirmLabel="Delete" onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} />
    </DashboardPageShell>
  );
};

export default AchievementsManagement;
