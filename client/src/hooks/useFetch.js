import { useEffect, useReducer } from 'react'

const useFetch = (url, options) => {

  const initialState = {
    data: null,
    err: false,
    isLoading: false
  };

  const fetchReducer = (state, action) => {
    return {
      data: action.data || state.data, 
      err: action.err || state.err,
      isLoading: action.isLoading !== undefined ? action.isLoading : state.isLoading,
    }
  }

  const [state, dispatch ] = useReducer(fetchReducer, initialState);

  

  useEffect(() => {
    const fetchTags = async () => {
      dispatch({ isLoading: true });
      if (!url) return;
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        dispatch({ isLoading: false, data: json });
      } catch (e) {
        dispatch({ err: e})
      } 
    }
    fetchTags();
  }, [url, options])


  return state
}

export default useFetch;