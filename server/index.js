import express from "express";
import cors from "cors";
import { spawn } from "child_process";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.post("/chatbot", (req, res) => {

});

app.get("/chatbot", (req, res) => {
  res.send("Get request received");
});

app.post('/predict', (req, res) => {

  console.log("Request received")
  // Receive input data from client
  const inputData = req.body;

  // Spawn child process
  const pythonProcess = spawn('python', ['model.py']);

  // Send input data to child process
  pythonProcess.stdin.write(JSON.stringify(inputData));
  pythonProcess.stdin.end();

  var dataToSend='';

  // Listen for output from child process
  pythonProcess.stdout.on('data', (data) => {
    dataToSend = data.toString();
  });

  // // Handle errors
  // pythonProcess.stderr.on('data', (data) => {
  //   console.error(`${data}`);
  // });

  pythonProcess.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    console.log(dataToSend)
    if(dataToSend)
      res.send(dataToSend);
    else
      res.status(500).send('Internal Server Error');
   });
});
  
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
