import React, {useEffect, useState} from 'react'
import {Col, Modal, Row} from "react-bootstrap";
import {connect,} from "react-redux";
import {backURL} from "../config/config";
import axios from "axios";
import SimplePostCard from "./SimplePostCard";

const FavoriteListModal = ({show, setClose, favoriteInfo}) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if(show) {
      console.log("asdfasdf")
      axios.get(backURL + "/favorite/post?favoritelistId=" + favoriteInfo.id)
        .then(res => {
          let temp = []
          for (let i = 0; i < Math.ceil(res.data.length / 4) * 4; i+=4) {
            temp.push(
              <Row>
                <Col xs={"3"}>
                  <SimplePostCard postInfo={res.data[i]}/>
                </Col>
                <Col xs={"3"}>
                  {i >= res.data.length-1 ? null : <SimplePostCard postInfo={res.data[i+1]}/> }
                </Col>
                <Col xs={"3"}>
                  {i >= res.data.length-2 ? null : <SimplePostCard postInfo={res.data[i+2]}/> }
                </Col>
                <Col xs={"3"}>
                  {i >= res.data.length-3 ? null : <SimplePostCard postInfo={res.data[i+3]}/> }
                </Col>
              </Row>
            )
          }
          setPosts(temp)
        })
    }
  }, [show])

  return(
    <Modal show={show} onHide={setClose}>
      <Modal.Header closeButton>
        <Modal.Title>Make Your Clan!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {posts}
      </Modal.Body>
    </Modal>
  )
}

export default connect(state => state)(FavoriteListModal);