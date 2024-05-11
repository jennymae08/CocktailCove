function edit(fieldId) {
    var field = document.getElementById(fieldId);
    var currentValue = field.innerText.trim();

    var inputField = document.createElement('input');
    inputField.setAttribute('type', 'text');
    inputField.setAttribute('value', currentValue);
    inputField.classList.add('input-edit'); // Add the 'input-edit' class

    // Replace span with input field
    field.parentNode.replaceChild(inputField, field);

    // Focus on the input field
    inputField.focus();

    // Add event listener to save changes when pressing Enter key
    inputField.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            field.innerText = inputField.value;
            inputField.parentNode.replaceChild(field, inputField);
        }
    });

    // Add event listener to save changes when clicking outside the input field
    inputField.addEventListener('blur', function () {
        field.innerText = inputField.value;
        inputField.parentNode.replaceChild(field, inputField);
    });
  }