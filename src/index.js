const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const {spawn} = require("child_process");
const {diskStorage} = require("multer");
const multer = require("multer");

//Using body parser for json
app.use(bodyParser.urlencoded({extended: true}));

// setting up multer
const upload = multer({dest: "uploads/"});

app.use(express.static("../public"));

app.get("/", (req, res) => {
  res.send()
})

app.post("/upload", upload.single("file"), (req, res) => {
  let uploaded_file = req.file;

  if (!uploaded_file) {
    return res.status(400).send("No file uploaded");
  }

  console.log("Stored path:", uploaded_file.path);
  const pythonProcess = slpawn("py", ["./c.py", `${uploaded_file.path}`], `${e}`);
  //console.log(pythonProcess.stdout);

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

app.listen(port, () => console.log(`App listening on port ${port}`));
