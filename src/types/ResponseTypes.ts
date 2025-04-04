export type Response<T> = {
    ok: (value: T) => ({ok: boolean, value: T, error: null}),
    error: (error: T) => ({ok: boolean, value: null, error: T}),
}