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

router.route("/:id")
    .get((req, res) => {
        const selectedArticle = blogs.find(blog => blog.id === req.params.id );
        if (!selectedArticle) return res.status(404).send("Article #ID is not valid.");
        res.status(200).json(selectedArticle)
    })




export default router;