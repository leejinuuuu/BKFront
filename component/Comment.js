import React from 'react'
import {useSelector} from "react-redux";

const Comment = ({replyComment, commentInfo}) => {
  const { postInfo } = useSelector(state => state.modalReducer)

  const reply = [];
  for(let i=0; i<replyComment.length; i++) {
    reply.push(
      <div className="comment">
        <a className="avatar">
          <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png"/>
        </a>
        <div className="content">
          <a className="author">{replyComment[i].writerName}</a>
          <div className="metadata">
            <span className="date">{replyComment[i].createdAt}</span>
          </div>
          <div className="text">
            {replyComment[i].content}
          </div>
          <div className="actions">
            <a className="reply">Reply</a>
          </div>
        </div>
      </div>
    )
  }


  return(
    <div className="comment">
      <a className="avatar">
        <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png"/>
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
          <a className="reply">Reply</a>
        </div>
      </div>
      <div className="comments">
        {reply}
      </div>
    </div>
  )
}

export default Comment;