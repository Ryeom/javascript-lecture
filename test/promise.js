const prom = () => {
    return new Promise((res, rej) => {
        res('test')
    })
}

const success = (msg) => {
    console.log(`success : `, msg)
}

const failure = (msg) => {
    console.log(`failure : `, msg)
}

prom().then(success, failure)

const rr = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve(1)
    }, 2000)
})
    .then(function(result) {
        console.log(result) // 1
        return result + 10
    })
    .then(function(result) {
        console.log(result) // 11
        return result + 20
    })
    .then(function(result) {
        console.log(result) // 31
        return result
    })

const r = rr
console.log(r)
