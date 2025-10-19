import React from "react";
import { CreditCard, Banknote, TrendingUp, PiggyBank } from "lucide-react";

const offers = [
  { 
    icon: CreditCard, 
    name: "IndusInd Bank Credit Card", 
    reward: "Earn ₹1500 per successful activation",
    color: "bg-blue-100 text-blue-600"
  },
  { 
    icon: Banknote, 
    name: "Bajaj EMI Card", 
    reward: "Earn ₹800 per successful activation",
    color: "bg-green-100 text-green-600"
  },
  { 
    icon: TrendingUp, 
    name: "Demat Account", 
    reward: "Earn ₹750 per successful opening",
    color: "bg-purple-100 text-purple-600"
  },
  { 
    icon: PiggyBank, 
    name: "Savings Account", 
    reward: "Earn ₹750 per successful opening",
    color: "bg-orange-100 text-orange-600"
  },
];

const OffersGrid = () => {
  return (
    <div className="px-2 sm:px-4 lg:px-6 mt-6 sm:mt-8">
      <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">Available Offers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {offers.map((offer, index) => {
          const IconComponent = offer.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100 dark:border-gray-700 cursor-pointer overflow-hidden"
            >
              <div className={`h-24 sm:h-32 flex items-center justify-center ${offer.color}`}>
                <IconComponent className="w-12 h-12 sm:w-16 sm:h-16" />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">{offer.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">{offer.reward}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OffersGrid;