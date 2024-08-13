//==================================================================
window.onload = function() {
	// Get all div elements
	let buttonCounter = 1;
	let divId = 1;
	let spanId = 1;
	let divElements = document.querySelectorAll('div');
	let spanElements = document.querySelectorAll('span');
	
	// Iterate over each div element
	divElements.forEach(function(div) {
		// Get the class attribute value
		let classNames = div.className;

		// If the div has class names, create a button
		if (classNames) {
			// Split class names if there are multiple
			let classArray = classNames.split(' ');

			classArray.forEach(function(className) {
				// Create a button to show the class name
				let button = document.createElement('button');
				button.id = 'btn' + buttonCounter++;
				button.className = 'show-class-button';
				button.setAttribute('spellcheck', 'false');
				button.setAttribute('contenteditable', 'false');
				button.innerText = className + ' ';
				button.setAttribute('ondblclick', 'handleButtonClick(this)');

				// Insert the button at the beginning of the div
				div.insertBefore(button, div.firstChild);
			});
		}
	});

  divElements.forEach(function(div) {
    div.id = 'div' + divId++;
  });

  spanElements.forEach(function(span){
    span.id = 'spn' + spanId++;
  });

};
//==================================================================
document.addEventListener('keydown', function (event) {

	if (event.ctrlKey && event.key === 'i') {
		event.preventDefault();
		const selection = window.getSelection();
		if (!selection.rangeCount) return; // No selection made

		try {
			const range = selection.getRangeAt(0);
			const selectedText = range.toString().trim();

			if (selectedText.length > 0) {
				// Check if the selection is already italicized
				const parentElement = range.commonAncestorContainer.parentElement;
				if (parentElement.tagName === 'SPAN' && parentElement.classList.contains('italic')) {
					// Remove the italic class
					parentElement.classList.remove('italic');
				} else {
					// Apply the italic class
					const span = document.createElement('span');
					span.classList.add('italic');
					range.surroundContents(span);
				}
			}
		} catch (error) { console.error('Error toggling italic formatting:', error); }
	}
	else if (event.ctrlKey && event.key === 'u') {
		event.preventDefault();
		const selection = window.getSelection();
		if (!selection.rangeCount) return; // No selection made

		try {
			const range = selection.getRangeAt(0);
			const selectedText = range.toString().trim();

			if (selectedText.length > 0) {
				// Check if the selection is already italicized
				const parentElement = range.commonAncestorContainer.parentElement;
				if (parentElement.tagName === 'SPAN' && parentElement.classList.contains('underline')) {
					// Remove the italic class
					parentElement.classList.remove('underline');
				} else {
					// Apply the italic class
					const span = document.createElement('span');
					span.classList.add('underline');
					range.surroundContents(span);
				}
			}
		} catch (error) { console.error('Error toggling underline formatting:', error); }
	}
	else if (event.ctrlKey && event.key === 'b') {
		event.preventDefault();
		const selection = window.getSelection();
		if (!selection.rangeCount) return; // No selection made

		try {
			const range = selection.getRangeAt(0);
			const selectedText = range.toString().trim();

			if (selectedText.length > 0) {
				// Check if the selection is already italicized
				const parentElement = range.commonAncestorContainer.parentElement;
				if (parentElement.tagName === 'SPAN' && parentElement.classList.contains('bold')) {
					// Remove the italic class
					parentElement.classList.remove('bold');
				} else {
					// Apply the italic class
					const span = document.createElement('span');
					span.classList.add('bold');
					range.surroundContents(span);
				}
			}
		} catch (error) { console.error('Error toggling bold formatting:', error); }
	} else if (event.key === 'Enter') {
        let selection = window.getSelection();
        if (selection.rangeCount > 0) {
            let range = selection.getRangeAt(0);
			let parentDivEle;
            try {
				parentDivEle = range.commonAncestorContainer.parentNode;
				let newBtn = document.createElement('button');
				newBtn.id = 'btn' + (document.getElementsByTagName('button').length + 1);
				newBtn.className = 'show-class-button';
				newBtn.setAttribute('spellcheck', 'false');
				newBtn.setAttribute('contenteditable', 'false');
				newBtn.setAttribute('onclick', 'handleButtonClick(this)');
				newBtn.innerText = parentDivEle.className;
				parentDivEle.insertBefore(newBtn , parentDivEle.nextSibling);
			} catch {
				parentDivEle = range.commonAncestorContainer.parentNode;
				let newBtn = document.createElement('button');
				newBtn.id = 'btn' + (document.getElementsByTagName('button').length + 1);
				newBtn.className = 'show-class-button';
				newBtn.setAttribute('spellcheck', 'false');
				newBtn.setAttribute('contenteditable', 'false');
				newBtn.setAttribute('onclick', 'handleButtonClick(this)');
				newBtn.innerText = parentDivEle.className;
				parentDivEle.insertBefore(newBtn , parentDivEle.navigateToNextParagraph);
			}
			
        }
    }else if((event.ctrlKey || event.metaKey) && event.key === 's') {
		event.preventDefault(); // Prevent default browser save dialog
    let jid_xpath = "//jid/@id";
    let aid_xpath = "//aid/@id";

    let jid_elem = document.evaluate(jid_xpath, document, null, XPathResult.STRING_TYPE, null);
    let aid_elem = document.evaluate(aid_xpath, document, null, XPathResult.STRING_TYPE, null);
    let jid = jid_elem.stringValue;
    let aid = aid_elem.stringValue;

    let filename = jid + aid + "_out.xml";
		
    let bodyHTML = document.body.outerHTML;
		function saveToFile(htmlContent, filename) {
					var blob = new Blob([htmlContent], { type: 'text/html' });
					var link = document.createElement('a');
					link.href = URL.createObjectURL(blob);
					link.download = filename;
					link.click();
				}

		saveToFile(bodyHTML, filename);
	}else if (event.ctrlKey && event.key === 'z') {
		undoAction();
	} else if (event.ctrlKey && event.key === 'y') {
		redoAction();
	}

});
//==================================================================
document.addEventListener('DOMContentLoaded', function() {
	document.addEventListener('keydown', function(event) {
		if (event.key === 'F6') {
			event.preventDefault(); // Prevent the default action for the F6 key
			let selection = window.getSelection();
                if (selection.rangeCount > 0) {
                    let range = selection.getRangeAt(0);
                    let selectedText = range.toString().trim();

                    if (selectedText.length > 0) {
                        let titleElement = document.createElement('span');
						titleElement.setAttribute('class', 'section-title')
						titleElement.setAttribute('style', 'color:#7A12ED; font-family: EBGaramond-ExtraBold;')
                        titleElement.textContent = selectedText;

                        range.deleteContents();
                        range.insertNode(titleElement);

                        // Deselect the text after wrapping
                        //selection.removeAllRanges(right);

						// Check if the span is empty (no text content and no child nodes)
						let empty_spans = document.querySelectorAll('span');
						empty_spans.forEach(function(empty_span) {
							if (empty_span.textContent.trim() === '' && empty_span.childNodes.length === 0) {
								empty_span.remove();
							}
						});
						
                    }
                }
            }
		});
});

//==================================================================
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.show-class-button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const values = Array.from(buttons).map(btn => btn.textContent);
            buttons.forEach(btn => btn.remove());
            const select = document.createElement('select');
            values.forEach(value => {
                const option = document.createElement('option');
                option.textContent = value;
                option.value = value;
                select.appendChild(option);
            });

            select.addEventListener('change', () => {
                const selectedValue = select.value;
                select.remove();

                const newButton = document.createElement('button');
                newButton.className = 'show-class-button';
                newButton.textContent = selectedValue;
                document.body.appendChild(newButton);

                newButton.addEventListener('click', () => {
                    const allButtons = document.querySelectorAll('.show-class-button');
                    const values = Array.from(allButtons).map(btn => btn.textContent);
                    
                    allButtons.forEach(btn => btn.remove());

                    const newSelect = document.createElement('select');
                    values.forEach(value => {
                        const option = document.createElement('option');
                        option.textContent = value;
                        option.value = value;
                        newSelect.appendChild(option);
                    });

                    newSelect.addEventListener('change', () => {
                        const newSelectedValue = newSelect.value;
                        newSelect.remove();

                        const newButton = document.createElement('button');
                        newButton.className = 'show-class-button';
                        newButton.textContent = newSelectedValue;
                        document.body.appendChild(newButton);
                    });

                    document.body.appendChild(newSelect);
                });
            });

            document.body.appendChild(select);
        });
    });
});

//==================================================================
document.addEventListener('DOMContentLoaded', function() {
  loadParaStyles();
});

let xmlValues = [];

function loadParaStyles() {
  fetch('https://raw.githubusercontent.com/Nagaraj-P-GDR/Test_XML/main/parastyles.xml')
    .then(response => response.text())
    .then(data => {
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(data, 'text/xml');
      let stElements = xmlDoc.getElementsByTagName('style');
      xmlValues = Array.from(stElements).map(el => el.textContent);
    })
    .catch(error => console.error('Error loading XML:', error));
}

function handleButtonClick(button) {
  // Collect button id and position
  var buttonId = button.id;
  var buttonPosition = Array.prototype.indexOf.call(button.parentNode.children, button);

  // Replace the clicked button with a <select> element
  var select = document.createElement('select');
  select.id = buttonId;
  select.setAttribute('class', 'selectstyle');
  select.setAttribute('contenteditable', 'false');
  select.onchange = handleSelectChange;

  xmlValues.forEach(value => {
    var option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });

  button.parentNode.replaceChild(select, button);
}

function handleSelectChange(event) {
  // Get selected value
  var selectedValue = event.target.value;
  var selectId = event.target.id;


  // Create a new button with the selected value as its id and text
  var newButton = document.createElement('button');
  newButton.id = selectId;
  newButton.classList = ['show-class-button'];
  newButton.spellcheck = false;
  newButton.contentEditable = false;
  newButton.textContent = selectedValue;
  newButton.onclick = function() { handleButtonClick(newButton) };

  // Replace the <select> element with the new button
  event.target.parentNode.replaceChild(newButton, event.target);

  // Update the parent <div> title and class attributes
  var parentDiv = newButton.parentNode;
  parentDiv.title = selectedValue;
  parentDiv.className = selectedValue;
}
//==================================================================
let actions = [];
let undoneActions = [];

// Function to log actions
function logAction(action) {
  actions.push(action);
  //console.log('Action logged:', action);
}

// Function to reverse actions
function reverseAction(action) {
  const targetElement = document.getElementById(action.id)
  //.getElementById(action.id);
  console.log(action.type);
  switch (action.type) {
    case 'input':
      if (targetElement) {
        targetElement.value = action.oldValue;
      }
      break;
    case 'add':
      if (targetElement) {
        targetElement.
		    targetElement.value = action.oldValue;
      }
      break;

    case 'attribute_change':
      if (targetElement) {
        //targetElement.id = action.id;
        targetElement.title = action.oldValue;
        targetElement.className = action.oldValue;
        if (targetElement.firstElementChild){
        if (targetElement.firstElementChild.tagName === 'BUTTON') {
          targetElement.firstChild.textContent = action.oldValue;
        }
      }
        break;
      }
    case 'remove':
      const parentElement = document.body; // You may need a better way to determine the parent element
      const newElement = document.createElement(action.target);
      newElement.id = action.id;
      newElement.className = action.classList.join(' ');
      parentElement.appendChild(newElement);
      break;
    // For 'click' and 'submit', there's no need to reverse the action
  }
}

// Function to undo the last action
function undoAction() {
  if (actions.length > 0) {
    const lastAction = actions.pop();
    undoneActions.push(lastAction);
    console.log('Action undone:', lastAction);
    reverseAction(lastAction);
  } else {
    console.log('No actions to undo');
  }
}

// Function to redo the last undone action
function redoAction() {
  if (undoneActions.length > 0) {
    const lastUndoneAction = undoneActions.pop();
    actions.push(lastUndoneAction);
    console.log('Action redone:', lastUndoneAction);
    // You can add logic here to reapply the action if needed
  } else {
    console.log('No actions to redo');
  }
}

// Capture clicks on elements
// document.addEventListener('click', function(event) {
  // logAction({
    // type: 'click',
    // target: event.target.tagName,
    // id: event.target.id,
    // classList: [...event.target.classList]
  // });
// });

// Capture input changes
document.addEventListener('input', function(event) {
  logAction({
    type: 'input',
    target: event.target.tagName,
    id: event.target.id,
    classList: [...event.target.classList],
    oldValue: event.target.defaultValue,
    value: event.target.value
  });
});

// Capture form submissions
document.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from actually submitting
  logAction({
    type: 'submit',
    target: event.target.tagName,
    id: event.target.id,
    classList: [...event.target.classList]
  });
});

// Capture changes in the DOM using MutationObserver
let observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          logAction({
            type: 'add',
            target: node.tagName,
            id: node.id,
            classList: [...node.classList]
          });
        }
      });
      mutation.removedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          logAction({
            type: 'remove',
            target: node.tagName,
            id: node.id,
            classList: [...node.classList]
          });
        }
      });
    } else if (mutation.type === 'attributes') {
      logAction({
        type: 'attribute_change',
        target: mutation.target.tagName,
        id: mutation.target.id,
        classList: [...mutation.target.classList],
        attribute: mutation.attributeName,
        oldValue: mutation.oldValue,
        newValue: mutation.target.getAttribute(mutation.attributeName)
      });
    }
  });
});

let config = {
  childList: true,
  attributes: true,
  subtree: true,
  attributeOldValue: true
};

// Start observing the entire document
observer.observe(document, config);

// Log actions array
console.log(actions);

//Don't touch the below code in the JS
document.addEventListener('DOMContentLoaded', () => {
	const resizableHeaders = document.querySelectorAll('th.resizable');
	resizableHeaders.forEach(header => {
		const div = header.querySelector('div');
		div.addEventListener('mousedown', initResize);

		let startX, startWidth;

		function initResize(e) {
			startX = e.clientX;
			startWidth = header.offsetWidth;

			document.documentElement.addEventListener('mousemove', doResize);
			document.documentElement.addEventListener('mouseup', stopResize);
		}

		function doResize(e) {
			header.style.width = startWidth + (e.clientX - startX) + 'px';
		}

		function stopResize() {
			document.documentElement.removeEventListener('mousemove', doResize);
			document.documentElement.removeEventListener('mouseup', stopResize);
		}
	});
});

//================================================================================

document.addEventListener('click', function(event) {
	if (event.target.tagName === 'TD' && event.target.isContentEditable) {
		event.target.classList.toggle('selected');
	}
});

function mergeCellsHorizontally() {
	const selectedCells = Array.from(document.querySelectorAll('td.selected'));
	if (selectedCells.length < 2) {
		alert('Please select at least two cells to merge.');
		return;
	}

	const row = selectedCells[0].parentElement;
	const cellIndices = selectedCells.map(cell => Array.from(row.children).indexOf(cell));

	const isContiguous = cellIndices.every((val, i, arr) => i === 0 || val === arr[i - 1] + 1);
	if (!isContiguous) {
		alert('Selected cells must be contiguous horizontally.');
		return;
	}

	const firstCell = selectedCells[0];
	let totalColspan = 1;
	let content = firstCell.innerHTML;

	selectedCells.forEach((cell, index) => {
		if (index !== 0) {
			totalColspan += cell.colSpan || 1;
			content += '<br/>' + cell.innerHTML;
			cell.remove();
		}
	});

	if (firstCell.colSpan) {
		firstCell.colSpan += totalColspan - 1;
	} else {
		firstCell.colSpan = totalColspan;
	}
	firstCell.innerHTML = content;
	firstCell.classList.remove('selected');
}

function mergeCellsVertically() {
	const selectedCells = Array.from(document.querySelectorAll('td.selected'));
	if (selectedCells.length < 2) {
		alert('Please select at least two cells to merge.');
		return;
	}

	const cellIndex = Array.from(selectedCells[0].parentElement.children).indexOf(selectedCells[0]);
	const rowIndices = selectedCells.map(cell => cell.parentElement.rowIndex);

	const isContiguous = rowIndices.every((val, i, arr) => i === 0 || val === arr[i - 1] + 1);
	if (!isContiguous || selectedCells.some(cell => Array.from(cell.parentElement.children).indexOf(cell) !== cellIndex)) {
		alert('Selected cells must be contiguous vertically in the same column.');
		return;
	}

	const firstCell = selectedCells[0];
	let totalRowspan = 1;
	let content = firstCell.innerHTML;

	selectedCells.forEach((cell, index) => {
		if (index !== 0) {
			totalRowspan += cell.rowSpan || 1;
			content += '<br/>' + cell.innerHTML;
			cell.remove();
		}
	});

	if (firstCell.rowSpan) {
		firstCell.rowSpan += totalRowspan - 1;
	} else {
		firstCell.rowSpan = totalRowspan;
	}
	firstCell.innerHTML = content;
	firstCell.classList.remove('selected');
}

function splitCells() {
	const selectedCells = document.querySelectorAll('td.selected');
	if (selectedCells.length !== 1) {
		alert('Please select exactly one cell to split.');
		return;
	}

	const cell = selectedCells[0];
	const contentParts = cell.innerHTML.split('<br>');
	const row = cell.parentElement;
	const cellIndex = Array.prototype.indexOf.call(row.children, cell);

	// Handle horizontal split
	if (cell.colSpan > 1) {
		cell.colSpan = 1;
		cell.innerHTML = contentParts[0];
		for (let i = 1; i < contentParts.length; i++) {
			const newCell = document.createElement('td');
			newCell.contentEditable = 'true';
			newCell.className = 'editable';
			newCell.innerHTML = contentParts[i];
			row.insertBefore(newCell, row.children[cellIndex + i]);
		}
	} else if (cell.rowSpan > 1) {
		// Handle vertical split
		const initialRowSpan = cell.rowSpan;
		cell.rowSpan = 1;
		cell.innerHTML = contentParts[0];
		let currentRow = row;
		for (let i = 1; i < contentParts.length; i++) {
			currentRow = currentRow.nextElementSibling;
			const newCell = document.createElement('td');
			newCell.contentEditable = 'true';
			newCell.className = 'editable';
			newCell.innerHTML = contentParts[i];
			currentRow.insertBefore(newCell, currentRow.children[cellIndex]);
		}
		for (let i = contentParts.length; i < initialRowSpan; i++) {
			currentRow = currentRow.nextElementSibling;
			const newCell = document.createElement('td');
			newCell.contentEditable = 'true';
			newCell.className = 'editable';
			newCell.innerHTML = '';
			currentRow.insertBefore(newCell, currentRow.children[cellIndex]);
		}
	} else {
		alert('The selected cell does not contain any <br/> tags to split.');
	}
	cell.classList.remove('selected');
}
//================================================================================
document.addEventListener('DOMContentLoaded', () => {
    //const content = document.getElementById('content');
    const dropdown = document.getElementById('dropdown');
    const styleSelect = document.getElementById('charastyles');
    let selectedText = '';

    document.addEventListener('keydown', (event) => {
        if (event.altKey && event.key === 'e') {
            event.preventDefault();
            selectedText = window.getSelection().toString();
            if (selectedText) {
                loadCharacterStyle();
            }
        }
    });

    styleSelect.addEventListener('change', () => {
        const selectedValue = styleSelect.value;
        if (selectedValue && selectedText) {
            replaceSelectedText(selectedValue);
            dropdown.style.display = 'none';
        }
    });

    function loadCharacterStyle() {
      fetch('https://raw.githubusercontent.com/Nagaraj-P-GDR/Test_XML/main/charstyles.xml')
        .then(response => response.text())
        .then(data => {
          let parser = new DOMParser();
          let xmlDoc = parser.parseFromString(data, 'text/xml');
          let stElements = xmlDoc.getElementsByTagName('style');
          xmlValues = Array.from(stElements).map(el => el.textContent);
          populateDropdown(xmlValues);
          showDropdown();
        })
        .catch(error => console.error('Error loading XML:', error));
    }

    // function loadXMLStyles() {
    //     const xhr = new XMLHttpRequest();
    //     xhr.open('GET', 'https://raw.githubusercontent.com/Nagaraj-P-GDR/Test_XML/main/charstyles.xml', true);
    //     xhr.onload = function () {
    //         if (xhr.status === 200) {
    //           populateDropdown(xhr.response);
    //           showDropdown();
    //         }
    //     };
    //     xhr.send();
    // }

    function populateDropdown(xml) {
        //const styles = xml.getElementsByTagName('style');
        styleSelect.innerHTML = '';
        for (let i = 0; i < xml.length; i++) {
            const option = document.createElement('option');
            option.value = xml[i];
            option.textContent = xml[i];
            styleSelect.appendChild(option);
        }
    }

    function showDropdown() {
        const rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
        dropdown.style.top = `${rect.bottom + window.scrollY}px`;
        dropdown.style.left = `${rect.left + window.scrollX}px`;
        dropdown.style.display = 'none';
        styleSelect.focus();
    }

    function replaceSelectedText(className) {
        const range = window.getSelection().getRangeAt(0);
        const span = document.createElement('span');
        span.className = className;
        span.textContent = selectedText;
        range.deleteContents();
        range.insertNode(span);
    }
});