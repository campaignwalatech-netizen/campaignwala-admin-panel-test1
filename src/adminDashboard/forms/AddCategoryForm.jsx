import { useState, useRef, useEffect } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddCategoryForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const editCategory = location.state?.editCategory;
  const isEditMode = !!editCategory;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
    iconImage: null,
    status: "active"
  });

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Populate form data when in edit mode
  useEffect(() => {
    if (editCategory) {
      setFormData({
        name: editCategory.name || "",
        description: editCategory.description || "",
        icon: editCategory.icon || "",
        iconImage: null,
        status: editCategory.status || "active"
      });
    }
  }, [editCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Category Data:", formData);
    console.log("Icon Image:", formData.iconImage);
    
    if (isEditMode) {
      alert("Category updated successfully!");
      // Navigate back to categories list
      navigate('/admin/categories');
    } else {
      alert("Category added successfully!");
      // Reset form for new category
      setFormData({
        name: "",
        description: "",
        icon: "",
        iconImage: null,
        status: "active"
      });
      setImagePreview(null);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      setFormData({ ...formData, iconImage: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, iconImage: null });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="h-full flex flex-col p-3 sm:p-4">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
        {isEditMode ? "Edit Category" : "Add New Category"}
      </h2>
      
      <div className="flex-1 overflow-y-auto scrollbar-custom min-h-0">
      <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border p-4 sm:p-6 max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Category Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter category name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter category description..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Icon Name (Optional)</label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., marketing, social (fallback if no image)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Category Icon Image</label>
            
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            
            {/* Upload area */}
            <div className="space-y-4">
              {!imagePreview ? (
                <div
                  onClick={triggerFileInput}
                  className="w-full h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-muted/50 transition-colors"
                >
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground text-center">
                    Click to upload category icon
                    <br />
                    <span className="text-xs">PNG, JPG up to 5MB</span>
                  </p>
                </div>
              ) : (
                <div className="relative inline-block">
                  <div className="w-32 h-32 border border-border rounded-lg overflow-hidden bg-muted">
                    <img
                      src={imagePreview}
                      alt="Category icon preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/80 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              {imagePreview && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm flex items-center gap-2"
                  >
                    <ImageIcon className="w-4 h-4" />
                    Change Image
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
          >
            {isEditMode ? "Update Category" : "Add Category"}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/categories')}
            className="px-6 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/80 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
