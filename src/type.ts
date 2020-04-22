export type Ref = Function | { current: HTMLElement }

export type Vnode =
  | {
      type?: Function | string
      props: Props
    }
  | string

export type Props = Record<string, unknown> & {
  key?: string
  ref?: Ref
}

export type Fiber = {
  node: HTMLElement
  pnode?: HTMLElement
  done: Function
  dirty?: boolean
} & Vnode

export type Task = {
  work: Function
  startTime: number
  dueTime: number
}
