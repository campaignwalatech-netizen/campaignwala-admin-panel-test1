import { useState } from "react";
import { X, Send } from "lucide-react";
import Button from "../../components/Button.jsx";
import { useTheme } from "../../context-api/ThemeContext.jsx";

export default function UserQueriesTable() {
  const [queries, setQueries] = useState([
    { 
      id: 1, 
      user: "Jahnavi Verma", 
      email: "jahnavi0120@gmail.com", 
      subject: "Login Button Issue", 
      message: "I am having trouble with the login button. It's not working properly and I'm unable to access my account. I need help to change my password", 
      date: "2025-10-18", 
      status: "Open",
      hasReplied: false
    },
    { 
      id: 2, 
      user: "Sarah Smith", 
      email: "sarah@example.com", 
      subject: "New Features Inquiry", 
      message: "When will the new features be released? I'm particularly interested in the advanced analytics dashboard. We've been waiting for these features. This started happening advanced analytics dashboard", 
      date: "2024-01-14", 
      status: "Replied",
      hasReplied: true
    },
    { 
      id: 3, 
      user: "Michael Johnson", 
      email: "michael@example.com", 
      subject: "Account Verification", 
      message: "I need help with account verification process. My documents have been submitted but the status hasn't changed for weeks.", 
      date: "2024-01-12", 
      status: "Open",
      hasReplied: false
    },
    { 
      id: 4, 
      user: "Emily Davis", 
      email: "emily@example.com", 
      subject: "Payment Processing", 
      message: "Having issues with payment processing. The transaction keeps failing even though my card is valid and has sufficient funds.", 
      date: "2024-01-10", 
      status: "Open",
      hasReplied: false
    }
  ]);

  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");

  const handleReply = (query) => {
    setSelectedQuery(query);
    setShowReplyModal(true);
    setReplyMessage("");
  };

  const handleSendReply = () => {
    if (replyMessage.trim()) {
      setQueries(queries.map(q => 
        q.id === selectedQuery.id ? {...q, status: "Replied", hasReplied: true} : q
      ));
      setShowReplyModal(false);
      setReplyMessage("");
      console.log("Reply sent:", replyMessage);
    }
  };

  const handleCloseModal = () => {
    setShowReplyModal(false);
    setSelectedQuery(null);
    setReplyMessage("");
  };

  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">QUERIES</h1>
      </div>

      {/* Queries Cards */}
      <div className="max-w-4xl mx-auto space-y-6">
        {queries.map((query) => (
          <div key={query.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            {/* User Info Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{query.user}</h3>
                <p className="text-sm text-gray-600">{query.date}</p>
              </div>
              {/* Reply button with custom purple color #561ED0 */}
              <button
                onClick={() => handleReply(query)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  query.hasReplied 
                    ? 'bg-green-100 text-green-700 cursor-default' 
                    : 'text-white hover:opacity-90'
                }`}
                style={{
                  backgroundColor: query.hasReplied ? undefined : '#561ED0'
                }}
                disabled={query.hasReplied}
              >
                {query.hasReplied ? 'Replied' : 'Reply'}
              </button>
            </div>
            
            {/* Query Subject */}
            <h4 className="text-base font-medium text-gray-800 mb-2">{query.subject}</h4>
            
            {/* Query Message */}
            <p className="text-gray-700 text-sm leading-relaxed mb-3">{query.message}</p>
            
            {/* Email Info */}
            <div className="text-xs text-gray-500">
              Email: {query.email}
            </div>
          </div>
        ))}
      </div>

      {/* Reply Modal */}
      {showReplyModal && selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="text-white px-6 py-4 flex items-center justify-between" style={{ backgroundColor: '#561ED0' }}>
              <h2 className="text-xl font-semibold">Reply to Query</h2>
              <button 
                onClick={handleCloseModal}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Original Query Info */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Original Query:</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div><span className="font-medium">From:</span> {selectedQuery.user} ({selectedQuery.email})</div>
                  <div><span className="font-medium">Date:</span> {selectedQuery.date}</div>
                  <div><span className="font-medium">Query:</span> {selectedQuery.subject}</div>
                </div>
              </div>

              {/* Reply Input */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Your Reply:</h3>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your response here..."
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendReply}
                  disabled={!replyMessage.trim()}
                  className="px-6 py-2 text-white rounded-lg hover:opacity-90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                  style={{ backgroundColor: !replyMessage.trim() ? undefined : '#561ED0' }}
                >
                  <Send className="w-4 h-4" />
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
