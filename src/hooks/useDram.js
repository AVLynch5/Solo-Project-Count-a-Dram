import { useSelector } from 'react-redux';

//Selector gets dram reducer

const useDram = () => {
  return useSelector(store => store.dram)
}

export default useDram;