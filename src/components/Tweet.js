import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/style.css';

const styles = {
    border: 'solid black 1px',
    margin: '10px',
};

const Tweet = props => (
    <div className="tweetEntry">
        <div className="tweetEntry-content">
            <a className="tweetEntry-account-group" href="[accountURL]">
                <img className="tweetEntry-avatar" src="http://placekitten.com/200/200"/>
                <strong className="tweetEntry-fullname">
                    {props.screenName}
                </strong>
                <span className="tweetEntry-username"> @<b>{props.username}</b></span>
                <span className="tweetEntry-timestamp">- {props.createdAt}</span>
            </a>
            <div className="tweetEntry-text-container">
                {props.body}
            </div>
        </div>
        {
            props.img &&
            <div className="optionalMedia">
                <img className="optionalMedia-img" src="http://placekitten.com/500/400"/>
            </div>
        }
        <div className='icons'>
            <i className="material-icons icon">dvr</i>
            <i className="material-icons icon">reply</i>
            <i className="material-icons icon">trending_up</i>
            <i className="material-icons icon">next_week</i>
        </div>
    </div>
);

Tweet.propTypes = {
    username: PropTypes.string,
    body: PropTypes.string,
    retweet: PropTypes.number,
    createdAt: PropTypes.string,
    screenName: PropTypes.string,
};

export default Tweet;