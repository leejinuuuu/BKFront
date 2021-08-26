import React from 'react';
import axios from "axios";
import {GOOGLE_LOAD_USER_REQUEST} from "../config/event/eventName/userEvent";
import {END} from "redux-saga";
import wrapper from "../store/store-wrapper";
import {connect, useSelector} from "react-redux";

const home = () => {

    const { user } = useSelector(state => state.userReducer)

    return (
        <div>
            {user.name}
        </div>
    )
};

export const getServerSideProps = wrapper.getServerSideProps(store =>
    async ({ req, res, ...etc}) => {
        const cookie = req ? req.headers.cookie : '';
        axios.defaults.headers.Cookie = '';
        axios.defaults.withCredentials = true;
        if (req && cookie) {
            axios.defaults.headers.Cookie = cookie;
        }
        store.dispatch({
            type:GOOGLE_LOAD_USER_REQUEST
        });
        store.dispatch(END);
        await store.sagaTask.toPromise();
    }
);


export default connect(state => state)(home);