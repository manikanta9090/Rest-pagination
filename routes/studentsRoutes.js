const express = require("express");
const Student = require("../models/studentModel");
const router = express.Router();

// 🧩 Insert sample data (optional)
router.post("/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🧩 GET with pagination, filtering, sorting
router.get("/students", async (req, res) => {
  try {
    const { page = 1, limit = 5, branch, sortBy = "name", order = "asc" } = req.query;

    // Filtering
    const filter = branch ? { branch } : {};

    // Sorting
    const sortOrder = order === "desc" ? -1 : 1;
    const sortOption = { [sortBy]: sortOrder };

    // Pagination
    const skip = (page - 1) * limit;

    const students = await Student.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Student.countDocuments(filter);

    res.json({
      totalRecords: total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      students
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
