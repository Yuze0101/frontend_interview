onmessage = function (e) {
  console.log(e)
  if (e.data == 'runHeavyWorkWithWorker') {
    heavyWork()
  }
}

// 模拟高计算量的任务
function heavyWork() {
  for (let i = 2; i < 10000; i++) {
    for (let j = 2; j < i; j++) {
      if (i % j === 0) {
        console.log(j)
      }
    }
  }
  // 线程计算完毕后向主线程发送消息
  postMessage('done')
}
