import React, {useCallback, useEffect, useState} from 'react'
import {ButtonGroup, Col, Dropdown, DropdownButton, Image, Row} from "react-bootstrap";
import PostCard from "./PostCard";
import SimplePostCard from "./SimplePostCard";
import {useDispatch, useSelector} from "react-redux";
import {SORT_POSTS} from "../config/event/eventName/postEvent";
import SimpleSlider from "./SimpleSlider";

const Post = (show, setShow) => {
  const dispatch = useDispatch();

  const [size, setSize] = useState(0);
  const [order, setOrder] = useState(0);
  const [posts, setPosts] = useState([]);

  const {mainPost} = useSelector(state => state.postReducer)

  useEffect(() => {
    let tempArr = []
    if(size === 0) {
      for (let i=0; i<mainPost.length; i++) {
        tempArr.push(
          <div key={i}>
            <PostCard postInfo={mainPost[i]} size={size}/>
          </div>
        )
      }
    } else if(size === 1) {
      tempArr.push(
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
    } else if(size === 2) {
      for (let i = 0; i < Math.ceil(mainPost.length / 4) * 4; i+=4) {
        tempArr.push(
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
    }
    setPosts(tempArr)
  }, [size, mainPost])

  const onClickBig = useCallback(() => {
    setSize(0)
  }, [])

  const onClickNormal = useCallback(() => {
    setSize(1)
  }, [])

  const onClickSimple = useCallback(() => {
    setSize(2)
  }, [])

  const onClickCreatedAtSort = useCallback(() => {
    setOrder(0);
    dispatch({
      type: SORT_POSTS,
      data: {
        order: 0
      }
    })
  }, [])

  const onClickLikeNumSort = useCallback(() => {
    setOrder(1);
    dispatch({
      type: SORT_POSTS,
      data: {
        order: 1
      }
    })
  }, [])

  const onClickCommentNumSort = useCallback(() => {
    setOrder(2);
    dispatch({
      type: SORT_POSTS,
      data: {
        order: 2
      }
    })
  }, [])

  return(
    <div>
      <DropdownButton
        as={ButtonGroup}
        key={"Success"}
        id={`dropdown-variants-Success`}
        variant={"success"}
        title="보기"
      >
        <Dropdown.Item onClick={onClickBig}>큰 카드</Dropdown.Item>
        <Dropdown.Item onClick={onClickNormal}>카드</Dropdown.Item>
        <Dropdown.Item onClick={onClickSimple}>간단히</Dropdown.Item>
      </DropdownButton>

      <DropdownButton
        as={ButtonGroup}
        key={"Success"}
        id={`dropdown-variants-Success`}
        variant={"success"}
        title="정렬"
        style={{marginLeft: "1px"}}
      >
        <Dropdown.Item onClick={onClickCreatedAtSort}>생성 일자</Dropdown.Item>
        <Dropdown.Item onClick={onClickLikeNumSort}>좋아요</Dropdown.Item>
        <Dropdown.Item onClick={onClickCommentNumSort}>댓글</Dropdown.Item>
      </DropdownButton>

      <SimpleSlider/>

      <div style={{marginTop: "2%"}}>
        {posts}
      </div>
    </div>
  )
}

export default Post;