import React, {useCallback, useState} from 'react'
import PostModal from "./PostModal";
import {useDispatch, useSelector} from "react-redux";
import {SHOW_MODAL} from "../config/event/eventName/modal";

const SimplePostCard = ({postInfo}) => {
  const dispatch = useDispatch();

  const handleModalShow = useCallback(() => {
    dispatch({
      type: SHOW_MODAL
    })
  }, [])

  return(
    <div>
      <div className="ui card" onClick={handleModalShow}>
        <a className="image" href="#">
          <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png"/>
        </a>
        <div className="content">
          <a className="header" href="#">{postInfo}</a>
        </div>
      </div>
      <PostModal/>
    </div>
  )
}

export default SimplePostCard;