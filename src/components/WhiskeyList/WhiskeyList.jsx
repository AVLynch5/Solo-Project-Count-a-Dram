import React, {useState, useEffect} from 'react';
import axios from 'axios';
import WhiskeyListChild from "../WhiskeyListChild/WhiskeyListChild";
import ReactLoading from 'react-loading';
import './WhiskeyList.css'; 

function ViewWhiskeyList (){
    const [whiskeyListObj, setWhiskeyListObj] = useState({});
    const loadingDiv = () => (
        <div className='containerDiv'><h3 style={{marginBottom: 0.25}}>Waiting for Whiskey(s)</h3><div className='loadingDiv'><ReactLoading type={'bubbles'} color={'#FA7F43'} height={'60%'} width={'60%'} /></div></div>
    );

    useEffect(() => {
        fetchData();    
    }, []);

    const fetchData = async () => {
        const result = await axios.get(`/api/whiskies`);
        setWhiskeyListObj(result.data);
    };

    return(
        <>
            {Object.keys(whiskeyListObj).length == 0 ? loadingDiv() : <WhiskeyListChild childObj={whiskeyListObj}/>}
        </>
    );
};

export default ViewWhiskeyList;