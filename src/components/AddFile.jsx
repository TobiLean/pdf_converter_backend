import React from "react";

export default function AddFile({ file }) {
  const [selectedFiles, setSelectedFiles] = React.useState([]);

  const handleChange = (e) => {
    console.log(e.target.files[0]);
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    selectedFiles.forEach((file) =>
      formData.append("uploaded_file", file, "upload1"),
    );

    console.log(formData.getAll("uploaded_file"));

    try {
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });
      console.log(
        "Form Data File uploaded successfully: ",
        await response.text(),
      );
    } catch (error) {
      console.error("Could not upload file for some reason: ", error);
    }
  };

  return (
    <div>
      <form method={"POST"} encType={"multipart/form-data"}>
        <input
          type="file"
          id="file-selector"
          name="uploaded_file"
          multiple={true}
          accept="application/pdf"
          onChange={handleChange}
        />
        <button onClick={handleUpload}>Upload</button>
      </form>
    </div>
  );
}
