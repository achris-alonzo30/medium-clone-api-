import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import videos from "./routes/videos.js"

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(cors({ port: `http:localhost:${PORT}`}));
app.use(express.json());
app.use("/images", express.static("public/images"));
app.use("/stream", express.static("public/stream"))

app.use("/videos", videos)

app.listen(PORT,() => {
    console.log(`Server is listening on ${PORT}`)
})