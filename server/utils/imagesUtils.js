const fs = require("fs");

function writeImageToFile(fileData) {
  console.log(fileData);
  fs.writeFileSync(`./${fileData.name}.jpg`, fileData.buffer);
}
function readImageToBase64(filename) {
  return fs.readFileSync(`./${filename}.jpg`, "base64");
}
function removeImageFromFile(filename) {
  return fs.rmSync(`./${filename}.jpg`);
}

module.exports = { writeImageToFile, readImageToBase64, removeImageFromFile };
