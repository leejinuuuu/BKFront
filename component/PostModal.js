import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Image, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_REPLY_REQUEST,
  DELETE_POST_REQUEST,
  LIKED_POST_REQUEST,
  LOAD_ALL_POST_REQUEST,
  UNLIKED_POST_REQUEST,
} from "../config/event/eventName/postEvent";
import { backURL, imageURL } from "../config/config";
import AlbumModal from "./AlbumModal";
import axios from "axios";
import {
  BOOKMARK_POST_REQUEST,
  UNBOOKMARK_POST_REQUEST,
} from "../config/event/eventName/userEvent";
import Link from "next/link";

const PostModal = ({ postInfo, show, setShow }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userReducer);
  const { commentPicked, commentToReply } = useSelector(
    (state) => state.postReducer
  );

  const handleModalClose = useCallback(() => {
    setShow(false);
  }, [show, setShow]);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (typeof postInfo.comment !== "undefined" && show) {
      const temp = [];

      if (postInfo.comment.length === 0) {
        axios.get(backURL + "/comment?id=" + postInfo.id).then((res) => {
          if (res.length > 0) {
            dispatch({
              type: ADD_COMMENT_SUCCESS,
              data: res,
              plus: {
                postId: postInfo.id,
              },
            });
            for (let i = 0; i < res.length; i++) {
              temp.push(
                <Comment
                  key={i}
                  commentInfo={res[i]}
                  replyComment={res[i].replyComment}
                />
              );
            }
          }
        });
      } else {
        for (let i = 0; i < postInfo.comment.length; i++) {
          temp.push(
            <Comment
              key={i}
              commentInfo={postInfo.comment[i]}
              replyComment={postInfo.comment[i].replyComment}
            />
          );
        }
      }
      setComments(temp);
    }
  }, [postInfo.comment, show]);

  const [commentData, setCommentData] = useState("");
  const handleCommentChange = useCallback(
    (e) => {
      setCommentData(e.target.value);
    },
    [commentData]
  );

  const handleSubmitComment = useCallback(() => {
    if (commentPicked) {
      dispatch({
        type: ADD_REPLY_REQUEST,
        data: {
          userId: user.id,
          commentId: commentToReply,
          content: commentData,
        },
        plus: {
          userId: user.id,
          commentId: commentToReply,
          content: commentData,
          writerName: user.username,
          createdAt: new Date().toISOString(),
        },
      });
    } else {
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: {
          userId: user.id,
          postId: postInfo.id,
          content: commentData,
        },
        plus: {
          userId: user.id,
          postId: postInfo.id,
          content: commentData,
        },
      });
    }
    setCommentData("");
  }, [commentData, user, postInfo]);

  const [liked, setLiked] = useState(false);
  const [showFavorite, setShowFavorite] = useState(false);

  const handleShowFavorite = () => setShowFavorite(true);

  useEffect(() => {
    setLiked(false);
    if (typeof postInfo.likerAccount !== "undefined" && user) {
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
            postId: postInfo.id,
          },
          plus: {
            postId: postInfo.id,
            user: user,
          },
        });
      } else {
        dispatch({
          type: UNLIKED_POST_REQUEST,
          data: {
            userId: user.id,
            postId: postInfo.id,
          },
          plus: {
            postId: postInfo.id,
            user: user,
          },
        });
      }
    },
    [liked, postInfo]
  );

  const onClickDeletePost = useCallback(() => {
    dispatch({
      type: DELETE_POST_REQUEST,
      params: {
        postId: postInfo.id,
      },
      plus: {
        postId: postInfo.id,
      },
    });
  }, [postInfo]);

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (user) {
      const bookmark = user.bookmarkedPosts;
      let flag = false;
      for (let i = 0; i < bookmark.length; i++) {
        if (bookmark[i].id === postInfo.id) {
          flag = true;
          break;
        }
      }
      setIsBookmarked(flag);
    }
  }, [postInfo, user]);

  const onClickAddBookmark = useCallback(() => {
    dispatch({
      type: BOOKMARK_POST_REQUEST,
      params: {
        postId: postInfo.id,
        accountId: user.id,
      },
    });
    setIsBookmarked(true);
  }, [postInfo, user]);

  const onClickRemoveBookmark = useCallback(() => {
    dispatch({
      type: UNBOOKMARK_POST_REQUEST,
      params: {
        postId: postInfo.id,
        accountId: user.id,
      },
    });
    setIsBookmarked(false);
  }, [postInfo, user]);

  return (
    <span>
      <Modal
        size="xl"
        show={show}
        onHide={handleModalClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="show-grid">
          <Container>
            <Row style={{ height: "600px" }}>
              <Col xs={8}>
                <div style={{ height: "600px", position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      msTransform: "translate(-50%, -50%)",
                    }}
                  >
                    <Image
                      style={{
                        objectFit: "contain",
                        width: "600px",
                        height: "600px",
                      }}
                      src={imageURL + postInfo.image}
                    />
                  </div>
                </div>
              </Col>
              <Col xs={4}>
                <Row>
                  <div className="ui large feed">
                    <div className="event">
                      <div className="label">
                        <img
                          style={{ marginTop: "10px" }}
                          src={imageURL + postInfo.writer.profileImage}
                        />
                      </div>
                      <div className="content">
                        <div className="summary">
                          <a className="user">
                            <Link href={"/profile/" + postInfo.writer.name}>
                              {postInfo.writer.name}
                            </Link>
                          </a>{" "}
                          {"- " + postInfo.title}
                          <div className="date">
                            {postInfo.createdAt.substring(0, 10)}
                          </div>
                        </div>
                        <div>
                          {postInfo.hashtag.map((v) => (
                            <span>{"#" + v}</span>
                          ))}
                        </div>
                        {user && postInfo.writer.name === user.username && (
                          <div
                            className="meta"
                            style={{ marginRight: "30px" }}
                            onClick={onClickDeletePost}
                          >
                            <a className="like">
                              <i className="delete icon" /> Delete
                            </a>
                          </div>
                        )}
                        {/*<div className="meta">*/}
                        {/*  <a className="like">*/}
                        {/*    <i className="like icon"/> Follow*/}
                        {/*  </a>*/}
                        {/*</div>*/}
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: "-10px" }} className="ui divider" />
                </Row>
                <Row>
                  <div
                    className="ui comments"
                    style={{
                      overflowY: "scroll",
                      marginLeft: "-5px",
                      height: "390px",
                      overflowX: "hidden",
                    }}
                  >
                    {comments}
                  </div>
                </Row>
                <Row>
                  <form className="ui reply form">
                    <div className="ui divider" />
                    <span>
                      <div style={{ marginBottom: "10px" }}>
                        {liked ? (
                          <Image
                            src="https://img.icons8.com/color/48/000000/like--v3.png"
                            style={{ cursor: "pointer", width: "30px" }}
                            onClick={onClickHeart}
                          />
                        ) : (
                          <Image
                            src="https://img.icons8.com/ios/50/000000/hearts--v1.png"
                            style={{ cursor: "pointer", width: "30px" }}
                            onClick={onClickHeart}
                          />
                        )}
                        <Image
                          onClick={handleShowFavorite}
                          src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-bookmark-interface-kiranshastry-lineal-kiranshastry.png"
                          style={{ cursor: "pointer", width: "30px" }}
                        />
                        {isBookmarked ? (
                          <Image
                            style={{ width: "25px", cursor: "pointer" }}
                            onClick={onClickRemoveBookmark}
                            src="https://img.icons8.com/external-phatplus-solid-phatplus/64/000000/external-check-essential-phatplus-solid-phatplus.png"
                          />
                        ) : (
                          <Image
                            style={{ width: "25px", cursor: "pointer" }}
                            onClick={onClickAddBookmark}
                            src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-check-mintab-for-ios-becris-lineal-becris.png"
                          />
                        )}
                      </div>
                      <span className="ui icon input">
                        <input
                          style={{ width: "280px" }}
                          type="text"
                          placeholder={commentPicked ? "Reply..." : "Add..."}
                          onChange={handleCommentChange}
                          value={commentData}
                        />
                        <Button
                          variant="outline-primary"
                          style={{ marginLeft: "5%" }}
                          onClick={handleSubmitComment}
                          disabled={!commentData}
                        >
                          Post
                        </Button>
                      </span>
                    </span>
                  </form>
                </Row>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
      {user && (
        <AlbumModal
          show={showFavorite}
          setShow={setShowFavorite}
          favoriteList={user.albums}
          postInfo={postInfo}
        />
      )}
    </span>
  );
};

export default PostModal;
