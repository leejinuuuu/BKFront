import React, {useCallback, useEffect, useState} from 'react'
import {imageURL} from "../config/config";
import {LIKE_COMMENT_REQUEST, UNLIKE_COMMENT_REQUEST} from "../config/event/eventName/postEvent";
import {useDispatch, useSelector} from "react-redux";

const ReplyComment = ({replyComment}) => {
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.userReducer)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    for(let i=0; i<user.likedComments.length; i++) {
      if(user.likedComments[i] === replyComment.id) {
        setLiked(true)
        break
      }
    }
  }, [user])

  const onClickLikeComment = useCallback(() => {
    dispatch({
      type: LIKE_COMMENT_REQUEST,
      params: {
        accountId: user.id,
        commentId: replyComment.id
      }
    })
    setLiked(true)
  }, [user, replyComment])

  const onClickUnLikeComment = useCallback(() => {
    dispatch({
      type: UNLIKE_COMMENT_REQUEST,
      params: {
        accountId: user.id,
        commentId: replyComment.id
      }
    })
    setLiked(false)
  }, [user, replyComment])

  return(
    <div className="comment">
      <a className="avatar">
        <img style={{height: "35px", objectFit: "cover"}} src={imageURL + replyComment.writerProfileImage}/>
      </a>
      <div className="content">
        <a className="author">{replyComment.writerName}</a>
        <div className="metadata">
          <span className="date">{replyComment.createdAt}</span>
        </div>
        <div className="text">
          {replyComment.content}
          {
            liked ?
              <i style={{float: "right", cursor: "pointer"}} onClick={onClickUnLikeComment} className="heart like icon"/> :
              <i style={{float: "right", cursor: "pointer"}} onClick={onClickLikeComment} className="heart outline like icon"/>
          }
        </div>
      </div>
    </div>
  )
}

export default ReplyComment