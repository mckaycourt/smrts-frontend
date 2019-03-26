import React from 'react';
import PropTypes from 'prop-types';
import Tweet from "./Tweet";
import faker from 'faker';
var moment = require('moment');

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
            <div className="center-align">
            <div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-blue-only">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div><div className="gap-patch">
                    <div className="circle"></div>
                  </div><div className="circle-clipper right">
                    <div clclassName="circle"></div>
                  </div>
                </div>
              </div> 
            </div>
        ):('')}
    
        {
        props.data.map((tweet, i) => (
                    <Tweet username={tweet.user.screen_name}
                           body={tweet.text}
                           retweet={tweet.retweet_count}
                           createdAt={moment(tweet.created_at).format('llll')}
                           key={i}
                           screenName={tweet.user.name}
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