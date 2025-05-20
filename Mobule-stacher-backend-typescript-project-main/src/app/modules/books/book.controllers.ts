import { NextFunction, Request, Response } from "express"
import { creatNewBook, getBook } from "./book.services"
import { Book } from "./book.model"



export const getAllBooks=async(req:Request,res:Response,next:NextFunction)=>{

    try{
     const books= await getBook()
     res.status(200).json(books)
    }catch(error){
      next(error)
    }
    
}



export const createPost=async(req:Request,res:Response,next:NextFunction)=>{
   try{
   const bookdata=req.body;
  const book = await creatNewBook(bookdata)
res.status(200).json({message:"creite success full "})
   }catch(error){
    next(error)

   }
  }




  export const getsingelBook=async(req:Request,res:Response,next:NextFunction)=>{


    try{
      const bookId=req.params.id;
      const book= await Book.findById(bookId)
      if(!book){
        res.status(404).json({message:"book not found"})
      }
      res.status(200).json(book)
    }catch(error){
      next(error)
    }



  }



  export const updateBook=async(req:Request,res:Response,next:NextFunction)=>{
    try{
      const bookId=req.params.id;
      const updatedBook=await Book.findByIdAndUpdate(bookId,req.body,{new:true })
      if(!updatedBook){
        res.status(404).json({message:"book not found"})
         return;
      }	
      res.status(200).json(updatedBook)
    }catch(error){
      next(error)
    }
  }


  export const deleteBook=async(req:Request,res:Response,next:NextFunction)=>{
    try{
      const bookId=req.params.id;
      const deletedBook=await Book.findByIdAndDelete(bookId)
      if(!deletedBook){
        res.status(404).json({message:"book not found"})
         return;
      }
      res.status(200).json({message:"book deleted successfully"})
    }catch(error){
      next(error)
    }
  }