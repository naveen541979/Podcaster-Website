import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Podcastcard from '../components/PodcastCard/Podcastcard';

const Allpodcasts = () => {
  const [Podcasts, setPodcasts] = useState([]);
  const baseUrl = import.meta.env.BASE_URL;

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`https://podcaster-website-1.onrender.com/api/v1/podcast/get-podcasts`);
        setPodcasts(res.data.data);
      } catch (error) {
        console.error("Failed to fetch podcasts", error);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <div className="w-full px-4 lg:px-12 py-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {
          Podcasts.map((items, i) => (
            <div key={i}>
              <Podcastcard items={items} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Allpodcasts;
