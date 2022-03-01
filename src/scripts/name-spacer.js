
// converts the collection name taken from the database
// from "PascalCase" to "String With Capitalized Letters And Space"
function nameSpacer (str){
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i].toUpperCase) {
      str = str.slice(0, i-1) + " " + str.slice(i);
    }
    return str
  }
}

module.exports = nameSpacer;