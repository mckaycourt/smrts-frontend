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
        {  console.log(props.data)}
        {!props.data.length ? (
          <div className="progress blue">
              <div className="indeterminate blue lighten-4"></div>
          </div>                 
        ):('')}
    
        {
        props.data.map((tweet, i) => (
                    <Tweet username={tweet.user.name}
                           body={tweet.text}
                           retweet={tweet.retweet_count}
                           createdAt={tweet.created_at}
                           key={i}
                           screenName={tweet.user.screen_name}
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