const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const {spawn} = require("child_process");
const {diskStorage} = require("multer");
const multer = require("multer");
const cors = require("cors");
const {writeFile} = require("node:fs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());

app.use(express.static("../public"));

const upload = multer({dest: './uploads'})

app.get("/", (req, res) => {
  res.send()
})

app.post("/process", cors(), upload.single('uploaded_file'), (req, res) => {
  let filePath = req.body.path;

  if (!filePath) {
    return res.status(400).send("No file uploaded");
  }

  console.log("Stored path:", filePath);
  const pythonProcess = spawn("py", ["./c.py", `${filePath}`]);

  pythonProcess.stdout.on("data", (data) => {
    console.log(data.toString());
  })

  pythonProcess.stderr.on("data", (error) => {
    console.error("Error executing Python script:", error.toString());
  });

  pythonProcess.on("close", (code) => {
    console.log("Python process exited with code:", code);
  });

  res.send("File uploaded successfully");
});

app.post("/upload", cors(), upload.array('uploaded_file', 10), (req, res) => {
  let fileData = req.files;
  console.log("Server received file?");
  try {

    if(!fileData || fileData.length === 0) {
      return res.status(400).send("No file uploaded");
    }

    console.log("Body ", fileData);
    res.status(200).send(("File uploaded successfully to the server").toString());
  } catch (e) {
    console.log(e);
    res.status(500).send("Server failed to upload file");
  }
})

app.listen(port, () => console.log(`App listening on port ${port}`));
