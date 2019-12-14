document.addEventListener("DOMContentLoaded", function(){
    // get the selects
    let selectpickers = document.getElementsByClassName('x-selectpicker');

    Array.prototype.forEach.call(selectpickers, function(element, i) {
        createXselectpicker(element);
    });
});

function xSelectpicker(selected, placeholder, searchEnabled, more) {
    return {
        selected: selected,
        showOptions: false,
        placeholder: placeholder,
        searchEnabled: searchEnabled,
        search: '',
        newSelection(name, value) {
            this.placeholder = name;
            this.selected = value;
            this.showOptions = false;
        },
        newMultipleSelection(name, value) {
            if(this.selected.includes(value)) {
                // remove the selected value
                this.selected = this.selected.filter(e => e !== value);
            } else {
                // add the selected value
                this.selected.push(value);
            }
            console.log(this.selected);
        }
    }
}

function createXselectpicker(select) {
    // hide it
    // select.classList.add('hidden');
    if(select.multiple) {
        createMultipleSelectPicker(select);
    } else {
        createSingleSelectPicker(select);
    }
}

function createMultipleSelectPicker(select)
{
    let placeholder = "'Choose an Option'";
    // if(getSelectValues(select).length > 0) {
    //     Array.prototype.forEach.call(getSelectValues(select), function(element, i) {
    //         placeholder += 'one';
    //     });
    // } else if(select.getAttribute('placeholder')) {
    //     placeholder = "'" + select.getAttribute('placeholder') + "'";
    // }

    let searchEnabled = false;
    if(select.getAttribute('search')) {
        searchEnabled = true;
    }

    let values = getSelectValues(select);
    console.log(values);
    select.insertAdjacentHTML('beforebegin', '<div id="'+ select.id +'_x_selectpicker_container" x-data="xSelectpicker([], '+placeholder+', '+searchEnabled+')"></div>');
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
    parent.insertAdjacentHTML('beforeend', '<div id="'+ select.id + '_options" x-show="showOptions" x-on:click.away="showOptions = false" class="'+select.getAttribute('dropdown-class')+'"></div>');
    parent.insertAdjacentHTML('beforeend', '<div x-on:click="console.log(selected)">Click Me</div>');

    let options = document.getElementById(select.id + '_options');

    addMultipleOptions(select.id);

    if (searchEnabled) {
        options.insertAdjacentHTML('afterbegin', '<div id="'+select.id+'_search"><input id="'+select.id+'_search_input" type="text" x-model="search" x-on:keyup="updateOptions(search, \''+select.id+'\')" class="'+select.getAttribute('search-class')+'"/></div>');
        document.getElementById(select.id+'_selection').addEventListener("click", function () {
            setTimeout(() => {
                document.getElementById(select.id+'_search_input').focus();
            }, 10);
        });
    }
}

function createSingleSelectPicker(select)
{
    let placeholder = "'Choose an Option'";
    if(select.selectedIndex) {
        placeholder = "'" + select.options[select.selectedIndex].text + "'";

    } else if(select.getAttribute('placeholder')) {
        placeholder = "'" + select.getAttribute('placeholder') + "'";
    }

    let searchEnabled = false;
    if(select.getAttribute('search')) {
        searchEnabled = true;
    }
    // add a container to hold everything
    select.insertAdjacentHTML('beforebegin', '<div id="'+ select.id +'_x_selectpicker_container" x-data="xSelectpicker('+select.value+', '+placeholder+', '+searchEnabled+')"></div>');
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
    parent.insertAdjacentHTML('beforeend', '<div id="'+ select.id + '_options" x-show="showOptions" x-on:click.away="showOptions = false" class="'+select.getAttribute('dropdown-class')+'"></div>');
    let options = document.getElementById(select.id + '_options');

    addOptions(select.id, '');

    if (searchEnabled) {
        options.insertAdjacentHTML('afterbegin', '<div id="'+select.id+'_search"><input id="'+select.id+'_search_input" type="text" x-model="search" x-on:keyup="updateOptions(search, \''+select.id+'\')" class="'+select.getAttribute('search-class')+'"/></div>');
        document.getElementById(select.id+'_selection').addEventListener("click", function () {
            setTimeout(() => {
                document.getElementById(select.id+'_search_input').focus();
            }, 10);
        });
    }
}

function updateOptions(searchText, selectId)
{
    let selectpickerOptions = document.getElementById(selectId+'_options');
    Array.prototype.forEach.call(selectpickerOptions.childNodes, function(element, i) {
        if(element.innerText.toLowerCase().includes(searchText.toLowerCase()) || element.id.includes('_search')) {
            element.removeAttribute('style');
        } else {
            element.style.display = 'none';
        }
    });
}

function addMultipleOptions(selectId)
{
    let originalSelect = document.getElementById(selectId);
    let selectOptions = originalSelect.options;
    let options = document.getElementById(selectId + '_options');
    Array.prototype.forEach.call(selectOptions, function(element, i) {
        options.insertAdjacentHTML('beforeend', '<div id="' + originalSelect.id + '_option_' + element.value + '" class="'+originalSelect.getAttribute('option-class')+'" x-on:click="newMultipleSelection(\''+element.text+'\',\''+element.value+'\')" x-bind:class=" { \'bg-red-500\': select.includes(\''+element.value+'\') }">' + element.text + '</div>');
    });
}

function addOptions(selectId, searchText)
{
    let originalSelect = document.getElementById(selectId);
    let selectOptions = originalSelect.options;
    let options = document.getElementById(selectId + '_options');
    if(searchText.length > 0) {
        Array.prototype.forEach.call(selectOptions, function(element, i) {
            if(element.text.toLowerCase().includes(searchText.toLowerCase())) {
                options.insertAdjacentHTML('beforeend', '<div id="' + originalSelect.id + '_option_' + element.value + '" class="'+originalSelect.getAttribute('option-class')+'" x-on:click="newSelection(\''+element.text+'\','+element.value+')">' + element.text + '</div>');
            }
        });
    } else {
        Array.prototype.forEach.call(selectOptions, function(element, i) {
            options.insertAdjacentHTML('beforeend', '<div id="' + originalSelect.id + '_option_' + element.value + '" class="'+originalSelect.getAttribute('option-class')+'" x-on:click="newSelection(\''+element.text+'\','+element.value+')">' + element.text + '</div>');
        });
    }
}

function getSelectValues(select) {
    let result = [];
    let options = select && select.options;
    let opt;

    for (let i=0, iLen=options.length; i<iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.value || opt.text);
        }
    }
    return result;
}

function getSelectKeyValues(select) {
    let arr = [];
    Array.prototype.forEach.call(select.options, function(element, i) {
        arr[select.options[i].value] = select.options[i].text;
    });
    // arr = arr.filter(e => e !== '');
    return arr;
}