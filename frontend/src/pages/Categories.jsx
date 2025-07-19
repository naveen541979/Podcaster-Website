import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const cat = [
    {
      name: "Comedy",
      color: "from-purple-300 to-purple-100",
      to: "/categories/Comedy",
      img: "https://images.unsplash.com/photo-1742205309355-70e063aa1865?w=600"
    },
    {
      name: "Business",
      color: "from-green-300 to-green-100",
      to: "/categories/Business",
      img: "https://images.unsplash.com/photo-1743074745121-235a12c74889?w=600"
    },
    {
      name: "Education",
      color: "from-red-300 to-red-100",
      to: "/categories/Education",
      img: "https://images.unsplash.com/photo-1743160661846-e9c9b8b88cbe?w=600"
    },
    {
      name: "Hobbies",
      color: "from-zinc-300 to-zinc-100",
      to: "/categories/Hobbies",
      img: "https://images.unsplash.com/photo-1743128105755-cae4fc751868?w=600"
    },
    {
      name: "Government",
      color: "from-indigo-300 to-indigo-100",
      to: "/categories/Government",
      img: "https://images.unsplash.com/photo-1741632530035-c374e872ca95?w=600"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50 py-8 px-4">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-8">Explore Categories 🎧</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {cat.map((item, i) => (
          <Link
            to={item.to}
            key={i}
            className={`bg-gradient-to-br ${item.color} relative rounded-2xl p-4 overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 min-h-[28vh]`}
          >
            <div className="relative z-10 text-lg font-bold text-gray-800">{item.name}</div>
            <img
              src={item.img}
              alt={item.name}
              className="absolute bottom-0 right-0 w-28 h-28 object-cover opacity-70 rotate-12 rounded-full blur-sm"
            />
            <img
              src={item.img}
              alt={item.name}
              className="absolute bottom-3 right-3 w-24 h-24 object-cover rounded-full z-10 shadow-md"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
