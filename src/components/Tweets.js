import React from 'react';
import PropTypes from 'prop-types';
import Tweet from "./Tweet";
import faker from 'faker';
var moment = require('moment');

const Tweets = props => (
    <div className='tweetEntry-tweetHolder'>
        {console.log(props.data)}
        {!props.data.length ? (
            <div className="center-align">
                <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue-only">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        ) : ('')
        }{
            props.data.map((tweet, i) => (
                <Tweet
                    screenName={tweet.user.name}
                    body={tweet.text}
                    retweet={tweet.retweet_count}
                    createdAt={moment(tweet.created_at).format('llll')}
                    key={i}
                    username={tweet.user.screen_name}
                    avatar={tweet.user.profile_image_url}
                    img={tweet.extended_entities.media[0].media_url}
                    hashTags={tweet.entities.hashtags}
                    verified={tweet.user.verified}
                />
            ))
        }
    </div>
);

Tweets.propTypes = {
    data: PropTypes.array,
};

export default Tweets;