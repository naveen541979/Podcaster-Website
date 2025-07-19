import {asyncHandler} from "../utils/asyncHandler.js";  
import {ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import {Category} from "../models/category.model.js";
import {User} from "../models/user.model.js";
import { Podcast } from "../models/podcast.model.js";

const Addpodcast = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body;
  
    const frontImageFile = req.files?.frontImage?.[0];
    const audioFileFile = req.files?.audioFile?.[0];
  
    const allowedCategories = ["Education", "Business", "Comedy", "Hobbies", "Government"];
  
    if (!title || !category) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }
  
    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category selected", success: false });
    }
  
    if (!frontImageFile) {
      throw new ApiError(400, "Front image required");
    }
    if (!audioFileFile) {
      throw new ApiError(400, "Audio file required");
    }
  
    const frontImage = frontImageFile.path;
    const audioFile = audioFileFile.path;
  
    let cat = await Category.findOne({ categoryName: category });
  
    if (!cat) {
      cat = new Category({ categoryName: category });
      await cat.save();
    }
  
    const newPodcast = new Podcast({
      title,
      description,
      category: cat._id,
      frontImage,
      audioFile,
      user: req.user._id,
    });
  
    await newPodcast.save();
  
    await Category.findByIdAndUpdate(cat._id, {
      $push: { podcasts: newPodcast._id },
    });
  
    await User.findByIdAndUpdate(req.user._id, {
      $push: { podcasts: newPodcast._id },
    });
  
    return res
      .status(200)
      .json(new ApiResponse(200, newPodcast, "Podcast added successfully"));
  });
  



const Getpodcast=asyncHandler(async(req,res)=>{
    const podcasts=await Podcast.find().populate("category").sort({createdAt :- 1});
    return res.status(200).json(
            new ApiResponse(200, podcasts, "Podcasts fetched successfully")
    )
})

const Getuserpodcast=asyncHandler(async(req,res)=>{
    const {user}=req;
    const userid=user._id;
    const data=await User.findById(userid).populate({
        path:"podcasts",
        populate: {path: "category"},
    }).select("-password");
    if(data && data.podcasts){
        data.podcasts.sort(
            (a,b)=> new Date(b.createdAt)-new Date(a.createdAt)
        );
    }
    return res.status(200).json(
        new ApiResponse(200, data.podcasts, "User Podcast fetched successfully")
    )

})

const GetpodcastbyID=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const podcasts=await Podcast.findById(id).populate("category");
    if (!podcasts) {
        throw new ApiError(404, "Podcast not found");
    }
    return res.status(200).json(
        new ApiResponse(200, podcasts, "Podcast fetched successfully")
    )
})

const Getpodcastbycategory=asyncHandler(async(req,res)=>{
    const {cat}=req.params;
    const categories=await Category.find({categoryName:cat}).populate({
        path: "podcasts",
        populate: {path: "category"},
    });
    let podcasts=[];
    categories.forEach((category)=>{
        podcasts=[...podcasts,...category.podcasts];
    })

    return res.status(200).json(
        new ApiResponse(200, podcasts, "Podcast fetched successfully")
    )
})

const deletePodcast = asyncHandler(async (req, res) => {
  const podcastId = req.params.id;

  const podcast = await Podcast.findById(podcastId);
  if (!podcast) {
    throw new ApiError(404, "Podcast not found");
  }

  if (podcast.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized to delete this podcast");
  }

  await Podcast.findByIdAndDelete(podcastId);

  await User.findByIdAndUpdate(podcast.user, {
    $pull: { podcasts: podcast._id },
  });

  await Category.findByIdAndUpdate(podcast.category, {
    $pull: { podcasts: podcast._id },
  });

  res.status(200).json(new ApiResponse(200, null, "Podcast deleted successfully"));
});

const updatePodcast = asyncHandler(async (req, res) => {
  const podcastId = req.params.id;
  const { title, description, category } = req.body;

  const podcast = await Podcast.findById(podcastId);
  if (!podcast) {
    throw new ApiError(404, "Podcast not found");
  }

  if (podcast.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized to update this podcast");
  }

  if (category) {
    let cat = await Category.findOne({ categoryName: category });
    if (!cat) {
      cat = new Category({ categoryName: category });
      await cat.save();
    }
    podcast.category = cat._id;
  }

  if (req.files?.frontImage?.[0]) {
    podcast.frontImage = req.files.frontImage[0].path;
  }

  if (req.files?.audioFile?.[0]) {
    podcast.audioFile = req.files.audioFile[0].path;
  }

  podcast.title = title || podcast.title;
  podcast.description = description || podcast.description;

  await podcast.save();

  res.status(200).json(new ApiResponse(200, podcast, "Podcast updated successfully"));
});




export{
    Addpodcast,
    Getpodcast,
    Getuserpodcast,
    GetpodcastbyID,
    Getpodcastbycategory,
    deletePodcast,
    updatePodcast

}