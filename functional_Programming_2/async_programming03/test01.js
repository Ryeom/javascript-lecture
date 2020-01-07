function delay(time) {
    return new Promise((resolve) => setTimeout(() => resolve(), time))
}

async function delayIdentity(a) {
    await delay(500)
    return a
}

;(async function asdf(c) {
    const a = await delayIdentity(70)
    const b = await delayIdentity(60)
    console.log(a + b, c) //130
})('sdfg')
;(function qwer(a) {
    console.log(a)
})('asdf')
