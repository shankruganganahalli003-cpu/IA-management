require("dotenv").config();

const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authrouter = require("./routes/authroute");
const studentrouter = require("./routes/studentroute");
const teacherrouter = require("./routes/teacherroute");
const subjectrouter = require("./routes/subjectroute");
const marksrouter = require("./routes/marksroute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ia-management.vercel.app"
  ],
  credentials: true
}));

app.use("/api/auth", authrouter);
app.use("/api/student", studentrouter);
app.use("/api/teacher", teacherrouter);
app.use("/api/subject", subjectrouter);
app.use("/api/marks", marksrouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on ${PORT}`);
});