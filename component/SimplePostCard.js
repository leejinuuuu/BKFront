import React, {useCallback, useState} from 'react'
import PostModal from "./PostModal";
import {useDispatch} from "react-redux";
import {SHOW_MODAL} from "../config/event/eventName/modal";
import {LOAD_POST_WITH_REQUEST} from "../config/event/eventName/postEvent";
import {imageURL} from "../config/config";
import {Image} from "react-bootstrap";

const SimplePostCard = ({postInfo}) => {

  const dispatch = useDispatch();

  const [show, setShow] = useState(false)

  const handleModalShow = useCallback((e) => {
    setShow(true);
  }, [show])

  return(
    <div>
      <Image onClick={handleModalShow} style={{width: "100%", height: "100%", objectFit: "fill", cursor: "pointer"}} id={postInfo.id} src = {imageURL + postInfo.image}/>
      <PostModal setShow={setShow} show={show} postInfo={postInfo}/>
    </div>
  )
}

export default SimplePostCard;