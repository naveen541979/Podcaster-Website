import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))


app.use(express.json());
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//Image show in frontend
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/public/images", express.static(path.join(__dirname, "public/images")));



//import routes
import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/category.routes.js";
import podcastRouter from "./routes/podcast.routes.js";

app.use("/api/v1/users",userRouter);
app.use("/api/v1/category",categoryRouter);
app.use("/api/v1/podcast",podcastRouter);

export {app}