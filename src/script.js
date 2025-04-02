"use strict";

// selecting form
const form = document.querySelector("form");

// select all inputs
const mortageAmountInput = document.querySelector("#mortageAmount");
const mortageTermYearsInput = document.querySelector("#mortageTerm");
const interestRateInput = document.querySelector("#interestRate");
const repaymentInput = document.querySelector("#repayment");
const interestOnlyInput = document.querySelector("#interestOnly");

// select spans that will have red background if there is error
const poundsSignErrorSpan = document.querySelector("#poundsSignError");
const yearsErrorSpan = document.querySelector("#yearsError");
const percentageErrorSpan = document.querySelector("#percentageError");

// select all paragraphs that turn red on error
const amountParagraphRequiredError = document.querySelector(
  "#amountParagraphError"
);
const termParagraphRequiredError = document.querySelector(
  "#termParagraphError"
);
const interestParagraphRequiredError = document.querySelector(
  "#interestParagraphError"
);
const mortgageTypeRequiredError = document.querySelector("#mortgageTypeError");

// select calculate and clear buttons
const clearAllBtn = document.querySelector("#clearAll");
const calculateRepaymentsBtn = document.querySelector("#calculateRepayments");

// select result spans
const monthlyRepaymentsSpan = document.querySelector("#monthlyRepayments");
const totalRepaymentSpan = document.querySelector("#totalRepayments");

// select empty results and result content divs
const emptyResultsDiv = document.querySelector("#emptyResults");
const resultsShownDiv = document.querySelector("#resultsShown");

// calculate mortgage
function calculateMortgage() {
  if (!validateform()) return;

  //   get values from inputs
  const principalMortgageAmount = Number(mortageAmountInput.value);
  const mortgageTermYears = Number(mortageTermYearsInput.value);
  const interestRate = Number(interestRateInput.value);

  //  calculate monthly interest rate
  const monthlyInterestRate = interestRate / 100 / 12;

  //   calculate number of monthly payments
  const numberOfMonthlyPayments = mortgageTermYears * 12;

  monthlyRepaymentsSpan.textContent = 0;
  totalRepaymentSpan.textContent = 0;

  //   show results div and hide empty results div
  emptyResultsDiv.classList.add("hidden");
  emptyResultsDiv.classList.remove("flex");
  resultsShownDiv.classList.remove("hidden");
  resultsShownDiv.classList.add("flex");

  if (repaymentInput.checked) {
    // monthly repayments = P * [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]  - p = principal mortgage amount, r = monthly interest rate, n = number of monthly payments
    // total repayment = monthly repayments * number of monthly payments
    const exponentialCompound =
      (1 + monthlyInterestRate) ** numberOfMonthlyPayments;
    const monthlyRepayments =
      (principalMortgageAmount * (monthlyInterestRate * exponentialCompound)) /
      (exponentialCompound - 1);
    const totalRepayment = monthlyRepayments * numberOfMonthlyPayments;
    monthlyRepaymentsSpan.textContent = monthlyRepayments.toFixed(2);
    totalRepaymentSpan.textContent = totalRepayment.toFixed(2);
  }

  if (interestOnlyInput.checked) {
    // monthly payments = principal mortgage amount * monthly interest rate ---  (P * r)
    // total repayment = Total = (P * r * n) + P
    const monthlyRepayments = principalMortgageAmount * monthlyInterestRate;
    const totalRepayment =
      principalMortgageAmount * monthlyInterestRate * numberOfMonthlyPayments +
      principalMortgageAmount;
    monthlyRepaymentsSpan.textContent = monthlyRepayments.toFixed(2);
    totalRepaymentSpan.textContent = totalRepayment.toFixed(2);
  }
}

// function to validate form and its inputs
function validateform() {
  let isValid = true;

  //   validate mortgage amount input
  if (!mortageAmountInput.value) {
    handleInvalidInput(
      amountParagraphRequiredError,
      poundsSignErrorSpan,
      "This field is required"
    );
    isValid = false;
  } else if (Number(mortageAmountInput.value) <= 0) {
    handleInvalidInput(
      amountParagraphRequiredError,
      poundsSignErrorSpan,
      "Should be above zero"
    );
    isValid = false;
  } else {
    handleValidInput(amountParagraphRequiredError, poundsSignErrorSpan, "");
  }

  //    validate mortgage term input
  if (!mortageTermYearsInput.value) {
    handleInvalidInput(
      termParagraphRequiredError,
      yearsErrorSpan,
      "This field is required"
    );
    isValid = false;
  } else if (Number(mortageTermYearsInput.value) <= 0) {
    handleInvalidInput(
      termParagraphRequiredError,
      yearsErrorSpan,
      "Should be above zero"
    );
    isValid = false;
  } else if (Number(mortageTermYearsInput.value) > 100) {
    handleInvalidInput(
      termParagraphRequiredError,
      yearsErrorSpan,
      "Can't be above 100 years"
    );
    isValid = false;
  } else {
    handleValidInput(termParagraphRequiredError, yearsErrorSpan, "");
  }

  //   validate interest rate input
  if (!interestRateInput.value) {
    handleInvalidInput(
      interestParagraphRequiredError,
      percentageErrorSpan,
      "This field is required"
    );
    isValid = false;
  } else if (Number(interestRateInput.value) <= 0) {
    handleInvalidInput(
      interestParagraphRequiredError,
      percentageErrorSpan,
      "Should be above zero"
    );
    isValid = false;
  } else if (Number(interestRateInput.value) >= 51) {
    handleInvalidInput(
      interestParagraphRequiredError,
      percentageErrorSpan,
      "Can't be above 50%"
    );
    isValid = false;
  } else {
    handleValidInput(interestParagraphRequiredError, percentageErrorSpan, "");
  }

  //   validate radio inputs
  if (!repaymentInput.checked && !interestOnlyInput.checked) {
    mortgageTypeRequiredError.classList.remove("hidden");
    isValid = false;
  } else {
    mortgageTypeRequiredError.classList.add("hidden");
  }

  return isValid;
}

// function for to make invalid inuts code DRY
function handleInvalidInput(errorParagraph, errorSpan, message) {
  errorParagraph.classList.remove("hidden");
  errorParagraph.textContent = message;
  errorSpan.classList.remove("bg-secondary-slate-100");
  errorSpan.classList.add("error");
}

// function for to make valid inuts code DRY
function handleValidInput(errorParagraph, errorSpan, message) {
  errorParagraph.classList.add("hidden");
  errorParagraph.textContent = message;
  errorSpan.classList.add("bg-secondary-slate-100");
  errorSpan.classList.remove("error");
}

// add event listener to form and calculate mortage
form.addEventListener("submit", function (ev) {
  ev.preventDefault();
  calculateMortgage();
});

// clear all form field
clearAllBtn.addEventListener("click", function () {
  form.reset();
  handleValidInput(amountParagraphRequiredError, poundsSignErrorSpan, "");
  handleValidInput(termParagraphRequiredError, yearsErrorSpan, "");
  handleValidInput(interestParagraphRequiredError, percentageErrorSpan, "");
  mortgageTypeRequiredError.classList.add("hidden");
  emptyResultsDiv.classList.add("flex");
  emptyResultsDiv.classList.remove("hidden");
  resultsShownDiv.classList.remove("flex");
  resultsShownDiv.classList.add("hidden");
});
