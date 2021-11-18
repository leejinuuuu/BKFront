import React, {useCallback, useEffect, useState} from 'react'
import {Image} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {imageURL} from "../config/config";
import {FOLLOW_ACCOUNT_REQUEST, UNFOLLOW_ACCOUNT_REQUEST} from "../config/event/eventName/userEvent";
import Link from 'next/link'

const RecommendAccount = ({ accounts }) => {
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.userReducer)
  const [isClicked, setIsClicked] = useState(false)

  const onClickFollow = useCallback((e) => {
    setIsClicked(!isClicked)
    let flag = false;
    for(let i=0; i<accounts.length; i++) {
      if(accounts[i].id === e.target.id) {
        flag = accounts[i].isFollowed;
      }
    }

    if(flag) {
      dispatch({
        type: UNFOLLOW_ACCOUNT_REQUEST,
        data: {
          followerId: user.id,
          followeeId: e.target.id
        },
        plus: {
          userId:  e.target.id
        }
      })
    } else {
      dispatch({
        type: FOLLOW_ACCOUNT_REQUEST,
        data: {
          followerId: user.id,
          followeeId: e.target.id
        },
        plus: {
          userId:  e.target.id
        }
      })
    }
  }, [accounts, user])

  return(
    <div className="ui items" style={{marginLeft: "30px"}}>
      {
        accounts.map(v => {
          return (
            <div className="item">
              <Link href={"/profile/" + v.username}>
                <div className="ui small image" style={{cursor: "pointer"}}>
                  <Image style={{width: "40px"}} src={imageURL + v.profileImage} roundedCircle />
                </div>
              </Link>
              <div className="content" style={{marginLeft: "-120px", paddingTop: "2px"}}>
                <div className="header" style={{fontSize: "90%"}}>{v.username}</div>
                <div className="meta" style={{marginTop: "1px"}}>
                  <span className="price" style={{fontSize: "90%"}}>추천작가</span>
                </div>
              </div>
              <button onClick={onClickFollow} id={v.id} className="ui active button" style={{width: "0px", height: "40px", left: "15%", position: "relative", zIndex: "0", backgroundColor: "white"}}>
                {v.isFollowed ? "unFollow" : "Follow"}
              </button>
            </div>
          )
        })
      }
    </div>
  )
}

export default RecommendAccount;