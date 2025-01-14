const mongoose = require("mongoose");

console.log(process.env.MONGO_URI)

const userResumeSchema = new mongoose.Schema({
  userName: { type: String },
  resumeId: { type: String },
  userEmail: { type: String },
  title: { type: String, },
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  jobTitle: { type: String },
  phone: { type: String },
  email: { type: String },
  summery: { type: String },
  experience: [
    {
      title: { type: String },
      company: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      description: { type: String },
    },
  ],
  education: [
    {
      institution: { type: String },
      degree: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      description: { type: String },
    },
  ],
  skills: [{ name: { type: String } ,rating:{type:Number}}],
  projects: [
    {
      title: { type: String },
      description: { type: String },
      projectLink: { type: String },
    },
  ],
});

module.exports = mongoose.model("UserResume", userResumeSchema);
