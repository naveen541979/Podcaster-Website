import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import AuthLayout from './layout/AuthLayout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Categories from './pages/Categories';
import Profile from './pages/Profile';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from './store/auth.js';
import Addpodcast from './pages/Addpodcast.jsx';
import Allpodcasts from './pages/Allpodcasts.jsx';
import CategoriesPage from './pages/CategoriesPage.jsx';
import DescriptionPage from './pages/DescriptionPage.jsx';

function App() {

  const dispatch=useDispatch();

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${import.meta.env.BASE_URL}/api/v1/users/check-cookie`, {
        withCredentials: true,
      });

      if (res.data.message) {
        dispatch(authActions.login());
      }
    };
  
    fetch();
  }, []);
  
  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/categories" element={<Categories/>}  />
            <Route path="/profile" element={<Profile/>}  />
            <Route path="/add-podcast" element={<Addpodcast/>}  />
            <Route path="/all-podcasts" element={<Allpodcasts/>}  />
            <Route path="/categories/:cat" element={<CategoriesPage/>} />
            <Route path="/update-podcast/:id" element={<Addpodcast />} />
            <Route path="/description/:id" element={<DescriptionPage/>} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
