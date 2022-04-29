import React, {useState, useEffect} from 'React';
import axios from 'axios';

function ViewWhiskeyList (){
    const [whiskeyListObj, setWhiskeyListObj] = useState({});

    useEffect(() => {
        fetchData();    
    }, []);

    const fetchData = async () => {
        const result = await axios.get(`/api/whiskies`);
        processWhiskeyList(result.data);
    };

    processWhiskeyList(array) {
        const filterNoName = array.filter(whiskey => whiskey.whiskey_name != "");
        const whiskeyCategories = filterNoName.reduce((nameWhiskeys, {whiskey_type, whiskey_name}) => {
            if (!nameWhiskeys[whiskey_type]) nameWhiskeys[whiskey_type] = [];
            nameWhiskeys[whiskey_type].push(whiskey_name);
            return nameWhiskeys;
        }, {});
        setWhiskeyListObj(whiskeyCategories);
    };

    return(
        <>
        </>
    );
}

export default ViewWhiskeyList;