import Class from '../models/Class.js';

export const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find({ isActive: true });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getClassById = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    if (!classItem) return res.status(404).json({ error: 'Class not found' });
    res.json(classItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// For seeding only (admin)
export const createClass = async (req, res) => {
  try {
    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};