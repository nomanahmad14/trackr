import Application from "../models/Application.js";
import mongoose from "mongoose";

const createApplication = async (req, res) => {
  try {
    const {
      company,
      role,
      status,
      jobType,
      location,
      workMode,
      salary,
      applicationDate,
      deadline,
      link,
      notes,
      source,
    } = req.body;

    if (!company || !role) {
      return res.status(400).json({
        success: false,
        message: "Company and role are required",
      });
    }

    const application = await Application.create({
      userId: req.user.id,
      company,
      role,
      status,
      jobType,
      location,
      workMode,
      salary,
      applicationDate,
      deadline,
      link,
      notes,
      source,
    });

    return res.status(201).json({
      success: true,
      message: "Application created successfully",
      application,
    });
  } catch (error) {
    console.log("Create Application Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getApplications = async (req, res) => {
  try {
    const { search, status, jobType, workMode, source, sort } = req.query;

    let query = {
      userId: req.user.id,
    };

    if (search) {
      query.$or = [
        { company: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      query.status = status;
    }

    if (jobType) {
      query.jobType = jobType;
    }

    if (workMode) {
      query.workMode = workMode;
    }

    if (source) {
      query.source = source;
    }

    let sortOption = { createdAt: -1 };

    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    } else if (sort === "deadline_asc") {
      sortOption = { deadline: 1 };
    } else if (sort === "deadline_desc") {
      sortOption = { deadline: -1 };
    } else if (sort === "company_asc") {
      sortOption = { company: 1 };
    } else if (sort === "company_desc") {
      sortOption = { company: -1 };
    }

    const applications = await Application.find(query).sort(sortOption);

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.log("Get Applications Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    const application = await Application.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.log("Get Application By ID Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    const application = await Application.findOneAndUpdate(
      {
        _id: id,
        userId: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application updated successfully",
      application,
    });
  } catch (error) {
    console.log("Update Application Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    const application = await Application.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.log("Delete Application Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export { createApplication, getApplications, getApplicationById ,updateApplication,deleteApplication};


