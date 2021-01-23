/* Shivving (IE8 is not supported, but at least it won't look as awful)
/* ========================================================================== */

const { table } = require("console");

(function (document) {
	var
	head = document.head = document.getElementsByTagName('head')[0] || document.documentElement,
	elements = 'article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output picture progress section summary time video x'.split(' '),
	elementsLength = elements.length,
	elementsIndex = 0,
	element;

	while (elementsIndex < elementsLength) {
		element = document.createElement(elements[++elementsIndex]);
	}

	element.innerHTML = 'x<style>' +
		'article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}' +
		'audio[controls],canvas,video{display:inline-block}' +
		'[hidden],audio{display:none}' +
		'mark{background:#FF0;color:#000}' +
	'</style>';

	return head.insertBefore(element.lastChild, head.firstChild);
})(document);

(function (window, ElementPrototype, ArrayPrototype, polyfill) {
	function NodeList() { [polyfill] }
	NodeList.prototype.length = ArrayPrototype.length;

	ElementPrototype.matchesSelector = ElementPrototype.matchesSelector ||
	ElementPrototype.mozMatchesSelector ||
	ElementPrototype.msMatchesSelector ||
	ElementPrototype.oMatchesSelector ||
	ElementPrototype.webkitMatchesSelector ||
	function matchesSelector(selector) {
		return ArrayPrototype.indexOf.call(this.parentNode.querySelectorAll(selector), this) > -1;
	};

	ElementPrototype.ancestorQuerySelectorAll = ElementPrototype.ancestorQuerySelectorAll ||
	ElementPrototype.mozAncestorQuerySelectorAll ||
	ElementPrototype.msAncestorQuerySelectorAll ||
	ElementPrototype.oAncestorQuerySelectorAll ||
	ElementPrototype.webkitAncestorQuerySelectorAll ||
	function ancestorQuerySelectorAll(selector) {
		for (var cite = this, newNodeList = new NodeList; cite = cite.parentElement;) {
			if (cite.matchesSelector(selector)) ArrayPrototype.push.call(newNodeList, cite);
		}

		return newNodeList;
	};

	ElementPrototype.ancestorQuerySelector = ElementPrototype.ancestorQuerySelector ||
	ElementPrototype.mozAncestorQuerySelector ||
	ElementPrototype.msAncestorQuerySelector ||
	ElementPrototype.oAncestorQuerySelector ||
	ElementPrototype.webkitAncestorQuerySelector ||
	function ancestorQuerySelector(selector) {
		return this.ancestorQuerySelectorAll(selector)[0] || null;
	};
})(this, Element.prototype, Array.prototype);


writeData();
//generateTableRow();
function writeData(){
    date=document.getElementById("date");
    date.innerHTML="Invoice Date "+getDate();
}
function getDate(){
    var d= new Date();
    year=d.getFullYear();
    month=get_month(d);
    day=d.getDate();
    date=day+"."+month+"."+year
    return(date);
}
function get_month(date) {
    var month = date.getMonth() + 1;
    return month < 10 ? '0' + month : '' + month;
  } 
  function generateTableRow() {
	var emptyColumn = document.createElement('tr');
    emptyColumn.innerHTML = 
    // '<td><a class="cut">-</a><span contenteditable></span></td>' +
		'<td><span contenteditable></span></td>' +
		'<td><span contenteditable></span></td>' +
		'<td><span contenteditable></span></td>' +
        '<td><span contenteditable></span></td>'+
        '<td><span contenteditable></span></td>' +
		'<td><span contenteditable></span></td>' +
		'<td><span contenteditable></span></td>' +
        '<td><span contenteditable></span></td>'+
        '<td><span contenteditable></span></td>' +
		'<td><span contenteditable></span></td>' +
		'<td><span contenteditable></span></td>' +
        '<td><span contenteditable></span></td>'+
        '<td><span contenteditable></span></td>' +
		'<td><span contenteditable></span></td>' +
		'<td><span contenteditable></span></td>' +
        '<td><span contenteditable></span></td>'+
        '<td><span contenteditable></span></td>' +
		'<td><span contenteditable></span></td>' ;
	return emptyColumn;
} 
function generateTableRowSpare() {
	var emptyColumn = document.createElement('tr');
    emptyColumn.innerHTML = 
    // '<td><a class="cut">-</a><span contenteditable></span></td>' +
		'<td><span contenteditable></span></td>' +
		'<td><span contenteditable></span></td>' +
		'<td><span contenteditable></span></td>' +
        '<td><span contenteditable></span></td>'+
        '<td><span contenteditable></span></td>' +
        '<td><span contenteditable></span></td>' +
		'<td><span contenteditable></span></td>' +
		'<td><span contenteditable></span></td>' +
        '<td><span contenteditable></span></td>'+
        '<td><span contenteditable></span></td>' +
		'<td><span contenteditable></span></td>' +
		'<td><span contenteditable></span></td>' +
        '<td><span contenteditable></span></td>'+
        '<td><span contenteditable></span></td>' +
		'<td><span contenteditable></span></td>' +
		'<td><span contenteditable></span></td>' +
        '<td><span contenteditable></span></td>'+
        '<td><span contenteditable></span></td>' +
		'<td><span contenteditable></span></td>' ;
	return emptyColumn;
} 

function add_service_row(){
    document.querySelector('table.services_table tbody').appendChild(generateTableRow());
}
function add_spare_row(){
    document.querySelector('table.spare_table tbody').appendChild(generateTableRowSpare());

}
function delete_service_row(){
    table= document.querySelector('table.services_table tbody')
    le=table.lastElementChild;
    table.removeChild(le);
}


function onContentLoad() {
	//updateInvoice();

	// var
	// input = document.querySelector('input'),
	// image = document.querySelector('img');

	function onClick(e) {
		var element = e.target.querySelector('[contenteditable]'), row;

		element && e.target != document.documentElement && e.target != document.body && element.focus();

		if (e.target.matchesSelector('.add')) {
			document.querySelector('table.services_table tbody').appendChild(generateTableRow());
		}
		else if (e.target.className == 'cut') {
            document.getElementsByClassName("services_table").deleteRow(0);
            // document.querySelector('table.services_table tbody').removeChild(0);
			// row = e.target.ancestorQuerySelector('tr');
			// row.parentNode.removeChild(row);
		}

		// updateInvoice();
	}

	function onEnterCancel(e) {
		e.preventDefault();

		image.classList.add('hover');
	}

	function onLeaveCancel(e) {
		e.preventDefault();

		image.classList.remove('hover');
	}

	function onFileInput(e) {
		image.classList.remove('hover');

		var
		reader = new FileReader(),
		files = e.dataTransfer ? e.dataTransfer.files : e.target.files,
		i = 0;

		reader.onload = onFileLoad;

		while (files[i]) reader.readAsDataURL(files[i++]);
	}

	function onFileLoad(e) {
		var data = e.target.result;

		image.src = data;
	}

	if (window.addEventListener) {
		document.addEventListener('click', onClick);

		// document.addEventListener('mousewheel', updateNumber);
		// document.addEventListener('keydown', updateNumber);

		// document.addEventListener('keydown', updateInvoice);
		// document.addEventListener('keyup', updateInvoice);

		// input.addEventListener('focus', onEnterCancel);
		// input.addEventListener('mouseover', onEnterCancel);
		// input.addEventListener('dragover', onEnterCancel);
		// input.addEventListener('dragenter', onEnterCancel);

		// input.addEventListener('blur', onLeaveCancel);
		// input.addEventListener('dragleave', onLeaveCancel);
		// input.addEventListener('mouseout', onLeaveCancel);

		// input.addEventListener('drop', onFileInput);
		// input.addEventListener('change', onFileInput);
	}
}

window.addEventListener && document.addEventListener('DOMContentLoaded', onContentLoad);
