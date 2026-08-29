import { useState } from "react";
import { FiEdit2, FiSearch, FiTrash2 } from "react-icons/fi";
import { useTheme } from "../../Context/ThemeContext";
import { useAchievements } from "../../hooks/useAchievements";
import { addDocument, updateDocument, deleteDocument } from "../../api/firestore";
import type { FirestoreAchievement } from "../../store/types";
import { Button } from "../../components/ui/Button";
import { AchievementFormModal } from "../../components/sections/dashboard/AchievementFormModal";
import { ConfirmDialog } from "../../components/sections/dashboard/ConfirmDialog";
import { DetailModal, type DetailField } from "../../components/sections/dashboard/DetailModal";

type FormModalState = { mode: "add" } | { mode: "edit"; achievement: FirestoreAchievement } | null;

// Every Achievement field, for the detail view.
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

  const filteredAchievements = achievements.filter((achievement) =>
    achievement.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );

  const openAddModal = () => setFormModal({ mode: "add" });
  const openEditModal = (achievement: FirestoreAchievement) => setFormModal({ mode: "edit", achievement });
  const closeFormModal = () => setFormModal(null);

  const handleFormSubmit = async (values: Omit<FirestoreAchievement, "id">) => {
    try {
      if (formModal?.mode === "edit") {
        // Partial merge — Firestore only touches the fields this form sends.
        await updateDocument<FirestoreAchievement>("achievements", formModal.achievement.id, values);
      } else {
        await addDocument<FirestoreAchievement>("achievements", values);
      }
    } catch (error) {
      console.error("Failed to save achievement:", error);
    }
    setFormModal(null);
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      try {
        await deleteDocument("achievements", deleteTarget.id);
      } catch (error) {
        console.error("Failed to delete achievement:", error);
      }
    }
    setDeleteTarget(null);
  };

  const openRowDetail = (achievement: FirestoreAchievement) => setDetailTarget(achievement);
  const handleRowKeyDown = (e: React.KeyboardEvent, achievement: FirestoreAchievement) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openRowDetail(achievement);
    }
  };

  const panelClass = isDark ? "bg-bg-dark-1 border-bg-gray-1" : "bg-white border-gray-200";
  const inputClass = `w-full rounded-xl border outline-none transition-colors ${
    isDark
      ? "bg-bg-dark border-bg-gray-1 text-white placeholder-gray-500 focus:border-primary"
      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary"
  }`;
  const rowHoverClass = isDark ? "hover:bg-bg-gray-1/40" : "hover:bg-gray-50";

  return (
    <div className="flex flex-col gap-6">
      {/* ── Page intro + primary action ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className={`text-sm ${isDark ? "text-gray" : "text-gray-500"}`}>
          Manage the achievement cards shown on the About Us page — add, update, or remove
          the milestones Estatein highlights.
        </p>
        <Button text="Add Achievement" variant="primary" onClick={openAddModal} />
      </div>

      {/* ── Toolbar: search ── */}
      <div className="relative">
        <FiSearch
          className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-gray" : "text-gray-400"}`}
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title"
          aria-label="Search by title"
          className={`${inputClass} pl-11 pr-4 py-3`}
        />
      </div>

      {status === "loading" && achievements.length === 0 && (
        <div className={`rounded-2xl border py-16 text-center text-sm ${panelClass} ${isDark ? "text-gray" : "text-gray-500"}`}>
          Loading achievements…
        </div>
      )}

      {status === "failed" && (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 py-16 text-center text-sm text-rose-500">
          Couldn't load achievements. Please try again.
        </div>
      )}

      {/* ── Desktop table ── */}
      {achievements.length > 0 && (
        <div className={`hidden lg:block overflow-x-auto rounded-2xl border ${panelClass}`}>
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b text-left ${isDark ? "border-bg-gray-1 text-gray" : "border-gray-200 text-gray-500"}`}>
                <th className="px-5 py-3.5 font-medium">ID</th>
                <th className="px-5 py-3.5 font-medium">Title</th>
                <th className="px-5 py-3.5 font-medium">Description</th>
                <th className="px-5 py-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAchievements.map((achievement) => (
                <tr
                  key={achievement.id}
                  tabIndex={0}
                  aria-label={`View details for ${achievement.title}`}
                  onClick={() => openRowDetail(achievement)}
                  onKeyDown={(e) => handleRowKeyDown(e, achievement)}
                  className={`border-b last:border-b-0 cursor-pointer transition-colors ${
                    isDark ? "border-bg-gray-1" : "border-gray-200"
                  } ${rowHoverClass}`}
                >
                  <td className={`px-5 py-3 ${isDark ? "text-gray" : "text-gray-600"}`}>#{achievement.id}</td>
                  <td className={`px-5 py-3 font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                    {achievement.title}
                  </td>
                  <td
                    className={`px-5 py-3 max-w-md truncate ${isDark ? "text-gray" : "text-gray-600"}`}
                    title={achievement.description}
                  >
                    {achievement.description}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(achievement);
                        }}
                        aria-label={`Edit ${achievement.title}`}
                        className={`p-2 rounded-lg transition-colors cursor-pointer ${
                          isDark ? "text-gray hover:bg-bg-gray-1 hover:text-white" : "text-gray-500 hover:bg-gray-100"
                        }`}
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteTarget(achievement);
                        }}
                        aria-label={`Delete ${achievement.title}`}
                        className={`p-2 rounded-lg text-rose-500 transition-colors cursor-pointer ${
                          isDark ? "hover:bg-rose-500/10" : "hover:bg-rose-50"
                        }`}
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredAchievements.length === 0 && (
                <tr>
                  <td colSpan={4} className={`px-5 py-12 text-center ${isDark ? "text-gray" : "text-gray-500"}`}>
                    No achievements match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Mobile cards ── */}
      {achievements.length > 0 && (
        <div className="lg:hidden flex flex-col gap-4">
          {filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${achievement.title}`}
              onClick={() => openRowDetail(achievement)}
              onKeyDown={(e) => handleRowKeyDown(e, achievement)}
              className={`rounded-2xl border p-4 cursor-pointer transition-colors ${panelClass} ${rowHoverClass}`}
            >
              <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                {achievement.title}
              </h3>
              <p className={`mt-1 text-sm line-clamp-3 ${isDark ? "text-gray" : "text-gray-500"}`}>
                {achievement.description}
              </p>

              <div className={`mt-4 grid grid-cols-2 gap-2 pt-4 border-t ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(achievement);
                  }}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${
                    isDark ? "border-bg-gray-1 text-white hover:bg-bg-gray-1" : "border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <FiEdit2 className="w-4 h-4" /> Edit
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteTarget(achievement);
                  }}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-rose-500 transition-colors cursor-pointer border ${
                    isDark ? "border-bg-gray-1 hover:bg-rose-500/10" : "border-gray-200 hover:bg-rose-50"
                  }`}
                >
                  <FiTrash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))}

          {filteredAchievements.length === 0 && (
            <div className={`rounded-2xl border py-12 text-center text-sm ${panelClass} ${isDark ? "text-gray" : "text-gray-500"}`}>
              No achievements match your search.
            </div>
          )}
        </div>
      )}

      {formModal && (
        <AchievementFormModal
          mode={formModal.mode}
          initialData={formModal.mode === "edit" ? formModal.achievement : undefined}
          onClose={closeFormModal}
          onSubmit={handleFormSubmit}
        />
      )}

      {detailTarget && (
        <DetailModal
          title={detailTarget.title}
          fields={buildAchievementDetailFields(detailTarget)}
          onClose={() => setDetailTarget(null)}
        />
      )}

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete this achievement?"
        description={
          deleteTarget
            ? `"${deleteTarget.title}" will be permanently removed from the About Us page. This can't be undone.`
            : ""
        }
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default AchievementsManagement;
