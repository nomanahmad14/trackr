import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ApplicationForm from "../components/ApplicationForm";
import { useApp } from "../context/AppContext";

const AddApplication = () => {
  const navigate = useNavigate();
  const { createNewApplication } = useApp();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (formData) => {
    try {
      setLoading(true);
      await createNewApplication(formData);
      navigate("/applications");
    } catch (error) {
      console.error("Create failed:", error);
      alert("Failed to create application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="container-custom py-8 space-y-8">
        <div>
          <h1 className="page-title">Add Application</h1>
          <p className="text-muted mt-2">
            Add a new job or internship application.
          </p>
        </div>

        <ApplicationForm
          onSubmit={handleCreate}
          loading={loading}
          submitText="Create Application"
        />
      </main>
    </div>
  );
};

export default AddApplication;