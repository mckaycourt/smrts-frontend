import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/style.css';

const Tweet = props => (
    <div className="tweetEntry">
        <div className="tweetEntry-content">
            <div className="tweetEntry-account-group">
                <img alt='img' className="tweetEntry-avatar" src={props.avatar || 'https://pbs.twimg.com/profile_images/789948995183316993/POwGu01F_bigger.jpg'}/>
                <strong className="tweetEntry-fullname">
                    {props.screenName}
                </strong>
                <span className="tweetEntry-username"> @<b>{props.username}</b></span>
                <span className="tweetEntry-timestamp"> - {props.createdAt}</span>
                <span className="tweetEntry-timestamp">- {props.createdAt}</span>
            </div>
            <div className="tweetEntry-text-container">
                {props.body}
                <div className='hashTags'>
                    {
                        props.hashTags.map((hashTag, i) => (
                            <span key={i}>#{hashTag.text} </span>
                        ))
                    }
                </div>
            </div>
        </div>

        {
            props.img &&
            <div className="optionalMedia">
                <img alt='img' className="optionalMedia-img" src={props.img}/>
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
    avatar: PropTypes.string,
};

export default Tweet;