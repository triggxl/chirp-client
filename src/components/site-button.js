import React from 'react';
import './site-button.css';

const SiteButton = (props) => {
  return (
    // .children allows multiple components to access, adding all attribute props
    <button className="site-button" {...props}>{props.children}</button>
  )
}

export default SiteButton;


