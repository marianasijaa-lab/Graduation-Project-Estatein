import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit2, FiSearch, FiTrash2, FiHash } from "react-icons/fi";
import { HiOutlineEye } from "react-icons/hi2";
import { useTheme } from "../../Context/ThemeContext";
import { useCompanies } from "../../hooks/useCompanies";
import { addDocument, updateDocument, deleteDocument, renameDocumentId } from "../../api/firestore";
import { notifySuccess, notifyError, getErrorMessage } from "../../utils/notify";
import type { FirestoreCompany } from "../../store/types";
import { Button } from "../../components/ui/Button";
import { ClientFormModal } from "../../components/sections/dashboard/ClientFormModal";
import { ConfirmDialog } from "../../components/sections/dashboard/ConfirmDialog";
import { RenameIdDialog } from "../../components/sections/dashboard/RenameIdDialog";
import { DetailModal, type DetailField } from "../../components/sections/dashboard/DetailModal";
import {
  DashboardPageShell, staggerItem, rowStagger, rowVariants, iconBtnHover, deleteBtnHover, cardHoverProps, SkeletonRow, SkeletonCard,
  tableRowVariants,
} from "../../components/dashboard/DashboardPageShell";

const shortId = (id: string) => id.length > 8 ? id.slice(0, 8) : id;

const ALL_DOMAINS = "All";

type FormModalState = { mode: "add" } | { mode: "edit"; client: FirestoreCompany } | null;

function buildClientDetailFields(client: FirestoreCompany): DetailField[] {
  return [
    { label: "ID", value: `#${client.id}` },
    { label: "Company Name", value: client.heading },
    { label: "Client Since", value: client.date },
    { label: "Domain", value: client.domain },
    { label: "Category", value: client.category },
    { label: "Website Link", value: client.link || "—" },
    { label: "Testimony", value: client.testimony, fullWidth: true },
  ];
}

export const ClientsManagement = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { companies: clients, status } = useCompanies();
  const [searchTerm, setSearchTerm] = useState("");
  const [domainFilter, setDomainFilter] = useState(ALL_DOMAINS);
  const [formModal, setFormModal] = useState<FormModalState>(null);
  const [deleteTarget, setDeleteTarget] = useState<FirestoreCompany | null>(null);
  const [renameTarget, setRenameTarget] = useState<typeof deleteTarget>(null);
  const [detailTarget, setDetailTarget] = useState<FirestoreCompany | null>(null);

  const domainOptions = useMemo(
    () => [ALL_DOMAINS, ...Array.from(new Set(clients.map((c) => c.domain))).sort()],
    [clients],
  );

  const filteredClients = clients.filter((c) => {
    const matchesSearch = c.heading.toLowerCase().includes(searchTerm.trim().toLowerCase());
    const matchesDomain = domainFilter === ALL_DOMAINS || c.domain === domainFilter;
    return matchesSearch && matchesDomain;
  });

  const openAddModal = () => setFormModal({ mode: "add" });
  const openEditModal = (c: FirestoreCompany) => setFormModal({ mode: "edit", client: c });
  const closeFormModal = () => setFormModal(null);

  const handleFormSubmit = async (values: Omit<FirestoreCompany, "id">) => {
    try {
      if (formModal?.mode === "edit") {
        await updateDocument<FirestoreCompany>("companies", formModal.client.id, values);
        notifySuccess("Client updated");
      } else {
        await addDocument<FirestoreCompany>("companies", values);
        notifySuccess("Client added");
      }
    } catch (error) {
      console.error("Failed to save client:", error);
      notifyError(getErrorMessage(error, "Couldn't save the client."));
    }
    setFormModal(null);
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      try {
        await deleteDocument("companies", deleteTarget.id);
        notifySuccess("Client deleted");
      } catch (error) {
        console.error("Failed to delete client:", error);
        notifyError(getErrorMessage(error, "Couldn't delete the client."));
      }
    }
    setDeleteTarget(null);
  };

    const handleRename = async (newId: string) => {
    if (!renameTarget) return;
    try {
      await renameDocumentId("companies", renameTarget.id, newId);
      setRenameTarget(null);
      notifySuccess("Client ID renamed");
    } catch (error) {
      notifyError(getErrorMessage(error, "Couldn't rename the ID."));
      throw error; // keep RenameIdDialog's inline error visible
    }
  };

  const openRowDetail = (c: FirestoreCompany) => setDetailTarget(c);
  const handleRowKeyDown = (e: React.KeyboardEvent, c: FirestoreCompany) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openRowDetail(c); }
  };

  const panelClass = isDark ? "bg-bg-dark-1 border-bg-gray-1" : "bg-white border-gray-200";
  const inputClass = `w-full rounded-xl border outline-none transition-colors ${isDark ? "bg-bg-dark border-bg-gray-1 text-white placeholder-gray-500 focus:border-primary" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary"}`;
    const rowHoverClass = isDark ? "hover:bg-bg-gray-1/40" : "hover:bg-gray-50";
  const renameBtnClass = `p-2 rounded-lg transition-colors cursor-pointer ${isDark ? "text-gray hover:bg-bg-gray-1 hover:text-white" : "text-gray-500 hover:bg-gray-100"}`;

  return (
    <DashboardPageShell>
      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className={`text-sm ${isDark ? "text-gray" : "text-gray-500"}`}>
          Manage the client companies shown in the "Our Valued Clients" slider on the About Us page — add, update, or remove featured clients.
        </p>
        <Button text="Add Client" variant="primary" onClick={openAddModal} />
      </motion.div>

      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-gray" : "text-gray-400"}`} />
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by company name" aria-label="Search by company name" className={`${inputClass} pl-11 pr-4 py-3`} />
        </div>
        <select value={domainFilter} onChange={(e) => setDomainFilter(e.target.value)} aria-label="Filter by domain"
          className={`${inputClass} px-4 py-3 cursor-pointer sm:w-64`}>
          {domainOptions.map((o) => (
            <option key={o} value={o} className={isDark ? "bg-bg-dark" : "bg-white"}>{o === ALL_DOMAINS ? "All Domains" : o}</option>
          ))}
        </select>
      </motion.div>

      {status !== "succeeded" && status !== "failed" && (
        <motion.div variants={staggerItem} className={`rounded-2xl border py-16 text-center text-sm ${panelClass} ${isDark ? "text-gray" : "text-gray-500"}`}>Loading clients…</motion.div>
      )}
      {status === "failed" && (
        <motion.div variants={staggerItem} className="rounded-2xl border border-rose-500/30 bg-rose-500/10 py-16 text-center text-sm text-rose-500">Couldn't load clients. Please try again.</motion.div>
      )}

      {status === "succeeded" && (
        <motion.div variants={staggerItem} className={`hidden lg:block overflow-x-auto table-scroll rounded-2xl border ${panelClass}`}>
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b text-left ${isDark ? "border-bg-gray-1 text-gray" : "border-gray-200 text-gray-500"}`}>
                <th className="px-5 py-3.5 font-medium">ID</th>
                <th className="px-5 py-3.5 font-medium">Company</th>
                <th className="px-5 py-3.5 font-medium">Client Since</th>
                <th className="px-5 py-3.5 font-medium">Domain</th>
                <th className="px-5 py-3.5 font-medium">Category</th>
                <th className="px-5 py-3.5 font-medium">Link</th>
                <th className="px-5 py-3.5 font-medium">Testimony</th>
                <th className="px-5 py-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <AnimatePresence mode="wait"><motion.tbody initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {filteredClients.map((client) => (
                <motion.tr key={client.id} variants={tableRowVariants}
                  tabIndex={0} aria-label={`View details for ${client.heading}`}
                  onClick={() => openRowDetail(client)} onKeyDown={(e) => handleRowKeyDown(e, client)}
                  className={`border-b last:border-b-0 cursor-pointer transition-colors ${isDark ? "border-bg-gray-1" : "border-gray-200"} ${rowHoverClass}`}>
                  <td className={`px-5 py-3 ${isDark ? "text-gray" : "text-gray-600"}`}><span title={`Full ID: ${client.id}`} className="cursor-help font-mono">#{shortId(client.id)}</span></td>
                  <td className={`px-5 py-3 font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{client.heading}</td>
                  <td className={`px-5 py-3 ${isDark ? "text-gray" : "text-gray-600"}`}>{client.date}</td>
                  <td className={`px-5 py-3 ${isDark ? "text-gray" : "text-gray-600"}`}>{client.domain}</td>
                  <td className={`px-5 py-3 ${isDark ? "text-gray" : "text-gray-600"}`}>{client.category}</td>
                  <td className={`px-5 py-3 max-w-[180px] truncate ${isDark ? "text-gray" : "text-gray-600"}`} title={client.link}>{client.link || "—"}</td>
                  <td className={`px-5 py-3 max-w-[180px] truncate ${isDark ? "text-gray" : "text-gray-600"}`} title={client.testimony}>{client.testimony}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                        <motion.a href="/about#valued-clients"
                          onClick={(e) => e.stopPropagation()} aria-label="View on site" title="View on site"
                          {...iconBtnHover} className={renameBtnClass}>
                          <HiOutlineEye className="w-4 h-4" />
                        </motion.a>
                        <motion.button type="button" onClick={(e) => { e.stopPropagation(); setRenameTarget(client); }}
                          aria-label={`Rename ID`} {...iconBtnHover} className={renameBtnClass}>
                          <FiHash className="w-4 h-4" />
                        </motion.button>
                      <motion.button type="button" onClick={(e) => { e.stopPropagation(); openEditModal(client); }} aria-label={`Edit ${client.heading}`} {...iconBtnHover}
                        className={`p-2 rounded-lg transition-colors cursor-pointer ${isDark ? "text-gray hover:bg-bg-gray-1 hover:text-white" : "text-gray-500 hover:bg-gray-100"}`}>
                        <FiEdit2 className="w-4 h-4" /></motion.button>
                      <motion.button type="button" onClick={(e) => { e.stopPropagation(); setDeleteTarget(client); }} aria-label={`Delete ${client.heading}`} {...deleteBtnHover}
                        className={`p-2 rounded-lg text-rose-500 transition-colors cursor-pointer ${isDark ? "hover:bg-rose-500/10" : "hover:bg-rose-50"}`}>
                        <FiTrash2 className="w-4 h-4" /></motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filteredClients.length === 0 && (
                <tr><td colSpan={8} className={`px-5 py-12 text-center ${isDark ? "text-gray" : "text-gray-500"}`}>No clients match your search or filter.</td></tr>
              )}
            </motion.tbody></AnimatePresence>
          </table>
        </motion.div>
      )}

      {status === "succeeded" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="lg:hidden flex flex-col gap-4">
          {filteredClients.map((client) => (
            <motion.div key={client.id} variants={tableRowVariants} {...cardHoverProps} tabIndex={0} role="button" aria-label={`View details for ${client.heading}`}
              onClick={() => openRowDetail(client)} onKeyDown={(e) => handleRowKeyDown(e, client)}
              className={`rounded-2xl border p-4 cursor-pointer transition-colors ${panelClass} ${rowHoverClass}`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{client.heading}</h3>
                  <p className={`text-sm ${isDark ? "text-gray" : "text-gray-500"}`}>{client.date}</p>
                </div>
              </div>
              <div className={`mt-3 flex flex-col gap-1 text-sm ${isDark ? "text-gray" : "text-gray-600"}`}>
                <span><span className="font-medium">Domain:</span> {client.domain}</span>
                <span><span className="font-medium">Category:</span> {client.category}</span>
              </div>
              <div className={`mt-4 grid grid-cols-2 gap-2 pt-4 border-t ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
                <motion.button type="button" onClick={(e) => { e.stopPropagation(); openEditModal(client); }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.15 }}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${isDark ? "border-bg-gray-1 text-white hover:bg-bg-gray-1" : "border-gray-200 text-gray-700 hover:bg-gray-100"}`}>
                  <FiEdit2 className="w-4 h-4" /> Edit</motion.button>
                <motion.button type="button" onClick={(e) => { e.stopPropagation(); setDeleteTarget(client); }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.15 }}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-rose-500 transition-colors cursor-pointer border ${isDark ? "border-bg-gray-1 hover:bg-rose-500/10" : "border-gray-200 hover:bg-rose-50"}`}>
                  <FiTrash2 className="w-4 h-4" /> Delete</motion.button>
              </div>
            </motion.div>
          ))}
          {filteredClients.length === 0 && (
            <div className={`rounded-2xl border py-12 text-center text-sm ${panelClass} ${isDark ? "text-gray" : "text-gray-500"}`}>No clients match your search or filter.</div>
          )}
        </motion.div>
      )}

      {formModal && <ClientFormModal mode={formModal.mode} initialData={formModal.mode === "edit" ? formModal.client : undefined} onClose={closeFormModal} onSubmit={handleFormSubmit} />}
      {detailTarget && <DetailModal title={detailTarget.heading} fields={buildClientDetailFields(detailTarget)} onClose={() => setDetailTarget(null)} />}
      <RenameIdDialog
        open={renameTarget !== null}
        currentId={renameTarget?.id ?? ""}
        collectionName="companies"
        onConfirm={handleRename}
        onCancel={() => setRenameTarget(null)}
      />
            <ConfirmDialog open={deleteTarget !== null} title="Delete this client?"
        description={deleteTarget ? `"${deleteTarget.heading}" will be permanently removed from the clients slider. This can't be undone.` : ""}
        confirmLabel="Delete" onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} />
    </DashboardPageShell>
  );
};

export default ClientsManagement;
