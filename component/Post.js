import React, {useState} from 'react'
import {Col, Image, Row} from "react-bootstrap";
import PostCard from "./PostCard";
import SimplePostCard from "./SimplePostCard";
import {useSelector} from "react-redux";

const Post = (show, setShow) => {
  const posts = [];
  const simplePosts = [];

  const {mainPost} = useSelector(state => state.postReducer)

  for (let i = 0; i < Math.ceil(mainPost.length / 3) * 3; i+=3) {
    posts.push(
      <div key={i}>
        <Row style={{marginBottom: "5%"}}>
          <Col xs={"4"}>
            <PostCard postInfo={mainPost[i]}/>
          </Col>
          <Col xs={"4"}>
            {i >= mainPost.length-1 ? null : <PostCard postInfo={mainPost[i+1]}/> }
          </Col>
          <Col xs={"4"}>
            {i >= mainPost.length-2 ? null : <PostCard postInfo={mainPost[i+2]}/> }
          </Col>
        </Row>
      </div>
    )
  }

  for (let i = 0; i < Math.ceil(mainPost.length / 4) * 4; i+=4) {
    simplePosts.push(
      <Row>
        <Col xs={"3"}>
          <SimplePostCard postInfo={mainPost[i]}/>
        </Col>
        <Col xs={"3"}>
          {i >= mainPost.length-1 ? null : <SimplePostCard postInfo={mainPost[i+1]}/> }
        </Col>
        <Col xs={"3"}>
          {i >= mainPost.length-2 ? null : <SimplePostCard postInfo={mainPost[i+2]}/> }
        </Col>
        <Col xs={"3"}>
          {i >= mainPost.length-3 ? null : <SimplePostCard postInfo={mainPost[i+3]}/> }
        </Col>
      </Row>

    )
  }

  return(
    <div>
      {posts}
    </div>
  )
}

export default Post;