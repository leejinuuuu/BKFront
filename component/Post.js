import React from 'react'
import {Col, Image, Row} from "react-bootstrap";
import PostCard from "./PostCard";
import SimplePostCard from "./SimplePostCard";
import {useSelector} from "react-redux";

const Post = (show, setShow) => {
  const posts = [];
  const simplePosts = [];
  const stackPosts = [];

  const {mainPost} = useSelector(state => state.postReducer)

  for (let i = 0; i < Math.ceil(mainPost.length / 2) * 2; i+=2) {
    posts.push(
      <div key={i}>
        <Row style={{marginBottom: "5%"}}>
          <Col xs={"6"}>
            <PostCard postInfo={mainPost[i]}/>
          </Col>
          <Col xs={"6"}>
            {i >= mainPost.length-1 ? null : <PostCard postInfo={mainPost[i+1]}/> }
          </Col>
        </Row>
      </div>
    )
  }

  for (let i = 0; i < Math.ceil(mainPost.length / 3) * 3; i+=3) {
    simplePosts.push(
      <Row>
        <Col xs={"4"}>
          <SimplePostCard postInfo={mainPost[i]}/>
        </Col>
        <Col xs={"4"}>
          {i >= mainPost.length-1 ? null : <SimplePostCard postInfo={mainPost[i+1]}/> }
        </Col>
        <Col xs={"4"}>
          {i >= mainPost.length-2 ? null : <SimplePostCard postInfo={mainPost[i+2]}/> }
        </Col>
      </Row>

    )
  }

  for (let i = 0; i < 20; i++) {
    stackPosts.push(
      <Image width={i * 20} src="https://static-cdn.jtvnw.net/jtv_user_pictures/98bb53c3-4e2f-47f3-9c4b-6c0484b383f6-profile_image-300x300.png" style={{margin: "2px"}}/>
    )
  }

  return(
    <div>
      {posts}
    </div>
  )
}

export default Post;