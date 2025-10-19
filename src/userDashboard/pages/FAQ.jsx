import React from 'react';
import { HelpCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const FAQ = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I generate more leads?",
      answer: "Focus on quality calls, maintain professionalism, understand customer needs, and follow up promptly. Use the provided scripts and guidelines for better conversion rates."
    },
    {
      id: 2,
      question: "When will I receive my commission?",
      answer: "Commissions are processed monthly and credited to your account within 5-7 working days after month-end verification."
    },
    {
      id: 3,
      question: "How to update my bank account details?",
      answer: "Go to Profile Details section and click Edit Profile. You can update your bank account information there. Changes may take 24-48 hours to reflect."
    },
    {
      id: 4,
      question: "What are the working hours?",
      answer: "Standard working hours are 9:30 AM to 6:30 PM, Monday to Saturday. Flexible timing may be available based on performance and team requirements."
    },
    {
      id: 5,
      question: "How to mark attendance?",
      answer: "Use the Attendance section in your dashboard to mark daily attendance. Ensure you mark both check-in and check-out times accurately."
    },
    {
      id: 6,
      question: "Who to contact for technical support?",
      answer: "For technical issues, contact the IT support team at support@campaignwala.com or call the helpdesk number provided in your welcome kit."
    }
  ];

  const toggleFAQ = (faqId) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="w-6 h-6 text-blue-500" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        {faqs.map((faq, index) => (
          <div key={faq.id} className={`${index !== faqs.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}>
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white pr-4">
                {faq.question}
              </h3>
              {expandedFAQ === faq.id ? (
                <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
              )}
            </button>
            
            {expandedFAQ === faq.id && (
              <div className="px-6 pb-6">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Still have questions?
        </h3>
        <p className="text-blue-700 dark:text-blue-200 mb-4">
          If you can't find the answer you're looking for, feel free to contact our support team.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default FAQ;