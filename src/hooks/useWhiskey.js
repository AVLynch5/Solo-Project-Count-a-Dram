import { useSelector } from 'react-redux';

//Selector gets whiskey reducer

const useWhiskey = () => {
  return useSelector(store => store.whiskey)
}

export default useWhiskey;
