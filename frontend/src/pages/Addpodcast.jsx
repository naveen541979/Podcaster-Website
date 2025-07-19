import React from 'react'
import { useSelector } from 'react-redux';
import Inputpodcast from '../components/Addpodcast/Inputpodcast';
import Errorpage from './Errorpage';

const Addpodcast = () => {
    const isLoggedin = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div>
        {isLoggedin ? <Inputpodcast/> : <Errorpage/>}
    </div>
  )
}

export default Addpodcast