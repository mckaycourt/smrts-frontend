import React from 'react';
import PropTypes from 'prop-types';
import Tweet from "./Tweet";

const Tweets = props => (
    <div className='tweetEntry-tweetHolder'>
        {
            props.data.map((tweet, i) => (
                tweet[0] && tweet[0].user &&
                    <Tweet username={tweet[0].user.name}
                           body={tweet[0].text}
                           retweet={tweet[0].retweet_count}
                           createdAt={tweet[0].created_at}
                           key={i}
                           screenName={tweet[0].user.screen_name}
                    />
            ))
        }
    </div>
);

Tweets.propTypes = {
    data: PropTypes.array,
};

export default Tweets;