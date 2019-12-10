# X-Selectpicker

X-Selectpicker is a simple selectpicker using the wonderful Project-X

## Install
Add the following script to the end of your `<head>` section.
```html
<script src="https://raw.githubusercontent.com/intellow/x-selectpicker/0.1.1/x-selectpicker.js" defer></script>
```
Make sure you have also installed [Project-X](https://github.com/calebporzio/project-x) as well.

## Usage

Add the class `x-selectpicker` to any select element. Then you can fully customize the look and feel of your selectpicker by adding CSS classes to three HTML elements: the result div, the dropdown div, and each individual option div.

In this example, I'm using [Tailwind CSS](https://tailwindcss.com/) to style my selectpicker:
```html
<select id="people" class="x-selectpicker" placeholder="Choose a Name"
        result-class="cursor-pointer p-2 pl-4 border-2 rounded"
        dropdown-class="z-10 w-auto bg-white border border-gray-400 absolute inline-block max-w-2xl"
        option-class="px-4 py-3 cursor-pointer hover:bg-blue-100 border-b border-gray-200"
        search="true"
        search-class="pl-4 py-3 focus:outline-none text-xl border-b-4 border-blue-500"
        >
    <option value="1">Kevin</option>
    <option value="2">Ruth</option>
    <option value="3">Caleb</option>
    <option value="4">Grant</option>
    <option value="5">Clarke</option>
</select>
```
![alt text](https://github.com/intellow/x-selectpicker/blob/master/x-selectpicker.gif "Sample Usage")


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
