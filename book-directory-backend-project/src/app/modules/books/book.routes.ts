// express js routing

import express from "express";
import { createBook, deleteBook, getAllBooks, getSingleBook, updateBook } from "./book.controller";
import { adminOnly, auth } from "../../middlewares/auth.middleware";

const router = express.Router()

// public routes
router.get("/", getAllBooks)
router.get("/:id", auth, getSingleBook)

// admin only routes
router.post("/", auth, adminOnly,createBook)
router.put("/:id",auth, adminOnly, updateBook)
router.delete("/:id",auth, adminOnly, deleteBook)


export const BookRoutes = router;