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
