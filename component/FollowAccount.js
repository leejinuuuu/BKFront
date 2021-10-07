import React from 'react'
import {Image} from "react-bootstrap";

const FollowAccount = ({accounts, isFollower}) => {
  return(
    <div className="ui items" style={{marginLeft: "30px"}}>
      {accounts.map(account => {
        return (
          <div className="item">
            <div className="ui small image">
              <Image style={{width: "40px"}} src={"http://localhost:8081/" + account.profileImage} roundedCircle />
            </div>
            <div className="content" style={{marginLeft: "-120px", paddingTop: "2px"}}>
              <div className="header" style={{fontSize: "90%"}}>{account.username}</div>
              <div className="meta" style={{marginTop: "1px"}}>
                <span className="price" style={{fontSize: "90%"}}>추천작가</span>
              </div>
            </div>
            <div style={{marginRight: "6%"}}>{isFollower ? <i className="heartbeat icon"/> : <i className="heart icon"/>}</div>
          </div>
        )
      })}
    </div>
  )
}

export default FollowAccount;