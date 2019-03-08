import React from 'react';
import PropTypes from 'prop-types';
import Tweet from "./Tweet";
import faker from 'faker';

const profilePics = [];
// const userNames = [];
// const tweetText = [];

for(let i = 0; i < 1000; i++){
    profilePics.push(faker.image.avatar());
    // userNames.push(faker.name.findName());
    // tweetText.push(faker.lorem.sentence());
}


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
                           avatar={profilePics[i]}
                    />
            ))
        }
    </div>
);

Tweets.propTypes = {
    data: PropTypes.array,
};

export default Tweets;