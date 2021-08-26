import React from 'react'
import {useDispatch} from "react-redux";
import {GOOGLE_LOGIN_REQUEST} from "../config/event/eventName/userEvent";
import {useRouter} from "next/router";

const test = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    dispatch({
        type: GOOGLE_LOGIN_REQUEST
    })

    return(
        <div>
            haha
        </div>
    )
}

export default test