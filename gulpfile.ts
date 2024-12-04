import gulp from "gulp";
import * as fs from "fs";
import en from "./src/locales/en.json";
import es from "./src/locales/es.json";
function sortChildren(data) {
  return Object.fromEntries(
    Object.entries(data).sort(([keyA], [keyB]) => {
      return keyA.localeCompare(keyB);
    })
  );
}


gulp.task("enFile", async function (done) {
    try {
      const esPathOutput = "./src/locales/en.json";
      const sortedData = sortChildren(en);
      fs.writeFile(
        esPathOutput,
        JSON.stringify(sortedData, null, 2),
        "utf8",
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
            return done(err);
          }
          console.log("File written successfully.");
          done();
        }
      );
    } catch (err) {
      console.error("Error writing file:", err);
    }
  });

gulp.task("esFile", async function (done) {
  try {
    const esPathOutput = "./src/locales/es.json"; 

    const sortedData = sortChildren(es);

    fs.writeFile(
      esPathOutput,
      JSON.stringify(sortedData, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return done(err);
        }
        console.log("File written successfully.");
        done();
      }
    );
  } catch (err) {
    console.error("Error writing file:", err);
  }
});


gulp.task("default", gulp.series("enFile","esFile"));
