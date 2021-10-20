import { useSelector } from 'react-redux';

//Selector gets user reducer

const useUser = () => {
  return useSelector(store => store.user)
}

export default useUser;