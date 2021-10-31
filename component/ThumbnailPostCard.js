import React, {useCallback, useState} from 'react'
import PostModal from "./PostModal";
import {useDispatch, useSelector} from "react-redux";
import {Image} from "react-bootstrap";
import {imageURL} from "../config/config";

const ThumbnailPostCard = ({postInfo}) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleModalShow = useCallback(() => {
    setShow(true);
  }, [show])

  return(
    <span>
      <Image onClick={handleModalShow} id={postInfo.id} style={{marginRight: "1%", marginBottom: "1%", cursor: "pointer"}} thumbnail width={"125px"} src={imageURL + postInfo.image}/>
      <PostModal show={show} setShow={setShow} postInfo={postInfo}/>
    </span>
  )
}

export default ThumbnailPostCard;