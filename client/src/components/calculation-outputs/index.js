import React from 'react'
import './styles.css'

export default function CalculationOutputs (props) {
  return (
    <div className='calculation-outputs'>
      {
        props.calculatedReturns.length !== 0 &&
                props.schemeName !== '' &&
                  <div>
                    <p className='scheme-name'><b>Scheme Name: </b>{props.schemeName}</p>
                    <p className='nav-note'><u>Note</u>: Start and End dates are specified as per the latest Net Asset Value (NAV) available in the period of investment</p>
                  </div>
      }
      <table className='table-calculated-returns'>
        <thead>
          <tr>
            <th>MONTH</th>
            <th>START NAV</th>
            <th>END NAV</th>
            <th>RETURNS</th>
          </tr>
        </thead>
        <tbody>
          {
            props.calculatedReturns.length === 0 &&
              <tr><td colSpan='4' style={{ fontSize: 12 }}>-- No Data --</td></tr>
          }
          {
            props.calculatedReturns.map(item =>
              <tr key={item.month}>
                <td>{item.month}</td>
                <td>{item.startNav}</td>
                <td>{item.endNav}</td>
                <td>
                  <i className={`fa fa-arrow-up ${item.returns.startsWith('-') ? 'returns-fall' : null}`} />&nbsp;&nbsp;
                  {item.returns}
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}
