const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');

// Create new issue (Cloudinary upload handled by frontend)
router.post('/create', async (req, res) => {
  try {
    const {
      title,
      priority,
      priorityLevel,
      description,
      address,
      images,
      username,
      latitude,
      longitude,
      status,
    } = req.body;

    if (!title || !priority || !priorityLevel || !description || !address || !username) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newIssue = new Issue({
      title,
      priority,
      priorityLevel,
      description,
      address,
      images,
      username,
      latitude,
      longitude,
      status: status || 'Open',
    });

    await newIssue.save();
    res.status(201).json({ message: 'Issue created successfully', issue: newIssue });
  } catch (error) {
    console.error('Error creating issue:', error);
    res.status(500).json({ message: 'Error creating issue', error });
  }
});

// Get all issues
// router.get('/all', async (req, res) => {
//   try {
//     const issues = await Issue.find();
//     const formattedIssues = issues.map((issue) => ({
//       _id: issue._id,
//       title: issue.title,
//       description: issue.description,
//       status: issue.status || issue.priority,
//       location: issue.address,
//       date: issue.createdAt.toISOString().split('T')[0],
//       images: issue.images,
//     }));
//     res.status(200).json(formattedIssues);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching issues', error });
//   }
// });

router.get('/all', async (req, res) => {
  try {
    const issues = await Issue.find();
    const formattedIssues = issues.map((issue) => ({
      _id: issue._id,
      title: issue.title,
      description: issue.description,
      status: issue.status || issue.priority,
      location: issue.address,
      date: issue.createdAt
        ? issue.createdAt.toISOString().split('T')[0]
        : 'N/A',
      images: issue.images,
    }));

    res.status(200).json(formattedIssues);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching issues', error });
  }
});


module.exports = router;