import { useSelector } from 'react-redux';

//Selector gets data reducer

const useData = () => {
  return useSelector(store => store.data)
}

export default useData;