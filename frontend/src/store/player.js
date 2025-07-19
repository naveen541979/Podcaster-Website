import {createSlice} from '@reduxjs/toolkit';
const playerslice=createSlice({
    name:"player",
    initialState:{isplayerDiv:false,songPath:"",img:""},
    reducers:{
        setDiv(state){
            state.isplayerDiv=true;
        },
        closeDiv(state){
            state.isplayerDiv=false;
        },
        changeSong(state,action){
            const pathOfSong=action.payload;
            state.songPath=pathOfSong;
        },
        changeImage(state,action){
            const imgofSong=action.payload;
            state.img=imgofSong
        },

    },
});

export const playerActions=playerslice.actions;
export default playerslice.reducer;