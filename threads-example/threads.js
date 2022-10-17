const { isMainThread, workerData, Worker } = require('worker_threads');

if (isMainThread) {
  new Worker(__filename, {
    workerData: [5, 3, 6, 2, 1],
  });

  new Worker(__filename, {
    workerData: [11, 9, 3, 6, 8, 7, 10],
  });

  console.log(`isMainThread ${process.pid}`);
} else {
  console.log(`Worker ${process.pid}`);

  console.log(workerData + ' sorted ' + workerData.sort());
}
