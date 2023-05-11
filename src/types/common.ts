type LoadableIdle = {
    status: "idle",
}

type LoadablePending = {
    status: "pending",
}

type LoadableError = {
    status: "error",
    error: unknown,
}

type LoadableSuccess<T> = {
    status: "success",
    data: T,
}


export type Loadable<T> = LoadableIdle | LoadablePending | LoadableError | LoadableSuccess<T>
  