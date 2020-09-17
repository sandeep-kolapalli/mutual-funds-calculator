const { Router } = require('express')
const { inputValidationRules, validate } = require('./validation')
const controller = require('./controllers/mutual-fund-calculator')

module.exports = () => Router({ mergeParams: true })
  .get(
    '/api/getTrailingReturns/:schemeNumber/:horizon/:periodOfInvestment',
    inputValidationRules(),
    validate,
    controller.getTrailingReturns
  )
