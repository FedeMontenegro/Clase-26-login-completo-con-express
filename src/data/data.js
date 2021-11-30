const fs = require("fs");
const path = require("path");

module.exports = {
    data: JSON.parse(fs.readFileSync(path.join(__dirname, "/data.json"), "utf-8")),
    writeDataJSON: (db) => {
        fs.writeFileSync(path.join(__dirname, "../data/data.json"), JSON.stringify(db), "utf-8")
    }
}