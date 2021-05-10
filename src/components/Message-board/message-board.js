import React from 'react';
import chirpContext from '../../chirp-context/chirpContext';
import { Link } from 'react-router-dom';
import './message-board.css';
import Post from './Post';
import ChirpingBird from '../pictures/chirping-bird.jpg';
import SiteButton from '../site-button';
import { API_URL } from '../../config';
import UUID from 'react-uuid';

class messageBoard extends React.Component {
  static contextType = chirpContext;
  constructor(props) {
    super(props);
    this.state = {
      isCreatingPost: false,
      showAddForm: false,
      title: '',
      content: '',
    }
  }

  render() {

    const handleShowAddForm = () => {
      this.setState({ showAddForm: true })
    }


    const handleFetchCreatePost = (e) => {
      e.preventDefault();
      const newPost = {
        id: UUID(),
        title: this.state.title,
        content: this.state.content,
        participantsInitials: '',
        numOfParticipants: 0,
        numOfReplies: 0,
        replies: [],
        timeOpen: 'One minute ago'
      }
      fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(newPost)
      }).then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      }).catch(error => this.setState({ error }
      )).then(() => {
        this.context.createNewPost(this.state.id, this.state.title, this.state.content)
        this.setState({
          isCreatingPost: false,
          title: '',
          content: '',
          showAddForm: false
        })
      }
      )
    }

    return (
      <div id="mb-container">
        <img src={ChirpingBird} alt="bird chirping on a tree branch" />
        <h1 id="mb-page-title">Chirp(En-Passant) Message Board:</h1>
        {/* <img src="search-bar-icon" alt="search bar icon for message board" /> */}
        <div id="mb-links">
          <Link to="/" key={'/'}>Home</Link>
        </div>
        {!this.state.showAddForm ?
          <div>
            <div id="user-instructions">
              <h3>Chirp Instructions:</h3>
              <p>1.) Click one of the down arrows to the right to view a post, OR Create your own!</p>
              <p>2.) Click 'Chirp' to reply and share your thoughts in the discussion board! <br /> (You may edit and delete your reply also!) </p>
            </div>
            <SiteButton onClick={handleShowAddForm}>Create New Post</SiteButton>
          </div> :
          <form className="form-inline" onSubmit={handleFetchCreatePost}>
            {/* eslint-disable-next-line */}
            <label className="ptl">Title:</label>
            {/* eslint-disable-next-line */}
            <input className="post-title" onChange={(e) => this.setState({ title: e.target.value })} value={this.state.title} type="text" id="new-post-title" placeholder="New ish" />
            {/* eslint-disable-next-line */}
            <label className="pcl">Topic:</label>
            {/* eslint-disable-next-line */}
            <input className="post-content" onChange={(e) => this.setState({ content: e.target.value })} value={this.state.content} type="text" id="new-post-topic" placeholder="down 4 and 7 beers ago..." />
            {<SiteButton>Chirp!</SiteButton>}
          </form>
        }
        <table id="mb-table">
          <thead>
            <tr id="table-row">
              <th id="title-tr-mb">Title:</th>
            </tr>
          </thead>
          {this.context.posts.map(post => {
            return (
              <Post post={post} key={post.title} />
            )
          })}
        </table>
      </div>
    );
  }
}

export default messageBoard;



/*

Todo:
 after submitting: hide content fields and display 'Chirp' button again to add another post

Endpoints:
Posts
/posts
  create
  read
    GET '/posts
  delete
replies
/replies
  create
    {reply}
  update
  delete
  DELETE/:reply_id
Having trouble assigning db to user Triggxl
could use some help seeding data to db (through migrations I believe?)
setting up API endpoints

/book/book_id
CRUD

// Create it in JSX
// create state....method to update state
/* (MVP) <select name="drop-down-for-mb" id="drop-down-for-mb" onChange={e.target}>
<option value="my-profile" onChange={() => HandleClickToProfilePage}>My Profile</option>
<option value="my-posts" onChange={() => HandClickToMyPostsPage}>My Posts</option>
<option value="landing-page" onChange={() => HandleClickToHomePage}>Chirp Home Page</option>
</select>

// (useHistory hook for MVP) state = {
    //   selected: ''
    // }
    // function HandleClickToProfilePage(e) {
    //   let history = useHistory(e.target);
    //   history.push('/profile');
    // }
    // function HandClickToMyPostsPage(e) {
    //   let history = useHistory(e.target);
    //   history.push('/my-posts')
    // }
    // function HandleClickToHomePage(e) {
    //   let history = useHistory(e.target);
    //   history.push('/');
    // }
    // https://reactrouter.com/web/api/Hooks; https://stackoverflow.com/questions/51337618/reactjs-modifying-state-and-changing-url-onchange;

// figured I need to make a build fx to grab the values on submit (Chirp);
    // console logging to see output to make sure it's the correct element
    // const buildNewPostOnChirp = (e) => {
    //   this.setState({
    //   })
    // }
 */
