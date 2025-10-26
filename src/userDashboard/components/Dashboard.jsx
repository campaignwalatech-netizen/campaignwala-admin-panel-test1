import React from 'react';
import { useNavigate } from "react-router-dom";

const Dashboard = ({ darkMode }) => {
   const navigate = useNavigate();
  const openPopup = (title, img, description) => {
    alert(`${title}\n\n${description}`);
  };
  return (
    <div
      className={`transition-all duration-300 ${
        darkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Welcome Section */}
      <section className="mb-6 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Welcome Back, <span className="text-blue-600">#user!</span>
        </h2>
        <p className="text-sm md:text-base text-gray-500">
          Here's a quick overview of your campaign performance and available opportunities.
        </p>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {[
          {
            title: 'Current Balance',
            amount: '₹ 5,200.75',
            change: '+₹320.00 from last week',
            img: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop',
            color: 'text-blue-600',
            icon: '$',
          },
          {
            title: 'Total Earnings',
            amount: '₹ 18,500.00',
            change: '+9% since last month',
            img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop',
            color: 'text-green-600',
            icon: '📊',
          },
          {
            title: 'Total Bonus',
            amount: '₹ 1,500.00',
            change: 'Increased from last month',
            img: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&h=300&fit=crop',
            color: 'text-purple-600',
            icon: '🎁',
          },
        ].map((card) => (
          <div
            key={card.title}
            onClick={() => {
  if (card.title === "Current Balance") {
    navigate("/user/wallet-withdrawl");
  } else if (card.title === "Total Earnings") {
    navigate("/user/total-balance");
  } else {
    openPopup(card.title, card.img, card.reward);
  }
}}

            className={`rounded-lg p-4 border cursor-pointer transition-all duration-300 hover:shadow-lg ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">{card.title}</span>
              <span className={card.color}>{card.icon}</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">{card.amount}</div>
            <div className="text-xs mt-1 text-gray-500">{card.change}</div>
          </div>
        ))}
      </section>

      {/* Banner Section */}
      <section
        className={`rounded-xl mb-6 flex flex-col md:flex-row items-center justify-center gap-4 p-6 ${
          darkMode
            ? 'bg-gradient-to-r from-blue-900 to-green-900'
            : 'bg-gradient-to-r from-blue-100 to-green-100'
        }`}
      >
        <div
          className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full opacity-60 ${
            darkMode ? 'bg-green-700' : 'bg-green-300'
          }`}
        ></div>
        <p
          className={`text-center text-sm sm:text-base md:text-lg font-medium ${
            darkMode ? 'text-gray-200' : 'text-gray-700'
          }`}
        >
          Explore new offers and maximize your rewards!
        </p>
      </section>

      {/* Product Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[
          {
            title: 'Industrial Bank Credit Card',
            reward: 'Earn ₹ 1,100',
            color: 'from-yellow-400 to-orange-400',
            img: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop',
          },
          {
            title: 'Bajaj EMI Card',
            reward: 'Earn ₹ 800 ',
            color: 'from-blue-100 to-blue-200',
            img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
          },
          {
            title: 'Demat Account',
            reward: 'Earn ₹ 750 ',
            color: 'from-gray-800 to-gray-900',
            img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
          },
          {
            title: 'MoneyTap Personal Loan',
            reward: 'Earn ₹ 2,100 ',
            color: 'from-teal-400 to-cyan-500',
            img: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=400&h=300&fit=crop',
          },
          {
            title: 'Savings Account',
            reward: 'Earn ₹ 750 ',
            color: 'from-gray-800 to-gray-900',
            img: 'https://images.unsplash.com/photo-1633158829875-e5316a358c6f?w=400&h=300&fit=crop',
          },
          {
            title: 'Bajaj EMI Card (Offer 2)',
            reward: 'Earn ₹ 700',
            color: 'from-gray-800 to-gray-900',
            img: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400&h=300&fit=crop',
          },
        ].map((card) => (
          <div
            key={card.title}
            onClick={() => {
                if (card.title === "Demat Account") {
                navigate("/user/demat-account");
                } else {
                openPopup(card.title, card.img, card.reward);
                }
                }}
            className={`rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
          >
            <div
              className={`bg-gradient-to-br ${card.color} h-24 sm:h-28 md:h-32 flex items-center justify-center`}
            >
              <div className="text-white text-lg font-bold text-center px-2">
                {card.title.split(' ')[0]}
              </div>
            </div>
            <div className="p-4">
              <h3
                className={`font-semibold mb-1 ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}
              >
                {card.title}
              </h3>
              <p
                className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {card.reward}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Dashboard;