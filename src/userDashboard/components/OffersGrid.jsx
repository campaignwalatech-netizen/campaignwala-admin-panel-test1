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
    <div className="px-6 mt-8">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Available Offers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {offers.map((offer, index) => {
          const IconComponent = offer.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100 dark:border-gray-700 cursor-pointer overflow-hidden"
            >
              <div className={`h-32 flex items-center justify-center ${offer.color}`}>
                <IconComponent className="w-16 h-16" />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 dark:text-white">{offer.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{offer.reward}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OffersGrid;