const express = require('express')
const router = express.Router();
const { fork } = require('child_process')

const app = express()

// Synchronous
app.get('/one', (req, res) => {
  const sum = longComputation();
  res.send({ sum })
})


// Asynchronous
app.get('/two', async (req, res) => {
  const sum = await longComputationPromise();
  res.send({ sum })
})


// Fork //Child process
app.get('/three', (req, res) => {
  const childProcess = fork('./long-task.js')
  childProcess.send('start')
  childProcess.on('message', (sum) => {
    res.send({ sum })
  })
})

function longComputation() {
  let sum = 0;
  for (let i = 0; i < 1e9; i++) {
    sum += i;
  }
  return sum;
}

function longComputationPromise() {
  return new Promise((resolve, reject) => {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
      sum += i;
    }
    resolve(sum)
  })
}

app.listen(3000, () => {
  console.log("Server is running on port:", 3000);
})