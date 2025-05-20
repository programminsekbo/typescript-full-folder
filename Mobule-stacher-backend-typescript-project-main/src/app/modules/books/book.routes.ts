import express from "express";
import { createPost, deleteBook, getAllBooks, getsingelBook, updateBook } from "./book.controllers";

const router = express.Router();

router.get("/", getAllBooks);
router.post("/",createPost)
router.get("/:id",getsingelBook)
router.put("/:id",updateBook)

router.delete("/:id",deleteBook)









export const BookRoutes = router;
