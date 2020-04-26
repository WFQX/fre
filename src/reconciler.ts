import { Vnode, Ref, Fiber, Props } from './type'
import { scheduleWork, shouldYeild } from './scheduler'

let currentFiber = null
let preCommit = null
let WIP = null
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
  if (!WIP) WIP = batches.shift()
  if (WIP) {
    while (!shouldYeild() || timeout) {
      WIP = reconcile(WIP)
    }
    if (!timeout) return reconcileWork.bind(null)
  }
  if(preCommit) commitWork(preCommit)
  return null
}

function reconcile(WIP: Fiber){
  WIP.pnode = getPNode(WIP)
  isFn(WIP.type) ? updateHOOK(WIP) : updateHost(WIP)
  // dirty true => false undefined => 0
  WIP.dirty = WIP.dirty ? false : 0
  WIP.oldProps = WIP.props
  commits.push(WIP)

  if (WIP.child) return WIP.child
  while (WIP) {
    if (!preCommit && WIP.dirty === false) {
      preCommit = WIP
      return null
    }
    if (WIP.sibling) {
      return WIP.sibling
    }
    WIP = WIP.parent
  }
}



const enum Flag {
  PLACE = 1,
  UPDATE = 2,
  REMOVE = 3,
  SVG = 4
}
