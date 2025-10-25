import { useState } from "react";
import { Edit2, Trash2, X, Download, Search, Filter, Upload, CheckCircle, Copy, Video } from "lucide-react";

export default function AllOffersTable() {
  const [Offers, setOffers] = useState([
    { 
      id: 1, 
      image: "https://picsum.photos/48/48?random=1", 
      date: "2024-10-15", 
      name: "Premium Digital Campaign", 
      category: "Digital Marketing",
      latestStage: "Upload",
      commission1: "₹5,000",
      commission2: "₹1,200",
      status: "Active",
      link: "https://example.com/campaign1",
      video: "video1.mp4"
    },
    { 
      id: 2, 
      image: "https://picsum.photos/48/48?random=2", 
      date: "2024-10-14", 
      name: "Social Media Blast", 
      category: "Social Media",
      latestStage: "Number",
      commission1: "₹3,500",
      commission2: "₹800",
      status: "Active",
      link: "https://example.com/campaign2",
      video: "video2.mp4"
    },
    { 
      id: 3, 
      image: "https://picsum.photos/48/48?random=3", 
      date: "2024-10-13", 
      name: "Email Marketing Pro", 
      category: "Email Marketing",
      latestStage: "Upload",
      commission1: "₹4,200",
      commission2: "₹950",
      status: "Hold",
      link: "https://example.com/campaign3",
      video: "video3.mp4"
    },
    { 
      id: 4, 
      image: "https://picsum.photos/48/48?random=4", 
      date: "2024-10-12", 
      name: "SEO Optimization Pack", 
      category: "SEO",
      latestStage: "Number",
      commission1: "₹6,000",
      commission2: "₹1,500",
      status: "Active",
      link: "https://example.com/campaign4",
      video: "video4.mp4"
    },
  ]);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [addForm, setAddForm] = useState({
    name: "",
    category: "",
    latestStage: "",
    commission1: "",
    commission2: "",
    status: "Active",
    link: "",
    image: "",
    video: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
<<<<<<< Updated upstream
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Fetch offers on component mount
  useEffect(() => {
    fetchOffers();
    fetchCategories();
  }, [searchTerm, filterStatus]);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories({ 
        status: 'active',
        limit: 100,
        sortBy: 'name',
        order: 'asc'
      });
      
      if (response.success && response.data.categories) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchOffers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        search: searchTerm,
        page: 1,
        limit: 100,
        sortBy: 'createdAt',
        order: 'desc'
      };

      if (filterStatus !== 'all') {
        params.isApproved = filterStatus;
      }

      const response = await getAllOffers(params);
      
      if (response.success) {
        setOffers(response.data.offers);
      } else {
        setError(response.message || 'Failed to fetch offers');
      }
    } catch (err) {
      console.error('Error fetching offers:', err);
      setError(err.response?.data?.message || 'Failed to load offers. Please try again.');
    } finally {
      setLoading(false);
    }
  };
=======
>>>>>>> Stashed changes

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setOffers(Offers.filter(p => p.id !== selectedProduct.id));
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
    setOffers(Offers.map(p => p.id === selectedProduct.id ? editForm : p));
    setShowEditModal(false);
    setAlertMessage(`"${editForm.name}" updated successfully!`);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
    setSelectedProduct(null);
  };

  const handleAddNew = () => {
    setAddForm({
      name: "",
      category: "",
      latestStage: "",
      commission1: "",
      commission2: "",
      status: "Active",
      link: "",
      image: "",
      video: ""
    });
    setShowAddModal(true);
  };

  const confirmAdd = () => {
    const newProduct = {
      id: Offers.length + 1,
      image: addForm.image || "https://picsum.photos/48/48?random=" + (Offers.length + 1),
      date: new Date().toISOString().split('T')[0],
      ...addForm
    };
    setOffers([...Offers, newProduct]);
    setShowAddModal(false);
    setAlertMessage(`"${addForm.name}" added successfully!`);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  const handleExport = () => {
<<<<<<< Updated upstream
    try {
      const csvData = Offers.map(offer => ({
        Name: offer.name,
        Category: offer.category,
        'Latest Stage': offer.latestStage,
        'Commission 1': offer.commission1,
        'Commission 2': offer.commission2,
        'Approved': offer.isApproved ? 'Yes' : 'No',
        Created: new Date(offer.createdAt).toLocaleDateString()
      }));

      const headers = Object.keys(csvData[0]).join(',');
      const rows = csvData.map(row => Object.values(row).join(',')).join('\n');
      const csv = `${headers}\n${rows}`;

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `offers_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);

      setAlertMessage("Offers exported successfully!");
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    } catch (err) {
      console.error('Error exporting offers:', err);
      alert('Failed to export offers');
    }
=======
    console.log("Exporting Offers...");
    const csvContent = Offers.map(p => 
      `${p.id},${p.name},${p.date},${p.commission1},${p.commission2},${p.status}`
    ).join('\n');
    setAlertMessage("Offers exported successfully!");
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
>>>>>>> Stashed changes
  };

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    setAlertMessage("Link copied to clipboard!");
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  const filteredOffers = Offers.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()));
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
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 whitespace-nowrap">All Offers</h2>

      {/* Filters and Export in one line */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search Offers..."
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
<<<<<<< Updated upstream
            <option value="all">All Offers</option>
            <option value="true">Approved</option>
            <option value="false">Pending Approval</option>
=======
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="hold">Hold</option>
>>>>>>> Stashed changes
          </select>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 text-sm text-white rounded-lg transition-all duration-200 font-semibold whitespace-nowrap shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          style={{ 
            backgroundColor: '#4406CB',
            borderColor: '#4406CB'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#3905B8'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#4406CB'}
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

<<<<<<< Updated upstream
      {/* Table Container */}
      <div className="flex-1 overflow-auto scrollbar-custom min-h-0">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-foreground">Loading offers...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-destructive mb-4">
              <X className="w-16 h-16" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Error Loading Offers</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button
              onClick={fetchOffers}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredOffers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No offers found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? `No offers match "${searchTerm}"` : 'No offers available'}
            </p>
          </div>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead className="bg-muted sticky top-0 z-10">
              <tr className="border-b border-border">
                <th className="px-3 py-2 text-left font-semibold">Image</th>
                <th className="px-3 py-2 text-left font-semibold">Date</th>
                <th className="px-3 py-2 text-left font-semibold">Offers Name</th>
                <th className="px-3 py-2 text-left font-semibold">Category</th>
                <th className="px-3 py-2 text-left font-semibold">Latest Stage</th>
                <th className="px-3 py-2 text-left font-semibold">Commission 1</th>
                <th className="px-3 py-2 text-left font-semibold">Commission 2</th>
                <th className="px-3 py-2 text-left font-semibold">Approved</th>
                <th className="px-3 py-2 text-left font-semibold">Link</th>
                <th className="px-3 py-2 text-left font-semibold">Video</th>
                <th className="px-3 py-2 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>{filteredOffers.map((product, index) => {
              const gradientColors = [
                'from-purple-500 to-pink-500',
                'from-blue-500 to-cyan-500',
                'from-green-500 to-emerald-500',
                'from-orange-500 to-red-500',
                'from-indigo-500 to-purple-500',
                'from-yellow-500 to-orange-500'
              ];
              const gradient = gradientColors[index % gradientColors.length];
              
              return (
              <tr key={product._id} className="border-b border-border hover:bg-muted/50">
                <td className="px-3 py-2">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover" />
                  ) : (
                    <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded flex items-center justify-center text-white font-bold text-lg`}>
                      {product.name?.charAt(0)?.toUpperCase() || 'O'}
                    </div>
                  )}
=======
      {/* Table with fixed height */}
      <div className="flex-1 bg-card rounded-lg border border-border overflow-hidden flex flex-col min-h-0">
        <div className="overflow-x-auto scrollbar-custom flex-1">
          <table className="w-full min-w-[1200px]">
          <thead className="bg-muted">
            <tr>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Image</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Date</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Name</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Category</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Latest Stage</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Commission 1</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Commission 2</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Status</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Link</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Video</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredOffers.map((product) => (
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
>>>>>>> Stashed changes
                </td>
                <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm text-foreground whitespace-nowrap">{product.date}</td>
                <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm font-medium text-foreground whitespace-nowrap">{product.name}</td>
                <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm text-muted-foreground whitespace-nowrap">{product.category}</td>
                <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    product.latestStage === 'Upload' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                  }`}>
                    {product.latestStage}
                  </span>
                </td>
<<<<<<< Updated upstream
                <td className="px-3 py-2 font-medium max-w-[200px] truncate">{product.name}</td>
                <td className="px-3 py-2 text-muted-foreground">{product.category}</td>
                <td className="px-3 py-2">
                  <span className="px-2 py-1 rounded text-xs bg-muted">{product.latestStage || 'Pending'}</span>
                </td>
                <td className="px-3 py-2 text-green-600 font-semibold">{product.commission1}</td>
                <td className="px-3 py-2 text-blue-600 font-semibold">{product.commission2}</td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    product.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
=======
                <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm font-bold text-green-600 dark:text-green-400 whitespace-nowrap">{product.commission1}</td>
                <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm font-bold text-orange-600 dark:text-orange-400 whitespace-nowrap">{product.commission2}</td>
                <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    product.status === 'Active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
>>>>>>> Stashed changes
                  }`}>
                    {product.isApproved ? 'Approved' : 'Pending'}
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
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-foreground">Edit Offer</h3>
              <button onClick={() => setShowEditModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Offers Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Offers Name
                </label>
                <input
                  type="text"
                  value={editForm.name || ""}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  placeholder="Enter Offers name"
                />
              </div>
              
              {/* Client Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Client Name
                </label>
                <input
                  type="text"
                  value={editForm.clientName || ""}
                  onChange={(e) => setEditForm({...editForm, clientName: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  placeholder="Enter client name"
                />
              </div>
              
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category
                </label>
                <select
                  value={editForm.category || ""}
                  onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                >
                  <option value="">Select Category</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Email Marketing">Email Marketing</option>
                  <option value="SEO">SEO</option>
                  <option value="Content Creation">Content Creation</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Status
                </label>
                <select
                  value={editForm.status || "Pending"}
                  onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                >
                  <option value="Pending">Pending</option>
                  <option value="Active">Active</option>
                  <option value="Hold">Hold</option>
                </select>
              </div>

              {/* Commission 1 */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Commission 1 (%) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editForm.commission1 || ""}
                  onChange={(e) => setEditForm({...editForm, commission1: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  placeholder="e.g., 10"
                />
                
                {/* Commission 1 Comment */}
                <div className="mt-2">
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Commission 1 Comment
                  </label>
                  <textarea
                    value={editForm.commission1Comment || ""}
                    onChange={(e) => setEditForm({...editForm, commission1Comment: e.target.value})}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm"
                    placeholder="e.g., From Amazon affiliate program offer"
                    rows="2"
                  />
                </div>
              </div>

              {/* Commission 2 */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Commission 2 (%) <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="text"
                  value={editForm.commission2 || ""}
                  onChange={(e) => setEditForm({...editForm, commission2: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  placeholder="e.g., 15"
                />
                
                {/* Commission 2 Comment */}
                <div className="mt-2">
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Commission 2 Comment <span className="text-gray-400">(optional)</span>
                  </label>
                  <textarea
                    value={editForm.commission2Comment || ""}
                    onChange={(e) => setEditForm({...editForm, commission2Comment: e.target.value})}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm"
                    placeholder="e.g., From Flipkart bonus offer"
                    rows="2"
                  />
                </div>
              </div>

              {/* Offers Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Offers Description
                </label>
                <textarea
                  value={editForm.description || ""}
                  onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  placeholder="Enter Offers description..."
                  rows="4"
                />
              </div>

              {/* Link */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Link</label>
                <input
                  type="url"
                  value={editForm.link}
                  onChange={(e) => setEditForm({...editForm, link: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  placeholder="https://example.com"
                />
              </div>
              
              {/* Video */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Video</label>
                <input
                  type="text"
                  value={editForm.video}
                  onChange={(e) => setEditForm({...editForm, video: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
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

<<<<<<< Updated upstream
      {/* Edit Modal */}
      {showEditModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-foreground">Edit Offer</h3>
              <button
                onClick={() => setShowEditModal(false)}
                disabled={updating}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); confirmEdit(); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Offer Name</label>
                  <input
                    type="text"
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                  <select
                    value={editForm.category || ''}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Link</label>
                  <input
                    type="url"
                    value={editForm.link || ''}
                    onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Latest Stage</label>
                  <select
                    value={editForm.latestStage || 'Pending'}
                    onChange={(e) => setEditForm({ ...editForm, latestStage: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Upload">Upload</option>
                    <option value="Number">Number</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Commission 1 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={editForm.commission1 || ''}
                    onChange={(e) => setEditForm({ ...editForm, commission1: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., 10%"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Commission 2 <span className="text-gray-400">(optional)</span></label>
                  <input
                    type="text"
                    value={editForm.commission2 || ''}
                    onChange={(e) => setEditForm({ ...editForm, commission2: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., 15%"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Commission 1 Comment</label>
                  <textarea
                    value={editForm.commission1Comment || ''}
                    onChange={(e) => setEditForm({ ...editForm, commission1Comment: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows="2"
                    placeholder="Comment for commission 1"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Commission 2 Comment</label>
                  <textarea
                    value={editForm.commission2Comment || ''}
                    onChange={(e) => setEditForm({ ...editForm, commission2Comment: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows="2"
                    placeholder="Comment for commission 2"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                  <textarea
                    value={editForm.description || ''}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows="3"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Video Link</label>
                  <input
                    type="url"
                    value={editForm.videoLink || ''}
                    onChange={(e) => setEditForm({ ...editForm, videoLink: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Terms and Conditions</label>
                  <textarea
                    value={editForm.termsAndConditions || ''}
                    onChange={(e) => setEditForm({ ...editForm, termsAndConditions: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows="3"
                    placeholder="Enter terms and conditions..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {updating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Offer'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  disabled={updating}
                  className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
=======
>>>>>>> Stashed changes
    </div>
  );
}
