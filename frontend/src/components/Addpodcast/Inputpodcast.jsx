import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

const Inputpodcast = () => {
  const [frontImage, setfrontImage] = useState(null);
  const [audioFile, setaudioFile] = useState(null);
  const [Drag, setDrag] = useState(false);
  const [Inputs, setInputs] = useState({
    title: '',
    description: '',
    category: '',
  });

  const allowedCategories = ["Education", "Business", "Comedy", "Hobbies", "Government"];
  
  const { id } = useParams();  // Get the ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    // If there is an ID, fetch the podcast data to prefill the form
    if (id) {
      axios.get(`http://localhost:7000/api/v1/podcast/get-podcast/${id}`)
        .then((response) => {
          const podcast = response.data.podcast;
          if (podcast) {
            setInputs({
              title: podcast.title || '',
              description: podcast.description || '',
              category: podcast.category?.categoryName || '',
            });
            setfrontImage(podcast.frontImage); // Assuming frontImage is a URL or file path
          } else {
            toast.error('Podcast not found');
          }
        })
        .catch((error) => {
          console.error('Error fetching podcast data:', error);
          toast.error('Failed to load podcast data');
        });
    }
  }, [id]);  // The effect will run when the `id` changes

  const handlechangeImage = (e) => {
    const file = e.target.files[0];
    setfrontImage(file);
  };

  const handleAudiofile = (e) => {
    const file = e.target.files[0];
    setaudioFile(file);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropImage = (e) => {
    e.preventDefault();
    setDrag(false);
    const file = e.dataTransfer.files[0];
    setfrontImage(file);
  };

  const onChangeInputs = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const handleSubmitpodcast = async () => {
    const data = new FormData();
    data.append('title', Inputs.title);
    data.append('description', Inputs.description);
    data.append('category', Inputs.category);
    data.append('frontImage', frontImage);
    data.append('audioFile', audioFile);

    try {
      let res;
      if (id) {
        // Update existing podcast
        res = await axios.put(`http://localhost:7000/api/v1/podcast/update-podcast/${id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
      } else {
        // Create new podcast
        res = await axios.post("http://localhost:7000/api/v1/podcast/add-podcast", data, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
      }

      if (!res.data.success) {
        toast.error(res.data.message || "Something went wrong");
        return;
      }

      toast.success(res.data.message || (id ? "Podcast updated successfully!" : "Podcast added successfully!"));
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error uploading podcast");
    } finally {
      setInputs({ title: '', description: '', category: '' });
      setfrontImage(null);
      setaudioFile(null);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-100 to-white min-h-screen py-12 px-4 lg:px-12">
      <ToastContainer position="top-center" draggable />
      <h1 className="text-3xl font-bold text-zinc-800 mb-8 text-center">
        🎙️ {id ? 'Update Your Podcast' : 'Create Your Podcast'}
      </h1>
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Thumbnail Upload */}
        <div className="w-full lg:w-1/3">
          <div
            className={`border-2 border-dashed rounded-xl flex items-center justify-center h-[40vh] transition-all duration-300 ${Drag ? 'bg-blue-100 border-blue-400' : 'bg-white border-zinc-300'}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDropImage}
          >
            <input
              type="file"
              accept="image/*"
              id="file"
              name="frontImage"
              className="hidden"
              onChange={handlechangeImage}
            />
            {frontImage ? (
              <img
                src={URL.createObjectURL(frontImage)}
                alt="thumbnail"
                className="h-full w-full object-cover rounded-xl"
              />
            ) : (
              <label
                htmlFor="file"
                className="flex flex-col items-center justify-center text-center cursor-pointer p-4"
              >
                <span className="text-lg font-medium text-zinc-700">Drag & drop or click to upload</span>
                <span className="text-sm text-zinc-500">Thumbnail image (JPG/PNG)</span>
              </label>
            )}
          </div>
        </div>

        {/* Podcast Details */}
        <div className="w-full lg:w-2/3 bg-white p-6 rounded-xl shadow-md">
          <div className="flex flex-col space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-zinc-700">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={Inputs.title}
                onChange={onChangeInputs}
                placeholder="Enter podcast title"
                className="mt-1 w-full px-4 py-2 border rounded outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-zinc-700">Description</label>
              <textarea
                id="description"
                name="description"
                value={Inputs.description}
                onChange={onChangeInputs}
                placeholder="Enter podcast description"
                rows={4}
                className="mt-1 w-full px-4 py-2 border rounded outline-none resize-none focus:border-blue-400"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label htmlFor="audiofile" className="block text-sm font-semibold text-zinc-700">Select Audio File</label>
                <input
                  type="file"
                  accept=".mp3,.wav,.m4a,.ogg"
                  id="audiofile"
                  onChange={handleAudiofile}
                  className="mt-2"
                />
                {audioFile && <p className="text-sm text-zinc-500 mt-1 truncate">🎵 {audioFile.name}</p>}
              </div>

              <div className="w-full md:w-1/2">
                <label htmlFor="category" className="block text-sm font-semibold text-zinc-700">Select Category</label>
                <select
                  id="category"
                  name="category"
                  value={Inputs.category}
                  onChange={onChangeInputs}
                  className="mt-2 w-full px-4 py-2 border rounded outline-none focus:border-blue-400"
                >
                  <option value="">Select Category</option>
                  {allowedCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              className="mt-6 bg-zinc-800 text-white font-semibold py-3 rounded hover:bg-zinc-700 transition-all duration-300 disabled:opacity-50"
              onClick={handleSubmitpodcast}
              disabled={!Inputs.title || !Inputs.description || !Inputs.category || !audioFile || !frontImage}
            >
              🎧 {id ? 'Update Podcast' : 'Create Podcast'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inputpodcast;
