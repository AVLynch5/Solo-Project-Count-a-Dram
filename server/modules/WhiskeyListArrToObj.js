// function to restructure WhiskeyList GET results array to an object 

const processWhiskeyList = (array) => {
    const filterNoName = array.filter(whiskey => whiskey.whiskey_name != "");
    const whiskeyCategories = filterNoName.reduce((nameWhiskeys, {whiskey_type, whiskey_name, whiskey_proof}) => {
        if (!nameWhiskeys[whiskey_type]) nameWhiskeys[whiskey_type] = [];
        nameWhiskeys[whiskey_type].push({"name": whiskey_name, "proof": whiskey_proof});
        return nameWhiskeys;
    }, {});
    setWhiskeyListObj(whiskeyCategories);
};
  
  module.exports = {
    processWhiskeyList,
  };