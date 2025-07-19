import express from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from '../middlewares/multer.middleware.js'
import {Addpodcast,Getpodcast,Getpodcastbycategory,GetpodcastbyID,Getuserpodcast,updatePodcast,deletePodcast} from "../controller/podcast.controller.js";

const router = express.Router();

router.post(
    "/add-podcast",
    verifyJWT,
    upload.fields([
      { name: 'frontImage', maxCount: 1 },
      { name: 'audioFile', maxCount: 1 },
    ]),
    Addpodcast
  );
router.get("/get-podcasts",Getpodcast);
router.get("/get-user-podcasts",verifyJWT,Getuserpodcast);
router.get("/get-podcast/:id",GetpodcastbyID);
router.get("/category/:cat",Getpodcastbycategory);
router.put(
    "/update-podcast/:id",
    verifyJWT,
    upload.fields([
      { name: 'frontImage', maxCount: 1 },
      { name: 'audioFile', maxCount: 1 },
    ]),
    updatePodcast
  );
router.delete("/delete-podcast/:id", verifyJWT, deletePodcast);



export default router;