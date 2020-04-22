import { Vnode, Ref, Fiber, Props } from './type'
import { scheduleWork, shouldYeild } from './scheduler'

let currentFiber = null
let preCommit = null
let wip = null
let batches = []
let commits = []

export function render(vnode: Vnode, node: HTMLElement, done: Function) {
  let rootFiber: Fiber = {
    node,
    props: { children: vnode },
    done
  }
  scheduleUpdate(rootFiber)
}

export function scheduleUpdate(fiber: Fiber) {
  if (!fiber.dirty && (fiber.dirty = true)) {
    batches.push(fiber)
  }
  scheduleWork(reconcileWork)
}

function reconcileWork(timeout: boolean) {
  if (!wip) wip = batches.shift()
  if (wip) {
    while (!shouldYeild() || timeout) {
      wip = reconcile(wip)
    }
    if (!timeout) return reconcileWork.bind(null)
  }
  if(preCommit) commitWork(preCommit)
  return null
}

const enum Flag {
  PLACE = 1,
  UPDATE = 2,
  REMOVE = 3,
  SVG = 4
}
