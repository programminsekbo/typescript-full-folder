// business logic

import { NextFunction, Request, Response } from "express";
import { Book } from "./book.model";
import { createNewBook, getBooks, updateBookById } from "./book.services";

// get all books
 export const getAllBooks = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const books = await getBooks();
        res.status(200).json(books)
    } catch (error) {
        next(error)
    }
}

// get single book by id
export const getSingleBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        if(!book) {
            res.status(404).json({message: "Book Not Found"});
            return;
        }

        res.status(200).json(book)
    } catch (error) {
        next(error)
    }
}

// create new book
export const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookData = req.body;

        const book = await createNewBook(bookData);
        res.status(200).json({message: "Book created successfull!", book})
    } catch (error) {
        next(error)
    }
}


// update book info
export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.id;
        const bookData = req.body;

        const updatedBook = await updateBookById(bookId, bookData);
        if(!updateBook) {
            res.status(404).json({message: "Book can't able to update"});
            return;
        }

        res.status(200).json({message: "Book updated successfully!", updatedBook})
        
    } catch (error) {
        next(error)
    }
}


// delete book by id
export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if(!book) {
            res.status(404).json({message: "Book Not Found"});
            return;
        }
        res.status(200).json({message: "Book deleted successfully done!"})
    } catch (error) {
        next(error)
    }
}