import { useState } from "react";
import { Edit2, Trash2, X, Upload, CheckCircle } from "lucide-react";

export default function AllSlidesTable() {
  const [slides, setSlides] = useState([
    { id: 1, title: "Summer Campaign 2024", image: "slide1.jpg", order: 1, status: "Active", views: 1250 },
    { id: 2, title: "New Product Launch", image: "slide2.jpg", order: 2, status: "Active", views: 980 },
    { id: 3, title: "Special Offer Banner", image: "slide3.jpg", order: 3, status: "Inactive", views: 750 },
    { id: 4, title: "Partnership Announcement", image: "slide4.jpg", order: 4, status: "Active", views: 650 },
    { id: 5, title: "Festival Sale", image: "slide5.jpg", order: 5, status: "Active", views: 1500 },
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    order: "",
    status: "Active"
  });

  const handleEdit = (slide) => {
    setSelectedSlide(slide);
    setFormData({
      title: slide.title,
      image: slide.image,
      order: slide.order,
      status: slide.status
    });
    setShowEditModal(true);
  };

  const handleDelete = (slide) => {
    setSelectedSlide(slide);
    setShowDeleteModal(true);
  };

  const handleAddNew = () => {
    setFormData({
      title: "",
      image: "",
      order: slides.length + 1,
      status: "Active"
    });
    setShowAddModal(true);
  };

  const confirmEdit = () => {
    setSlides(slides.map(s => 
      s.id === selectedSlide.id 
        ? { ...s, ...formData }
        : s
    ));
    setShowEditModal(false);
    setAlertMessage(`Slide "${formData.title}" updated successfully!`);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  const confirmDelete = () => {
    setSlides(slides.filter(s => s.id !== selectedSlide.id));
    setShowDeleteModal(false);
    setAlertMessage(`Slide "${selectedSlide.title}" deleted successfully!`);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  const confirmAdd = () => {
    const newSlide = {
      id: slides.length + 1,
      ...formData,
      views: 0
    };
    setSlides([...slides, newSlide]);
    setShowAddModal(false);
    setAlertMessage(`Slide "${formData.title}" added successfully!`);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  return (
    <div className="p-6">
      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in">
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold whitespace-nowrap">{alertMessage}</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground whitespace-nowrap">All Slides</h2>
        <button 
          onClick={handleAddNew}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
        >
          Add New Slide
        </button>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Views</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {slides.map((slide) => (
              <tr key={slide.id} className="hover:bg-muted/50">
                <td className="px-6 py-4 text-sm text-foreground whitespace-nowrap">{slide.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-foreground whitespace-nowrap">{slide.title}</td>
                <td className="px-6 py-4 text-sm text-foreground whitespace-nowrap">{slide.image}</td>
                <td className="px-6 py-4 text-sm text-foreground whitespace-nowrap">{slide.order}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    slide.status === 'Active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {slide.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-foreground whitespace-nowrap">{slide.views}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  <button 
                    onClick={() => handleEdit(slide)}
                    className="text-primary hover:text-primary/80 mr-3 whitespace-nowrap inline-flex items-center gap-1"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(slide)}
                    className="text-destructive hover:text-destructive/80 whitespace-nowrap inline-flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-foreground whitespace-nowrap">Add New Slide</h3>
              <button onClick={() => setShowAddModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1 whitespace-nowrap">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm"
                  placeholder="Enter slide title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1 whitespace-nowrap">Image File</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm"
                  placeholder="image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1 whitespace-nowrap">Display Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1 whitespace-nowrap">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm font-semibold whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={confirmAdd}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-semibold whitespace-nowrap"
              >
                Add Slide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-foreground whitespace-nowrap">Edit Slide</h3>
              <button onClick={() => setShowEditModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1 whitespace-nowrap">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1 whitespace-nowrap">Image File</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1 whitespace-nowrap">Display Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1 whitespace-nowrap">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm font-semibold whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={confirmEdit}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-semibold whitespace-nowrap"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-foreground whitespace-nowrap">Confirm Delete</h3>
              <button onClick={() => setShowDeleteModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-foreground mb-6">
              Are you sure you want to delete slide <strong>"{selectedSlide?.title}"</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm font-semibold whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors text-sm font-semibold whitespace-nowrap"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
