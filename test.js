
const width = 4
const depth = 3

// var myArr = new Array(width).map(() => new Array(depth).fill('?'))
const myArr = new Array(width).fill(null).map(() => new Array(depth).fill('?'))
console.log(myArr)
myArr[0][0] = 'test'
console.log(myArr)

function render() {

}
