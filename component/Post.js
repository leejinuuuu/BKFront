import React from 'react'
import {Col, Row} from "react-bootstrap";
import PostCard from "./PostCard";

const Post = (show, setShow) => {
  const postInfo = ["Elliot1", "Elliot2", "Elliot3", "Elliot4", "Elliot5"];
  const posts = [];

  for (let i = 1; i <= postInfo.length; i+=2) {
    if(postInfo.length %2 !== 0 && i === postInfo.length) {
      posts.push(
        <div key={i}>
          <Row style={{marginBottom: "5%"}}>
            <Col xs={"6"}>
              <PostCard postInfo={postInfo[i-1]}/>
            </Col>
            <Col xs={"6"}/>
          </Row>
        </div>
      )
    }
    else {
      posts.push(
        <div key={i}>
          <Row style={{marginBottom: "5%"}}>
            <Col xs={"6"}>
              <PostCard postInfo={postInfo[i-1]}/>
            </Col>
            <Col xs={"6"}>
              <PostCard postInfo={postInfo[i]}/>
            </Col>
          </Row>
        </div>
      )
    }
  }

  return(
    <div>
      {posts}
    </div>
  )
}

export default Post;