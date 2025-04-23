const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();
const path = require("path");
const hazardshmea = require("./model/hazardshmea");
const fs = require("fs");
const axios = require("axios");
const port = 3000;
const FormData = require("form-data");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Destination folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, JPEG, and PNG files are allowed!"), false);
    }
  },
});
dotenv.config();
app.use(cors());
app.use(express.json());

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.DATABASE_URL, {
      dbName: "hazoo",
    });
    console.log("MongoDB connection success");
  } catch (error) {
    console.log("MongoDB connection failed");
    console.log(error);
  }
};
connectDb();

const uploadToCloudinary = async (filePath) => {
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error("File does not exist at the specified path.");
      }
  
      const formData = new FormData();
      formData.append("file", fs.createReadStream(filePath));
      formData.append("upload_preset", "User_imges");
      formData.append("cloud_name", "dftwre0on");
  

      const cloudUrl = "https://api.cloudinary.com/v1_1/dftwre0on/image/upload";
  
      const cloudResponse = await axios.post(cloudUrl, formData, {
        headers: {

            'Content-Type': 'multipart/form-data'
    
          }
      });
         console.log(cloudResponse.data);
         
      if (cloudResponse.data.secure_url) {
        return cloudResponse.data.secure_url;
      } else {
        throw new Error("Cloudinary upload failed, no secure_url returned.");
      }
  
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };
  

app.use("/admin", require("./routes/adminroutes"));
app.use("/hazard", require("./routes/hazardroutes"));
app.use("/user", require("./routes/userRoutes"));
app.use('/team', require('./routes/teamroute'));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/test", upload.single("image"), async (req, res) => {
 
  console.log(req.body);
  const file = req.file;
    if(file){
        console.log(file.path);
        const url = await uploadToCloudinary(file.path);
      
        const { cctv_id, hazard_type, location } = req.body;

         console.log(req.body);
        if (cctv_id) {
          const newhazard = new hazardshmea({
            cctv_id,
            image: url,
            hazard_type,
            location:{
                latitude:location[0],
                longitude:location[1]
            },
          });
          await newhazard.save();
    
          return res.send("received successfully");
        } else {
          res.send("error");
        }
     

    };
  
 

  res.send("done");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
