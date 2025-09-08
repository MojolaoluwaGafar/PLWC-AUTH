const dotenv = require("dotenv")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
dotenv.config()
const userRoutes = require("./routes/userRouter")


//middlewares
app.use(express.json())
app.use(cors({
    origin: "https://product-list-with-cart-two-kappa.vercel.app",
    credentials: true
}))



//ROUTES
// app.get("/", (req,res)=>{
//     res.send("server is running")
// })
app.use("/api/user", userRoutes)

//database and server
const startServer = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected");
        console.log("About to start server");
        
        const PORT = process.env.PORT
        app.listen(PORT,()=>{
            console.log(`Server running on port : ${PORT}`);
        })
    } catch (error) {
        console.log(error);  
    }
}
startServer()
