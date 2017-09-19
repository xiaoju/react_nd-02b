import React from 'react'

import Categories from './Categories'
import SearchBar from './SearchBar'
import FilterToolbar from './FilterToolbar'
import ListSortbar from './ListSortbar'
import List from './List'
import ListToolbar from './ListToolbar'
import Details from './Details'
import CommentsSortbar from './CommentsSortbar'
import Comments from './Comments'

const MainPage = () => (
  <div className = 'mainPage'>
    <div className = 'filterContainer'>
      <FilterToolbar />
      <Categories />
      <SearchBar />

    </div>
    <div className = 'listContainer'>
      <ListToolbar />
      <ListSortbar />
      <List />
    </div>
    <div className = 'detailsContainer'>
      <Details />
      <CommentsSortbar />
      <Comments />
    </div>
  </div>
)

export default MainPage
