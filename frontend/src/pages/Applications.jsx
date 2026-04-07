import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useApp } from "../context/AppContext";

const Applications = () => {
  const {
    applications,
    applicationsLoading,
    applicationsError,
    fetchApplications,
    filters,
    updateFilters,
    resetFilters,
    deleteExistingApplication,
  } = useApp();

  useEffect(() => {
    fetchApplications(filters);
  }, [filters, fetchApplications]);

  const handleDelete = async (id, company, role) => {
    const confirmDelete = window.confirm(
      `Delete application for "${role}" at "${company}"?`
    );

    if (!confirmDelete) return;

    try {
      await deleteExistingApplication(id);
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete application.");
    }
  };

  const getStatusBadge = (status) => {
    const base =
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border";

    switch (status) {
      case "Applied":
        return `${base} bg-blue-50 text-blue-700 border-blue-200`;
      case "Interview":
        return `${base} bg-yellow-50 text-yellow-700 border-yellow-200`;
      case "Rejected":
        return `${base} bg-red-50 text-red-700 border-red-200`;
      case "Offer":
        return `${base} bg-green-50 text-green-700 border-green-200`;
      case "Ghosted":
        return `${base} bg-slate-100 text-slate-700 border-slate-200`;
      case "Saved":
        return `${base} bg-purple-50 text-purple-700 border-purple-200`;
      default:
        return `${base} bg-slate-100 text-slate-700 border-slate-200`;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";

    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="container-custom py-8 space-y-8">
        {/* Header */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="page-title">Applications</h1>
            <p className="text-muted mt-2">
              Manage all your job and internship applications in one place.
            </p>
          </div>

          <Link
            to="/applications/new"
            className="btn-primary inline-flex items-center justify-center"
          >
            + Add New Application
          </Link>
        </section>

        {/* Filters */}
        <section className="card p-5">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-end">
            {/* Search */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Search by company or role..."
                value={filters.search}
                onChange={(e) => updateFilters("search", e.target.value)}
                className="input-field"
              />
            </div>

            {/* Status Filter */}
            <div className="w-full lg:w-52">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => updateFilters("status", e.target.value)}
                className="input-field"
              >
                <option value="">All Statuses</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Rejected">Rejected</option>
                <option value="Offer">Offer</option>
                <option value="Ghosted">Ghosted</option>
                <option value="Saved">Saved</option>
              </select>
            </div>

            {/* Sort */}
            <div className="w-full lg:w-56">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Sort By
              </label>
              <select
                value={filters.sort}
                onChange={(e) => updateFilters("sort", e.target.value)}
                className="input-field"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="deadline_asc">Deadline (Earliest)</option>
                <option value="deadline_desc">Deadline (Latest)</option>
                <option value="company_asc">Company (A-Z)</option>
                <option value="company_desc">Company (Z-A)</option>
              </select>
            </div>

            {/* Reset */}
            <div className="w-full lg:w-auto">
              <button
                onClick={resetFilters}
                className="btn-secondary w-full lg:w-auto"
              >
                Reset
              </button>
            </div>
          </div>
        </section>

        {/* Table / States */}
        <section className="card overflow-hidden">
          {applicationsLoading ? (
            <div className="p-8 text-center text-slate-500">
              Loading applications...
            </div>
          ) : applicationsError ? (
            <div className="p-8 text-center text-red-600">
              {applicationsError}
            </div>
          ) : applications.length === 0 ? (
            <div className="p-10 text-center">
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-slate-900">
                  No applications found
                </h3>
                <p className="text-slate-500 mt-2">
                  Start tracking your applications to make Trackr actually useful.
                </p>

                <Link
                  to="/applications/new"
                  className="btn-primary inline-flex mt-5"
                >
                  + Add Your First Application
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-100 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold text-slate-700">
                      Role
                    </th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-700">
                      Company
                    </th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-700">
                      Location
                    </th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-700">
                      Status
                    </th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-700">
                      Deadline
                    </th>
                    <th className="text-right px-6 py-4 font-semibold text-slate-700">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 bg-white">
                  {applications.map((app) => (
                    <tr
                      key={app._id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">{app.role}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          {app.jobType || "—"}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-800">
                          {app.company}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {app.source || "—"}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {app.location || "—"}
                      </td>

                      <td className="px-6 py-4">
                        <span className={getStatusBadge(app.status)}>
                          {app.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {formatDate(app.deadline)}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-3">
                          <Link
                            to={`/applications/edit/${app._id}`}
                            className="text-sm font-medium text-blue-600 hover:text-blue-700"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() =>
                              handleDelete(app._id, app.company, app.role)
                            }
                            className="text-sm font-medium text-red-600 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Applications;