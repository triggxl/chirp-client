import React from 'react';
import chirpContext from '../../chirp-context/chirpContext';
import { Link } from 'react-router-dom';
import './message-board.css';
import Post from './Post';
import ChirpingBird from '../pictures/chirping-bird.jpg';
// import Leaves from '../pictures/leaves-img.jpg';
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
        <div id="mb-links">
          <Link to="/" key={'/'}>Home</Link>
        </div>
        {!this.state.showAddForm ?
          <div id="user-form-and-instructions">
            <div >
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
        <div>
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
          {/* <img src={Leaves} alt="leaves collage" className="leaves-img" /> */}
        </div>
      </div>
    );
  }
}

export default messageBoard;