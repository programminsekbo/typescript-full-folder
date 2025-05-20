import { IBook } from "./book.interface"
import { Book } from "./book.model"


export const getBook=async()=>{
    const result=await Book.find()

    return result

}


export const creatNewBook = async(bookdata:IBook)=>{

        const result=await Book.create(bookdata);
        return result;
}

