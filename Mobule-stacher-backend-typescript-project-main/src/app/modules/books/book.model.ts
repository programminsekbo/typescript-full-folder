import { model, Schema } from "mongoose";
import { IBook } from "./book.interface";




const bookSchema=new Schema<IBook>({

  title:{type:String, required:true, trim:true},
  author:{type:String,required:true, trim:true},
  description:{type:String, required:true, trim:true},
  genre:{type:String, required:true,trim:true},
  publicationYear:{type:Number,required:true, trim:true},
  isbn:{type:String, required:true , trim:true},
  price:{type:Number, require:true,min:0},

  isAvailable:Boolean,



},{timestamps:true})




export const Book=model<IBook>('Book',bookSchema)