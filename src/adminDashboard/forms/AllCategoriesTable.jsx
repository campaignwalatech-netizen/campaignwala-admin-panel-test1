import { useState } from "react";
import { Edit2, Trash2, X, Download, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AllCategoriesTable() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([
    { id: 1, name: "Marketing", description: "Digital marketing services", earnUpto: "₹5000 per month", count: 15, status: "Active" },
    { id: 2, name: "Social Media", description: "Social media campaigns", earnUpto: "₹4000 per month", count: 12, status: "Active" },
    { id: 3, name: "SEO", description: "Search engine optimization", earnUpto: "₹6000 per month", count: 8, status: "Active" },
    { id: 4, name: "Content Creation", description: "Content writing and design", earnUpto: "₹3500 per month", count: 20, status: "Active" },
    { id: 5, name: "Email Marketing", description: "Email campaign management", earnUpto: "₹4500 per month", count: 10, status: "Inactive" },
  ]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [addForm, setAddForm] = useState({
    name: "",
    description: "",
    earnUpto: "",
    count: 0,
    status: "Active"
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setCategories(categories.filter(c => c.id !== selectedCategory.id));
    setShowDeleteModal(false);
    setSelectedCategory(null);
  };

  const handleEdit = (category) => {
    // Navigate to AddCategoryForm with category data for editing
    navigate('/admin/add-category', { state: { editCategory: category } });
  };

  const handleAddNew = () => {
    setAddForm({
      name: "",
      description: "",
      earnUpto: "",
      count: 0,
      status: "Active"
    });
    setShowAddModal(true);
  };

  const confirmAdd = () => {
    const newCategory = {
      id: categories.length + 1,
      ...addForm,
      count: parseInt(addForm.count) || 0
    };
    setCategories([...categories, newCategory]);
    setShowAddModal(false);
  };

  const handleExport = () => {
    console.log("Exporting categories...");
    alert("Export functionality will be implemented soon!");
  };

  // Filter categories based on search term and status
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || category.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="h-full flex flex-col p-3 sm:p-4">
      {/* Header with Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">All Categories</h2>

      {/* Filters and Export in one line */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search categories..."
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
            <option value="inactive">Inactive</option>
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
      </div>

      {/* Categories Grid with fixed height */}
      <div className="flex-1 overflow-y-auto scrollbar-custom min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <div key={category.id} className="bg-card rounded-lg border border-border p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-base sm:text-lg font-bold text-foreground break-words">{category.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                  category.status === 'Active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {category.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2 break-words">{category.description}</p>
              <p className="text-sm text-green-600 font-semibold mb-4">Earn Upto: {category.earnUpto}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground whitespace-nowrap">
                  <span className="font-bold">{category.count}</span> Offers
                </span>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(category)} className="text-primary hover:text-primary/80 text-sm font-semibold inline-flex items-center gap-1">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button onClick={() => handleDelete(category)} className="text-destructive hover:text-destructive/80 text-sm font-semibold inline-flex items-center gap-1">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <Search className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No categories found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm 
                ? `No categories match "${searchTerm}". Try adjusting your search.`
                : "No categories match the selected filter."
              }
            </p>
          </div>
        )}
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-4 sm:p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-foreground">Confirm Delete</h3>
              <button onClick={() => setShowDeleteModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-foreground mb-6">Are you sure you want to delete <strong>{selectedCategory?.name}</strong> category?</p>
            <div className="flex gap-3">
              <button onClick={confirmDelete} className="flex-1 px-4 py-2 bg-destructive text-destructive-foreground text-sm rounded-lg hover:bg-destructive/90 whitespace-nowrap">
                Delete
              </button>
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-4 py-2 bg-destructive text-destructive-foreground text-sm rounded-lg hover:bg-destructive/80">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl border max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-bold text-gray-900">Add New Category</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={16} className="text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input 
                  type="text"
                  value={addForm.name}
                  onChange={(e) => setAddForm({...addForm, name: e.target.value})}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  value={addForm.description}
                  onChange={(e) => setAddForm({...addForm, description: e.target.value})}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter category description"
                  rows="2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Earn Upto</label>
                <input 
                  type="text"
                  value={addForm.earnUpto}
                  onChange={(e) => setAddForm({...addForm, earnUpto: e.target.value})}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="e.g., ₹5000 per month"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Count</label>
                <input 
                  type="number"
                  value={addForm.count}
                  onChange={(e) => setAddForm({...addForm, count: e.target.value})}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="0"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select 
                  value={addForm.status}
                  onChange={(e) => setAddForm({...addForm, status: e.target.value})}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 p-4 pt-0">
              <button 
                onClick={confirmAdd}
                className="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
              >
                Add Category
              </button>
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
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
