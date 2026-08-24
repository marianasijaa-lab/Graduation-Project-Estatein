import { useEffect, useState } from "react";
import { FiEdit2, FiSearch, FiTrash2 } from "react-icons/fi";
import { useTheme } from "../../Context/ThemeContext";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addProperty,
  deleteProperty,
  fetchProperties,
  updateProperty,
} from "../../store/slices/propertiesSlice";
import type { Property } from "../../Data/properties";
import { Button } from "../../components/ui/Button";
import { PropertyFormModal } from "../../components/sections/dashboard/PropertyFormModal";
import { ConfirmDialog } from "../../components/sections/dashboard/ConfirmDialog";
import { DetailModal, type DetailField } from "../../components/sections/dashboard/DetailModal";

type FormModalState = { mode: "add" } | { mode: "edit"; property: Property } | null;

// Every Property field, for the detail view.
function buildPropertyDetailFields(property: Property): DetailField[] {
  return [
    { label: "ID", value: `#${property.id}` },
    {
      label: "Image",
      value: (
        <img
          src={property.image}
          alt={property.name}
          className="w-full max-w-xs h-32 object-cover rounded-lg"
        />
      ),
      fullWidth: true,
    },
    { label: "Name", value: property.name },
    { label: "Marketing Tag", value: property.tag || "—" },
    { label: "Short Description", value: property.descriptionShort, fullWidth: true },
    { label: "Long Description", value: property.descriptionLong, fullWidth: true },
    {
      label: "Bedrooms",
      value: (
        <span className="flex items-center gap-2">
          {property.bedroomIcon && <img src={property.bedroomIcon} alt="" className="w-4 h-4" />}
          {property.bedrooms ?? "—"}
        </span>
      ),
    },
    {
      label: "Bathrooms",
      value: (
        <span className="flex items-center gap-2">
          {property.bathroomIcon && <img src={property.bathroomIcon} alt="" className="w-4 h-4" />}
          {property.bathrooms ?? "—"}
        </span>
      ),
    },
    {
      label: "Property Type",
      value: (
        <span className="flex items-center gap-2">
          {property.propertyTypeIcon && <img src={property.propertyTypeIcon} alt="" className="w-4 h-4" />}
          {property.propertyType ?? "—"}
        </span>
      ),
    },
    { label: "Price — Home Page", value: `$${property.priceHome.toLocaleString()}` },
    { label: "Price — Properties Page", value: `$${property.priceProperties.toLocaleString()}` },
  ];
}

export const PropertiesManagement = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const dispatch = useAppDispatch();
  const { items: properties, status } = useAppSelector((state) => state.properties);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProperties());
    }
  }, [status, dispatch]);

  const [searchTerm, setSearchTerm] = useState("");
  const [formModal, setFormModal] = useState<FormModalState>(null);
  const [deleteTarget, setDeleteTarget] = useState<Property | null>(null);
  const [detailTarget, setDetailTarget] = useState<Property | null>(null);

  const filteredProperties = properties.filter((property) =>
    property.name.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );

  const openAddModal = () => setFormModal({ mode: "add" });
  const openEditModal = (property: Property) => setFormModal({ mode: "edit", property });
  const closeFormModal = () => setFormModal(null);

  const handleFormSubmit = (values: Omit<Property, "id">) => {
    if (formModal?.mode === "edit") {
      dispatch(updateProperty({ ...values, id: formModal.property.id }));
    } else {
      dispatch(addProperty(values));
    }
    setFormModal(null);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      dispatch(deleteProperty(deleteTarget.id));
    }
    setDeleteTarget(null);
  };

  const openRowDetail = (property: Property) => setDetailTarget(property);
  const handleRowKeyDown = (e: React.KeyboardEvent, property: Property) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openRowDetail(property);
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
          Manage every property listing shown across the site — add new listings, update
          details, or retire ones that are no longer available.
        </p>
        <Button text="Add Property" variant="primary" onClick={openAddModal} />
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
          placeholder="Search by property name"
          aria-label="Search by property name"
          className={`${inputClass} pl-11 pr-4 py-3`}
        />
      </div>

      {status === "loading" && properties.length === 0 && (
        <div className={`rounded-2xl border py-16 text-center text-sm ${panelClass} ${isDark ? "text-gray" : "text-gray-500"}`}>
          Loading properties…
        </div>
      )}

      {status === "failed" && (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 py-16 text-center text-sm text-rose-500">
          Couldn't load properties. Please try again.
        </div>
      )}

      {/* ── Desktop table ── */}
      {properties.length > 0 && (
        <div className={`hidden lg:block rounded-2xl border ${panelClass}`}>
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
            <tbody>
              {filteredProperties.map((property) => (
                <tr
                  key={property.id}
                  tabIndex={0}
                  aria-label={`View details for ${property.name}`}
                  onClick={() => openRowDetail(property)}
                  onKeyDown={(e) => handleRowKeyDown(e, property)}
                  className={`border-b last:border-b-0 cursor-pointer transition-colors ${
                    isDark ? "border-bg-gray-1" : "border-gray-200"
                  } ${rowHoverClass}`}
                >
                  <td className={`px-5 py-3 ${isDark ? "text-gray" : "text-gray-600"}`}>#{property.id}</td>
                  <td className="px-5 py-3">
                    <img
                      src={property.image}
                      alt={property.name}
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                    />
                  </td>
                  <td className={`px-5 py-3 font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                    {property.name}
                  </td>
                  <td className={`px-5 py-3 ${isDark ? "text-gray" : "text-gray-600"}`}>
                    {property.propertyType ?? "—"}
                  </td>
                  <td className={`px-5 py-3 font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                    ${property.priceProperties.toLocaleString()}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(property);
                        }}
                        aria-label={`Edit ${property.name}`}
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
                          setDeleteTarget(property);
                        }}
                        aria-label={`Delete ${property.name}`}
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

              {filteredProperties.length === 0 && (
                <tr>
                  <td colSpan={6} className={`px-5 py-12 text-center ${isDark ? "text-gray" : "text-gray-500"}`}>
                    No properties match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Mobile cards ── */}
      {properties.length > 0 && (
        <div className="lg:hidden flex flex-col gap-4">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${property.name}`}
              onClick={() => openRowDetail(property)}
              onKeyDown={(e) => handleRowKeyDown(e, property)}
              className={`rounded-2xl border p-4 cursor-pointer transition-colors ${panelClass} ${rowHoverClass}`}
            >
              <div className="flex items-start gap-3">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold truncate ${isDark ? "text-white" : "text-gray-900"}`}>
                    {property.name}
                  </h3>
                  <p className={`text-sm truncate ${isDark ? "text-gray" : "text-gray-500"}`}>
                    {property.propertyType ?? "—"} · {property.bedrooms ?? "—"} bd / {property.bathrooms ?? "—"} ba
                  </p>
                </div>
              </div>

              <div className={`mt-4 flex items-center justify-between text-sm ${isDark ? "text-gray" : "text-gray-600"}`}>
                <span>Price</span>
                <span className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                  ${property.priceProperties.toLocaleString()}
                </span>
              </div>

              <div className={`mt-4 grid grid-cols-2 gap-2 pt-4 border-t ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(property);
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
                    setDeleteTarget(property);
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

          {filteredProperties.length === 0 && (
            <div className={`rounded-2xl border py-12 text-center text-sm ${panelClass} ${isDark ? "text-gray" : "text-gray-500"}`}>
              No properties match your search.
            </div>
          )}
        </div>
      )}

      {formModal && (
        <PropertyFormModal
          mode={formModal.mode}
          initialData={formModal.mode === "edit" ? formModal.property : undefined}
          onClose={closeFormModal}
          onSubmit={handleFormSubmit}
        />
      )}

      {detailTarget && (
        <DetailModal
          title={detailTarget.name}
          fields={buildPropertyDetailFields(detailTarget)}
          onClose={() => setDetailTarget(null)}
        />
      )}

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete this property?"
        description={
          deleteTarget
            ? `"${deleteTarget.name}" will be permanently removed from the listings. This can't be undone.`
            : ""
        }
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default PropertiesManagement;
