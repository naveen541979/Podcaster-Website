import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Podcastcard from '../components/PodcastCard/Podcastcard';

const CategoriesPage = () => {

    const [Podcasts, setPodcasts] = useState([]);
    const {cat}=useParams();

    useEffect(() => {
        const fetch = async () => {
        try {
            const res = await axios.get(`${import.meta.env.BASE_URL}/api/v1/podcast/category/${cat}`,{withCredentials:true});
            setPodcasts(res.data.data);
        } catch (error) {
            console.error("Failed to fetch podcasts", error);
        }
        };
        fetch();
    }, []);

  return (
            <div className="px-4 py-4 lg:px-12">
        <h1 className="text-xl font-semibold capitalize">{cat}</h1>

        {Podcasts && Podcasts.length > 0 ? (
            <div className="w-full px-4 lg:px-12 py-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Podcasts.map((items, i) => (
                <div key={i}>
                <Podcastcard items={items} />
                </div>
            ))}
            </div>
        ) : (
            <div className="h-[70vh] w-full flex items-center justify-center animate-fade-in">
            <div className="flex flex-col items-center text-zinc-700 gap-4">
                <img
                src="https://cdn-icons-png.flaticon.com/512/727/727240.png"
                alt="No Podcasts"
                className="w-28 h-28 opacity-80 animate-float"
                />
                <h1 className="text-3xl font-bold text-center transition-all duration-300 hover:scale-105 hover:text-blue-600">
                No Podcasts Right Now
                </h1>
                <p className="text-lg text-center text-zinc-500 italic animate-pulse">
                It’s a bit quiet in here...
                </p>
            </div>
            </div>
        )}
        </div>

  )
}

export default CategoriesPage