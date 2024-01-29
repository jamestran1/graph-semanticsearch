export const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
export const  classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}