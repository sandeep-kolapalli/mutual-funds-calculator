const axios = require('axios')
const moment = require('moment')
const _ = require('lodash')

getTrailingReturns = (req, res) => {
  const horizonYears = parseInt(req.params.horizon)
  const horizonMonths = 12 * horizonYears
  const periodOfInvestment = parseInt(req.params.periodOfInvestment)
  const schemeNumber = parseInt(req.params.schemeNumber)

  if (periodOfInvestment > horizonYears) {
    res.status(400).json({ errorMessage: `Period of Investment (${periodOfInvestment}yrs) can't be more than the horizon (${horizonYears}yrs)` })
  } else {
    axios.get(`https://api.mfapi.in/mf/${schemeNumber}`)
      .then(response => {
        try {
          const schemeDetails = response.data.data

          if (response.data.status !== 'SUCCESS' || schemeDetails.length === 0) {
            res.status(400).json({ status: 'FAIL', errorMessage: `Unable to fetch details for the scheme number ${schemeNumber}` })
          } else {
            const negateHorizon = moment(new Date()).subtract(horizonYears, 'years')
            const lastAvailableNavForScheme = moment(new Date(schemeDetails[schemeDetails.length - 1].date))
            if (lastAvailableNavForScheme.diff(negateHorizon) > 0) {
              res.status(400).json({ status: 'FAIL', errorMessage: 'Requested horizon period is more than the available NAV period of the scheme. Please try requesting for a shorter period' })
            } else {
              const calculatedReturns = calculateReturns(schemeDetails, horizonMonths, periodOfInvestment)
              res.status(200).json({ status: 'SUCCESS', schemeName: response.data.meta.scheme_name, calculatedReturns })
            }
          }
        } catch (ex) {
          res.status(500).json({ status: 'SUCCESS', errorMessage: ex.message })
        }
      })
      .catch(error => {
        console.error(error)
        res.status(400).json({ status: 'FAIL', errorMessage: `Unable to fetch details for the scheme number ${schemeNumber}` })
      })
  }
}

calculateReturns = (schemeDetails, horizonMonths, periodOfInvestment) => {
  try {
    // You can start calculating the returns from a date for which the NAV is available beyond POI years
    const minNavStartDate = moment(new Date(schemeDetails[schemeDetails.length - 1]))
    const minNavEndDate = minNavStartDate.add(periodOfInvestment, 'years')
    const calculatedReturns = []
    for (let count = 0; count < horizonMonths; count++) {
      // Calculate End Nav
      let endNavDate = moment(new Date()).subtract(count, 'months')
      const endNavDateDisplay = endNavDate.format('DD-MMM-YY')
      const navMonth = endNavDate.format('MMM-YY')

      let lastFoundDateIndex = _.findIndex(schemeDetails, { date: endNavDateDisplay })
      while (
        lastFoundDateIndex === -1
      ) {
        if (endNavDate.diff(minNavEndDate) <= 0) {
          throw `Could not find an end NAV value for the month ${navMonth}. Please try shortening your search period`
        }

        endNavDate = endNavDate.subtract(1, 'days')
        lastFoundDateIndex = _.findIndex(schemeDetails, { date: endNavDate.format('DD-MM-YYYY') })
      }

      const endNavValue = schemeDetails[lastFoundDateIndex].nav

      // Calculate Start Nav
      let startNavDate = moment(new Date()).subtract(count, 'months').subtract(periodOfInvestment, 'years')
      const startNavDateDisplay = startNavDate.format('DD-MMM-YY')

      lastFoundDateIndex = _.findIndex(schemeDetails, { date: startNavDateDisplay })
      while (
        lastFoundDateIndex === -1
      ) {
        if (startNavDate.diff(minNavStartDate) <= 0) {
          throw `Could not find a start NAV value for the month ${navMonth}. Please try shortening your search period`
        }

        startNavDate = startNavDate.add(1, 'days')
        lastFoundDateIndex = _.findIndex(schemeDetails, { date: startNavDate.format('DD-MM-YYYY') })
      }

      const startNavValue = schemeDetails[lastFoundDateIndex].nav

      // Calculate Returns
      const returns = ((Math.pow(endNavValue / startNavValue, 1 / periodOfInvestment) - 1) * 100).toFixed(2)

      calculatedReturns.push({
        month: navMonth,
        startNav: startNavDate.format('DD-MM-YY'),
        endNav: endNavDate.format('DD-MM-YY'),
        returns: `${returns}%`
      })
    }

    return _.reverse(calculatedReturns)
  } catch (ex) {
    throw ex
  }
}

module.exports = { getTrailingReturns }
