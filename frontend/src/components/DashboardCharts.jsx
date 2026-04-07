import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const DashboardCharts = ({ statusCounts, jobTypeCounts }) => {
  const statusData = [
    { name: "Applied", value: statusCounts?.applied || 0, color: "#2563eb" },
    { name: "Interview", value: statusCounts?.interview || 0, color: "#ca8a04" },
    { name: "Rejected", value: statusCounts?.rejected || 0, color: "#dc2626" },
    { name: "Offer", value: statusCounts?.offer || 0, color: "#16a34a" },
    { name: "Ghosted", value: statusCounts?.ghosted || 0, color: "#64748b" },
    { name: "Saved", value: statusCounts?.saved || 0, color: "#7c3aed" },
  ];

  const jobTypeData = [
    { name: "Internship", value: jobTypeCounts?.internship || 0, color: "#2563eb" },
    { name: "Full-time", value: jobTypeCounts?.fullTime || 0, color: "#16a34a" },
    { name: "Part-time", value: jobTypeCounts?.partTime || 0, color: "#ca8a04" },
    { name: "Contract", value: jobTypeCounts?.contract || 0, color: "#7c3aed" },
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Status Chart */}
      <div className="card p-6">
        <div className="mb-5">
          <h3 className="section-title">Applications by Status</h3>
          <p className="text-sm text-slate-500 mt-1">
            Quick overview of your application pipeline.
          </p>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {statusData.map((entry, index) => (
                  <Cell key={`status-cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Job Type Chart */}
      <div className="card p-6">
        <div className="mb-5">
          <h3 className="section-title">Applications by Job Type</h3>
          <p className="text-sm text-slate-500 mt-1">
            See where your applications are focused.
          </p>
        </div>

        <div className="h-72 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={jobTypeData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={45}
                paddingAngle={4}
              >
                {jobTypeData.map((entry, index) => (
                  <Cell key={`jobtype-cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          {jobTypeData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-600">
                {item.name} ({item.value})
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardCharts;