const template = {
    text: function(input){ return `
<div class="form-group">
    <label for="${input.id}">${input.label}</label>
    <input type="${input.type}" id="${input.id}" name="${input.name}" class="form-control"
    placeholder="${input.placeholder}" onchange="montarReq(this,false)" ${input.required === 'yes'? 'required':''} />
</div>`    
    },

    password: function(input){ return `
<div class="form-group">
    <label for="${input.id}">${input.label}</label>
    <input type="${input.type}" id="${input.id}" name="${input.name}" class="form-control"
    placeholder="${input.placeholder}" onchange="montarReq(this,false)" ${input.required === 'yes'? 'required':''} />
</div>`    
    },

    number: function(input){ return `
<div class="form-group">
    <label for="${input.id}">${input.label}</label>
    <input type="${input.type}" id="${input.id}" name="${input.name}" class="form-control" min="${input.min}" max="${input.max}"
    placeholder="${input.placeholder}" onchange="montarReq(this,false)" ${input.required === 'yes'? 'required':''} />
</div>`    
    },
    
    date: function(input){ return `
<div class="form-group">
    <label for="${input.id}">${input.label}</label>
    <input type="${input.type}" id="${input.id}" name="${input.name}" class="form-control"
    onchange="montarReq(this,false)" />
</div>`}
    ,

    radio: function(input){ //TODO REVIEW label for
        let html = ''
        html = `
<label for="div_${input.id}">Sexo:</label>
<div class="form-group" id="div_${input.id}">`

        html += input.items.map(element => {
            let radio_id = element.toLowerCase().replace(" ", "_")
            return`
<div class="form-check form-check-inline">
    <input type="radio" id="${radio_id}" name="${input.name}" value="${radio_id}" class="form-check-input" onchange="montarReq(this,false)">
    <label class="form-check-label" for="${radio_id}">${element}</label>
</div>`
        }).join('\n');

        html += `\n</div>`
        return html
    },

    select: function(input){
        let html = `
<div class="form-group">
    <label for="${input.id}">País de residência:</label>
    <select name="${input.name}" id="${input.id}" class="form-control" onchange="montarReq(this,false)">\n`
        html += input.items.map(element =>{
            return `<option>${element}</option>`
        }).join('\n')
        html +=`
    </select>
</div>`
        return html
    }

}

module.exports = template