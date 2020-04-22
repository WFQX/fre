import { Fiber, Task } from './type'
import { push, pop, peek } from './heapify'


let tasks = []
let currentWork = null
let fd = 0
let fl = 5

export function scheduleWork(work: Function) {
  const startTime = getTime()
  const timeout = 3000
  const dueTime = startTime + timeout

  let newTask: Task = {
    work,
    startTime,
    dueTime
  }
}

export const getTime = () => performance.now()
