import { useEffect, useState } from "react";

const ApplicationForm = ({
  initialData = null,
  onSubmit,
  loading = false,
  submitText = "Save Application",
}) => {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    jobType: "",
    location: "",
    workMode: "",
    salary: "",
    applicationDate: "",
    deadline: "",
    link: "",
    notes: "",
    source: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        company: initialData.company || "",
        role: initialData.role || "",
        status: initialData.status || "Applied",
        jobType: initialData.jobType || "",
        location: initialData.location || "",
        workMode: initialData.workMode || "",
        salary: initialData.salary || "",
        applicationDate: initialData.applicationDate
          ? initialData.applicationDate.split("T")[0]
          : "",
        deadline: initialData.deadline
          ? initialData.deadline.split("T")[0]
          : "",
        link: initialData.link || "",
        notes: initialData.notes || "",
        source: initialData.source || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.company.trim() || !formData.role.trim()) {
      alert("Company and Role are required.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <section className="card p-6 space-y-5">
        <div>
          <h2 className="section-title">Basic Information</h2>
          <p className="text-sm text-slate-500 mt-1">
            Main details about the role you applied for.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Company *
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g. Razorpay"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Role *
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g. Backend Intern"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input-field"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer">Offer</option>
              <option value="Ghosted">Ghosted</option>
              <option value="Saved">Saved</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Source
            </label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g. LinkedIn, Careers Page"
            />
          </div>
        </div>
      </section>

      {/* Job Details */}
      <section className="card p-6 space-y-5">
        <div>
          <h2 className="section-title">Job Details</h2>
          <p className="text-sm text-slate-500 mt-1">
            Additional details to help you organize better.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Job Type
            </label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select job type</option>
              <option value="Internship">Internship</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Work Mode
            </label>
            <select
              name="workMode"
              value={formData.workMode}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select work mode</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">Onsite</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g. Bengaluru / Remote"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Salary / Stipend
            </label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g. ₹30,000/month"
            />
          </div>
        </div>
      </section>

      {/* Dates */}
      <section className="card p-6 space-y-5">
        <div>
          <h2 className="section-title">Dates</h2>
          <p className="text-sm text-slate-500 mt-1">
            Track when you applied and any important deadlines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Application Date
            </label>
            <input
              type="date"
              name="applicationDate"
              value={formData.applicationDate}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </div>
      </section>

      {/* Extras */}
      <section className="card p-6 space-y-5">
        <div>
          <h2 className="section-title">Extras</h2>
          <p className="text-sm text-slate-500 mt-1">
            Optional links and notes for future reference.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Application Link
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="input-field"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="5"
              className="input-field resize-none"
              placeholder="Add interview notes, follow-up reminders, recruiter info, etc."
            />
          </div>
        </div>
      </section>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : submitText}
        </button>
      </div>
    </form>
  );
};

export default ApplicationForm;