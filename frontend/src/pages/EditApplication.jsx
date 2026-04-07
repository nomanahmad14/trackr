import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ApplicationForm from "../components/ApplicationForm";
import { useApp } from "../context/AppContext";

const EditApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getApplicationById, updateExistingApplication } = useApp();

  const [initialData, setInitialData] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setPageLoading(true);
        const data = await getApplicationById(id);

        if (data.success) {
          setInitialData(data.application);
        }
      } catch (error) {
        console.error("Fetch application failed:", error);
        alert("Failed to load application.");
        navigate("/applications");
      } finally {
        setPageLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      setSubmitLoading(true);
      await updateExistingApplication(id, formData);
      navigate("/applications");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update application.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="container-custom py-8 space-y-8">
        <div>
          <h1 className="page-title">Edit Application</h1>
          <p className="text-muted mt-2">
            Update your application details.
          </p>
        </div>

        {pageLoading ? (
          <div className="card p-6 text-slate-600">Loading application...</div>
        ) : (
          <ApplicationForm
            initialData={initialData}
            onSubmit={handleUpdate}
            loading={submitLoading}
            submitText="Update Application"
          />
        )}
      </main>
    </div>
  );
};

export default EditApplication;