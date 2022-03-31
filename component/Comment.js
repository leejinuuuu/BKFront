import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {LIKE_COMMENT_REQUEST, PICK_COMMENT_TO_REPLY, UNLIKE_COMMENT_REQUEST} from "../config/event/eventName/postEvent";
import {imageURL} from "../config/config";
import ReplyComment from "./ReplyComment";

const Comment = ({replyComment, commentInfo}) => {
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.userReducer)

  const [showReply, setShowReply] = useState(false);
  const [liked, setLiked] = useState(false);
  const [reply, setReply] = useState([])

  const onClickReply = useCallback(() => {
    dispatch({
      type: PICK_COMMENT_TO_REPLY,
      plus: commentInfo.id
    })
    setReply([])
  }, [])

  const onClickShowReply = useCallback(() => {
    setShowReply(!showReply)
  }, [showReply])

  const onClickLikeComment = useCallback(() => {
    dispatch({
      type: LIKE_COMMENT_REQUEST,
      params: {
        accountId: user.id,
        commentId: commentInfo.id
      }
    })
    setLiked(true)
  }, [user, commentInfo])

  const onClickUnLikeComment = useCallback(() => {
    dispatch({
      type: UNLIKE_COMMENT_REQUEST,
      params: {
        accountId: user.id,
        commentId: commentInfo.id
      }
    })
    setLiked(false)
  }, [user, commentInfo])

  useEffect(() => {
    for(let i=0; i<user.likedComments.length; i++) {
      if(user.likedComments[i] === commentInfo.id) {
        setLiked(true)
        break
      }
    }

    let temp = []
    for(let i=0; i<commentInfo.replyComment.length; i++) {
      temp.push(
        <ReplyComment replyComment={commentInfo.replyComment[i]}/>
      )
    }
    setReply(temp)
  }, [user, replyComment, commentInfo, reply])



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
          <span>{commentInfo.content}</span>
          {
            liked ?
              <i style={{float: "right", cursor: "pointer"}} onClick={onClickUnLikeComment} className="heart like icon"/> :
              <i style={{float: "right", cursor: "pointer"}} onClick={onClickLikeComment} className="heart outline like icon"/>
          }
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