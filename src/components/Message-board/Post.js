import React from 'react';
import chirpContext from '../../chirp-context/chirpContext';
import './Post.css';
import SiteButton from '../site-button';
import UUID from 'react-uuid';
import { API_URL } from '../../config';

class Post extends React.Component {
  static contextType = chirpContext;
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      showDetails: false,
      isEdited: false,
      isDeleted: false,
      isSaved: false,
      isReplying: false,
      replyIdToBeEdited: null,
      content: '',
      title: '',
    }
  }
  render() {
    const { post } = this.props;
    // bring outside of render
    const toggleThread = () => {
      this.setState({
        showDetails: !this.state.showDetails
      })
    }

    const toggleEdit = (replyId) => {
      this.setState({
        replyIdToBeEdited: replyId,
        isEdited: true,
        isReplying: false,
        isDeleted: false,
      })
    }

    const handleTextareaEdit = (e) => {
      this.setState({ content: e.target.value })
    }

    const toggleCancel = () => {
      this.setState({
        isEdited: false,
        isReplying: false,
      })
    }

    const handleChirp = () => {
      // creating ui for reply
      this.setState({
        isReplying: true
      })
    }

    // const buildHandleSave = (e, context) => {
    //   context.addReply(post.id, this.state.content);
    //   this.setState({ isReplying: false })
    // }

    const handleAddedReplyContent = (e) => {
      this.setState({
        content: e.target.value
      })
    }

    const handleFetchCreateReply = (e) => {
      e.preventDefault()
      const reply = {
        id: UUID(),
        content: this.state.content,
        postId: this.props.post.id
      }
      console.log('content:', this.state.content)
      fetch(`${API_URL}/replies`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(reply)
      })
        // .then(res => {
        //   if (!res.ok) {
        //     throw new Error(res.status)
        //   }
        //   return res.json()
        // })
        .then(res => res.json())
        // .then(data => console.log('success', data))
        .then(() => {
          this.context.addReply(reply.id, this.props.post.id, this.state.content)
          this.setState({
            isReplying: false,
            content: ''
          })
        }
        )
        .catch((error) => {
          console.error('error:', error.message)
        })
    }

    const handleFetchEditReply = (replyId) => {
      console.log(this.props.post.id)
      const replies = {
        id: this.state.replyIdToBeEdited,
        content: this.state.content,
        postid: this.props.post.id
      }
      return fetch(`${API_URL}/replies/${replyId}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(replies)
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(res.status)
          }
          return res.json()
        })
        .then(() => {
          this.context.editReply(replyId, this.state.content, this.props.post.id)
          this.setState({
            isEdited: false,
            content: ''
          })
        }
        )
    }

    const handleFetchDeleteReply = (replyId) => {
      fetch(`${API_URL}/replies/${replyId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(res.status)
          }
          return res.json()
        })
        .catch(error => this.setState({ error }
        ))
        .then(() => this.context.deleteReply(this.props.post.id, replyId)
        )
        .then(this.setState({ toggleThread: null }))
    }

    const editedReply = post.replies.find(reply => reply.id === this.state.replyIdToBeEdited);
    const editedText = this.state.content || (editedReply && editedReply.content)
    return (
      <chirpContext.Consumer>
        {context => {
          return (
            <tbody key="tb">
              <tr key="header" id="tr-threads">
                <td key="title">{post.title}</td>
                <td key="button"><button onClick={toggleThread}>{this.state.showDetails ? '⬆' : "⬇"}</button></td>
              </tr>
              {this.state.showDetails ?
                <React.Fragment>
                  <tr key="cr-sec" id="cr-sec"> Content and Replies Section:</tr>
                  <tr key="sd">
                    <td className="col-span" colSpan={6}>{post.content}
                      <section key="section"></section>
                      {/* stateful logic to display textarea */}
                      {this.state.isReplying ?
                        <>
                          <p>New Chirp:</p>
                          {/* 1.) Click on 'Chirp' 2.) enter reply in textarea 3.) 'Save' new reply*/}
                          <form key="form" id="create-reply-form" onSubmit={handleFetchCreateReply}>
                            <textarea key="tar" className="reply-textarea" value={this.state.content} onChange={handleAddedReplyContent} ></textarea>
                            <SiteButton onClick={toggleCancel}>Cancel</SiteButton>
                            <SiteButton>Save</SiteButton>
                          </form>
                        </> :
                        // onClick of 'Chirp' buttton opens up form with an empty textbox to render input from user --clicking on 'Save' button will submit user input and add reply to message board 
                        <SiteButton onClick={handleChirp}>Chirp</SiteButton>
                      }
                    </td>
                  </tr>
                  {this.state.isEdited && (
                    <tr key="rce" className="edit-reply-section">
                      <td key="col" colSpan={6}>
                        {/* siblings are vertical */}
                        <textarea key="edit-reply ta" value={editedText} onChange={handleTextareaEdit} />
                        <div key="sb's">
                          <SiteButton onClick={toggleCancel}>Cancel</SiteButton>
                          <SiteButton onClick={(e) => handleFetchEditReply(this.state.replyIdToBeEdited)}>Save</SiteButton>
                        </div>
                      </td>
                    </tr>
                  )}
                  {post.replies.map(reply => {
                    return (
                      <React.Fragment key={reply.id}>
                        <tr className="replies-section">
                          <td key="colr" colSpan={6}>
                            {!this.state.isEdited &&
                              <section key="rsec" onChange={(e) => this.setState({ content: e.target.value })} value={this.state.content} className="reply-section">{reply.content || 'There was no reply.'}</section>
                            }
                            <div className="thread-btns">
                              {/* document.getElementById = previousElementSibling */}
                              {!this.state.isEdited && <SiteButton onClick={() => toggleEdit(reply.id)}>Edit</SiteButton>}
                              {!this.state.isDeleted && !this.state.isEdited && <SiteButton onClick={() => handleFetchDeleteReply(reply.id)}>Drop</SiteButton>}
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    )
                  })}
                </React.Fragment> : null
              }
            </tbody>
          )
        }
        }
      </chirpContext.Consumer >
    )
  }
}

export default Post;

// handling logic for updating reply (moved functionalty over to app and then called editReply fx within Post)
// const handleSave = (e) => {
// calls fx from app
//what info does handleSave need?
// the id of the post
// know which reply (replyId)
// text from the input field

// how do you use that info to solve the problem
// find the correct post // how: find id
// find the correct reply
// find replyId // update reply //assign reply with new data

// post.id, id
// post.replies[replyId - 1].replyId, replyId
// DOM traversal: (S) Save button (E) textarea
// innerText vs. value
// let matchingid = post.id;
// console.log(matchingid)
// let matchingReplyId = this.state.replyIdToBeEdited;
// console.log(matchingReplyId)
// let editedReply = e.target.parentNode.firstChild.value;
// console.log(editedReply)
// let replyName;
// this.setState({
//   isEdited: false,
//   isReplying: false,
//   replyToBeEdited: ''
// })
// }

// ToDo's: 4/2
// textarea should appear and nothing else -->
// textarea should close and new text should render 
// delete button is being removed instead of text upon click of 'drop'
// drop button shouldn't appear upon clicking edit
