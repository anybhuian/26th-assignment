const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('./models/User');
const Job = require('./models/Job');
const Application = require('./models/Application');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Middleware for Auth
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// --- AUTH ROUTES ---
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Email already exists or invalid data' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, skills: user.skills, bio: user.bio } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// --- JOB ROUTES ---
// Get Featured 6 Jobs
app.get('/api/jobs/featured', async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 }).limit(6);
  res.json(jobs);
});

// Get All Jobs
app.get('/api/jobs', async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json(jobs);
});

// Get Single Job
app.get('/api/jobs/:id', async (req, res) => {
  const job = await Job.findById(req.params.id).populate('postedBy', 'name email');
  res.json(job);
});

// Create Job (Recruiter only)
app.post('/api/jobs', protect, async (req, res) => {
  if (req.user.role !== 'recruiter') return res.status(403).json({ message: 'Only recruiters can post jobs' });
  const job = await Job.create({ ...req.body, postedBy: req.user.id });
  res.status(201).json(job);
});

// Update Job
app.put('/api/jobs/:id', protect, async (req, res) => {
  const job = await Job.findOneAndUpdate({ _id: req.params.id, postedBy: req.user.id }, req.body, { new: true });
  res.json(job);
});

// Delete Job
app.delete('/api/jobs/:id', protect, async (req, res) => {
  await Job.findOneAndDelete({ _id: req.params.id, postedBy: req.user.id });
  res.json({ message: 'Job deleted' });
});

// Get Recruiter's Posted Jobs
app.get('/api/my-posted-jobs', protect, async (req, res) => {
  const jobs = await Job.find({ postedBy: req.user.id });
  res.json(jobs);
});

// --- APPLICATION & PROFILE ROUTES ---
app.post('/api/applications', protect, async (req, res) => {
  const { jobId, resumeLink, coverLetter } = req.body;
  const exists = await Application.findOne({ job: jobId, applicant: req.user.id });
  if (exists) return res.status(400).json({ message: 'Already applied to this job' });
  
  const appData = await Application.create({ job: jobId, applicant: req.user.id, resumeLink, coverLetter });
  res.status(201).json(appData);
});

app.get('/api/applications/my', protect, async (req, res) => {
  const apps = await Application.find({ applicant: req.user.id }).populate('job');
  res.json(apps);
});

app.put('/api/users/profile', protect, async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true }).select('-password');
  res.json(updatedUser);
});

app.listen(process.env.PORT || 5000, () => console.log('Server running on port 5000'));