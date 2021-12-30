import React, {useState} from 'react'
import {Col, Image, Row} from "react-bootstrap";
import PostCard from "./PostCard";
import SimplePostCard from "./SimplePostCard";
import {useSelector} from "react-redux";

const Post = (show, setShow) => {
  const posts = [];
  const simplePosts = [];
  const bigPosts = [];

  const {mainPost} = useSelector(state => state.postReducer)

  for (let i=0; i<mainPost.length; i++) {
    bigPosts.push(
      <div key={i}>
        <PostCard postInfo={mainPost[i]}/>
      </div>
    )
  }

  posts.push(
    <Row style={{marginBottom: "5%"}}>
      <Col xs={"4"}>
        {
          mainPost.map((e, i) => {
            if(i % 3 === 0) return <PostCard postInfo={mainPost[i]}/>
          })
        }
      </Col>
      <Col xs={"4"}>
        {
          mainPost.map((e, i) => {
            if(i % 3 === 1) return <PostCard postInfo={mainPost[i]}/>
          })
        }
      </Col>
      <Col xs={"4"}>
        {
          mainPost.map((e, i) => {
            if(i % 3 === 2) return <PostCard postInfo={mainPost[i]}/>
          })
        }
      </Col>
    </Row>
  )

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
    <div style={{padding: "20px", }}>
      {posts}
    </div>
  )
}

export default Post;