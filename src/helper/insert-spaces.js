
// add spaces to the collection name taken from the database
// from "StringWithSpaces" to "String With Spaces"
export default function insertSpacesAndCapitalize(str) {
  const words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  str = words.join(" ");
  str = str.replace(/([a-z])([A-Z])/g, "$1 $2");
  str = str.replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
  if (str.includes("By")) str = str.replace("By", "by");
  if (str.includes("Bear")) str = str.replace(" Bear", "Bear");
  if (str.includes(" Verse")) str = str.replace(" Verse", "Verse");
  if (str.includes("Mfers")) str = str.replace("M", "m");
  return str;
}
