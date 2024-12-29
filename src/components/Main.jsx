import React from "react";
import NavigationBar from "./NavigationBar";
import AddFile from "./AddFile";

export default function Main() {
  return (
    <>
      <NavigationBar />
      <div className="container">
        <AddFile />
      </div>
    </>
  );
}
