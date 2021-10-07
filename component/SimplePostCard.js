import React, {useCallback, useState} from 'react'
import PostModal from "./PostModal";
import {useDispatch, useSelector} from "react-redux";
import {SHOW_MODAL_REQUEST} from "../config/event/eventName/modal";
import {LOAD_POST_WITH_REQUEST} from "../config/event/eventName/postEvent";

const SimplePostCard = ({postInfo}) => {
  const dispatch = useDispatch();

  const handleModalShow = useCallback((e) => {
    dispatch({
      type: SHOW_MODAL_REQUEST,
      params: {
        id: e.target.id
      }
    })
  }, [])

  return(
    <span>
      <div className="ui card" onClick={handleModalShow} style={{width: "100%"}}>
        <a className="image" href="#">
          <img id={postInfo.id} src = {"http://localhost:8081/image/" + postInfo.image}/>
        </a>
        <div className="content">
          <a id={postInfo.id} className="header" href="#">{postInfo.writerAccount === null ? postInfo.writerClan.master : postInfo.writerAccount.username}</a>
        </div>
      </div>
      <PostModal postInfo={postInfo}/>
    </span>
  )
}

export default SimplePostCard;