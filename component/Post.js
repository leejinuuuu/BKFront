import React from 'react'
import {Col, Row} from "react-bootstrap";
import PostCard from "./PostCard";
import SimplePostCard from "./SimplePostCard";

const Post = (show, setShow) => {
  const postInfo = ["Elliot1", "Elliot2", "Elliot3", "Elliot4", "Elliot5"];
  const posts = [];
  const simplePosts = [];

  for (let i = 0; i < Math.ceil(postInfo.length / 2) * 2; i+=2) {
    posts.push(
      <div key={i}>
        <Row style={{marginBottom: "5%"}}>
          <Col xs={"6"}>
            <PostCard postInfo={postInfo[i]}/>
          </Col>
          <Col xs={"6"}>
            {i >= postInfo.length-1 ? null : <PostCard postInfo={postInfo[i+1]}/> }
          </Col>
        </Row>
      </div>
    )
  }

  for (let i = 0; i < Math.ceil(postInfo.length / 3) * 3; i+=3) {
    simplePosts.push(
      <Row>
        <Col xs={"4"}>
          <SimplePostCard postInfo={postInfo[i]}/>
        </Col>
        <Col xs={"4"}>
          {i >= postInfo.length-1 ? null : <SimplePostCard postInfo={postInfo[i+1]}/> }
        </Col>
        <Col xs={"4"}>
          {i >= postInfo.length-2 ? null : <SimplePostCard postInfo={postInfo[i+2]}/> }
        </Col>
      </Row>

    )
  }

  return(
    <div>
      {simplePosts}
    </div>
  )
}

export default Post;