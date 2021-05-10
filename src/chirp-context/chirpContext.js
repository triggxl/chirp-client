import React from 'react';

const chirpContext = React.createContext({
  mbTitle: '',
  showThread: false,
  posts: [],
  handleCreatePost: () => { },
  handleEditPost: () => { },
  handleDeletePost: () => { }
})

export default chirpContext;