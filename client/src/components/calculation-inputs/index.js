import React, { Component } from 'react'
import './styles.css'

export default class CalculationInputs extends Component {
  constructor (props) {
    super(props)

    this.state = {
      schemeNumber: '',
      horizon: '',
      periodOfInvestmemt: ''
    }

    this.handleSchemeNumberChange = (event) => {
      this.setState({
        schemeNumber: event.target.value
      })
    }

    this.handleHorizonChange = (event) => {
      this.setState({
        horizon: event.target.value
      })
    }

    this.handlePeriodOfInvestmentChange = (event) => {
      this.setState({
        periodOfInvestmemt: event.target.value
      })
    }
  }

  render () {
    return (
      <div className='calculation-input-group'>
        <span className='calculation-input-sub-group'>
          <label className='calculation-input-sub-group-header'>Scheme Number<span className='mandatory-star'>*</span></label>
          <input
            type='number'
            className='form-control txt-input'
            placeholder='e.g. 101551'
            min={0}
            value={this.state.schemeNumber}
            onChange={this.handleSchemeNumberChange}
          />
        </span>
        <span className='calculation-input-sub-group'>
          <label className='calculation-input-sub-group-header'>Horizon (in years)<span className='mandatory-star'>*</span></label>
          <input
            type='number'
            className='form-control txt-input'
            placeholder='min. 1 year'
            min={1}
            value={this.state.horizon}
            onChange={this.handleHorizonChange}
          />
        </span>
        <span className='calculation-input-sub-group'>
          <label className='calculation-input-sub-group-header'>Period of Investment (in years)<span className='mandatory-star'>*</span></label>
          <input
            type='number'
            className='form-control txt-input'
            placeholder='min. 1 year'
            min={1}
            value={this.state.periodOfInvestmemt}
            onChange={this.handlePeriodOfInvestmentChange}
          />
        </span>
        <span className='calculation-input-sub-group'>
          <button
            className='btn btn-primary btn-calulate'
            disabled={this.state.schemeNumber === '' || this.state.horizon === '' || this.state.periodOfInvestmemt === '' || this.props.loaderInProgress}
            onClick={() => this.props.getTrailingReturns(this.state.schemeNumber, this.state.horizon, this.state.periodOfInvestmemt)}
          >
                        Calculate Trailing Returns
          </button>
        </span>
      </div>
    )
  }
}
