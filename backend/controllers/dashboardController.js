import Application from "../models/Application.js";

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalApplications = await Application.countDocuments({ userId });

    const appliedCount = await Application.countDocuments({
      userId,
      status: "Applied",
    });

    const interviewCount = await Application.countDocuments({
      userId,
      status: "Interview",
    });

    const rejectedCount = await Application.countDocuments({
      userId,
      status: "Rejected",
    });

    const offerCount = await Application.countDocuments({
      userId,
      status: "Offer",
    });

    const ghostedCount = await Application.countDocuments({
      userId,
      status: "Ghosted",
    });

    const savedCount = await Application.countDocuments({
      userId,
      status: "Saved",
    });


    const internshipCount = await Application.countDocuments({
      userId,
      jobType: "Internship",
    });

    const fullTimeCount = await Application.countDocuments({
      userId,
      jobType: "Full-time",
    });

    const partTimeCount = await Application.countDocuments({
      userId,
      jobType: "Part-time",
    });

    const contractCount = await Application.countDocuments({
      userId,
      jobType: "Contract",
    });

    
    const recentApplications = await Application.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    
    const upcomingDeadlines = await Application.find({
      userId,
      deadline: { $ne: null },
    })
      .sort({ deadline: 1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      stats: {
        totalApplications,
        statusCounts: {
          applied: appliedCount,
          interview: interviewCount,
          rejected: rejectedCount,
          offer: offerCount,
          ghosted: ghostedCount,
          saved: savedCount,
        },
        jobTypeCounts: {
          internship: internshipCount,
          fullTime: fullTimeCount,
          partTime: partTimeCount,
          contract: contractCount,
        },
      },
      recentApplications,
      upcomingDeadlines,
    });
  } catch (error) {
    console.log("Dashboard Stats Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export { getDashboardStats };