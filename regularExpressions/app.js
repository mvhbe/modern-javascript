const
    name = document.querySelector('#name'),
    zipCode = document.querySelector('#zipcode'),
    email = document.querySelector('#email'),
    phoneNumber = document.querySelector('#phone-number');

function showError(input) {
    console.log(`>>> showError()`);
    console.log(`input = ${name}`);
    input.classList.add('is-invalid');
}

function validate(searchFor, searchIn) {
    console.log(`>>> validate(${searchFor}, ${searchIn})`);
    console.log(`valid : ${searchFor.test(searchIn)}`);
    return searchFor.test(searchIn);
}

function invalidName() {
    console.log(`>>> invalidName()`);
    return ! validate(/^[a-zA-Z]{2,10}$/, name.value);
}

function hideError(input) {
    console.log(`>>> hideError()`);
    console.log(`input = ${name}`);
    input.classList.remove('is-invalid');
}

function validateName() {
    console.log(`>>> validateName()`);
    hideError(name);
    if (invalidName()) {
        showError(name);
    }
}

name.addEventListener('blur', validateName);

function invalidZipCode() {
    console.log(`>>> invalidZipCode()`);
    return ! validate(/^\d{4}$/, zipCode.value);
}

function validateZipCode() {
    console.log(`>>> validateZipCode()`);
    hideError(zipCode);
    if (invalidZipCode()) {
        showError(zipCode);
    }
}

zipCode.addEventListener('blur', validateZipCode);

function invalidEmail() {
    console.log(`>>> invalidEmail()`);
    return ! validate(/^([a-zA-Z0-9_.]+)@([a-zA-Z0-9_.]+)\.([a-zA-Z]{2,5})$/, email.value);
}

function validateEmail() {
    console.log(`>>> validateEmail()`);
    hideError(email);
    if (invalidEmail()) {
        showError(email);
    }
}

email.addEventListener('blur', validateEmail);

function invalidPhoneNumber() {
    console.log(`>>> invalidPhoneNumber()`);
    return ! validate(/^\+\d{2}\s\d{3}\s\d{2}\s\d{2}\s\d{2}$/, phoneNumber.value);
}

function validatePhoneNumber() {
    console.log(`>>> validatePhoneNumber()`);
    hideError(phoneNumber);
    if (invalidPhoneNumber()) {
        showError(phoneNumber);
    }
}

phoneNumber.addEventListener('blur', validatePhoneNumber);
