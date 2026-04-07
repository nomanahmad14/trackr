import { createContext, useContext, useState, useCallback } from "react";
import api from "../api/axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // ---------------- DASHBOARD ----------------
  const [dashboardData, setDashboardData] = useState(null);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [dashboardError, setDashboardError] = useState("");

  // ---------------- APPLICATIONS ----------------
  const [applications, setApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [applicationsError, setApplicationsError] = useState("");

  // ---------------- FILTERS ----------------
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    jobType: "",
    workMode: "",
    source: "",
    sort: "newest",
  });

  // ---------------- FILTER HELPERS ----------------
  const updateFilters = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      status: "",
      jobType: "",
      workMode: "",
      source: "",
      sort: "newest",
    });
  };

  // ---------------- DASHBOARD API ----------------
  const fetchDashboardStats = useCallback(async () => {
    try {
      setDashboardLoading(true);
      setDashboardError("");

      const { data } = await api.get("/dashboard/stats");

      if (data.success) {
        setDashboardData(data);
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      setDashboardError("Failed to load dashboard data.");
    } finally {
      setDashboardLoading(false);
    }
  }, []);

  // ---------------- APPLICATIONS API ----------------
  const fetchApplications = useCallback(
    async (customFilters = filters) => {
      try {
        setApplicationsLoading(true);
        setApplicationsError("");

        const params = {};

        if (customFilters.search) params.search = customFilters.search;
        if (customFilters.status) params.status = customFilters.status;
        if (customFilters.jobType) params.jobType = customFilters.jobType;
        if (customFilters.workMode) params.workMode = customFilters.workMode;
        if (customFilters.source) params.source = customFilters.source;
        if (customFilters.sort) params.sort = customFilters.sort;

        const { data } = await api.get("/applications", { params });

        if (data.success) {
          setApplications(data.applications);
        }
      } catch (error) {
        console.error("Fetch applications error:", error);
        setApplicationsError("Failed to load applications.");
      } finally {
        setApplicationsLoading(false);
      }
    },
    [filters]
  );

  const createNewApplication = async (formData) => {
    try {
      const { data } = await api.post("/applications", formData);

      if (data.success) {
        await fetchApplications();
        await fetchDashboardStats();
      }

      return data;
    } catch (error) {
      console.error("Create application error:", error);
      throw error;
    }
  };

  const getApplicationById = async (id) => {
    try {
      const { data } = await api.get(`/applications/${id}`);
      return data;
    } catch (error) {
      console.error("Get application by id error:", error);
      throw error;
    }
  };

  const updateExistingApplication = async (id, formData) => {
    try {
      const { data } = await api.put(`/applications/${id}`, formData);

      if (data.success) {
        await fetchApplications();
        await fetchDashboardStats();
      }

      return data;
    } catch (error) {
      console.error("Update application error:", error);
      throw error;
    }
  };

  const deleteExistingApplication = async (id) => {
    try {
      const { data } = await api.delete(`/applications/${id}`);

      if (data.success) {
        await fetchApplications();
        await fetchDashboardStats();
      }

      return data;
    } catch (error) {
      console.error("Delete application error:", error);
      throw error;
    }
  };

  return (
    <AppContext.Provider
      value={{
        // dashboard
        dashboardData,
        dashboardLoading,
        dashboardError,
        fetchDashboardStats,

        // applications
        applications,
        applicationsLoading,
        applicationsError,
        fetchApplications,

        // filters
        filters,
        setFilters,
        updateFilters,
        resetFilters,

        // CRUD
        createNewApplication,
        getApplicationById,
        updateExistingApplication,
        deleteExistingApplication,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);