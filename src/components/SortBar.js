import React, { Component } from 'react'

class SortBar extends Component {
  constructor(props) {
    super(props)
  }

  decorateLabel(column) {
    const directionSymbol = (this.props.sortDirection === 'ascending') ? '\u2227' : '\u2228'
    return (
      column.field === this.props.sortCriteria ?
        `${directionSymbol} ${column.label} ${directionSymbol}` :
        column.label
    )
  }

  render() {
    return (
      <div className='sortBar'>
        {this.props.columns.map(column =>
          <button
            key={column.field}
            className={`${column.field} button columnLabel`}
            onClick={() => this.props.sortThese(column.field)}
            >
            {this.decorateLabel(column)}
          </button>
        )}
      </div>
    )
  }
}
export default SortBar
