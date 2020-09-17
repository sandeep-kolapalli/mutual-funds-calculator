const axios = require('axios')

const getTrailingReturns = (schemeNumber, horizon, periodOfInterest) => {
  const url = `http://${window.location.host}/api/getTrailingReturns/${schemeNumber}/${horizon}/${periodOfInterest}`
  return axios.get(url, { timeout: 500000 })
    .then(response => {
      return response.data
    })
    .catch(err => {
      return err.response.data
    })
}

module.exports = { getTrailingReturns }
