"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Send, Users, Search, Filter, CheckCircle, XCircle, Eye, Mail, Phone, Calendar } from "lucide-react"

const Button = ({ children, className = "", onClick, disabled, ...props }) => {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring flex items-center gap-2"
  const variants = "bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
  
  return (
    <button 
      className={`${baseClasses} ${variants} ${className}`} 
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

const Card = ({ children, className = "" }) => {
  return (
    <div className={`rounded-lg border border-border bg-card text-card-foreground shadow-sm ${className}`}>
      {children}
    </div>
  )
}

const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

export default function IncompleteProfilePage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("Complete Your Profile")
  const [message, setMessage] = useState("Complete your profile to unlock all features and get better opportunities.")
  const [isLoading, setIsLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUsers, setSelectedUsers] = useState([])
  const [filterBy, setFilterBy] = useState("all")

  // Users with incomplete profiles
  const [incompleteUsers] = useState([
    {
      id: "1",
      name: "Rajesh Kumar",
      email: "rajesh@email.com", 
      phone: "+91 9876543210",
      joinDate: "2024-10-20",
      missingFields: ["profile_pic", "address", "pan_card"],
      completionPercent: 65,
      lastActive: "2 hours ago"
    },
    {
      id: "2",
      name: "Priya Sharma", 
      email: "priya.s@gmail.com",
      phone: "+91 8765432109",
      joinDate: "2024-10-18",
      missingFields: ["bank_details", "kyc_documents"],
      completionPercent: 75,
      lastActive: "1 day ago"
    },
    {
      id: "3",
      name: "Amit Patel",
      email: "amit.patel@yahoo.com",
      phone: "+91 7654321098", 
      joinDate: "2024-10-15",
      missingFields: ["profile_pic", "address", "pan_card", "bank_details"],
      completionPercent: 45,
      lastActive: "3 hours ago"
    },
    {
      id: "4",
      name: "Sneha Gupta",
      email: "sneha.g@outlook.com",
      phone: "+91 6543210987",
      joinDate: "2024-10-22", 
      missingFields: ["kyc_documents", "pan_card"],
      completionPercent: 80,
      lastActive: "30 mins ago"
    },
    {
      id: "5",
      name: "Vikram Singh",
      email: "vikram.singh@email.com",
      phone: "+91 5432109876",
      joinDate: "2024-10-10",
      missingFields: ["profile_pic", "address", "pan_card", "bank_details", "kyc_documents"],
      completionPercent: 30,
      lastActive: "5 days ago"
    }
  ])

  const fieldLabels = {
    profile_pic: "Profile Picture",
    address: "Address Details",
    pan_card: "PAN Card", 
    bank_details: "Bank Details",
    kyc_documents: "KYC Documents"
  }

  const filteredUsers = incompleteUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.phone.includes(searchQuery)
    
    const matchesFilter = filterBy === "all" ||
                         (filterBy === "high" && user.completionPercent < 50) ||
                         (filterBy === "medium" && user.completionPercent >= 50 && user.completionPercent < 75) ||
                         (filterBy === "low" && user.completionPercent >= 75)
    
    return matchesSearch && matchesFilter
  })

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const selectAll = () => {
    setSelectedUsers(filteredUsers.map(user => user.id))
  }

  const clearAll = () => {
    setSelectedUsers([])
  }

  const getCompletionColor = (percent) => {
    if (percent < 50) return "text-red-500"
    if (percent < 75) return "text-yellow-500"
    return "text-green-500"
  }

  const getCompletionBg = (percent) => {
    if (percent < 50) return "bg-red-500/10 border-red-500/20"
    if (percent < 75) return "bg-yellow-500/10 border-yellow-500/20"
    return "bg-green-500/10 border-green-500/20"
  }

  const handleSend = async () => {
    if (!title.trim() || !message.trim()) {
      alert("Please fill in both title and message")
      return
    }

    if (selectedUsers.length === 0) {
      alert("Please select at least one user to send notification")
      return
    }

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSent(true)
    setIsLoading(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setSent(false)
      setSelectedUsers([])
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <button 
            onClick={() => navigate("/admin/notifications")} 
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-500/10 p-3">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Incomplete Profile Notifications</h1>
              <p className="mt-1 text-muted-foreground">Send reminders to users to complete their profiles</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Users List - Left Side */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Incomplete Profile Users ({incompleteUsers.length})</h2>
                <div className="flex items-center gap-2">
                  {selectedUsers.length > 0 && (
                    <span className="text-sm text-muted-foreground bg-blue-500/10 px-3 py-1 rounded-full">
                      {selectedUsers.length} selected
                    </span>
                  )}
                </div>
              </div>

              {/* Search and Filter Controls */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <select 
                    value={filterBy} 
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="px-3 py-2 border border-input bg-background rounded-md text-sm"
                  >
                    <option value="all">All Users</option>
                    <option value="high">High Priority (&lt;50%)</option>
                    <option value="medium">Medium (50-75%)</option>
                    <option value="low">Low Priority (&gt;75%)</option>
                  </select>
                </div>
              </div>

              {/* Selection Controls */}
              <div className="flex items-center gap-3 mb-4 p-3 bg-muted/50 rounded-lg">
                <Button onClick={selectAll} variant="outline" size="sm">
                  Select All ({filteredUsers.length})
                </Button>
                <Button onClick={clearAll} variant="outline" size="sm">
                  Clear All
                </Button>
              </div>

              {/* Users List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`p-4 border-2 rounded-lg transition-all cursor-pointer ${
                      selectedUsers.includes(user.id)
                        ? 'border-blue-500 bg-blue-500/5'
                        : 'border-border hover:border-blue-300'
                    }`}
                    onClick={() => toggleUserSelection(user.id)}
                  >
                    <div className="flex items-start gap-3">
                      {/* Checkbox */}
                      <div className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center ${
                        selectedUsers.includes(user.id) 
                          ? 'bg-blue-500 border-blue-500' 
                          : 'border-gray-300'
                      }`}>
                        {selectedUsers.includes(user.id) && (
                          <CheckCircle className="h-3 w-3 text-white" />
                        )}
                      </div>

                      {/* User Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{user.name}</h3>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {user.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {user.phone}
                              </span>
                            </div>
                          </div>
                          
                          <div className={`px-2 py-1 rounded text-xs font-medium ${getCompletionBg(user.completionPercent)}`}>
                            <span className={getCompletionColor(user.completionPercent)}>
                              {user.completionPercent}%
                            </span>
                          </div>
                        </div>

                        {/* Missing Fields */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {user.missingFields.map((field) => (
                            <span key={field} className="px-2 py-1 bg-red-500/10 text-red-600 dark:text-red-400 text-xs rounded">
                              {fieldLabels[field]}
                            </span>
                          ))}
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full ${
                              user.completionPercent < 50 ? 'bg-red-500' :
                              user.completionPercent < 75 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${user.completionPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Notification Form - Right Side */}
          <div>
            <Card className="p-6 sticky top-6">
              <h3 className="text-lg font-bold mb-4">Send Notification</h3>

              <div className="space-y-4">
                {/* Selected Users Count */}
                <div className="rounded-lg bg-blue-500/10 p-4 border border-blue-500/20">
                  <p className="text-sm text-muted-foreground mb-1">Selected Users</p>
                  <p className="text-2xl font-bold text-blue-500">{selectedUsers.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedUsers.length === 0 ? "No users selected" : "users will receive notification"}
                  </p>
                </div>

                {/* Title Input */}
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    placeholder="Notification title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    placeholder="Notification message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {/* Preview */}
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground mb-2">PREVIEW</p>
                  <div className="space-y-1">
                    <p className="font-bold text-sm">{title || "Title"}</p>
                    <p className="text-xs text-muted-foreground">{message || "Message"}</p>
                  </div>
                </div>

                {/* Send Button */}
                <Button
                  onClick={handleSend}
                  disabled={isLoading || !title.trim() || !message.trim() || selectedUsers.length === 0}
                  className="w-full"
                >
                  <Send className="h-4 w-4" />
                  {isLoading ? "Sending..." : `Send to ${selectedUsers.length} Users`}
                </Button>

                {/* Success Message */}
                {sent && (
                  <div className="rounded-lg bg-green-500/10 border border-green-500/30 p-3 text-green-700">
                    <p className="font-medium text-sm">✓ Sent to {selectedUsers.length} users!</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}