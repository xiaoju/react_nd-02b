import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SortBar extends Component {

  decorateLabel(column) {
    const directionSymbol = (this.props.sortDirection === 'asc') ? '\u2227' : '\u2228'
    return (
      column.field === this.props.sortCriteria ?
        `${directionSymbol} ${column.label} ${directionSymbol}` :
        `- ${column.label} -`
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

SortBar.propTypes = {
  columns: PropTypes.array.isRequired,
  sortCriteria: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  sortThese: PropTypes.func.isRequired,
}
