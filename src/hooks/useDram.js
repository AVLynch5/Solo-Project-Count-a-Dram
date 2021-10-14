import { useSelector } from 'react-redux';

//Selector gets whiskey reducer

const useDram = () => {
  return useSelector(store => store.dram)
}

export default useDram;