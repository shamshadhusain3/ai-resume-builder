// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const userResumesRoutes = require("./routes/userResumesRoutes");
// const errorHandler = require("./middleware/errorHandler");

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());
// app.use("/api/user-resumes", userResumesRoutes);
// app.use(errorHandler);

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error(err));

// // Start Server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Import cors
const userResumesRoutes = require("./routes/userResumesRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Add CORS middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/api/user-resumes", userResumesRoutes);
app.use(errorHandler);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
