import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

export default function AddSlideForm() {
  const [formData, setFormData] = useState({
    offerTitle: "",
    category: "",
    projectId: "",
    backgroundImage: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Slide Data:", formData);
    alert("Slide added successfully!");
    
    // Reset form after submission
    setFormData({
      offerTitle: "",
      category: "",
      projectId: "",
      backgroundImage: null
    });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setFormData(prev => ({
        ...prev,
        backgroundImage: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      backgroundImage: null
    }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="h-full flex flex-col p-3 sm:p-4">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Add New Slide</h2>
      
      <div className="flex-1 overflow-y-auto scrollbar-custom min-h-0">
        <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border p-4 sm:p-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Offer Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Offer Title *
              </label>
              <input
                type="text"
                name="offerTitle"
                value={formData.offerTitle}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter attractive offer title..."
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="home-kitchen">Home & Kitchen</option>
                <option value="health-beauty">Health & Beauty</option>
                <option value="sports">Sports & Fitness</option>
                <option value="books">Books & Education</option>
                <option value="automobiles">Automobiles</option>
                <option value="travel">Travel & Tourism</option>
                <option value="food-beverage">Food & Beverage</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* Project ID */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Project ID *
              </label>
              <input
                type="text"
                name="projectId"
                value={formData.projectId}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., PROJ001"
                required
              />
            </div>

            {/* Background Image */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Background Image *
              </label>
              
              <div className="space-y-4">
                {/* Upload Area */}
                <div 
                  className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Click to upload background image
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: JPG, PNG, GIF (Max 5MB)
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* Image Preview */}
                {imagePreview && (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Background preview" 
                      className="w-full h-48 object-cover rounded-lg border border-border"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  offerTitle: "",
                  category: "",
                  projectId: "",
                  backgroundImage: null
                });
                setImagePreview(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
              className="px-6 py-2 text-muted-foreground border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Add Slide
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
