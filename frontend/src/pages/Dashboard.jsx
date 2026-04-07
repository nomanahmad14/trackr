import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useApp } from "../context/AppContext";
import Footer from "../components/Footer";
import DashboardCharts from "../components/DashboardCharts";
const Dashboard = () => {
  const {
    dashboardData,
    dashboardLoading,
    dashboardError,
    fetchDashboardStats,
  } = useApp();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const getStatusBadge = (status) => {
    const base = "px-3 py-1 rounded-full text-xs font-medium border";

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
    if (!dateString) return "No deadline";

    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const stats = dashboardData?.stats;
  const recentApplications = dashboardData?.recentApplications || [];
  const upcomingDeadlines = dashboardData?.upcomingDeadlines || [];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="container-custom py-8 space-y-8">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="text-muted mt-2">
              Track your applications, interviews, offers, and deadlines in one place.
            </p>
          </div>

          <Link
            to="/applications/new"
            className="btn-primary inline-flex items-center justify-center"
          >
            + Add New Application
          </Link>
        </section>

        {dashboardLoading ? (
          <div className="card p-6 text-slate-600">Loading dashboard...</div>
        ) : dashboardError ? (
          <div className="card p-6 text-red-600">{dashboardError}</div>
        ) : (
          <>
            {/* Stats Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="card p-5">
                <p className="text-sm text-slate-500">Total Applications</p>
                <h2 className="text-3xl font-semibold text-slate-900 mt-3">
                  {stats?.totalApplications || 0}
                </h2>
              </div>

              <div className="card p-5">
                <p className="text-sm text-slate-500">Interviews</p>
                <h2 className="text-3xl font-semibold text-yellow-600 mt-3">
                  {stats?.statusCounts?.interview || 0}
                </h2>
              </div>

              <div className="card p-5">
                <p className="text-sm text-slate-500">Offers</p>
                <h2 className="text-3xl font-semibold text-green-600 mt-3">
                  {stats?.statusCounts?.offer || 0}
                </h2>
              </div>

              <div className="card p-5">
                <p className="text-sm text-slate-500">Rejected</p>
                <h2 className="text-3xl font-semibold text-red-600 mt-3">
                  {stats?.statusCounts?.rejected || 0}
                </h2>
              </div>
            </section>
            
            {/* Charts */}
            <DashboardCharts
              statusCounts={stats?.statusCounts}
              jobTypeCounts={stats?.jobTypeCounts}
            />

            {/* Lower Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Applications */}
              <div className="card p-6 lg:col-span-2">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="section-title">Recent Applications</h3>
                  <Link
                    to="/applications"
                    className="text-sm text-blue-600 font-medium hover:underline"
                  >
                    View all
                  </Link>
                </div>

                {recentApplications.length === 0 ? (
                  <div className="border border-dashed border-slate-300 rounded-xl p-6 text-center text-slate-500">
                    No applications added yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentApplications.map((app) => (
                      <div
                        key={app._id}
                        className="border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-4"
                      >
                        <div>
                          <h4 className="font-medium text-slate-900">
                            {app.role}
                          </h4>
                          <p className="text-sm text-slate-500 mt-1">
                            {app.company} • {app.location || "Remote / Not specified"}
                          </p>
                        </div>

                        <span className={getStatusBadge(app.status)}>
                          {app.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Upcoming Deadlines */}
              <div className="card p-6">
                <h3 className="section-title mb-5">Upcoming Deadlines</h3>

                {upcomingDeadlines.length === 0 ? (
                  <div className="border border-dashed border-slate-300 rounded-xl p-6 text-center text-slate-500">
                    No upcoming deadlines.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingDeadlines.map((app) => (
                      <div
                        key={app._id}
                        className="border border-slate-200 rounded-xl p-4"
                      >
                        <p className="font-medium text-slate-900">
                          {app.company}
                        </p>
                        <p className="text-sm text-slate-500 mt-1">
                          {app.role}
                        </p>
                        <p className="text-sm text-slate-500 mt-2">
                          Deadline: {formatDate(app.deadline)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;