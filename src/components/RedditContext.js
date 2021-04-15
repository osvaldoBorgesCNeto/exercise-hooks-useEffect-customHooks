import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getPostsBySubreddit } from '../services/redditAPI';

const Context = createContext();
const { Provider, Consumer } = Context;

const INITIAL_POST = {
  frontend: {},
  reactjs: {},
}

function RedditProvider({ children }) {
  const [postsBySubreddit, setPostsBySubreddit] = useState(INITIAL_POST);
  const [selectedSubreddit, setSelectedSubreddit] = useState('reactjs');
  const [shouldRefreshSubreddit, setShouldRefreshSubreddit] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [selectedSubreddit, shouldRefreshSubreddit]);

  const fetchPosts = () => {
    if (!shouldFetchPosts()) return;

    setShouldRefreshSubreddit(false);
    setIsFetching(true);

    getPostsBySubreddit(selectedSubreddit)
      .then(handleFetchSuccess, handleFetchError);
  }

  const shouldFetchPosts = () => {
    const posts = postsBySubreddit[selectedSubreddit];

    if (!posts.items) return true;
    if (isFetching) return false;
    return shouldRefreshSubreddit;
  }

  const handleFetchSuccess = (json) => {
    const lastUpdated = Date.now();
    const items = json.data.children.map((child) => child.data);

    const newState = {
      ...postsBySubreddit,
      [selectedSubreddit]: {
        items,
        lastUpdated,
      }
    };

    setPostsBySubreddit(newState);
    setShouldRefreshSubreddit(false);
    setIsFetching(false);
  }

  const handleFetchError = (error) => {
    const newState = {
      ...postsBySubreddit,
      [selectedSubreddit]: {
        error: error.message,
        items: [],
      }
    };

    setPostsBySubreddit(newState);
    setShouldRefreshSubreddit(false);
    setIsFetching(false);
  }

  const handleSubredditChange = (selectedSubreddit) => {
    setSelectedSubreddit(selectedSubreddit);
  }

  const handleRefreshSubreddit = () => {
    setShouldRefreshSubreddit(true);
  }

  const context = {
     postsBySubreddit,
    selectedSubreddit,
    shouldRefreshSubreddit,
    isFetching,
    selectSubreddit: handleSubredditChange,
    fetchPosts,
    refreshSubreddit: handleRefreshSubreddit,
    availableSubreddits: Object.keys(postsBySubreddit),
    posts: postsBySubreddit[selectedSubreddit].items,
  };

  return (
    <Provider value={context}>
      {children}
    </Provider>
  );
}

RedditProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { RedditProvider as Provider, Consumer, Context };