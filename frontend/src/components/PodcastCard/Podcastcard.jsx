import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { playerActions } from '../../store/player';
import axios from 'axios';
import { toast } from 'react-toastify';

const Podcastcard = ({ items, onDelete }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedin = useSelector((state) => state.auth.isLoggedIn);

  const frontImage = `http://localhost:7000/public/images/${items.frontImage.split('\\').pop()}`;
  const audioFile = `http://localhost:7000/public/images/${items.audioFile.split('\\').pop()}`;

  const handlePlay = (e) => {
    e.preventDefault();

    if (!isLoggedin) {
      navigate('/signup');
      return;
    }

    dispatch(playerActions.setDiv());
    dispatch(playerActions.changeImage(frontImage));
    dispatch(playerActions.changeSong(audioFile));
  };

  const handleDelete = async () => {
    if (!isLoggedin) {
      navigate('/signup');
      return;
    }

    try {
      await axios.delete(`http://localhost:7000/api/v1/podcast/delete-podcast/${items._id}`, {
        withCredentials: true,
      });

      toast.success("Podcast deleted successfully!");
      if (onDelete) onDelete(items._id);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete podcast");
    }
  };

  const handleUpdate = () => {
    if (!isLoggedin) {
      navigate('/signup');
      return;
    }

    navigate(`/update-podcast/${items._id}`);
  };

  return (
    <div className="border p-4 rounded shadow-xl hover:shadow-2xl transition-all duration-300 group">
      <Link to={`/description/${items._id}`} className="flex flex-col h-full">
        <img
          src={frontImage}
          alt={items.title}
          className="rounded size-[42vh] object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="mt-2 text-xl font-bold truncate">{items.title}</div>
        <div className="mt-2 text-slate-500 text-sm truncate">{items.description}</div>
        <div className="mt-1 bg-orange-200 text-orange-700 border border-orange-700 rounded-full px-4 py-1 text-center text-sm">
          {items.category.categoryName}
        </div>
      </Link>

      <button
        onClick={handlePlay}
        className="mt-2 w-full bg-green-900 text-white px-4 py-2 rounded hover:bg-green-700 transition-all duration-300"
        title={!isLoggedin ? 'Login or Signup to play this podcast' : ''}
      >
        ▶️ Play Now
      </button>

      <div className="flex gap-2 mt-3">
        <button
          onClick={handleUpdate}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          ✏️ Update
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default Podcastcard;
