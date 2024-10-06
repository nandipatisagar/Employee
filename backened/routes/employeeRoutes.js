const express = require('express');
const Employee = require('../models/Employee');
const multer = require('multer');
const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Create an employee
router.post('/', upload.single('image'), async (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const newEmployee = new Employee({ name, email, mobile, designation, gender, course, image });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ msg: 'Error creating employee' });
  }
});

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching employees' });
  }
});

// Update an employee
router.put('/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, designation, gender, course } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, { name, email, mobile, designation, gender, course, image }, { new: true });
    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating employee' });
  }
});

// Delete an employee
router.delete('/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting employee' });
  }
});

module.exports = router;
