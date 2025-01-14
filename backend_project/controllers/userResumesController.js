const UserResume = require("../models/userResume");

// Get all resumes
// controllers/userResumesController.js

 exports.getAllResumes = async (req, res) => {
  try {
    const { userEmail } = req.query; // Extract query parameter
    const filter = userEmail ? { userEmail } : {}; // Add filter if userEmail exists
    const resumes = await UserResume.find(filter); // Use filter in MongoDB query
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Get a single resume
exports.getResumeById = async (req, res) => {
  try {
    const resume = await UserResume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });
    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Create a new resume
exports.createResume = async (req, res) => {
  console.log(req.body.data)
  try {
    const newResume = new UserResume(req.body.data);
    await newResume.save();
    res.status(201).json(newResume);
  } catch (error) {
    res.status(400).json({ message: "Error creating resume", error });
  }
};

// Update a resume
exports.updateResume = async (req, res) => {
  console.log(req.params.id)
  try {
    const updatedResume = await UserResume.findByIdAndUpdate(req.params.id, req.body.data, {
      new: true,
      runValidators: true,
    });
    if (!updatedResume) return res.status(404).json({ message: "Resume not found" });
    res.status(200).json(updatedResume);
  } catch (error) {
    res.status(400).json({ message: "Error updating resume", error });
  }
};

// Delete a resume
exports.deleteResume = async (req, res) => {
  try {
    const deletedResume = await UserResume.findByIdAndDelete(req.params.id);
    if (!deletedResume) return res.status(404).json({ message: "Resume not found" });
    res.status(200).json({ message: "Resume deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
