import { useState } from "react";
import { Edit2, Trash2, X, Download, Search, Filter, Upload, CheckCircle, Copy, Video } from "lucide-react";

export default function AllProductsTable() {
  const [products, setProducts] = useState([
    { 
      id: 1, 
      image: "https://picsum.photos/48/48?random=1", 
      date: "2024-10-15", 
      name: "Premium Digital Campaign", 
      latestStage: "Upload",
      commission: "₹5,000",
      withdrawalBonus: "₹1,200",
      done: "Upload",
      status: "Active",
      link: "https://example.com/campaign1",
      video: "video1.mp4"
    },
    { 
      id: 2, 
      image: "https://picsum.photos/48/48?random=2", 
      date: "2024-10-14", 
      name: "Social Media Blast", 
      latestStage: "Number",
      commission: "₹3,500",
      withdrawalBonus: "₹800",
      done: "Number",
      status: "Active",
      link: "https://example.com/campaign2",
      video: "video2.mp4"
    },
    { 
      id: 3, 
      image: "https://picsum.photos/48/48?random=3", 
      date: "2024-10-13", 
      name: "Email Marketing Pro", 
      latestStage: "Upload",
      commission: "₹4,200",
      withdrawalBonus: "₹950",
      done: "Upload",
      status: "Hold",
      link: "https://example.com/campaign3",
      video: "video3.mp4"
    },
    { 
      id: 4, 
      image: "https://picsum.photos/48/48?random=4", 
      date: "2024-10-12", 
      name: "SEO Optimization Pack", 
      latestStage: "Number",
      commission: "₹6,000",
      withdrawalBonus: "₹1,500",
      done: "Number",
      status: "Active",
      link: "https://example.com/campaign4",
      video: "video4.mp4"
    },
  ]);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setProducts(products.filter(p => p.id !== selectedProduct.id));
    setShowDeleteModal(false);
    setAlertMessage(`"${selectedProduct.name}" deleted successfully!`);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
    setSelectedProduct(null);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditForm({ ...product });
    setShowEditModal(true);
  };

  const confirmEdit = () => {
    setProducts(products.map(p => p.id === selectedProduct.id ? editForm : p));
    setShowEditModal(false);
    setAlertMessage(`"${editForm.name}" updated successfully!`);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
    setSelectedProduct(null);
  };

  const handleExport = () => {
    console.log("Exporting products...");
    const csvContent = products.map(p => 
      `${p.id},${p.name},${p.date},${p.commission},${p.status}`
    ).join('\n');
    setAlertMessage("Products exported successfully!");
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    setAlertMessage("Link copied to clipboard!");
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || p.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="h-full flex flex-col p-3 sm:p-4">
      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in">
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold whitespace-nowrap">{alertMessage}</span>
        </div>
      )}

      {/* Header with Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 whitespace-nowrap">All Products</h2>

      {/* Filters and Export in one line */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-9 pr-8 py-2 text-sm bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="hold">Hold</option>
          </select>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold whitespace-nowrap"
        >
          <Download className="w-4 h-4" />
          Export
        </button>

        {/* Add New Button */}
        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold whitespace-nowrap">
          + Add New
        </button>
      </div>

      {/* Table with fixed height */}
      <div className="flex-1 bg-card rounded-lg border border-border overflow-hidden flex flex-col min-h-0">
        <div className="overflow-x-auto scrollbar-custom flex-1">
          <table className="w-full min-w-[1200px]">
          <thead className="bg-muted">
            <tr>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Image</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Date</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Name</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Latest Stage</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Commission</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Withdrawal Bonus</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Done</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Status</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Link</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Video</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-muted/50">
                <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm whitespace-nowrap">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg ${
                    product.id === 1 ? 'bg-gradient-to-br from-blue-500 to-indigo-600' :
                    product.id === 2 ? 'bg-gradient-to-br from-green-500 to-emerald-600' :
                    product.id === 3 ? 'bg-gradient-to-br from-red-500 to-pink-600' :
                    'bg-gradient-to-br from-purple-500 to-violet-600'
                  }`}>
                    {product.name.charAt(0)}
                  </div>
                </td>
                <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm text-foreground whitespace-nowrap">{product.date}</td>
                <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm font-medium text-foreground whitespace-nowrap">{product.name}</td>
                <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    product.latestStage === 'Upload' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                  }`}>
                    {product.latestStage}
                  </span>
                </td>
                <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm font-bold text-green-600 dark:text-green-400 whitespace-nowrap">{product.commission}</td>
                <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm font-bold text-orange-600 dark:text-orange-400 whitespace-nowrap">{product.withdrawalBonus}</td>
                <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm whitespace-nowrap">
                  <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs font-semibold whitespace-nowrap">
                    {product.done}
                  </span>
                </td>
                <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    product.status === 'Active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm whitespace-nowrap">
                  <button 
                    onClick={() => handleCopyLink(product.link)}
                    className="flex items-center gap-1 text-primary hover:text-primary/80 whitespace-nowrap"
                  >
                    <Copy className="w-3 h-3" />
                    <span className="text-xs">Copy</span>
                  </button>
                </td>
                <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm whitespace-nowrap">
                  <button className="flex items-center gap-1 text-primary hover:text-primary/80 whitespace-nowrap">
                    <Video className="w-4 h-4" />
                    <span className="text-xs whitespace-nowrap">View</span>
                  </button>
                </td>
                <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm whitespace-nowrap">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(product)} 
                      className="text-primary hover:text-primary/80 inline-flex items-center gap-1 whitespace-nowrap"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(product)} 
                      className="text-destructive hover:text-destructive/80 inline-flex items-center gap-1 whitespace-nowrap"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-4 sm:p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-foreground whitespace-nowrap">Confirm Delete</h3>
              <button onClick={() => setShowDeleteModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-foreground mb-6">
              Are you sure you want to delete <strong>"{selectedProduct?.name}"</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowDeleteModal(false)} 
                className="flex-1 px-4 py-2 bg-destructive text-destructive-foreground text-sm rounded-lg hover:bg-destructive/80 font-semibold whitespace-nowrap"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete} 
                className="flex-1 px-4 py-2 bg-destructive text-destructive-foreground text-sm rounded-lg hover:bg-destructive/90 font-semibold whitespace-nowrap"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-card rounded-lg border border-border p-4 sm:p-6 max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto scrollbar-custom">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-foreground whitespace-nowrap">Edit Product</h3>
              <button onClick={() => setShowEditModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 whitespace-nowrap">Image</label>
                <input
                  type="text"
                  value={editForm.image}
                  onChange={(e) => setEditForm({...editForm, image: e.target.value})}
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 whitespace-nowrap">Date</label>
                <input
                  type="date"
                  value={editForm.date}
                  onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2 whitespace-nowrap">Product Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 whitespace-nowrap">Latest Stage</label>
                <select
                  value={editForm.latestStage}
                  onChange={(e) => setEditForm({...editForm, latestStage: e.target.value})}
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Upload">Upload</option>
                  <option value="Number">Number</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 whitespace-nowrap">Commission</label>
                <input
                  type="text"
                  value={editForm.commission}
                  onChange={(e) => setEditForm({...editForm, commission: e.target.value})}
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="₹5,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 whitespace-nowrap">Withdrawal Bonus</label>
                <input
                  type="text"
                  value={editForm.withdrawalBonus}
                  onChange={(e) => setEditForm({...editForm, withdrawalBonus: e.target.value})}
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="₹1,200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 whitespace-nowrap">Done</label>
                <select
                  value={editForm.done}
                  onChange={(e) => setEditForm({...editForm, done: e.target.value})}
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Upload">Upload</option>
                  <option value="Number">Number</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 whitespace-nowrap">Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Active">Active</option>
                  <option value="Hold">Hold</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2 whitespace-nowrap">Link</label>
                <input
                  type="url"
                  value={editForm.link}
                  onChange={(e) => setEditForm({...editForm, link: e.target.value})}
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://example.com"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2 whitespace-nowrap">Video</label>
                <input
                  type="text"
                  value={editForm.video}
                  onChange={(e) => setEditForm({...editForm, video: e.target.value})}
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="video.mp4"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={confirmEdit} 
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground text-sm rounded-lg hover:bg-primary/90 font-semibold whitespace-nowrap"
              >
                Save Changes
              </button>
              <button 
                onClick={() => setShowEditModal(false)} 
                className="flex-1 px-4 py-2 bg-destructive text-destructive-foreground text-sm rounded-lg hover:bg-destructive/80 font-semibold whitespace-nowrap"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
