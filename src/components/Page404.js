import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Link,
} from 'react-router-dom'

class Page404 extends Component {

  render(){
    return (
      <div
        className='defaultMessage'
        style={{
          'color': 'rgb(190, 80, 70)',
        }}
        >
        <p>Sorry,</p>
        <p>there is no post with id {this.props.urlPostId}.</p>
        <Link
          to={`/${this.props.urlCategory}`}
          className='button'
          >Back to front page
        </Link>
      </div>
    )
  }
}

export default (Page404)

Page404.propTypes = {
  urlPostId: PropTypes.string.isRequired,
  urlCategory: PropTypes.string,
}
