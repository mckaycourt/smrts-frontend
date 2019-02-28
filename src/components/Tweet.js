import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    border: 'solid black 1px',
};

const Tweet = props => (
    <div style={styles}>
        <h2>{props.username}</h2>
        <p>{props.body}</p>
        <div>
            Retweets: {props.retweet} Created at: {props.createdAt}
        </div>
    </div>
);

Tweet.propTypes = {
    username: PropTypes.string,
    body: PropTypes.string,
    retweet: PropTypes.number,
    createdAt: PropTypes.string,
};

export default Tweet;