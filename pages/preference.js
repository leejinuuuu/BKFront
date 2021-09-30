import React, {useState} from 'react'
import {Button, Col, Row} from "react-bootstrap";
import SimplePostCard from "../component/SimplePostCard";
import PreferenceCard from "../component/PreferenceCard";
import Link from 'next/link'

const Preference = () => {
  const postInfo = [
    "Elliot1", "Elliot2", "Elliot3", "Elliot4", "Elliot5", "Elliot6",
    "Elliot7", "Elliot8", "Elliot9", "Elliot10", "Elliot11", "Elliot12",
    "Elliot1", "Elliot2", "Elliot3", "Elliot4", "Elliot5", "Elliot6",
    "Elliot7", "Elliot8", "Elliot9", "Elliot10", "Elliot11", "Elliot12"
  ];
  const preferenceList = [];

  const [clickedList, setClickedList] = useState(new Array(postInfo.length).fill(false));

  const handleClick = (e) => {
    const array = [...clickedList];
    array[e.target.id] = !array[e.target.id];
    setClickedList(array)
  }

  for (let i = 0; i < Math.ceil(postInfo.length / 6) * 6; i+=6) {
    preferenceList.push(
        <Row>
          <Col xs={"2"}>
            <span id={i} onClick={handleClick}><PreferenceCard keyValue={i} isClicked={clickedList[i]} postInfo={postInfo[i]}/></span>
          </Col>
          <Col xs={"2"}>
            {i >= postInfo.length-1 ? null : <span id={i+1} onClick={handleClick}><PreferenceCard keyValue={i+1} isClicked={clickedList[i+1]} postInfo={postInfo[i+1]}/></span>}
          </Col>
          <Col xs={"2"}>
            {i >= postInfo.length-2 ? null : <span id={i+2} onClick={handleClick}><PreferenceCard keyValue={i+2}isClicked={clickedList[i+2]} postInfo={postInfo[i+2]}/></span>}
          </Col>
          <Col xs={"2"}>
            {i >= postInfo.length-3 ? null : <span id={i+3} onClick={handleClick}><PreferenceCard keyValue={i+3} isClicked={clickedList[i+3]} postInfo={postInfo[i+3]}/></span>}
          </Col>
          <Col xs={"2"}>
            {i >= postInfo.length-4 ? null : <span id={i+4} onClick={handleClick}><PreferenceCard keyValue={i+4} isClicked={clickedList[i+4]} postInfo={postInfo[i+4]}/></span>}
          </Col>
          <Col xs={"2"}>
            {i >= postInfo.length-5 ? null : <span id={i+5} onClick={handleClick}><PreferenceCard keyValue={i+5} isClicked={clickedList[i+5]} postInfo={postInfo[i+5]}/></span>}
          </Col>
        </Row>
    )
  }

  return(
    <div style={{overflowY: "hidden"}}>
      <h1 style={{textAlign: "center", marginTop: "4%", marginBottom: "5%"}}>Preference</h1>
      <Row>
        <Col lg={"2"}/>
        <Col lg={"8"}>
          {preferenceList}
          <div className="d-grid gap-2">
            <Link href="/signup">
              <Button variant="primary" size="lg">
                Submit
              </Button>
            </Link>
          </div>
        </Col>
        <Col lg={"2"}/>
      </Row>
    </div>
  )
}

export default Preference;