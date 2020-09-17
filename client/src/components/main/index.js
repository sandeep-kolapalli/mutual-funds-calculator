import React, { Component } from 'react'
import Header from '../header'
import ReturnsCalculator from '../returns-calculator'
import './styles.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/font-awesome/css/font-awesome.css'
import ReactNotification from 'react-notifications-component'

export default class Main extends Component {
  render () {
    return (
      <div className='main'>
        <ReactNotification />
        <Header />
        <ReturnsCalculator />
      </div>
    )
  }
}
