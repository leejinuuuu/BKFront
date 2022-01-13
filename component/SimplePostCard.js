import React, {useCallback, useState} from 'react'
import PostModal from "./PostModal";
import {useDispatch} from "react-redux";
import {SHOW_MODAL} from "../config/event/eventName/modal";
import {LOAD_POST_WITH_REQUEST} from "../config/event/eventName/postEvent";
import {imageURL} from "../config/config";

const SimplePostCard = ({postInfo}) => {

  const dispatch = useDispatch();

  const [show, setShow] = useState(false)

  const handleModalShow = useCallback((e) => {
    setShow(true);
  }, [show])

  return(
    <div>
      <div onClick={handleModalShow} className="ui card"  style={{width: "100%"}}>
        <a className="image" href="#">
          <img id={postInfo.id} src = {imageURL + postInfo.image}/>
        </a>
        <div className="content">
          <a id={postInfo.id} className="header" href="#">{postInfo.writer.name}</a>
        </div>
      </div>
      <PostModal setShow={setShow} show={show} postInfo={postInfo}/>
    </div>
  )
}

export default SimplePostCard;