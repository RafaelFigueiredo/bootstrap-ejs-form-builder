const fs = require('fs');
const xlsxParser = require('xlsx')
const template = require('./templates')



const read_xlsx = (filename) => {
    let workbook = xlsxParser.readFile(filename)
    let sheet_name = workbook.SheetNames[0]
    return xlsxParser.utils.sheet_to_json(workbook.Sheets[sheet_name])
}


// DISPLAY INPUT INFORMATION ON TERMINAL

console.log("running")
console.log(process.argv)

const input_file = process.argv[2] || 'form.xlsx'
console.log("input file <<", input_file)

const output_file = process.argv[3] || 'form.ejs'
console.log("output file <<", output_file)

console.log('------------------------------------------------\n\n')


// LOAD INPUT FILE

input = read_xlsx(input_file)
console.log("full input\n",input)


// If items list is defined, in case of 'radio' or 'select' fields, we split
// the list in a array of items
input = input.map((row)=>{
    console.log(row)
    if(row.items === '' || row.items === undefined){ return row }

    row.items = row.items.split(",")
    return row
})


// Generate html for each input field
let html =  input.map((item)=>{
    console.log("item", item )
    let render = template[item.type]
    return render(item)
}).join("\n")


// Beatify output
var pretty = require('pretty'); 
html = pretty(html);

console.log('Output\n\n',html)


// Write output to file

fs.writeFile(output_file, html, function (err) {
  if (err) return console.log(err);
  console.log('Form html >> ', output_file);
});

