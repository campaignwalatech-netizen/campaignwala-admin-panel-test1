import { useState } from "react";
import { Edit2, Trash2, X, Eye, Image, Calendar, Upload } from "lucide-react";

export default function AllSlidesTable() {
  const [slides, setSlides] = useState([
    { 
      id: 1, 
      title: "Zero Fee Demat Account", 
      image: "https://picsum.photos/280/160?random=1", 
      category: "Demat Account",
      order: 1, 
      status: "Active", 
      views: 1250,
      dateCreated: "2024-06-15",
      description: "Officia sunt laboris elit fugiat adipisicing ex ea nulla aute duis occaecat dolore id et ess"
    },
    { 
      id: 2, 
      title: "Offer Slide 1", 
      image: "https://picsum.photos/280/160?random=2", 
      category: "Demat Account",
      order: 2, 
      status: "Active", 
      views: 980,
      dateCreated: "2024-07-20",
      description: "Officia sunt laboris elit fugiat adipisicing ex ea nulla aute duis occaecat dolore id et ess"
    },
    { 
      id: 3, 
      title: "Offer Slide 2", 
      image: "https://picsum.photos/280/160?random=3", 
      category: "Demat Account",
      order: 3, 
      status: "Active", 
      views: 750,
      dateCreated: "2024-08-10",
      description: "Officia sunt laboris elit fugiat adipisicing ex ea nulla aute duis occaecat dolore id et ess"
    },
    { 
      id: 4, 
      title: "Offer Slide 3", 
      image: "https://picsum.photos/280/160?random=4", 
      category: "Demat Account",
      order: 4, 
      status: "Active", 
      views: 650,
      dateCreated: "2024-09-05",
      description: "Officia sunt laboris elit fugiat adipisicing ex ea nulla aute duis occaecat dolore id et ess"
    },
    { 
      id: 5, 
      title: "Special Promotion", 
      image: "https://picsum.photos/280/160?random=5", 
      category: "Investment",
      order: 5, 
      status: "Inactive", 
      views: 1500,
      dateCreated: "2024-10-01",
      description: "Officia sunt laboris elit fugiat adipisicing ex ea nulla aute duis occaecat dolore id et ess"
    },
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    category: "",
    order: "",
    status: "Active"
  });

  const handleEdit = (slide) => {
    setSelectedSlide(slide);
    setFormData({
      title: slide.title,
      image: slide.image,
      category: slide.category,
      order: slide.order,
      status: slide.status
    });
    setShowEditModal(true);
  };

  const handleDelete = (slide) => {
    setSelectedSlide(slide);
    setShowDeleteModal(true);
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

  return (
    <div className="h-full flex flex-col p-4 sm:p-6">
      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in">
          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
          </div>
          <span className="font-semibold">{alertMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Slide Board</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search category..."
              className="pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary w-64"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="flex-1 overflow-y-auto scrollbar-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {slides.map((slide) => (
            <div key={slide.id} className="bg-white dark:bg-card rounded-lg border border-gray-200 dark:border-border overflow-hidden hover:shadow-lg transition-all duration-200">
              {/* Slide Image */}
              <div className="relative">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-32 object-cover"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/280x160/e2e8f0/64748b?text=${encodeURIComponent(slide.title)}`;
                  }}
                />
              </div>

              {/* Card Content */}
              <div className="p-4">
                {/* Title */}
                <h3 className="text-base font-semibold text-gray-900 dark:text-foreground mb-1">
                  {slide.title}
                </h3>
                
                {/* Category */}
                <p className="text-sm text-gray-500 dark:text-muted-foreground mb-2">
                  {slide.category}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {slide.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(slide)}
                    className="flex items-center justify-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors text-xs font-medium"
                  >
                    <Edit2 className="w-3 h-3" />
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(slide)}
                    className="flex items-center justify-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors text-xs font-medium"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-4 max-w-md w-full">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-foreground">Edit Slide</h3>
              <button onClick={() => setShowEditModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-1.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-1.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Image Upload</label>
                <div className="border-2 border-dashed border-border rounded-lg p-3 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept="image/png,image/jpg,image/jpeg,image/gif"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        // Validate file size (10MB limit)
                        if (file.size > 10 * 1024 * 1024) {
                          alert("File size should be less than 10MB");
                          return;
                        }
                        
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          setFormData({...formData, image: e.target.result});
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center gap-1">
                    <Upload className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Click to upload image</span>
                    <span className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Display Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                  className="w-full px-3 py-1.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-1.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-3 py-1.5 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/80 transition-colors text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmEdit}
                className="flex-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-semibold"
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
                className="flex-1 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/80 transition-colors text-sm font-semibold whitespace-nowrap"
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
