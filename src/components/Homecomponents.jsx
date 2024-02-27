import React from 'react'
import PostState from './common/PostUpdate'
import '../Sass/Homecomponents.scss'

export default function Homecomponents({currentUser}) {
  return (
    <div className="home-component">
      <PostState currentUser={currentUser} />
    </div>
  );
}
