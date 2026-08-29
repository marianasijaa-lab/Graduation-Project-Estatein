import { useState } from "react";
import { FiEdit2, FiSearch, FiTrash2 } from "react-icons/fi";
import { useTheme } from "../../Context/ThemeContext";
import { useValues } from "../../hooks/useValues";
import { addDocument, updateDocument, deleteDocument } from "../../api/firestore";
import type { FirestoreValue } from "../../store/types";
import { Button } from "../../components/ui/Button";
import { ValueFormModal } from "../../components/sections/dashboard/ValueFormModal";
import { ConfirmDialog } from "../../components/sections/dashboard/ConfirmDialog";
import { DetailModal, type DetailField } from "../../components/sections/dashboard/DetailModal";

type FormModalState = { mode: "add" } | { mode: "edit"; value: FirestoreValue } | null;

// Every Value field, for the detail view.
function buildValueDetailFields(value: FirestoreValue): DetailField[] {
  return [
    { label: "ID", value: `#${value.id}` },
    {
      label: "Icon",
      value: <img src={value.icon} alt="" className="w-16 h-16 object-contain" />,
    },
    { label: "Title", value: value.title },
    { label: "Description", value: value.description, fullWidth: true },
  ];
}

// Dashboard page: list/search/add/edit/delete core values.
export const ValuesManagement = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { values, status } = useValues();

  const [searchTerm, setSearchTerm] = useState("");
  const [formModal, setFormModal] = useState<FormModalState>(null);
  const [deleteTarget, setDeleteTarget] = useState<FirestoreValue | null>(null);
  const [detailTarget, setDetailTarget] = useState<FirestoreValue | null>(null);

  const filteredValues = values.filter((value) =>
    value.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );

  const openAddModal = () => setFormModal({ mode: "add" });
  const openEditModal = (value: FirestoreValue) => setFormModal({ mode: "edit", value });
  const closeFormModal = () => setFormModal(null);

  const handleFormSubmit = async (values: Omit<FirestoreValue, "id">) => {
    try {
      if (formModal?.mode === "edit") {
        // Partial merge — Firestore only touches the fields this form sends.
        await updateDocument<FirestoreValue>("values", formModal.value.id, values);
      } else {
        await addDocument<FirestoreValue>("values", values);
      }
    } catch (error) {
      console.error("Failed to save value:", error);
    }
    setFormModal(null);
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      try {
        await deleteDocument("values", deleteTarget.id);
      } catch (error) {
        console.error("Failed to delete value:", error);
      }
    }
    setDeleteTarget(null);
  };

  const openRowDetail = (value: FirestoreValue) => setDetailTarget(value);
  const handleRowKeyDown = (e: React.KeyboardEvent, value: FirestoreValue) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openRowDetail(value);
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
          Manage the core values shown on the About Us page — add, update, or remove the
          cards that describe what Estatein stands for.
        </p>
        <Button text="Add Value" variant="primary" onClick={openAddModal} />
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

      {status === "loading" && values.length === 0 && (
        <div className={`rounded-2xl border py-16 text-center text-sm ${panelClass} ${isDark ? "text-gray" : "text-gray-500"}`}>
          Loading values…
        </div>
      )}

      {status === "failed" && (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 py-16 text-center text-sm text-rose-500">
          Couldn't load values. Please try again.
        </div>
      )}

      {/* ── Desktop table ── */}
      {values.length > 0 && (
        <div className={`hidden lg:block overflow-x-auto rounded-2xl border ${panelClass}`}>
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
            <tbody>
              {filteredValues.map((value) => (
                <tr
                  key={value.id}
                  tabIndex={0}
                  aria-label={`View details for ${value.title}`}
                  onClick={() => openRowDetail(value)}
                  onKeyDown={(e) => handleRowKeyDown(e, value)}
                  className={`border-b last:border-b-0 cursor-pointer transition-colors ${
                    isDark ? "border-bg-gray-1" : "border-gray-200"
                  } ${rowHoverClass}`}
                >
                  <td className={`px-5 py-3 ${isDark ? "text-gray" : "text-gray-600"}`}>#{value.id}</td>
                  <td className="px-5 py-3">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0 border ${
                        isDark ? "bg-bg-dark border-bg-gray-1" : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <img src={value.icon} alt="" className="w-5 h-5 object-contain" />
                    </div>
                  </td>
                  <td className={`px-5 py-3 font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                    {value.title}
                  </td>
                  <td
                    className={`px-5 py-3 max-w-md truncate ${isDark ? "text-gray" : "text-gray-600"}`}
                    title={value.description}
                  >
                    {value.description}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(value);
                        }}
                        aria-label={`Edit ${value.title}`}
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
                          setDeleteTarget(value);
                        }}
                        aria-label={`Delete ${value.title}`}
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

              {filteredValues.length === 0 && (
                <tr>
                  <td colSpan={5} className={`px-5 py-12 text-center ${isDark ? "text-gray" : "text-gray-500"}`}>
                    No values match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Mobile cards ── */}
      {values.length > 0 && (
        <div className="lg:hidden flex flex-col gap-4">
          {filteredValues.map((value) => (
            <div
              key={value.id}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${value.title}`}
              onClick={() => openRowDetail(value)}
              onKeyDown={(e) => handleRowKeyDown(e, value)}
              className={`rounded-2xl border p-4 cursor-pointer transition-colors ${panelClass} ${rowHoverClass}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-lg shrink-0 border ${
                    isDark ? "bg-bg-dark border-bg-gray-1" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <img src={value.icon} alt="" className="w-7 h-7 object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold truncate ${isDark ? "text-white" : "text-gray-900"}`}>
                    {value.title}
                  </h3>
                  <p className={`text-sm line-clamp-2 ${isDark ? "text-gray" : "text-gray-500"}`}>
                    {value.description}
                  </p>
                </div>
              </div>

              <div className={`mt-4 grid grid-cols-2 gap-2 pt-4 border-t ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(value);
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
                    setDeleteTarget(value);
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

          {filteredValues.length === 0 && (
            <div className={`rounded-2xl border py-12 text-center text-sm ${panelClass} ${isDark ? "text-gray" : "text-gray-500"}`}>
              No values match your search.
            </div>
          )}
        </div>
      )}

      {formModal && (
        <ValueFormModal
          mode={formModal.mode}
          initialData={formModal.mode === "edit" ? formModal.value : undefined}
          onClose={closeFormModal}
          onSubmit={handleFormSubmit}
        />
      )}

      {detailTarget && (
        <DetailModal
          title={detailTarget.title}
          fields={buildValueDetailFields(detailTarget)}
          onClose={() => setDetailTarget(null)}
        />
      )}

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete this value?"
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

export default ValuesManagement;
