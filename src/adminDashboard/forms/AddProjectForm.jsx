import { useState } from "react";
import { AlertCircle } from "lucide-react";

export default function AddProjectForm() {
  const [formData, setFormData] = useState({
    projectName: "",
    category: "",
    duration: "",
    description: "",
    startDate: "",
    clientName: "",
    status: "pending",
    commission1: "", // mandatory
    commission2: "", // optional
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if commission1 is filled
    if (!formData.commission1) {
      alert("⚠️ Commission 1 is required!");
      return;
    }

    console.log("Project Data:", formData);
    alert("✅ Project added successfully!");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-full flex flex-col p-3 sm:p-4">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Add New Project</h2>
      
      {/* Alert Message */}
      <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Bonus & Commission Information</p>
            <p className="text-blue-700 dark:text-blue-300">
              <span className="font-medium">Total Bonus: ₹500</span> | 
              <span className="font-medium ml-2">Per Task: ₹100</span>
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-custom min-h-0">
      <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border p-4 sm:p-6 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 text-sm bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter project name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Client Name</label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter client name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select Category</option>
              <option value="marketing">Marketing</option>
              <option value="social-media">Social Media</option>
              <option value="seo">SEO</option>
              <option value="content">Content Creation</option>
              <option value="email">Email Marketing</option>
            </select>
          </div>

            {/* Commission 1 (Mandatory) */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Commission 1 (%) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="commission1"
                value={formData.commission1}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., 10"
                required
              />
            </div>

            {/* Commission 2 (Optional) */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Commission 2 (%) <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="number"
                name="commission2"
                value={formData.commission2}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., 15"
              />
            </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Duration (Days)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="30"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">Project Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter project description..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold whitespace-nowrap"
          >
            Add Project
          </button>
          <button
            type="button"
            className="w-full sm:w-auto px-6 py-2 text-sm bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/80 transition-colors whitespace-nowrap"
          >
            Cancel
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
