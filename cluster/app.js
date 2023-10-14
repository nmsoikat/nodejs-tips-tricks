const express = require('express')
const os = require('os')
const cluster = require('cluster')

const app = express()

const numCPU = os.cpus().length

app.get('/', (req, res) => {
  for (let i = 0; i < 1e9; i++) {
    // log task    
  }
  res.send(`Ok... ${process.pid}`)

  // kill the current process
  // cluster.worker.kill();
})


// number of core used // in these case two core
// loadtest -n 100 -c 100 //17ms
if (cluster.isMaster) {
  for (let i = 0; i < numCPU; i++) {
    //create a worker
    cluster.fork() // same as child process {fork}
  }

  // when worker is killed or down create new one
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker is died ${worker.process.pid}`);
    // zero down time
    cluster.fork();
  })
} else {
  app.listen(3000, () => { console.log(`${process.pid} Server is running on port:`, 3000); })
}

// Single core used
// loadtest -n 100 -c 100 //34ms
// app.listen(3000, () => {
//   console.log("Server is running on port:", 3000);
// })