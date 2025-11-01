const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const studentRoutes = require("./routes/studentsRoutes");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://juttumanikanta52:TrkLsHSgqa%216xcw@dt.eexll2a.mongodb.net/studentdb?retryWrites=true&w=majority&appName=dt")
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.use("/", studentRoutes);

app.listen(3000, () => console.log("🚀 Server running at http://localhost:3000"));