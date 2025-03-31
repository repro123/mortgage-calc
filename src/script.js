"use strict";

// selecting form
const form = document.querySelector("form");

// select all inputs
const mortageAmountInput = document.querySelector("mortageAmount");
const mortageTermYearsInput = document.querySelector("mortageTerm");
const interestRateInput = document.querySelector("interestRate");
const repaymentInput = document.querySelector("repayment");
const interestOnlyInput = document.querySelector("interestOnly");

// select spans that will have red background if there is error
const poundsSignErrorSpan = document.querySelector("#poundsSignError");
const yearsErrorSpan = document.querySelector("#yearsError");
const percentageErrorSpan = document.querySelector("#percentageError");

// select all paragraphs that turn red on error
const amountParagraphRequiredError = document.querySelector(
  "amountParagraphError"
);
const termParagraphRequiredError = document.querySelector("termParagraphError");
const interestParagraphRequiredError = document.querySelector(
  "interestParagraphError"
);
const mortgageTypeRequiredError = document.querySelector("mortgageTypeError");

// select calculate and clear buttons
const clearAllBtn = document.querySelector("#clearAll");
const calculateRepaymentsBtn = document.querySelector("#calculateRepayments");

// select empty results and result content divs
const emptyResultsDiv = document.querySelector("#emptyResults");
const resultsShownDiv = document.querySelector("#resultsShown");

form.addEventListener("submit", function (ev) {
  ev.preventDefault();
});

clearAllBtn.addEventListener("click", function () {
  form.reset();
});

function validateform() {
  let isValid = true;

  //   validate mortgage amount input
  if (!mortageAmountInput.value) {
    amountParagraphRequiredError.classList.remove("hidden");
    poundsSignErrorSpan.classList.remove("bg-secondary-slate-100");
    poundsSignErrorSpan.classList.add("error");
    isValid = false;
  } else if (Number(mortageAmountInput.value) <= 0) {
    amountParagraphRequiredError.classList.remove("hidden");
    amountParagraphRequiredError.textContent = "Should be above zero";
    poundsSignErrorSpan.classList.remove("bg-secondary-slate-100");
    poundsSignErrorSpan.classList.add("error");
    isValid = false;
  }

  //    validate mortgage term input
  if (!mortageTermYearsInput.value) {
    termParagraphRequiredError.classList.remove("hidden");
    yearsErrorSpan.classList.remove("bg-secondary-slate-100");
    yearsErrorSpan.classList.add("error");
    isValid = false;
  } else if (Number(mortageTermYearsInput.value) <= 0) {
    termParagraphRequiredError.classList.remove("hidden");
    termParagraphRequiredError.textContent = "Should be above zero";
    yearsErrorSpan.classList.remove("bg-secondary-slate-100");
    yearsErrorSpan.classList.add("error");
    isValid = false;
  }

  //   validate interest rate input
  if (!interestRateInput.value) {
    interestParagraphRequiredError.classList.remove("hidden");
    percentageErrorSpan.classList.remove("bg-secondary-slate-100");
    percentageErrorSpan.classList.add("error");
    isValid = false;
  } else if (Number(interestRateInput.value) <= 0) {
    interestParagraphRequiredError.classList.remove("hidden");
    interestParagraphRequiredError.textContent = "Should be above zero";
    percentageErrorSpan.classList.remove("bg-secondary-slate-100");
    percentageErrorSpan.classList.add("error");
    isValid = false;
  }

  //   validate radio inputs
  if (!repaymentInput.checked && !interestOnlyInput.checked) {
    mortgageTypeRequiredError.classList.remove("hidden");
  }

  return isValid;
}
