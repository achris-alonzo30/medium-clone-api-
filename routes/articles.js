import fs from "fs";
import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';
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
    .post((req, res) => {
        const {title, author, description, image} = req.body;
        const now = new Date();
        const date_created = `${now.getMonth()} ${now.getDay()} ${now.getFullYear()}`;
        
        const newArticle = {
            id: uuidv4(),
            title,
            date_created,
            author,
            description,
            image
        }
        try {
            blogs.push(newArticle)
            fs.writeFileSync(blogsPath, JSON.stringify(blogs, null, 2))
            res.status(201).json(newArticle);
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
    .delete((req, res) => {
        const selectedArticle = blogs.find(blog => blog.id === req.params.id );
        if (!selectedArticle) return res.status(404).send("Article #ID is not valid.");
        res.status(200).json(selectedArticle)
    })


router.route




export default router;