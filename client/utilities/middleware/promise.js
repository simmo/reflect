// function isPromise(value) {
//     if (value !== null && typeof value === 'object') {
//         return value && typeof value.then === 'function'
//     }
//
//     return false
// }

export default function promiseMiddleware() {
    // Cache
    let cache = {}

    return ({ dispatch }) => (next) => (action) => {
        // If it's not a promise, skip to next middleware
        if (typeof action.payload !== 'function') {
            return next(action)
        }

        const handleResolution = (error = false, payload = null) => {
            // Remove from cache
            delete cache[action.type]

            return dispatch({
                type: `${action.type}_${error ? 'REJECTED' : 'FULFILLED'}`,
                payload,
                error
            })
        }

        // Not in cache?
        if (!cache.hasOwnProperty(action.type)) {
            // Trigger pending action
            next({
                type: `${action.type}_PENDING`
            })

            // Add Promise to cache and return it
            cache[action.type] = action.payload().then(handleResolution.bind(null, false), handleResolution.bind(null, true))
        }

        // Handle Promise resolution
        return cache[action.type]
    }
}
