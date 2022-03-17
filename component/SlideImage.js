import React, {useCallback, useState} from "react"
import {imageURL} from "../config/config";
import {Image} from "react-bootstrap";
import PostModal from "./PostModal";

const SlideImage = ({postInfo}) => {
  const [show, setShow] = useState(false);
  const onClickShow = useCallback(() => {
    setShow(true);
  }, [show])

  return(
    <span>
      <Image width="60" height="60" style={{margin: "19px", objectFit: "cover", cursor: "pointer"}} roundedCircle src={ imageURL + postInfo.image} onClick={onClickShow}/>
      <PostModal postInfo={postInfo} show={show} setShow={setShow}/>
    </span>

  )
}

export default SlideImage