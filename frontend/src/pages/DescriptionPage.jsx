import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DescriptionPage = () => {
  const [podcast, setPodcast] = useState(null);
  const { id } = useParams();
  const baseUrl = import.meta.env.BASE_URL;

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`https://podcaster-website-1.onrender.com/api/v1/podcast/get-podcast/${id}`, {
          withCredentials: true,
        });
        setPodcast(res.data.data);
      } catch (error) {
        console.error('Failed to fetch podcast', error);
      }
    };
    fetch();
  }, [id]);

  const imagePath = podcast?.frontImage?.replace(/\\/g, '/');

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f5f7fa] via-[#e4ecf7] to-[#dbe7f0] py-16 px-6 lg:px-24 flex items-center justify-center transition-all duration-500 ease-in-out">
      {podcast && (
        <div className="max-w-6xl w-full bg-white/70 border border-zinc-200 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row gap-12 transition-all duration-500 hover:shadow-blue-200">
          
          {/* Podcast Image */}
          <div className="md:w-1/2 flex justify-center items-center">
            <img
              src={`http://localhost:7000/${imagePath}`}
              alt="Podcast"
              className="rounded-2xl w-[85%] h-[280px] object-cover shadow-lg transform transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Podcast Info */}
          <div className="md:w-1/2 flex flex-col justify-center gap-6 text-zinc-800">
            <h1 className="text-4xl font-bold tracking-tight leading-snug text-blue-900">
              {podcast.title}
            </h1>

            <p className="text-lg text-zinc-600 font-light leading-relaxed">
              {podcast.description}
            </p>

            <div className="flex items-center gap-3 mt-2">
              <span className="px-4 py-1.5 bg-orange-200 text-orange-800 text-sm font-medium rounded-full border border-orange-400 transition-all duration-300 hover:bg-orange-300 hover:scale-105 cursor-pointer">
                {podcast.category?.categoryName}
              </span>

              <span className="px-3 py-1 bg-blue-200 text-blue-800 text-xs rounded-full uppercase font-semibold">
                Uploaded: {new Date(podcast.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DescriptionPage;
