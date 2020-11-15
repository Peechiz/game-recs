import { useEffect, useReducer, useState } from 'react'

const useFetch = (url, options) => {

  const initialState = {
    data: null,
    err: false,
    isLoading: false
  };

  const [refetchIndex, setRefetchIndex] = useState(0);

  const refetch = () => setRefetchIndex(prev => prev + 1)

  const fetchReducer = (state, action) => {
    return {
      data: action.data || state.data, 
      err: action.err || state.err,
      isLoading: action.isLoading !== undefined ? action.isLoading : state.isLoading,
    }
  }

  const [state, dispatch ] = useReducer(fetchReducer, initialState);

  

  useEffect(() => {
    (async () => {
      dispatch({ isLoading: true });
      if (!url) return;
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        dispatch({ isLoading: false, data: json });
      } catch (e) {
        dispatch({ err: e})
      } 
    })()
  }, [url, options, refetchIndex])


  return {...state, refetch}
}

export default useFetch;