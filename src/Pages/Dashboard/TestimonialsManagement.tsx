import { useState } from "react";
import { FiEdit2, FiSearch, FiTrash2 } from "react-icons/fi";
import { useTheme } from "../../Context/ThemeContext";
import { useTestimonials } from "../../hooks/useTestimonials";
import { addDocument, updateDocument, deleteDocument } from "../../api/firestore";
import type { FirestoreTestimonial } from "../../store/types";
import { Button } from "../../components/ui/Button";
import { TestimonialFormModal } from "../../components/sections/dashboard/TestimonialFormModal";
import { ConfirmDialog } from "../../components/sections/dashboard/ConfirmDialog";
import { DetailModal, type DetailField } from "../../components/sections/dashboard/DetailModal";

type FormModalState =
  | { mode: "add" }
  | { mode: "edit"; testimonial: FirestoreTestimonial }
  | null;

// Renders a 1–5 rating as filled/empty stars.
function renderStars(rating: number): string {
  const clamped = Math.max(0, Math.min(5, Math.round(rating)));
  return "★".repeat(clamped) + "☆".repeat(5 - clamped);
}

// createdAt is stamped server-side (serverTimestamp()) — api/firestore.ts's
// snapshotToDocs() already converts the Firestore Timestamp to an ISO string
// before it ever reaches Redux, so this only ever handles a plain string.
function formatCreatedAt(createdAt: FirestoreTestimonial["createdAt"]): string {
  if (!createdAt) return "—";
  const parsed = new Date(createdAt);
  return Number.isNaN(parsed.getTime()) ? String(createdAt) : parsed.toLocaleString();
}

// Every Testimonial field, for the detail view.
function buildTestimonialDetailFields(testimonial: FirestoreTestimonial): DetailField[] {
  return [
    { label: "ID", value: `#${testimonial.id}` },
    {
      label: "Client Image",
      value: (
        <img
          src={testimonial.clientImage}
          alt={testimonial.clientName}
          className="w-16 h-16 rounded-full object-cover"
        />
      ),
    },
    { label: "Client Name", value: testimonial.clientName },
    { label: "Location", value: testimonial.clientLocation },
    { label: "Position", value: testimonial.position || "—" },
    { label: "Rating", value: `${renderStars(testimonial.rating)} (${testimonial.rating}/5)` },
    { label: "Title", value: testimonial.title, fullWidth: true },
    { label: "Description", value: testimonial.description, fullWidth: true },
    { label: "Created At", value: formatCreatedAt(testimonial.createdAt) },
  ];
}

// Dashboard page: list/search/add/edit/delete testimonials.
export const TestimonialsManagement = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { testimonials, status } = useTestimonials();

  const [searchTerm, setSearchTerm] = useState("");
  const [formModal, setFormModal] = useState<FormModalState>(null);
  const [deleteTarget, setDeleteTarget] = useState<FirestoreTestimonial | null>(null);
  const [detailTarget, setDetailTarget] = useState<FirestoreTestimonial | null>(null);

  const filteredTestimonials = testimonials.filter((testimonial) =>
    testimonial.clientName.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );

  const openAddModal = () => setFormModal({ mode: "add" });
  const openEditModal = (testimonial: FirestoreTestimonial) =>
    setFormModal({ mode: "edit", testimonial });
  const closeFormModal = () => setFormModal(null);

  const handleFormSubmit = async (values: Omit<FirestoreTestimonial, "id">) => {
    try {
      if (formModal?.mode === "edit") {
        // Partial merge — Firestore only touches the fields this form sends.
        await updateDocument<FirestoreTestimonial>(
          "testimonials",
          formModal.testimonial.id,
          values,
        );
      } else {
        await addDocument<FirestoreTestimonial>("testimonials", values);
      }
    } catch (error) {
      console.error("Failed to save testimonial:", error);
    }
    setFormModal(null);
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      try {
        await deleteDocument("testimonials", deleteTarget.id);
      } catch (error) {
        console.error("Failed to delete testimonial:", error);
      }
    }
    setDeleteTarget(null);
  };

  const openRowDetail = (testimonial: FirestoreTestimonial) => setDetailTarget(testimonial);
  const handleRowKeyDown = (e: React.KeyboardEvent, testimonial: FirestoreTestimonial) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openRowDetail(testimonial);
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
          Manage the client testimonials shown across the site — add, update, or remove the
          quotes visitors see on the home page.
        </p>
        <Button text="Add Testimonial" variant="primary" onClick={openAddModal} />
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
          placeholder="Search by client name"
          aria-label="Search by client name"
          className={`${inputClass} pl-11 pr-4 py-3`}
        />
      </div>

      {status === "loading" && testimonials.length === 0 && (
        <div className={`rounded-2xl border py-16 text-center text-sm ${panelClass} ${isDark ? "text-gray" : "text-gray-500"}`}>
          Loading testimonials…
        </div>
      )}

      {status === "failed" && (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 py-16 text-center text-sm text-rose-500">
          Couldn't load testimonials. Please try again.
        </div>
      )}

      {/* ── Desktop table ── */}
      {testimonials.length > 0 && (
        <div className={`hidden lg:block overflow-x-auto rounded-2xl border ${panelClass}`}>
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b text-left ${isDark ? "border-bg-gray-1 text-gray" : "border-gray-200 text-gray-500"}`}>
                <th className="px-5 py-3.5 font-medium">ID</th>
                <th className="px-5 py-3.5 font-medium">Client</th>
                <th className="px-5 py-3.5 font-medium">Location</th>
                <th className="px-5 py-3.5 font-medium">Title</th>
                <th className="px-5 py-3.5 font-medium">Rating</th>
                <th className="px-5 py-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTestimonials.map((testimonial) => (
                <tr
                  key={testimonial.id}
                  tabIndex={0}
                  aria-label={`View details for ${testimonial.clientName}`}
                  onClick={() => openRowDetail(testimonial)}
                  onKeyDown={(e) => handleRowKeyDown(e, testimonial)}
                  className={`border-b last:border-b-0 cursor-pointer transition-colors ${
                    isDark ? "border-bg-gray-1" : "border-gray-200"
                  } ${rowHoverClass}`}
                >
                  <td className={`px-5 py-3 ${isDark ? "text-gray" : "text-gray-600"}`}>#{testimonial.id}</td>
                  <td className={`px-5 py-3 font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                    <span className="flex items-center gap-3">
                      <img
                        src={testimonial.clientImage}
                        alt=""
                        className="w-9 h-9 rounded-full object-cover shrink-0"
                      />
                      {testimonial.clientName}
                    </span>
                  </td>
                  <td className={`px-5 py-3 ${isDark ? "text-gray" : "text-gray-600"}`}>
                    {testimonial.clientLocation}
                  </td>
                  <td
                    className={`px-5 py-3 max-w-xs truncate ${isDark ? "text-gray" : "text-gray-600"}`}
                    title={testimonial.title}
                  >
                    {testimonial.title}
                  </td>
                  <td className="px-5 py-3 text-primary-light whitespace-nowrap" title={`${testimonial.rating}/5`}>
                    {renderStars(testimonial.rating)}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(testimonial);
                        }}
                        aria-label={`Edit ${testimonial.clientName}`}
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
                          setDeleteTarget(testimonial);
                        }}
                        aria-label={`Delete ${testimonial.clientName}`}
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

              {filteredTestimonials.length === 0 && (
                <tr>
                  <td colSpan={6} className={`px-5 py-12 text-center ${isDark ? "text-gray" : "text-gray-500"}`}>
                    No testimonials match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Mobile cards ── */}
      {testimonials.length > 0 && (
        <div className="lg:hidden flex flex-col gap-4">
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${testimonial.clientName}`}
              onClick={() => openRowDetail(testimonial)}
              onKeyDown={(e) => handleRowKeyDown(e, testimonial)}
              className={`rounded-2xl border p-4 cursor-pointer transition-colors ${panelClass} ${rowHoverClass}`}
            >
              <div className="flex items-start gap-3">
                <img
                  src={testimonial.clientImage}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold truncate ${isDark ? "text-white" : "text-gray-900"}`}>
                    {testimonial.clientName}
                  </h3>
                  <p className={`text-sm truncate ${isDark ? "text-gray" : "text-gray-500"}`}>
                    {testimonial.clientLocation}
                  </p>
                  <p className="text-primary-light text-sm" title={`${testimonial.rating}/5`}>
                    {renderStars(testimonial.rating)}
                  </p>
                </div>
              </div>

              <p className={`mt-3 text-sm line-clamp-2 ${isDark ? "text-gray" : "text-gray-500"}`}>
                {testimonial.title}
              </p>

              <div className={`mt-4 grid grid-cols-2 gap-2 pt-4 border-t ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(testimonial);
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
                    setDeleteTarget(testimonial);
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

          {filteredTestimonials.length === 0 && (
            <div className={`rounded-2xl border py-12 text-center text-sm ${panelClass} ${isDark ? "text-gray" : "text-gray-500"}`}>
              No testimonials match your search.
            </div>
          )}
        </div>
      )}

      {formModal && (
        <TestimonialFormModal
          mode={formModal.mode}
          initialData={formModal.mode === "edit" ? formModal.testimonial : undefined}
          onClose={closeFormModal}
          onSubmit={handleFormSubmit}
        />
      )}

      {detailTarget && (
        <DetailModal
          title={detailTarget.clientName}
          fields={buildTestimonialDetailFields(detailTarget)}
          onClose={() => setDetailTarget(null)}
        />
      )}

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete this testimonial?"
        description={
          deleteTarget
            ? `The testimonial from "${deleteTarget.clientName}" will be permanently removed from the site. This can't be undone.`
            : ""
        }
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default TestimonialsManagement;
