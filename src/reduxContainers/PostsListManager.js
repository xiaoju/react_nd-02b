import { connect } from 'react-redux'
import PostsList from '../components/PostsList'



const mapStateToProps = state => {
  return {
    Posts: state.Posts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: () => {
      dispatch(readableApp(state, POST_FETCH))
    }
  }
}

const PostsListManager = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList)

export default PostsListManager
