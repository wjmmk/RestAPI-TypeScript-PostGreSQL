import express from "express";
import indexRoutes from "./routes/index";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use(indexRoutes)

app.listen(4000, ( ) => {
    console.log("Server listening on Port: ", 4000);
})