import React, { useCallback, useEffect, useState } from "react";
import PostModal from "./PostModal";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  LIKED_POST_REQUEST,
  UNLIKED_POST_REQUEST,
} from "../config/event/eventName/postEvent";
import { imageURL } from "../config/config";
import Link from "next/link";
import { LOAD_USER_REQUEST } from "../config/event/eventName/userEvent";

const PostCard = ({ postInfo, size }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const [liked, setLiked] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setLiked(false);
    if (user) {
      postInfo.likerAccount.map((v) => {
        if (v.id === user.id) {
          setLiked(true);
        }
      });
    }
  }, [postInfo.likerAccount]);

  const onClickHeart = useCallback(
    (e) => {
      if (liked === false) {
        dispatch({
          type: LIKED_POST_REQUEST,
          data: {
            userId: user.id,
            postId: e.target.id,
          },
          plus: {
            postId: e.target.id,
            user: user,
          },
        });
      } else {
        dispatch({
          type: UNLIKED_POST_REQUEST,
          data: {
            userId: user.id,
            postId: e.target.id,
          },
          plus: {
            postId: e.target.id,
            user: user,
          },
        });
      }
    },
    [liked]
  );

  const handleModalShow = useCallback(
    (e) => {
      if (!user) {
        alert("로그인이 필요합니다!");
      }
      setShow(true);
    },
    [show]
  );

  return (
    <div style={{ marginLeft: size === 0 ? "20%" : "0px" }}>
      <div className="ui card" style={{ width: size === 0 ? "80%" : "100%" }}>
        <Link
          href={
            postInfo.isAccountWriter
              ? "/profile/" + postInfo.writer.name
              : "/clan/" + postInfo.writer.name
          }
        >
          <div className="content" style={{ cursor: "pointer" }}>
            <div className="right floated meta">
              {postInfo.createdAt.substring(0, 10)}
            </div>
            <img
              style={{ objectFit: "cover" }}
              className="ui avatar image"
              src={imageURL + postInfo.writer.profileImage}
            />
            {postInfo.writer.name}
          </div>
        </Link>
        <div className="image">
          <button>
            <img
              style={{
                height: size === 0 ? "600px" : "300px",
                objectFit: "cover",
              }}
              src={imageURL + postInfo.image}
            />
          </button>
        </div>
        <div className="content">
          {liked ? (
            <span className="right floated">
              <i
                id={postInfo.id}
                onClick={onClickHeart}
                className="heart like icon"
              />
              {postInfo.likerAccount.length + " likes"}
            </span>
          ) : (
            <span className="right floated">
              <i
                id={postInfo.id}
                onClick={onClickHeart}
                className="heart outline like icon"
              />
              {postInfo.likerAccount.length + " likes"}
            </span>
          )}
          <span
            id={postInfo.id}
            onClick={handleModalShow}
            style={{ cursor: "pointer" }}
          >
            <i id={postInfo.id} className="comment icon" />
            {" comments"}
          </span>
        </div>
      </div>
      {user && <PostModal show={show} setShow={setShow} postInfo={postInfo} />}
    </div>
  );
};

export default connect((state) => state)(PostCard);
