import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  // const userId = _.uniq(_.map(getState().posts, 'userId'));
  // userId.forEach(id => dispatch(fetchUser(id)));
  // Bellow with chain

  _.chain(getState().posts)
    .map('userId')
      .uniq()
        .forEach(id => dispatch(fetchUser(id)))
          .value();
};



export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts');

  dispatch({ type: 'FETCH_POSTS', payload: response.data })
};

export const fetchUser = (id) => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: 'FETCH_USER', payload: response.data})
};



// Memoized Action Creator

// export const fetchUser = (id) => dispatch => _fetchUser(id, dispatch)

//   const _fetchUser = _memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: 'FETCH_USER', payload: response.data})
//   });