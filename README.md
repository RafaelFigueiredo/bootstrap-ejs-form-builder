# Bootstrap-EJS Form Builder

This script take an input defined in a excel file and generate a form using Bootstrap.

It's mandatory review the code generated before put in production but this is faster than write everything from scratch.





## How to use

1. Edit `/intput/form.xlsx` file using you favorite spreadsheet software

   ![image-20200330164838660](./docs/excel-example.png)

2. Run on terminal:

   ``````bash
   node form.js ./input/form.xlsx ./output/form.ejs
   ``````

3. Review the generated file on `/output/form.ejs`

``````html
<div class="form-group">
  <label for="username">Username</label>
  <input type="text" id="username" name="username" class="form-control" placeholder="Ex: ..." onchange="montarReq(this,false)" required />
</div>

<div class="form-group">
  <label for="password">Password</label>
  <input type="password" id="password" name="password" class="form-control" placeholder="Ex: ..." onchange="montarReq(this,false)" />
</div>

<!-- ...
``````

![image-20200330170628978](./docs/form-screenshot.png)