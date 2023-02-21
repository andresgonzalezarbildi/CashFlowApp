let xlsx = require('xlsx')
let data = [
    { name: 'raj', email: 'raj@gmail.com', gender:'M' },
    { name: 'andres', email:'a_gonzalez214@hotmail.com'}
]

function jsonToExcel() {
    const workSheet = xlsx.utils.json_to_sheet(data)
    const workBook = xlsx.utils.book_new()

    xlsx.utils.book_append_sheet(workBook, workSheet, data)
    //generate buffer
    xlsx.write(workBook, { bookType: 'xlsx', type: 'binary' })
    xlsx.writeFile(workBook, 'data.xlsx')
}

jsonToExcel()