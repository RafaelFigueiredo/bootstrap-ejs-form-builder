const fs            = require('fs');
const xlsxParser    = require('xlsx')
const template      = require('./templates')
const pretty        = require('pretty')
const path          = require('path')


// DISPLAY INPUT INFORMATION ON TERMINAL

console.log("running")

const input_file = process.argv[2] || './input/form.xlsx'
const output_path = process.argv[3] || './output'

console.log('------------------------------------------------')
console.log("input file  <<", input_file)
console.log("output path >>", output_path)
console.log('------------------------------------------------\n')


let workbook = xlsxParser.readFile(input_file)

workbook.SheetNames.forEach(sheet_name =>{
    console.log(`[${sheet_name}]`)
    generate_forms(workbook, sheet_name)
})    

async function generate_forms(workbook, sheet_name){
    let input = xlsxParser.utils.sheet_to_json(workbook.Sheets[sheet_name])
    
    // If items list is defined, in case of 'radio' or 'select' fields, we split
    // the list in a array of items
    input = input.map((row)=>{
        console.log(row)
        if(row.items === '' || row.items === undefined)return row
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
    html = pretty(html);
    
    // Write output to file
    let output_file = path.resolve(__dirname, output_path, `${sheet_name}.ejs`)
    fs.writeFile(`./output/${sheet_name}`, html, function (err) {
      if (err) return console.log(err);
      console.log('Form html >> ', output_file);
    });
}