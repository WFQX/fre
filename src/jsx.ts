// Supported and simplify jsx2
// https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md

export function jsx(type, attrs) {
  let props = attrs || {}
  let key: string = props.key || null
  let ref: Ref = props.ref || null
  let children: Vnode[] = []

  for (let i = 2; i < arguments.length; i++) {
    let vnode = arguments[i]
    if (vnode == null || vnode === true || vnode === false) {
    } else {
        // if vnode is a nest array, flat them first
      while (isArr(vnode) && vnode.some(v => isArr(v)))
        vnode = [].concat(...vnode)
      children.push(vnode)
    }
  }

  if (children.length) { 
      // if there is only on child, it not need an array, such as child use as a function
    props.children = children.length === 1 ? children[0] : children
  }

  delete props.key
  delete props.ref

  return { type, props, key, ref }

}

const isArr = Array.isArray

type Ref =
  | Function
  | {
      current: HTMLElement
    }

type Vnode = {
  type: Function | string
  props: unknown
  key?: string
  ref?: Ref
}
