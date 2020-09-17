const { check, validationResult } = require('express-validator')

inputValidationRules = () => {
  return [
    check('schemeNumber').isInt({ min: 1 }).withMessage('Scheme Number must be an Integer'),
    check('horizon').isInt({ min: 1 }).withMessage('Horizon must be an Integer with minimum period of 1 year'),
    check('periodOfInvestment').isInt({ min: 1 }).withMessage('Period Of Investment must be an Integer with minimum period of 1 year')
  ]
}

validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ status: 'FAIL', errors: errors.array().map(x => x.msg) })
  } else {
    next()
  }
}

module.exports = { inputValidationRules, validate }
