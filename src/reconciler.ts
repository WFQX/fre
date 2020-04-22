import { Vnode, Ref, Fiber, Props } from './type'
import { scheduleWork } from './scheduler'

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
  scheduleWork(rootFiber)
}

const enum Flag {
  PLACE = 1,
  UPDATE = 2,
  REMOVE = 3,
  SVG = 4
}
