import fs from "fs";
import { Router } from "express";

const router = Router();

const blogsPath = new URL("../data/blogs.json", import.meta.url);

const blogs = JSON.parse(fs.readFileSync(blogsPath));

router.route("/")
    .get((_req, res) => {
        try {
            res.json(blogs)
        } catch (error) {
            res.status(500).send("Something went wrong. Please try again later.")
        }
    })


export default router;