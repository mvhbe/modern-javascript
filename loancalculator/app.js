loanForm = document.getElementById('loan-form');

loanForm.addEventListener('submit', calculateLoan);

function calculateLoan(event) {
    console.log('calculating loan ...');
    hideResults();
    showLoading();
    setTimeout(calculateLoanResults, 2000);
    event.preventDefault();
}

function hideResults() {
    console.log('hiding results ...');
    document.querySelector('#results').style.display = 'none';
}

function showLoading() {
    console.log('showing loader  ...');
    document.querySelector('#loading').style.display = 'block';
}

function calculateLoanResults() {
    console.log('calculating results ...');
    const amount = document.querySelector('#amount').value;
    const interest = document.querySelector('#interest').value;
    const years = document.querySelector('#years').value;
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    const principal = parseFloat(amount);
    const calculatedInterest = parseFloat(interest) / 100 / 12;
    const calculatedPayments = parseFloat(years) * 12;
    const factor = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthlyAmount = (principal * factor * calculatedInterest) / (factor - 1);

    if(isFinite(monthlyAmount)) {
        monthlyPayment.value = monthlyAmount.toFixed(2);
        totalPayment.value = (monthlyAmount * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthlyAmount * calculatedPayments) - principal).toFixed(2);
        hideLoading();
        showResults();
    } else {
        hideLoading();
        showError('Check your numbers!');
    }
}

function showError(errorMessage) {
    console.log('showing error message ...');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(errorMessage));

    const card = document.querySelector('.card');
    const loanForm = document.querySelector('#loan-form');

    card.insertBefore(errorDiv, loanForm);
    setTimeout(removeErrorMessage, 3000);
}

function removeErrorMessage() {
    console.log('removing error message ...');
    document.querySelector('.alert').remove();
}

function hideLoading() {
    console.log('hiding loader ...');
    document.querySelector('#loading').style.display = 'none'
}

function showResults() {
    console.log('showing results ...');
    document.querySelector('#results').style.display = 'block';
}
