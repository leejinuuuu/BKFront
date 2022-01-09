import React, {useCallback, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {PICK_COMMENT_TO_REPLY} from "../config/event/eventName/postEvent";
import {imageURL} from "../config/config";

const Comment = ({replyComment, commentInfo}) => {
  const dispatch = useDispatch();
  const reply = [];

  const [showReply, setShowReply] = useState(false);

  const onClickReply = useCallback(() => {
    dispatch({
      type: PICK_COMMENT_TO_REPLY,
      plus: commentInfo.id
    })
  }, [])

  const onClickShowReply = useCallback(() => {
    setShowReply(!showReply)
  }, [showReply])

  for(let i=0; i<replyComment.length; i++) {
    reply.push(
      <div className="comment">
        <a className="avatar">
          <img style={{height: "35px", objectFit: "cover"}} src={imageURL + replyComment[i].writerProfileImage}/>
        </a>
        <div className="content">
          <a className="author">{replyComment[i].writerName}</a>
          <div className="metadata">
            <span className="date">{replyComment[i].createdAt}</span>
          </div>
          <div className="text">
            {replyComment[i].content}
          </div>
        </div>
      </div>
    )
  }


  return(
    <div className="comment">
      <a className="avatar">
        <img style={{height: "35px", objectFit: "cover"}} src={imageURL + commentInfo.writerProfileImage}/>
      </a>
      <div className="content">
        <a className="author">{commentInfo.writerName}</a>
        <div className="metadata">
          <span className="date">{commentInfo.createdAt}</span>
        </div>
        <div className="text">
          <p>{commentInfo.content}</p>
        </div>
        <div className="actions">
          <a className="reply" onClick={onClickReply}>Reply</a>
          <a className="reply" onClick={onClickShowReply}>더보기</a>
        </div>
      </div>
      <div className="comments">
        {showReply ? reply : null}
      </div>
    </div>
  )
}

export default Comment;