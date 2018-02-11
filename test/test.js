const { BrainFuck } = require('../src/index')
const fs = require('fs')

var bf = new BrainFuck()

var code = fs.readFileSync('test/testfiles/test.b', 'utf8')

console.log(code, '\n')

bf.setInput('test').compile(code, (out, mem, point) => {
    console.log(out, mem, point)
    console.log(bf.fancyMemOut())
})
