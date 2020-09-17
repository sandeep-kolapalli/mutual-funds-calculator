import React, { Component } from 'react'
import './styles.css'
import '../../../node_modules/react-notifications-component/dist/theme.css'
import { getTrailingReturns } from '../../services'
import CalculationInputs from '../calculation-inputs'
import CalculationOutputs from '../calculation-outputs'
import { store } from 'react-notifications-component'
import Loader from 'react-loader-spinner'

export default class ReturnsCalculator extends Component {
  constructor(props) {
    super(props)

    this.state = {
      schemeName: '',
      calculatedReturns: [],
      showLoader: false
    }

    this.getTrailingReturns = (schemeNumber, horizon, periodOfInvestment) => {
      this.setState({
        showLoader: true
      }, () => {
        console.log('this.state.showLoader', this.state.showLoader)
        getTrailingReturns(schemeNumber, horizon, periodOfInvestment)
          .then(response => {
            if (response.status === 'SUCCESS') {
              this.setState({
                schemeName: response.schemeName,
                calculatedReturns: response.calculatedReturns,
                showLoader: false
              })
            } else {
              // Fetch failed
              console.log('Failed to fetch returns: ', response.errorMessage)
              this.setState({
                calculatedReturns: [],
                showLoader: false
              })

              if (Object.keys(response).includes('errors')) {
                response.errors.forEach(error => {
                  this.showNotification('danger', error, 5000)
                })
              } else {
                this.showNotification('danger', response.errorMessage, 5000)
              }
            }
          })
      })
    }

    this.showNotification = (type, message, timeout = 2000) => {
      store.addNotification({
        title: '',
        message: message,
        type: type,
        insert: 'center',
        container: 'center',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {
          duration: timeout,
          onScreen: false
        }
      })
    }
  }

  render() {
    return (
      <div className='returns-calculator'>
        <Loader
          type="ThreeDots"
          className='loader-spinner'
          visible={this.state.showLoader}
        />
        <CalculationInputs getTrailingReturns={this.getTrailingReturns} loaderInProgress={this.state.showLoader} />
        <CalculationOutputs schemeName={this.state.schemeName} calculatedReturns={this.state.calculatedReturns} />
      </div>
    )
  }
}
