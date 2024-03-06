let output = null;

output = document.all;
output = document.all[5]; //body
output = document.all.length; //41

output = document.documentElement; //Entire document (<html></html>)

output = document.head;
output = document.body;

output = document.body.children; //children elements

output = document.doctype;

output = document.URL;

output = document.characterSet; //UTF-8

output = document.forms;
output = document.forms[0].id; //access to form properties

// output = document.links
// output = document.links[0].href

document.body.classList = 'test-class';
output = document.body.className;

output = document.images;

//You will get htmlCollection (array-like). forEach not supported. Use Array.from(document.images) to create a proper array.

//output = console.log(output);
