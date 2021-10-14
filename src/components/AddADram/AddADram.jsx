import { useState } from "react";
import useWhiskey from "../../hooks/useWhiskey";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function AddADram(){
    //dispatch
    const dispatch = useDispatch();

    //state var
    const [newDram, setNewDram] = useState({name: '', proof: '', quantity: '', calories: '', whiskeyExists: false, whiskeyID: ''});

    //array of whiskies
    const whiskeyArray = useWhiskey();

    //useEffect - call fetchWhiskies on load
    useEffect(() => {
        fetchWhiskies();
    }, []);

    //function fetchWhiskies - GETs whiskey array
    const fetchWhiskies = () => {
        dispatch({type: 'FETCH_WHISKEY_DB'});
    }

    //function calCals to calculate calories given user input
    const calcCals = async (event) => {
        event.preventDefault();
        //input validation here-ensure user inputted numbers into proof/quantity fields. Also ensure proof <= 200
        const validation = validateNums();
        const duplicate = await checkDBForWhiskey();
        if (validation) {
            const ozAlc = (newDram.proof*newDram.quantity)/200;
            const mLAlc = 29.5735*ozAlc;
            const gAlc = 0.789*mLAlc;
            const dramCals = 7*gAlc;
            if (duplicate.status) {
                setNewDram({...newDram, calories: parseInt(dramCals), whiskeyExists: true, whiskeyID: duplicate.param});
            } else {
                setNewDram({...newDram, calories: parseInt(dramCals)});
            }
        } else{
            alert('Please enter valid proof and quantity values');
            return;
        } 
    }

    //function to check if whiskey already exists in DB
    const checkDBForWhiskey = () => {
        //if newDram whiskey info matches entry already in DB, change exists property to true and change whiskeyID to whiskey.id
        for (let whiskey of whiskeyArray) {
            if (whiskey.whiskey_name == newDram.name && whiskey.whiskey_proof == newDram.proof) {
                console.log('DUP!');
                return {status: true, param: whiskey.id};
            }
        }
        return {status: false};
    }

    //function handlePost - checks if whiskey name/proof exists in whiskeyArray to finalize post payload
    const handlePost = () => {
        //check - user must have entered info and calculated to POST
        if (!newDram.calories) {
            alert('Please enter dram information and calculate');
            return;
        } else {
            dispatch({type: 'ADD_NEW_DRAM', payload: newDram});
            clearInputs();
            //after dispatch, route user to view drams component
        }  
    }

    //function to validate inputted numbers
    const validateNums = () => {
        //inputted nums should not be negative
        if (newDram.proof < 0 || newDram.quantity < 0) {
            return false;
        }
        //proof cannot exceed 200 
        if (newDram.proof > 200) {
            return false;
        }
        else 
            return true
    }

    const clearInputs = () => {
        //consider validation sweetAlert - ensure user wants to clear
        setNewDram({name: '', proof: '', quantity: '', calories: '', whiskeyExists: false, whiskeyID: ''});
    }

    return(
        <>
            <h1>Add a Dram</h1>
            <p>{JSON.stringify(newDram)}</p>
            <form onSubmit={calcCals}>
                <input placeholder="whiskey name" type="text" value={newDram.name} onChange={(event) => setNewDram({...newDram, name: event.target.value})}/>
                <input required type="number" placeholder="whiskey proof" value={newDram.proof} onChange={(event) => setNewDram({...newDram, proof: event.target.value})}/>
                <input required type="number" placeholder="Oz whiskey" value={newDram.quantity} onChange={(event) => setNewDram({...newDram, quantity: event.target.value})}/>
                <button type="submit">Calculate Calories</button>
                <button onClick={clearInputs}>Clear form</button>
            </form>
            <p>Calories: {newDram.calories}</p>
            <button onClick={handlePost}>Add this dram</button>
        </>
    );
}

export default AddADram;