// child.js
import fkill from "fkill";
import { exec } from "child_process";
import path from "path";
import fs from "fs";
import isPortReachable from "is-port-reachable";
const __dirname = path.resolve();
// Run the pip show chainlit command
let chainlitProcess = null;
const port = 8000;
const host = "127.0.0.1";

isPortReachable(port, { host }).then(async (reachable) => {
  if (reachable) {
    console.log(`Port ${port} is open`);
    await fkill(":8000", { force: true });
  } else {
    console.log(`Port ${port} is closed`);
  }
});

process.on("message", async (msg) => {
  // const appPath = path.resolve(__dirname, "..", "rag-chatbot", "app.py");
  const envPath = path.resolve(__dirname, "..", "rag-chatbot", ".env");
  const filesPath = path.resolve(__dirname, ".", ".files");
  if (!fs.existsSync(filesPath)) {
    fs.mkdirSync(filesPath, { recursive: true });
  }
  console.log(filesPath);
  // Read the existing content of the .env file
  let envContent = "";
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, "utf8");
  }
  console.log(msg);
  // Construct the new line to be written
  const newLine = `PRAKRITI=${msg.data}\n`;
  console.log(newLine);

  // Check if CHAINLIT_ARG already exists in the .env file
  const regex = /^PRAKRITI=.*/m;
  if (regex.test(envContent)) {
    // If CHAINLIT_ARG exists, replace its value
    envContent = envContent.replace(regex, newLine);
  } else {
    // If CHAINLIT_ARG does not exist, append it to the end
    envContent += newLine;
  }

  // Write the modified content back to the .env file
  fs.writeFileSync(envPath, envContent);

  if (chainlitProcess != null) {
    chainlitProcess.kill();
  }

  const appPath = path.resolve(__dirname, "..", "rag-chatbot", "app.py");
  // const command = `chainlit run -h ${appPath}`;
  const command = `chainlit run -h ${appPath}`;
  // if (chainlitProcess) {
  //   exec("exit");
  // }
  console.log("running this command :", command);
  chainlitProcess = exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log("error here : ", error);
      process.send({ error: stderr });
      return;
    }
    process.send({ data: stdout });
    process.send({ data: stderr });
  });
});
