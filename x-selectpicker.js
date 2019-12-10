document.addEventListener("DOMContentLoaded", function(){
    // get the selects
    let selectpickers = document.getElementsByClassName('x-selectpicker');

    Array.prototype.forEach.call(selectpickers, function(element, i) {
        createXselectpicker(element);
    });
});


function xSelectpicker(selected, placeholder, searchEnabled) {
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

    let selectOptions = select.options;

    addOptions(select.id, '');

    if (searchEnabled) {
        options.insertAdjacentHTML('afterbegin', '<div id="'+select.id+'_search"><input id="'+select.id+'_search_input" type="text" x-model="search" x-on:keyup="updateOptionsTest(search, \''+select.id+'\')" class="'+select.getAttribute('search-class')+'"/></div>');
    }
}

function updateOptionsTest(value, selectId)
{
    hideOptions(selectId, value);
    focusOnSearchInput(selectId);
}

function hideOptions(selectId, searchText)
{
    let selectpickerOptions = document.getElementById(selectId+'_options');
    console.log(selectpickerOptions.childNodes);
    Array.prototype.forEach.call(selectpickerOptions.childNodes, function(element, i) {
        console.log(element.id);
        if(element.innerText.toLowerCase().includes(searchText.toLowerCase()) || element.id.includes('_search')) {
            element.removeAttribute('style');
        } else {
            element.style.display = 'none';
        }
    });
}

function focusOnSearchInput(selectId)
{
    document.getElementById(selectId+'_search_input').focus();
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
