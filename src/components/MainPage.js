import React from 'react'
import List from './List'
import ListToolbar from './ListToolbar'

const MainPage = () => (
  <div className='flex-container'>
    <List />
    <ListToolbar />
    {/* <div className='PostDetails-Comments'>
      <PostDetails />
      <Comments />
    </div> */}
  </div>
)

export default MainPage
