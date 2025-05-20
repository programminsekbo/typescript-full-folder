import express from "express";
import cors from 'cors'
import { BookRoutes } from "./app/modules/books/book.routes";
import { UserRoutes } from "./app/modules/auth/user.routes";
import errorHandler from "./app/middlewares/errorHandler";

const app = express();

// middlewares
app.use(express.json())
app.use(cors())

// routes
app.use("/api/books", BookRoutes)
app.use("/api/users", UserRoutes)

// error handler
app.use(errorHandler)

app.get('/', (req, res) => {
    res.send('Book Directory Server is running....!')
})



export default app;

