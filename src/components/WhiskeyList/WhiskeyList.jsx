import React, {useState, useEffect} from 'react';
import axios from 'axios';
import WhiskeyListChild from "../WhiskeyListChild/WhiskeyListChild";

function ViewWhiskeyList (){
    const [whiskeyListObj, setWhiskeyListObj] = useState({});

    useEffect(() => {
        fetchData();    
    }, []);

    const fetchData = async () => {
        const result = await axios.get(`/api/whiskies`);
        setWhiskeyListObj(result.data);
    };

    return(
        <>
            {Object.keys(whiskeyListObj).length == 0 ? "Loading" : <WhiskeyListChild childObj={whiskeyListObj}/>}
        </>
    );
};

export default ViewWhiskeyList;