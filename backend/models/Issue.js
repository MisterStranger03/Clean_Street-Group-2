// const mongoose = require('mongoose');

// const issueSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   priority: { type: String, required: true },
//   priorityLevel: { type: String, required: true },
//   description: { type: String, required: true },
//   address: { type: String, required: true },
//   images: { type: [String], required: true },
//   username: { type: String, required: true },
//   latitude: { type: Number },
//   longitude: { type: Number },
//   status: { type: String, default: 'Open' },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Issue', issueSchema);

const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    priority: { type: String, required: true },
    priorityLevel: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    images: { type: [String], required: true },
    username: { type: String, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    status: { type: String, default: 'Open' },
  },
  { timestamps: true } // ✅ Automatically adds createdAt + updatedAt
);

module.exports = mongoose.model('Issue', issueSchema);
