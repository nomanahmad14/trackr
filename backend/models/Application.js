import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },

    role: {
      type: String,
      required: [true, "Role is required"],
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "Applied",
        "Interview",
        "Rejected",
        "Offer",
        "Ghosted",
        "Saved",
      ],
      default: "Applied",
    },

    jobType: {
      type: String,
      enum: ["Internship", "Full-time", "Part-time", "Contract"],
      default: "Internship",
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    workMode: {
      type: String,
      enum: ["Remote", "Hybrid", "Onsite"],
      default: "Remote",
    },

    salary: {
      type: String,
      default: "",
      trim: true,
    },

    applicationDate: {
      type: Date,
      default: Date.now,
    },

    deadline: {
      type: Date,
      default: null,
    },

    link: {
      type: String,
      default: "",
      trim: true,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    source: {
      type: String,
      enum: ["LinkedIn", "Naukri", "Referral", "Company Website", "Other"],
      default: "Other",
    },
  },
  {
    timestamps: true,
  }
);

applicationSchema.index({ userId: 1, createdAt: -1 });
applicationSchema.index({ userId: 1, status: 1 });
applicationSchema.index({ userId: 1, jobType: 1 });
applicationSchema.index({ userId: 1, company: "text", role: "text" });

const Application = mongoose.model("Application", applicationSchema);

export default Application;