const express = require("express");
const app = express()
const connectDB = require("./config/database");
const cookieparser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const authrouter = require("./routes/authroute");
const studentrouter = require("./routes/studentroute");
const teacherrouter = require("./routes/teacherroute");
const subjectrouter = require("./routes/subjectroute");
const marksrouter = require("./routes/marksroute");


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());
app.use(cors({origin:"http://localhost:5173",
    credentials:true
}));


app.use("/api/auth",authrouter);
app.use("/api/student",studentrouter);
app.use("/api/teacher",teacherrouter);
app.use("/api/subject",subjectrouter);
app.use("/api/marks",marksrouter);


const port = process.env.MONGO_URI
app.listen(port,()=>{
    connectDB();
    console.log(`server is running ${port}`)
})