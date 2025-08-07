import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Podcastcard from '../components/PodcastCard/Podcastcard';

const Mypodcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const baseUrl = import.meta.env.BASE_URL;


  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`https://podcaster-website-1.onrender.com/api/v1/podcast/get-user-podcasts`, {
          withCredentials: true
        });
        setPodcasts(res.data.data);
      } catch (error) {
        console.error("Failed to fetch podcasts", error);
        setErrorMsg("Unable to fetch your podcasts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="px-4 lg:px-12 my-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-xl font-semibold md:text-2xl">🎙️ My Podcasts</h1>
        <Link
          to="/add-podcast"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition-all duration-300"
        >
          + Add Podcast
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12 text-lg animate-pulse text-gray-500">
          Fetching your awesome podcasts...
        </div>
      ) : errorMsg ? (
        <div className="text-center text-red-500 font-medium py-10">{errorMsg}</div>
      ) : podcasts.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p className="text-lg">You haven't uploaded any podcasts yet.</p>
          <Link
            to="/add-podcast"
            className="inline-block mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full transition-all duration-300"
          >
            Create Your First Podcast
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {podcasts.map((item, i) => (
            <Podcastcard key={i} items={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Mypodcasts;
