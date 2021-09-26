import React, {useCallback, useState} from 'react'
import {Button, Modal} from "react-bootstrap";
import PostModal from "./PostModal";
import {useDispatch, useSelector} from "react-redux";
import {SHOW_MODAL} from "../config/event/eventName/modal";
import modalReducer from "../reducer/modal-reducer";

const PostCard = ({postInfo}) => {
  const dispatch = useDispatch();

  const handleModalShow = useCallback(() => {
    dispatch({
      type: SHOW_MODAL
    })
  }, [])

  return(
    <div>
      <div className="ui card" >
        <div className="content">
          <div className="right floated meta">14h</div>
          <img className="ui avatar image" src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png"/>{postInfo}
        </div>
        <div className="image">
          <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png"/>
        </div>
        <div className="content">
          <span className="right floated">
            <i className="heart outline like icon"></i>
            17 likes
          </span>
          <span onClick={handleModalShow} style={{cursor: "pointer"}}>
            <i className="comment icon"></i>
            3 comments
          </span>
        </div>
        <div className="extra content">
          <div className="ui large transparent left icon input">
            <i className="heart outline icon"></i>
            <input type="text" placeholder="Add Comment..."/>
          </div>
        </div>
      </div>
      <PostModal/>
    </div>
  )
}

export default PostCard;