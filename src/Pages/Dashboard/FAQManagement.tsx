import { useState } from "react";
import { FiEdit2, FiSearch, FiTrash2 } from "react-icons/fi";
import { useTheme } from "../../Context/ThemeContext";
import { useFAQs } from "../../hooks/useFAQs";
import { addDocument, updateDocument, deleteDocument } from "../../api/firestore";
import type { FirestoreFAQ } from "../../store/types";
import { Button } from "../../components/ui/Button";
import { FAQFormModal } from "../../components/sections/dashboard/FAQFormModal";
import { ConfirmDialog } from "../../components/sections/dashboard/ConfirmDialog";
import { DetailModal, type DetailField } from "../../components/sections/dashboard/DetailModal";

type FormModalState = { mode: "add" } | { mode: "edit"; faq: FirestoreFAQ } | null;

// Every FAQ field, for the detail view.
function buildFAQDetailFields(faq: FirestoreFAQ): DetailField[] {
  return [
    { label: "ID", value: `#${faq.id}` },
    { label: "Question", value: faq.question, fullWidth: true },
    { label: "Description", value: faq.description, fullWidth: true },
  ];
}

// Dashboard page: list/search/add/edit/delete FAQs.
export const FAQManagement = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { faqs, status } = useFAQs();

  const [searchTerm, setSearchTerm] = useState("");
  const [formModal, setFormModal] = useState<FormModalState>(null);
  const [deleteTarget, setDeleteTarget] = useState<FirestoreFAQ | null>(null);
  const [detailTarget, setDetailTarget] = useState<FirestoreFAQ | null>(null);

  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );

  const openAddModal = () => setFormModal({ mode: "add" });
  const openEditModal = (faq: FirestoreFAQ) => setFormModal({ mode: "edit", faq });
  const closeFormModal = () => setFormModal(null);

  const handleFormSubmit = async (values: Omit<FirestoreFAQ, "id">) => {
    try {
      if (formModal?.mode === "edit") {
        // Partial merge — Firestore only touches the fields this form sends.
        await updateDocument<FirestoreFAQ>("faqs", formModal.faq.id, values);
      } else {
        await addDocument<FirestoreFAQ>("faqs", values);
      }
    } catch (error) {
      console.error("Failed to save FAQ:", error);
    }
    setFormModal(null);
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      try {
        await deleteDocument("faqs", deleteTarget.id);
      } catch (error) {
        console.error("Failed to delete FAQ:", error);
      }
    }
    setDeleteTarget(null);
  };

  const openRowDetail = (faq: FirestoreFAQ) => setDetailTarget(faq);
  const handleRowKeyDown = (e: React.KeyboardEvent, faq: FirestoreFAQ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openRowDetail(faq);
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
          Manage the frequently asked questions shown across the site — add, update, or
          remove the questions and answers visitors see.
        </p>
        <Button text="Add FAQ" variant="primary" onClick={openAddModal} />
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
          placeholder="Search by question"
          aria-label="Search by question"
          className={`${inputClass} pl-11 pr-4 py-3`}
        />
      </div>

      {status === "loading" && faqs.length === 0 && (
        <div className={`rounded-2xl border py-16 text-center text-sm ${panelClass} ${isDark ? "text-gray" : "text-gray-500"}`}>
          Loading FAQs…
        </div>
      )}

      {status === "failed" && (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 py-16 text-center text-sm text-rose-500">
          Couldn't load FAQs. Please try again.
        </div>
      )}

      {/* ── Desktop table ── */}
      {faqs.length > 0 && (
        <div className={`hidden lg:block overflow-x-auto rounded-2xl border ${panelClass}`}>
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b text-left ${isDark ? "border-bg-gray-1 text-gray" : "border-gray-200 text-gray-500"}`}>
                <th className="px-5 py-3.5 font-medium">ID</th>
                <th className="px-5 py-3.5 font-medium">Question</th>
                <th className="px-5 py-3.5 font-medium">Description</th>
                <th className="px-5 py-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFAQs.map((faq) => (
                <tr
                  key={faq.id}
                  tabIndex={0}
                  aria-label={`View details for ${faq.question}`}
                  onClick={() => openRowDetail(faq)}
                  onKeyDown={(e) => handleRowKeyDown(e, faq)}
                  className={`border-b last:border-b-0 cursor-pointer transition-colors ${
                    isDark ? "border-bg-gray-1" : "border-gray-200"
                  } ${rowHoverClass}`}
                >
                  <td className={`px-5 py-3 ${isDark ? "text-gray" : "text-gray-600"}`}>#{faq.id}</td>
                  <td className={`px-5 py-3 font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                    {faq.question}
                  </td>
                  <td
                    className={`px-5 py-3 max-w-md truncate ${isDark ? "text-gray" : "text-gray-600"}`}
                    title={faq.description}
                  >
                    {faq.description}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(faq);
                        }}
                        aria-label={`Edit ${faq.question}`}
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
                          setDeleteTarget(faq);
                        }}
                        aria-label={`Delete ${faq.question}`}
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

              {filteredFAQs.length === 0 && (
                <tr>
                  <td colSpan={4} className={`px-5 py-12 text-center ${isDark ? "text-gray" : "text-gray-500"}`}>
                    No FAQs match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Mobile cards ── */}
      {faqs.length > 0 && (
        <div className="lg:hidden flex flex-col gap-4">
          {filteredFAQs.map((faq) => (
            <div
              key={faq.id}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${faq.question}`}
              onClick={() => openRowDetail(faq)}
              onKeyDown={(e) => handleRowKeyDown(e, faq)}
              className={`rounded-2xl border p-4 cursor-pointer transition-colors ${panelClass} ${rowHoverClass}`}
            >
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                  {faq.question}
                </h3>
                <p className={`text-sm line-clamp-2 ${isDark ? "text-gray" : "text-gray-500"}`}>
                  {faq.description}
                </p>
              </div>

              <div className={`mt-4 grid grid-cols-2 gap-2 pt-4 border-t ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(faq);
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
                    setDeleteTarget(faq);
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

          {filteredFAQs.length === 0 && (
            <div className={`rounded-2xl border py-12 text-center text-sm ${panelClass} ${isDark ? "text-gray" : "text-gray-500"}`}>
              No FAQs match your search.
            </div>
          )}
        </div>
      )}

      {formModal && (
        <FAQFormModal
          mode={formModal.mode}
          initialData={formModal.mode === "edit" ? formModal.faq : undefined}
          onClose={closeFormModal}
          onSubmit={handleFormSubmit}
        />
      )}

      {detailTarget && (
        <DetailModal
          title={detailTarget.question}
          fields={buildFAQDetailFields(detailTarget)}
          onClose={() => setDetailTarget(null)}
        />
      )}

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete this FAQ?"
        description={
          deleteTarget
            ? `"${deleteTarget.question}" will be permanently removed from the site. This can't be undone.`
            : ""
        }
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default FAQManagement;
