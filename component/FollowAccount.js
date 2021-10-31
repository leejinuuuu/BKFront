import React from 'react'
import {Image} from "react-bootstrap";
import {imageURL} from "../config/config";
import Link from 'next/link'
import {useSelector} from "react-redux";

const FollowAccount = ({accounts, isFollower}) => {
  const { user } = useSelector(state => state.userReducer)
  return(
    <div className="ui items" style={{marginLeft: "30px"}}>
      {
        accounts.map(account => {
          return (
            <div className="item">
              <Link href={"/profile/" + account.username}>
                <div className="ui small image" style={{cursor: "pointer"}}>
                  <Image style={{width: "40px"}} src={imageURL + account.profileImage} roundedCircle />
                </div>
              </Link>
              <div className="content" style={{marginLeft: "-120px", paddingTop: "2px"}}>
                <div className="header" style={{fontSize: "90%"}}>{account.username}</div>
                <div className="meta" style={{marginTop: "1px"}}>
                  <span className="price" style={{fontSize: "90%"}}>구독자</span>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default FollowAccount;