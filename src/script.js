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

// select empty results and result content divs
const emptyResultsDiv = document.querySelector("#emptyResults");
const resultsShownDiv = document.querySelector("#resultsShown");

// calculate mortgage
function calculateMortgage() {}

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
    isValid = true;
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
  } else {
    handleValidInput(termParagraphRequiredError, yearsErrorSpan, "");
    isValid = true;
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
  } else {
    handleValidInput(interestParagraphRequiredError, percentageErrorSpan, "");
    isValid = true;
  }

  //   validate radio inputs
  if (!repaymentInput.checked && !interestOnlyInput.checked) {
    mortgageTypeRequiredError.classList.remove("hidden");
    isValid = false;
  } else {
    mortgageTypeRequiredError.classList.add("hidden");
    isValid = true;
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
  validateform();
});

// clear all form field
clearAllBtn.addEventListener("click", function () {
  form.reset();
  handleValidInput(amountParagraphRequiredError, poundsSignErrorSpan, "");
  handleValidInput(termParagraphRequiredError, yearsErrorSpan, "");
  handleValidInput(interestParagraphRequiredError, percentageErrorSpan, "");
  mortgageTypeRequiredError.classList.add("hidden");
});
