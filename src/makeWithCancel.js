export default (promise) => {
    let hasCanceled_ = false
  
    let wrappedPromise = new Promise((resolve, reject) => {
        promise.then((val) =>
            hasCanceled_ ? reject(null) : resolve(val)
        )
        promise.catch((error) =>
            hasCanceled_ ? reject(null) : reject(error)
        )
    })

    Promise.prototype.cancel = () => {
        hasCanceled_ = true
    }
  
    return wrappedPromise
}