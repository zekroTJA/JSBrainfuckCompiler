
class BrainFuck {

    constructor(options) {
        this.cell_size =   options && options.cell_size ? options.cell_size : 8
    }

    increment() {
        let p = this.pointer
        if (this.mem[p])
            if (this.mem[p] < 2 ** this.cell_size - 1)
                this.mem[p]++
            else
                this.mem[p] = 0
        else
            this.mem[p] = 1
    }

    decrement() {
        let p = this.pointer
        if (this.mem[p] && this.mem[p] > 0)
            this.mem[p]--
        else
            this.mem[p] = 2 ** this.cell_size - 1
    }

    shift_forward() {
        this.pointer++
    }

    shift_backward() {
        if (this.pointer != 0)
            this.pointer--
    }

    print() {
        this.out += String.fromCharCode(this.mem[this.pointer])
    }

    input() {
        this.mem[this.pointer] = this.inp_str.charCodeAt(this.inp_pointer) ? 
                                 this.inp_str.charCodeAt(this.inp_pointer) : 
                                 0
    }


    parse_current() {
        switch (this.char) {
            case '>':
                this.shift_forward()
                break
            case '<':
                this.shift_backward()
                break
            case '+':
                this.increment()
                break
            case '-':
                this.decrement()
                break
            case '.':
                this.print()
                break
            case ',':
                this.input()
                break
            case '[':

                break
            case ']':

                break
        }
    }

    setInput(input) {
        this.inp_str = input
        return this
    }

    compile(code, cb) {
        var stopper = 0
        this.mem = []
        this.pointer = 0
        this.out = ''
        this.inp_pointer = 0

        let len = code.length

        for (let i = 0; i < len; i++) {
            this.char = code.charAt(i)
            if (['>', '<', '+', '-', '.', ','].indexOf(this.char) > -1) {
                this.parse_current(this.char)
            }
            else if (this.char == '[') {
                while (this.mem[this.pointer] > 1) {
                    let start = i
                    do {
                        this.parse_current(this.char)
                        this.char = code.charAt(++i)
                        if (++stopper == 500)
                            process.exit()
                    }
                    while (this.char != ']')
                    i = start
                }
            }
        }

        cb(this.out, this.mem, this.pointer)
    }

}

module.exports.BrainFuck = BrainFuck
