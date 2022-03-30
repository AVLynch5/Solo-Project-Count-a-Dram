// function to restructure range GET results array to an object 

const rearrangeArray = (initialArr) => {
  const newObj = {};
  for (let obj of initialArr) {
      let localDate = new Date(+obj.dram_epoch).toLocaleDateString();//this converts the epoch timestamp to the user's local date
      if (!newObj.localDate) {
          newObj.localDate = {"sumQuant": obj.dram_quantity, "sumCals": obj.dram_calories};
      } else {
          newObj.localDate.sumQuant += obj.dram_quantity;
          newObj.localDate.sumCals += obj.dram_calories;
      }
  }
  return newObj;
};

module.exports = {
  rearrangeArray,
};