import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiTrash2, FiHash } from "react-icons/fi";
import { useTheme } from "../../Context/ThemeContext";
import { useContacts } from "../../hooks/useContacts";
import { updateDocument, deleteDocument, renameDocumentId } from "../../api/firestore";
import { notifySuccess, notifyError, getErrorMessage } from "../../utils/notify";
import type { ContactStatus, FirestoreContact } from "../../store/types";
import { ConfirmDialog } from "../../components/sections/dashboard/ConfirmDialog";
import { RenameIdDialog } from "../../components/sections/dashboard/RenameIdDialog";
import { DetailModal, type DetailField } from "../../components/sections/dashboard/DetailModal";
import {
  DashboardPageShell, staggerItem, iconBtnHover,
  deleteBtnHover, cardHoverProps, SkeletonRow, SkeletonCard,
  tableRowVariants,
} from "../../components/dashboard/DashboardPageShell";

const ALL_STATUSES = "All";

const ALL_TYPES = "All";
const STATUS_OPTIONS: ContactStatus[] = ["new", "contacted", "closed"];
const STATUS_LABEL: Record<ContactStatus, string> = { new: "New", contacted: "Contacted", closed: "Closed" };

function formatCreatedAt(createdAt: FirestoreContact["createdAt"]): string {
  if (!createdAt) return "—";
  const parsed = new Date(createdAt);
  return Number.isNaN(parsed.getTime()) ? String(createdAt) : parsed.toLocaleString();
}

function fullName(contact: FirestoreContact): string {
  return `${contact.firstName} ${contact.lastName}`.trim();
}

function buildContactDetailFields(contact: FirestoreContact): DetailField[] {
  return [
    { label: "ID", value: `#${contact.id}` },
    { label: "Name", value: fullName(contact) },
    { label: "Email", value: contact.email },
    { label: "Phone", value: contact.phone },
    { label: "Status", value: STATUS_LABEL[contact.status] },
    { label: "Inquiry Type", value: contact.inquiryType || "—" },
    { label: "How They Heard", value: contact.howDidYouHear || "—" },
    { label: "Related Property", value: contact.propertyName || contact.propertyId || "—" },
    { label: "Assigned To", value: contact.assignedTo || "—" },
    { label: "Message", value: contact.message, fullWidth: true },
    { label: "Internal Note", value: contact.adminNote || "—", fullWidth: true },
    { label: "Received", value: formatCreatedAt(contact.createdAt) },
  ];
}

export const InquiriesManagement = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { contacts, status } = useContacts();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(ALL_STATUSES);
  const [typeFilter, setTypeFilter] = useState(ALL_TYPES);
  const [deleteTarget, setDeleteTarget] = useState<FirestoreContact | null>(null);
  const [renameTarget, setRenameTarget] = useState<typeof deleteTarget>(null);
  const [detailTarget, setDetailTarget] = useState<FirestoreContact | null>(null);

  const typeOptions = useMemo(() => [ALL_TYPES, ...Array.from(new Set(contacts.map((c) => c.inquiryType).filter((t): t is string => !!t))).sort()], [contacts]);

  const filteredContacts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return contacts
      .filter((c) => {
        const matchesSearch = fullName(c).toLowerCase().includes(term) || c.email.toLowerCase().includes(term);
        const matchesStatus = statusFilter === ALL_STATUSES || c.status === statusFilter;
        const matchesType = typeFilter === ALL_TYPES || c.inquiryType === typeFilter;
        return matchesSearch && matchesStatus && matchesType;
      })
      .slice()
      .sort((a, b) => (new Date(b.createdAt ?? "").getTime() || 0) - (new Date(a.createdAt ?? "").getTime() || 0));
  }, [contacts, searchTerm, statusFilter, typeFilter]);

  const handleStatusChange = async (contact: FirestoreContact, next: ContactStatus) => {
    if (contact.status === next) return;
    try {
      await updateDocument<FirestoreContact>("contacts", contact.id, { status: next });
      notifySuccess("Inquiry status updated");
    } catch (error) {
      console.error("Failed to update inquiry status:", error);
      notifyError(getErrorMessage(error, "Couldn't update the status."));
    }
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      try {
        await deleteDocument("contacts", deleteTarget.id);
        notifySuccess("Inquiry deleted");
      } catch (error) {
        console.error("Failed to delete inquiry:", error);
        notifyError(getErrorMessage(error, "Couldn't delete the inquiry."));
      }
    }
    setDeleteTarget(null);
  };

    const handleRename = async (newId: string) => {
    if (!renameTarget) return;
    try {
      await renameDocumentId("contacts", renameTarget.id, newId);
      setRenameTarget(null);
      notifySuccess("Inquiry ID renamed");
    } catch (error) {
      notifyError(getErrorMessage(error, "Couldn't rename the ID."));
      throw error; // keep RenameIdDialog's inline error visible
    }
  };

  const openRowDetail = (c: FirestoreContact) => setDetailTarget(c);
  const handleRowKeyDown = (e: React.KeyboardEvent, c: FirestoreContact) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openRowDetail(c); }
  };

  const panelClass = isDark ? "bg-bg-dark-1 border-bg-gray-1" : "bg-white border-gray-200";
  const inputClass = `w-full rounded-xl border outline-none transition-colors ${isDark ? "bg-bg-dark border-bg-gray-1 text-white placeholder-gray-500 focus:border-primary" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary"}`;
    const rowHoverClass = isDark ? "hover:bg-bg-gray-1/40" : "hover:bg-gray-50";
  const renameBtnClass = `p-2 rounded-lg transition-colors cursor-pointer ${isDark ? "text-gray hover:bg-bg-gray-1 hover:text-white" : "text-gray-500 hover:bg-gray-100"}`;
  const statusSelectClass = `rounded-lg border px-2.5 py-1.5 text-xs font-medium outline-none cursor-pointer transition-colors ${isDark ? "bg-bg-dark border-bg-gray-1 text-white focus:border-primary" : "bg-gray-50 border-gray-200 text-gray-900 focus:border-primary"}`;

  return (
    <DashboardPageShell>
      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className={`text-sm ${isDark ? "text-gray" : "text-gray-500"}`}>
          Review the messages visitors send through the Contact form and the property inquiry form — triage each one by status and remove spam or resolved threads.
        </p>
      </motion.div>

      <motion.div variants={staggerItem} className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <FiSearch className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-gray" : "text-gray-400"}`} />
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email" aria-label="Search by name or email" className={`${inputClass} pl-11 pr-4 py-3`} />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filter by status" className={`${inputClass} px-4 py-3 cursor-pointer lg:w-48`}>
          <option value={ALL_STATUSES} className={isDark ? "bg-bg-dark" : "bg-white"}>All Statuses</option>
          {STATUS_OPTIONS.map((o) => <option key={o} value={o} className={isDark ? "bg-bg-dark" : "bg-white"}>{STATUS_LABEL[o]}</option>)}
        </select>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} aria-label="Filter by inquiry type" className={`${inputClass} px-4 py-3 cursor-pointer lg:w-48`}>
          {typeOptions.map((o) => <option key={o} value={o} className={isDark ? "bg-bg-dark" : "bg-white"}>{o === ALL_TYPES ? "All Types" : o}</option>)}
        </select>
      </motion.div>

      {/* ── Loading skeleton ── */}
      {status !== "succeeded" && status !== "failed" && (
        <motion.div variants={staggerItem} className={`hidden lg:block rounded-2xl border overflow-hidden ${panelClass}`}>
          <table className="w-full text-sm">
            <tbody>{Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} cols={6} isDark={isDark} />)}</tbody>
          </table>
        </motion.div>
      )}
      {status !== "succeeded" && status !== "failed" && (
        <motion.div variants={staggerItem} className="lg:hidden flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} isDark={isDark} />)}
        </motion.div>
      )}
      {status === "failed" && (
        <motion.div variants={staggerItem} className="rounded-2xl border border-rose-500/30 bg-rose-500/10 py-16 text-center text-sm text-rose-500">Couldn't load inquiries. Please try again.</motion.div>
      )}

      {status === "succeeded" && (
        <motion.div variants={staggerItem} className={`hidden lg:block overflow-x-auto table-scroll rounded-2xl border ${panelClass}`}>
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b text-left ${isDark ? "border-bg-gray-1 text-gray" : "border-gray-200 text-gray-500"}`}>
                <th className="px-5 py-3.5 font-medium">Name</th>
                <th className="px-5 py-3.5 font-medium">Email</th>
                <th className="px-5 py-3.5 font-medium">Type</th>
                <th className="px-5 py-3.5 font-medium">Received</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <AnimatePresence mode="wait"><motion.tbody initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {filteredContacts.map((contact) => (
                <motion.tr key={contact.id} variants={tableRowVariants}
                  tabIndex={0} aria-label={`View details for ${fullName(contact)}`}
                  onClick={() => openRowDetail(contact)} onKeyDown={(e) => handleRowKeyDown(e, contact)}
                  className={`border-b last:border-b-0 cursor-pointer transition-colors ${isDark ? "border-bg-gray-1" : "border-gray-200"} ${rowHoverClass}`}>
                  <td className={`px-5 py-3 font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{fullName(contact)}</td>
                  <td className={`px-5 py-3 ${isDark ? "text-gray" : "text-gray-600"}`}>{contact.email}</td>
                  <td className={`px-5 py-3 ${isDark ? "text-gray" : "text-gray-600"}`}>{contact.inquiryType || "—"}</td>
                  <td className={`px-5 py-3 whitespace-nowrap ${isDark ? "text-gray" : "text-gray-600"}`}>{formatCreatedAt(contact.createdAt)}</td>
                  <td className="px-5 py-3">
                    <select value={contact.status} onClick={(e) => e.stopPropagation()}
                      onChange={(e) => handleStatusChange(contact, e.target.value as ContactStatus)}
                      aria-label={`Status for ${fullName(contact)}`} className={statusSelectClass}>
                      {STATUS_OPTIONS.map((o) => <option key={o} value={o} className={isDark ? "bg-bg-dark" : "bg-white"}>{STATUS_LABEL[o]}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                        <motion.button type="button" onClick={(e) => { e.stopPropagation(); setRenameTarget(contact); }}
                          aria-label={`Rename ID`} {...iconBtnHover} className={renameBtnClass}>
                          <FiHash className="w-4 h-4" />
                        </motion.button>
                      <motion.button type="button" onClick={(e) => { e.stopPropagation(); setDeleteTarget(contact); }}
                        aria-label={`Delete inquiry from ${fullName(contact)}`} {...deleteBtnHover}
                        className={`p-2 rounded-lg text-rose-500 transition-colors cursor-pointer ${isDark ? "hover:bg-rose-500/10" : "hover:bg-rose-50"}`}>
                        <FiTrash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filteredContacts.length === 0 && (
                <tr><td colSpan={6} className={`px-5 py-12 text-center ${isDark ? "text-gray" : "text-gray-500"}`}>No inquiries match your search or filters.</td></tr>
              )}
            </motion.tbody></AnimatePresence>
          </table>
        </motion.div>
      )}

      {status === "succeeded" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="lg:hidden flex flex-col gap-4">
          {filteredContacts.map((contact) => (
            <motion.div key={contact.id} variants={tableRowVariants} {...cardHoverProps}
              tabIndex={0} role="button" aria-label={`View details for ${fullName(contact)}`}
              onClick={() => openRowDetail(contact)} onKeyDown={(e) => handleRowKeyDown(e, contact)}
              className={`rounded-2xl border p-4 cursor-pointer ${panelClass}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className={`font-semibold truncate ${isDark ? "text-white" : "text-gray-900"}`}>{fullName(contact)}</h3>
                  <p className={`text-sm truncate ${isDark ? "text-gray" : "text-gray-500"}`}>{contact.email}</p>
                </div>
                <span className={`shrink-0 text-xs ${isDark ? "text-gray" : "text-gray-500"}`}>{contact.inquiryType || "—"}</span>
              </div>
              <p className={`mt-3 text-sm line-clamp-2 ${isDark ? "text-gray" : "text-gray-500"}`}>{contact.message}</p>
              <p className={`mt-2 text-xs ${isDark ? "text-gray" : "text-gray-400"}`}>{formatCreatedAt(contact.createdAt)}</p>
              <div className={`mt-4 flex items-center gap-2 pt-4 border-t ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
                <select value={contact.status} onClick={(e) => e.stopPropagation()}
                  onChange={(e) => handleStatusChange(contact, e.target.value as ContactStatus)}
                  aria-label={`Status for ${fullName(contact)}`} className={`${statusSelectClass} flex-1`}>
                  {STATUS_OPTIONS.map((o) => <option key={o} value={o} className={isDark ? "bg-bg-dark" : "bg-white"}>{STATUS_LABEL[o]}</option>)}
                </select>
                <motion.button type="button" onClick={(e) => { e.stopPropagation(); setDeleteTarget(contact); }}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.15 }}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-rose-500 transition-colors cursor-pointer border ${isDark ? "border-bg-gray-1 hover:bg-rose-500/10" : "border-gray-200 hover:bg-rose-50"}`}>
                  <FiTrash2 className="w-4 h-4" /> Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
          {filteredContacts.length === 0 && (
            <div className={`rounded-2xl border py-12 text-center text-sm ${panelClass} ${isDark ? "text-gray" : "text-gray-500"}`}>No inquiries match your search or filters.</div>
          )}
        </motion.div>
      )}

      {detailTarget && <DetailModal title={fullName(detailTarget)} fields={buildContactDetailFields(detailTarget)} onClose={() => setDetailTarget(null)} />}
      <RenameIdDialog
        open={renameTarget !== null}
        currentId={renameTarget?.id ?? ""}
        collectionName="contacts"
        onConfirm={handleRename}
        onCancel={() => setRenameTarget(null)}
      />
            <ConfirmDialog open={deleteTarget !== null} title="Delete this inquiry?"
        description={deleteTarget ? `The message from "${fullName(deleteTarget)}" will be permanently removed. This can't be undone.` : ""}
        confirmLabel="Delete" onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} />
    </DashboardPageShell>
  );
};

export default InquiriesManagement;
