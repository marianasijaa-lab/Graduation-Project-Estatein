import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import { useTheme } from "../../Context/ThemeContext";
import { useSubscribers } from "../../hooks/useSubscribers";
import { updateDocument, deleteDocument } from "../../api/firestore";
import type { FirestoreSubscriber, SubscriberStatus } from "../../store/types";
import { Button } from "../../components/ui/Button";
import { ConfirmDialog } from "../../components/sections/dashboard/ConfirmDialog";
import { DashboardPageShell, staggerItem, rowStagger, rowVariants } from "../../components/dashboard/DashboardPageShell";

const ALL_STATUSES = "All";
const STATUS_OPTIONS: SubscriberStatus[] = ["subscribed", "unsubscribed"];
const STATUS_LABEL: Record<SubscriberStatus, string> = { subscribed: "Subscribed", unsubscribed: "Unsubscribed" };

function formatCreatedAt(createdAt: FirestoreSubscriber["createdAt"]): string {
  if (!createdAt) return "—";
  const parsed = new Date(createdAt);
  return Number.isNaN(parsed.getTime()) ? String(createdAt) : parsed.toLocaleDateString();
}

function csvCell(value: string): string { return `"${value.replace(/"/g, '""')}"` }

function buildCsv(rows: FirestoreSubscriber[]): string {
  const header = ["Email", "Name", "Status", "Source", "Subscribed On"];
  const lines = rows.map((row) => [row.email, row.name ?? "", row.status, row.source, row.createdAt ? new Date(row.createdAt).toISOString() : ""].map((c) => csvCell(String(c))).join(","));
  return [header.map(csvCell).join(","), ...lines].join("\r\n");
}

export const SubscribersManagement = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { subscribers, status } = useSubscribers();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(ALL_STATUSES);
  const [deleteTarget, setDeleteTarget] = useState<FirestoreSubscriber | null>(null);

  const filteredSubscribers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return subscribers
      .filter((s) => {
        const matchesSearch = s.email.toLowerCase().includes(term) || (s.name ?? "").toLowerCase().includes(term);
        const matchesStatus = statusFilter === ALL_STATUSES || s.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .slice()
      .sort((a, b) => (new Date(b.createdAt ?? "").getTime() || 0) - (new Date(a.createdAt ?? "").getTime() || 0));
  }, [subscribers, searchTerm, statusFilter]);

  const handleStatusChange = async (subscriber: FirestoreSubscriber, next: SubscriberStatus) => {
    if (subscriber.status === next) return;
    try { await updateDocument<FirestoreSubscriber>("subscribers", subscriber.id, { status: next }); }
    catch (error) { console.error("Failed to update subscriber status:", error); }
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      try { await deleteDocument("subscribers", deleteTarget.id); }
      catch (error) { console.error("Failed to delete subscriber:", error); }
    }
    setDeleteTarget(null);
  };

  const handleExportCsv = () => {
    const csv = buildCsv(filteredSubscribers);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `estatein-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const panelClass = isDark ? "bg-bg-dark-1 border-bg-gray-1" : "bg-white border-gray-200";
  const inputClass = `w-full rounded-xl border outline-none transition-colors ${isDark ? "bg-bg-dark border-bg-gray-1 text-white placeholder-gray-500 focus:border-primary" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary"}`;
  const rowHoverClass = isDark ? "hover:bg-bg-gray-1/40" : "hover:bg-gray-50";
  const statusSelectClass = `rounded-lg border px-2.5 py-1.5 text-xs font-medium outline-none cursor-pointer transition-colors ${isDark ? "bg-bg-dark border-bg-gray-1 text-white focus:border-primary" : "bg-gray-50 border-gray-200 text-gray-900 focus:border-primary"}`;

  return (
    <DashboardPageShell>
      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className={`text-sm ${isDark ? "text-gray" : "text-gray-500"}`}>
          People who signed up for Estatein updates through the footer or the Contact page. Toggle a subscription, export the list, or remove an address.
        </p>
        <Button text="Export CSV" variant="secondary" onClick={handleExportCsv} />
      </motion.div>

      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-gray" : "text-gray-400"}`} />
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by email or name" aria-label="Search by email or name" className={`${inputClass} pl-11 pr-4 py-3`} />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filter by status" className={`${inputClass} px-4 py-3 cursor-pointer sm:w-56`}>
          <option value={ALL_STATUSES} className={isDark ? "bg-bg-dark" : "bg-white"}>All Statuses</option>
          {STATUS_OPTIONS.map((o) => <option key={o} value={o} className={isDark ? "bg-bg-dark" : "bg-white"}>{STATUS_LABEL[o]}</option>)}
        </select>
      </motion.div>

      {status === "loading" && subscribers.length === 0 && (
        <motion.div variants={staggerItem} className={`rounded-2xl border py-16 text-center text-sm ${panelClass} ${isDark ? "text-gray" : "text-gray-500"}`}>Loading subscribers…</motion.div>
      )}
      {status === "failed" && (
        <motion.div variants={staggerItem} className="rounded-2xl border border-rose-500/30 bg-rose-500/10 py-16 text-center text-sm text-rose-500">Couldn't load subscribers. Please try again.</motion.div>
      )}

      {subscribers.length > 0 && (
        <motion.div variants={staggerItem} className={`hidden lg:block overflow-x-auto rounded-2xl border ${panelClass}`}>
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b text-left ${isDark ? "border-bg-gray-1 text-gray" : "border-gray-200 text-gray-500"}`}>
                <th className="px-5 py-3.5 font-medium">Email</th>
                <th className="px-5 py-3.5 font-medium">Name</th>
                <th className="px-5 py-3.5 font-medium">Source</th>
                <th className="px-5 py-3.5 font-medium">Subscribed On</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <motion.tbody variants={rowStagger} initial="hidden" animate="visible">
              {filteredSubscribers.map((subscriber) => (
                <motion.tr key={subscriber.id} variants={rowVariants}
                  className={`border-b last:border-b-0 transition-colors ${isDark ? "border-bg-gray-1" : "border-gray-200"} ${rowHoverClass}`}>
                  <td className={`px-5 py-3 font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{subscriber.email}</td>
                  <td className={`px-5 py-3 ${isDark ? "text-gray" : "text-gray-600"}`}>{subscriber.name || "—"}</td>
                  <td className={`px-5 py-3 ${isDark ? "text-gray" : "text-gray-600"}`}>{subscriber.source}</td>
                  <td className={`px-5 py-3 whitespace-nowrap ${isDark ? "text-gray" : "text-gray-600"}`}>{formatCreatedAt(subscriber.createdAt)}</td>
                  <td className="px-5 py-3">
                    <select value={subscriber.status} onChange={(e) => handleStatusChange(subscriber, e.target.value as SubscriberStatus)}
                      aria-label={`Status for ${subscriber.email}`} className={statusSelectClass}>
                      {STATUS_OPTIONS.map((o) => <option key={o} value={o} className={isDark ? "bg-bg-dark" : "bg-white"}>{STATUS_LABEL[o]}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" onClick={() => setDeleteTarget(subscriber)} aria-label={`Delete ${subscriber.email}`}
                        className={`p-2 rounded-lg text-rose-500 transition-colors cursor-pointer ${isDark ? "hover:bg-rose-500/10" : "hover:bg-rose-50"}`}>
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filteredSubscribers.length === 0 && (
                <tr><td colSpan={6} className={`px-5 py-12 text-center ${isDark ? "text-gray" : "text-gray-500"}`}>No subscribers match your search or filter.</td></tr>
              )}
            </motion.tbody>
          </table>
        </motion.div>
      )}

      {subscribers.length > 0 && (
        <motion.div variants={rowStagger} initial="hidden" animate="visible" className="lg:hidden flex flex-col gap-4">
          {filteredSubscribers.map((subscriber) => (
            <motion.div key={subscriber.id} variants={rowVariants} className={`rounded-2xl border p-4 transition-colors ${panelClass}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className={`font-semibold truncate ${isDark ? "text-white" : "text-gray-900"}`}>{subscriber.email}</h3>
                  <p className={`text-sm truncate ${isDark ? "text-gray" : "text-gray-500"}`}>{subscriber.name || "—"} · {subscriber.source}</p>
                </div>
                <span className={`shrink-0 text-xs ${isDark ? "text-gray" : "text-gray-400"}`}>{formatCreatedAt(subscriber.createdAt)}</span>
              </div>
              <div className={`mt-4 flex items-center gap-2 pt-4 border-t ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
                <select value={subscriber.status} onChange={(e) => handleStatusChange(subscriber, e.target.value as SubscriberStatus)}
                  aria-label={`Status for ${subscriber.email}`} className={`${statusSelectClass} flex-1`}>
                  {STATUS_OPTIONS.map((o) => <option key={o} value={o} className={isDark ? "bg-bg-dark" : "bg-white"}>{STATUS_LABEL[o]}</option>)}
                </select>
                <button type="button" onClick={() => setDeleteTarget(subscriber)}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-rose-500 transition-colors cursor-pointer border ${isDark ? "border-bg-gray-1 hover:bg-rose-500/10" : "border-gray-200 hover:bg-rose-50"}`}>
                  <FiTrash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </motion.div>
          ))}
          {filteredSubscribers.length === 0 && (
            <div className={`rounded-2xl border py-12 text-center text-sm ${panelClass} ${isDark ? "text-gray" : "text-gray-500"}`}>No subscribers match your search or filter.</div>
          )}
        </motion.div>
      )}

      <ConfirmDialog open={deleteTarget !== null} title="Delete this subscriber?"
        description={deleteTarget ? `"${deleteTarget.email}" will be permanently removed from the mailing list. This can't be undone.` : ""}
        confirmLabel="Delete" onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} />
    </DashboardPageShell>
  );
};

export default SubscribersManagement;
