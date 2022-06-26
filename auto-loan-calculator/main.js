// define web elements
const amountToBorrowElem = document.getElementById('amountToBorrow'),
    amountToBorrowRangeElem = document.getElementById('amountToBorrowRange'),
    downPaymentElem = document.getElementById('downPayment'),
    downPaymentRangeElem = document.getElementById('downPaymentRange'),
    lengthOfLoanElem = document.getElementById('lengthOfLoan'),
    interestRateElem = document.getElementById('interestRate'),
    resultsMonthlyPaymentElem = document.getElementById('resultsMonthlyPayment'),
    restultsTotalLoanAmountElem = document.getElementById('restultsTotalLoanAmount'),
    restultsTotalInterestPaidElem = document.getElementById('restultsTotalInterestPaid');

// init numbers
const INITIAL_AMOUNT_TO_BORROW = 25000,
    INITIAL_DOWN_PAYMENT = 0,
    INITIAL_LENGTH_OF_LOAN = 60,
    INITIAL_INTEREST_RATE = 4.19;
let futureValue = 0;

// set init values
amountToBorrowElem.value = INITIAL_AMOUNT_TO_BORROW.toLocaleString();
amountToBorrowRangeElem.value = INITIAL_AMOUNT_TO_BORROW;
downPaymentElem.value = INITIAL_DOWN_PAYMENT.toLocaleString();
downPaymentRangeElem.value = INITIAL_DOWN_PAYMENT;
lengthOfLoanElem.value = INITIAL_LENGTH_OF_LOAN;
interestRateElem.value = INITIAL_INTEREST_RATE;
resultsMonthlyPaymentElem.innerHTML = 0;
restultsTotalLoanAmountElem.innerHTML = 0;
restultsTotalInterestPaidElem.innerHTML = 0;

// Functions
// amt = initial borrowed amount less down payment, fv = future value, i = interest, n = length or number of payments
function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

function payment(amt, fv, i, n) {
    const interest = (i / 100) / 12;
  return roundToTwo((amt - fv) * (interest) / (1 - (Math.pow(1 + interest, - n))));
}


function onCalculatePayment(amt, fv, i, n) {
    const paymentAmt = payment(amt, fv, i, n),
        totalInterestPaid = roundToTwo((paymentAmt * n) - amt);
    updateDisplay(paymentAmt, amt, totalInterestPaid);
}

function updateDisplay(monthlyPayment, loanAmount, interestPaid) {
    resultsMonthlyPaymentElem.innerHTML = monthlyPayment > 0 ? '$' + monthlyPayment.toLocaleString() : '$' + 0;
    restultsTotalLoanAmountElem.innerHTML = loanAmount > 0 ? '$' + loanAmount.toLocaleString() : '$' + 0;
    restultsTotalInterestPaidElem.innerHTML = interestPaid > 0 ? '$' + interestPaid.toLocaleString() : '$' + 0;
}

function init() {
    // resultsMonthlyPaymentElem.innerHTML = '$' + roundToTwo(payment(INITIAL_AMOUNT_TO_BORROW, 0, INITIAL_INTEREST_RATE, INITIAL_LENGTH_OF_LOAN));
    onCalculatePayment(parseInt(amountToBorrowElem.value.replace(',', '')) - parseInt(downPaymentElem.value.replace(',', '')), futureValue, interestRateElem.value, lengthOfLoanElem.value);
    // console.log(payment(INITIAL_AMOUNT_TO_BORROW, 0, INITIAL_INTEREST_RATE, INITIAL_LENGTH_OF_LOAN));
}

function updateAmountBorrowValue(e) {
    let val = parseInt(e.target.value.replace(',', ''));
    amountToBorrowRangeElem.value = val;
    e.target.value = val.toLocaleString();
    onCalculatePayment(parseInt(amountToBorrowElem.value.replace(',', '')) - parseInt(downPaymentElem.value.replace(',', '')), futureValue, interestRateElem.value, lengthOfLoanElem.value);
  }

function updateAmountBorrowRangeValue(e) {
    let val = parseInt(e.target.value.replace(',', ''));
    amountToBorrowElem.value = val.toLocaleString();
    onCalculatePayment(parseInt(amountToBorrowElem.value.replace(',', '')) - parseInt(downPaymentElem.value.replace(',', '')), futureValue, interestRateElem.value, lengthOfLoanElem.value);
}

function updateDownPaymentValue(e) {
    let val = parseInt(e.target.value.replace(',', ''));
    downPaymentRangeElem.value = val;
    e.target.value = val.toLocaleString();
    onCalculatePayment(parseInt(amountToBorrowElem.value.replace(',', '')) - parseInt(downPaymentElem.value.replace(',', '')), futureValue, interestRateElem.value, lengthOfLoanElem.value);
  }

function updateDownPaymentRangeValue(e) {
    let val = parseInt(e.target.value.replace(',', ''));
    downPaymentElem.value = val.toLocaleString();
    onCalculatePayment(parseInt(amountToBorrowElem.value.replace(',', '')) - parseInt(downPaymentElem.value.replace(',', '')), futureValue, interestRateElem.value, lengthOfLoanElem.value);
}

function updateLengthOfLoanRangeValue(e) {
    onCalculatePayment(parseInt(amountToBorrowElem.value.replace(',', '')) - parseInt(downPaymentElem.value.replace(',', '')), futureValue, interestRateElem.value, lengthOfLoanElem.value);
}

function updateInterestRateValue(e) {
    onCalculatePayment(parseInt(amountToBorrowElem.value.replace(',', '')) - parseInt(downPaymentElem.value.replace(',', '')), futureValue, interestRateElem.value, lengthOfLoanElem.value);
}

// Event listeners
amountToBorrowElem.addEventListener('blur', updateAmountBorrowValue);
amountToBorrowRangeElem.addEventListener('input', updateAmountBorrowRangeValue);
downPaymentElem.addEventListener('blur', updateDownPaymentValue);
downPaymentRangeElem.addEventListener('input', updateDownPaymentRangeValue);
lengthOfLoanElem.addEventListener('click', updateLengthOfLoanRangeValue);
interestRateElem.addEventListener('input', updateInterestRateValue);

// Init
init();