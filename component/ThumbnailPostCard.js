import React, {useCallback, useState} from 'react'
import PostModal from "./PostModal";
import {useDispatch, useSelector} from "react-redux";
import {SHOW_MODAL_REQUEST} from "../config/event/eventName/modal";
import {Image} from "react-bootstrap";

const ThumbnailPostCard = ({postInfo}) => {
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
      <Image onClick={handleModalShow} id={postInfo.id} style={{marginRight: "1%", marginBottom: "1%", cursor: "pointer"}} thumbnail width={"125px"} src={"http://localhost:8081/" + postInfo.image}/>
      <PostModal postInfo={postInfo}/>
    </span>
  )
}

export default ThumbnailPostCard;