import React from 'react';
import { Route } from 'react-router-dom';
import landingPage from './components/Landing-page/landing-page';
import messageBoard from './components/Message-board/message-board';
import chirpContext from './chirp-context/chirpContext';
import './App.css';
import { API_URL } from './config';

class App extends React.Component {
  static contextType = chirpContext;
  state = {
    posts: [

    ]
  }

  componentDidMount() {
    fetch(`${API_URL}/posts`)
      .then(res => res.json())
      // .then(data => this.setState({ posts: data }))
      // 
      .then((posts) => {
        fetch(`${API_URL}/replies`)
          .then(res => res.json())
          .then(replies => {
            console.log('replies', replies)
            replies.forEach(reply => {
              const post = posts.find(post => post.id === reply.postId)
              post.replies = post.replies || []
              post.replies.push(reply)
            })
            this.setState({ posts })
          })
      })
  }
  /* Uncaught (in promise) TypeError: replies.forEach is not a function (client) 500 internal: Error: Unable to acquire a connection (server) */

  createNewPost = (id, title, content) => {
    const newPost = {
      id,
      title,
      content,
      participantsInitials: '',
      numOfParticipants: 0,
      numOfReplies: 0,
      replies: [],
      timeOpen: 'One minute ago'
    }
    // a cb fx will provide previous state as the callback by default
    this.setState(prevState => {
      // copy of state to modify to prevent mututating and other oddities
      const originalPosts = [...prevState.posts];
      originalPosts.push(newPost)
      return {
        // property changing: new value
        posts: originalPosts
      }
    })
  }
  // finding matching posts with prevState, editing it dynamically with whatever the user inputs and then giving it back to state
  addReply = (id, postid, title) => {
    const newReply = {
      id,
      title,
      postid
    }
    this.setState((prevState) => {
      // finds the post with matching id goes into that post's reply, reconstructing new object within array to account for other properties reply has
      console.log('prevState:', prevState)
      const originalPosts = [...prevState.posts];
      let matchingPost = originalPosts.find(post => post.id === postid);
      console.log('postid:', postid)
      console.log('matching post:', matchingPost)
      // add new reply to matching post
      matchingPost.replies.push(newReply);
      return {
        posts: originalPosts
      }
    })
  }

  // put
  handleEditReply = (replyId, title, id) => {
    // console.log('replies state:', this.state.replies)
    // find post
    let matchingPost = this.state.posts.find(post => post.id === id);
    let matchingPostIndex = this.state.posts.findIndex(post => post.id === id);
    // find index of reply
    let replyIndex = matchingPost.replies.findIndex(reply => reply.id === replyId);
    // get reply with idx
    const reply = { ...matchingPost.replies[replyIndex] }
    reply.title = title
    matchingPost.replies.splice(replyIndex, 1, reply)
    // create posts instance
    let newPosts = [...this.state.posts]
    // update with new
    newPosts.splice(matchingPostIndex, 1, matchingPost)
    this.setState({ posts: newPosts })
  }

  // delete
  handleDeleteReply = (id, replyId) => {
    // find the right post
    let matchingPost = this.state.posts.find(post => post.id === id);
    // find matching reply
    let replyIndex = matchingPost.replies.findIndex(reply => reply.id === replyId);
    // splice out reply from that post
    matchingPost.replies.splice(replyIndex, 1)
    // splice post back into array
    let newPosts = [...this.state.posts]
    let matchingPostIndex = this.state.posts.findIndex(post => post.id === id);
    newPosts.splice(matchingPostIndex, 1, matchingPost)

    this.setState({ posts: newPosts })
  }

  render() {
    const contextValue = {
      posts: this.state.posts,
      createNewPost: this.createNewPost,
      addReply: this.addReply,
      editReply: this.handleEditReply,
      deleteReply: this.handleDeleteReply,
      handleCreatePost: this.handleCreatePost,
      handleEditPost: this.handleEditPost,
      handleDeletePost: this.handleDeletePost
    }
    return (
      <chirpContext.Provider value={contextValue}>
        <Route exact path="/" component={landingPage}>
        </Route>
        <Route path="/message-board" component={messageBoard}>
        </Route>
      </chirpContext.Provider>
    );
  }
}
export default App;