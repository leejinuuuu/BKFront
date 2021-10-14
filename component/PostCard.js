import React, {useCallback, useEffect, useState} from 'react'
import PostModal from "./PostModal";
import {connect, useDispatch, useSelector} from "react-redux";
import {SHOW_MODAL} from "../config/event/eventName/modal";
import {LIKED_POST_REQUEST, UNLIKED_POST_REQUEST} from "../config/event/eventName/postEvent";

const PostCard = ({postInfo}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.userReducer)
  const [liked, setLiked] = useState(false)
  const [show, setShow] = useState(false)

  const writer = postInfo.writerAccount === null ? postInfo.writerClan : postInfo.writerAccount

  useEffect(() => {
    setLiked(false)
    postInfo.likerAccount.map(v => {
      if(v.id === user.id) {
        setLiked(true)
      }
    })
  }, [postInfo.likerAccount])

  const onClickHeart = useCallback((e) => {
    if(liked === false) {
      dispatch({
        type: LIKED_POST_REQUEST,
        data: {
          userId: user.id,
          postId: e.target.id,
        },
        plus: {
          postId: e.target.id,
          user: user
        }
      })
    } else {
      dispatch({
        type: UNLIKED_POST_REQUEST,
        data: {
          userId: user.id,
          postId: e.target.id
        },
        plus: {
          postId: e.target.id,
          user: user
        }
      })
    }
  }, [liked])

  const handleModalShow = useCallback((e) => {
    setShow(true);
  }, [show])

  return(
    <div>
      <div className="ui card" style={{ height: "30%"}}>
        <div className="content">
          <div className="right floated meta">{postInfo.createdAt.substring(0, 10)}</div>
          <img className="ui avatar image" src={"http://localhost:8081/image/" + writer.profileImage}/>{postInfo.writerAccount === null ? postInfo.writerClan.master : postInfo.writerAccount.username}
        </div>
        <div className="image">
          <img src={"http://localhost:8081/image/" + postInfo.image}/>
        </div>
        <div className="content">
            {
              liked ?
                <span className="right floated">
                  <i id={postInfo.id} onClick={onClickHeart} className="heart like icon"/>
                  {postInfo.likerAccount.length + " likes"}
                </span> :
                <span className="right floated">
                  <i id={postInfo.id} onClick={onClickHeart} className="heart outline like icon"/>
                  {postInfo.likerAccount.length + " likes"}
                </span>
            }
          <span id={postInfo.id} onClick={handleModalShow} style={{cursor: "pointer"}}>
            <i id={postInfo.id} className="comment icon"/>
            {" comments"}
          </span>
        </div>
        <div className="extra content">
          <div className="ui large transparent left icon input">
            <i className="heart outline icon"/>
            <input type="text" placeholder="Add Comment..."/>
          </div>
        </div>
      </div>
      <PostModal show={show} setShow={setShow} postInfo={postInfo}/>
    </div>
  )
}

export default connect(state => state)(PostCard);