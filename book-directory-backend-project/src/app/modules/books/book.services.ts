// logic implemenation

import { IBook } from "./book.interface";
import { Book } from "./book.model"

export const getBooks = async () => {
    const result = await Book.find();
    return result;
}
export const createNewBook = async (data: IBook) => {
    const result = await Book.create(data);
    return result;
}

export const updateBookById = async (id: string, data: IBook) => {
    const result = await Book.findByIdAndUpdate(id, data, {new: true, runValidators: true});
    return result;
}