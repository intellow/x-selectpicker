document.addEventListener("DOMContentLoaded", function(){
    // get the selects
    let selectpickers = document.getElementsByClassName('x-selectpicker');

    Array.prototype.forEach.call(selectpickers, function(element, i) {
        createXselectpicker(element);
    });
});


function xSelectpicker(selected, placeholder) {
    return {
        selected: selected,
        showOptions: false,
        placeholder: placeholder,
        newSelection(name, value) {
            this.placeholder = name;
            this.selected = value;
        }
    }
}

function createXselectpicker(select) {
    // hide it
    select.classList.add('hidden');
    let placeholder = "'Choose an Option'";
    if(select.selectedIndex) {
        placeholder = "'" + select.options[select.selectedIndex].text + "'";

    } else if(select.getAttribute('placeholder')) {
        placeholder = "'" + select.getAttribute('placeholder') + "'";
    }

    // add a container to hold everything
    select.insertAdjacentHTML('beforebegin', '<div id="'+ select.id +'_x_selectpicker_container" x-data="xSelectpicker('+select.value+', '+placeholder+')"></div>')
    let parent = document.getElementById(select.id +'_x_selectpicker_container');
    // assign the classes on the select to the new parent
    let selectClasses = select.classList;
    Array.prototype.forEach.call(selectClasses, function(element, i) {
        if(element === 'hidden' || element === 'x-selectpicker') {
            // do nothing
        } else {
            parent.classList.add(element);
        }
    });
    // put the original select element inside the new container
    parent.appendChild(select);

    // set x-model on select
    select.setAttribute('x-model', 'selected');

    // create div to show selections
    parent.insertAdjacentHTML('beforeend', '<div id="'+ select.id + '_selection" x-on:click="showOptions = true" class="'+select.getAttribute('result-class')+'" x-text="placeholder"></div>');
    // create div to show options
    parent.insertAdjacentHTML('beforeend', '<div id="'+ select.id + '_options" x-show="showOptions" x-on:click.away="showOptions = false" x-on:click="showOptions = false" class="'+select.getAttribute('dropdown-class')+'"></div>');

    let options = document.getElementById(select.id + '_options');

    let selectOptions = select.options;
    Array.prototype.forEach.call(selectOptions, function(element, i) {
        options.insertAdjacentHTML('beforeend', '<div id="' + select.id + '_option_' + element.value + '" class="'+select.getAttribute('option-class')+'" x-on:click="newSelection(\''+element.text+'\','+element.value+')">' + element.text + '</div>');
    });
}