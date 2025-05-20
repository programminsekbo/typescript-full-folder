import express from "express";
import cors from"cors"
import { BookRoutes } from "./app/modules/books/book.routes";
const app=express();

//Middleware
app.use(express.json())
app.use(cors())


//Routers
app.use("/api/books", BookRoutes)


app.get('/', (req, res) => {
  res.send('Book Director BackEnd Project Running.......')
})






export  default app
