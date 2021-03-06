import { useState } from "react";
import { useDispatch } from "react-redux";
import useUser from "../../hooks/useUser";
import {Paper} from '@mui/material';
import './AddADram.css';
import {Button} from '@mui/material';
import {TextField, MenuItem} from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';
import Constants from "../../Constants";

function AddADram(){
    //dispatch
    const dispatch = useDispatch();

    const user = useUser();

    //state vars
    const [newDram, setNewDram] = useState({name: '', proof: '', quantity: '', calories: '', locType: ''});
    const [checked, setChecked] = useState(false);
    const [value, setValue] = useState(new Date());

    //function calCals to calculate calories given user input
    const calcCals = (event) => {
        event.preventDefault();
        //input validation here-ensure user inputted numbers into proof/quantity fields. Also ensure proof <= 200
        const validation = validateNums();
        if (validation) {
            const ozAlc = (newDram.proof*newDram.quantity)/Constants.alcByVolume;
            const mLAlc = Constants.mlPerOz*ozAlc;
            const gAlc = Constants.gramsPerMlAlc*mLAlc;
            const dramCals = Constants.calsPerGramAlc*gAlc;
            setNewDram({...newDram, calories: parseInt(dramCals)});
        } else{
            swal('Please enter valid proof and quantity values');
            return;
        } 
    }

    //function handlePost - checks if calories calculated (inputs validated by calcCals) before dispatch
    const handlePost = () => {
        //check - user must have entered info and calculated to POST
        if (!newDram.calories || !newDram.locType) {
            swal('Please enter dram information and calculate calories');
            return;
        } else {
            dispatch({type: 'ADD_NEW_DRAM', payload: {...newDram, timeDate: value.valueOf()}});
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
        setNewDram({name: '', proof: '', quantity: '', calories: '', locType: ''});
        setValue(new Date());
    }

    //double-arrow functions to clean-up onChange 
    const handleChange = (propertyKey) => (event) => {
        setNewDram({...newDram, [propertyKey]: event.target.value})
    }

    //function to handle checkbox toggle true/false
    const handleCheckbox = () => {
        setChecked(!checked);
    }

    const currentTime = moment(Date()).local().add(1, 'days').format('YYYY-MM-DD');

    const whiskeyLocType = Constants.whiskeyTypes;

    return(
        <div className="wholePage">
        <Paper className="pageContainer" elevation={10} sx={{backgroundColor: '#F09F41'}}>
            <>
            <h3>Add a Dram</h3>
            {/* <p>{JSON.stringify(newDram)}</p> */}
            <div className="form">
                <form className="centerText" onSubmit={calcCals}>
                    <TextField size="small" variant='outlined' sx={{color: 'black', backgroundColor: 'white', border: 3, borderColor: 'brown', marginBottom: 0.5, marginLeft: 0.5, marginRight: 0.5}} inputProps={{style: { fontSize: 22 }}} InputLabelProps={{ style: { fontSize: 22 } }} label="Whiskey Name" type="text" value={newDram.name} onChange={handleChange('name')}/>
                    <TextField size="small" variant='outlined' sx={{color: 'black', backgroundColor: 'white', border: 3, borderColor: 'brown', marginBottom: 0.5, marginLeft: 0.5, marginRight: 0.5}} required type="number" inputProps={{step: "any", style: { fontSize: 22 }}} InputLabelProps={{ style: { fontSize: 22 } }} label="Whiskey Proof" value={newDram.proof} onChange={handleChange('proof')}/>
                    <TextField size="small" variant='outlined' sx={{color: 'black', backgroundColor: 'white', border: 3, borderColor: 'brown', marginBottom: 0.5, marginLeft: 0.5, marginRight: 0.5}} required type="number" inputProps={{step: "any", style: { fontSize: 22 }}} label="Quantity (oz)" InputLabelProps={{ style: { fontSize: 22 } }} value={newDram.quantity} onChange={handleChange('quantity')}/>
                    <br />
                    <TextField select disabled={user.id == null ? true : false} label="Type" size="small" variant='filled' sx={{minWidth: 140, color: 'black', backgroundColor: 'white', border: 3, borderColor: 'brown', marginBottom: 0.0, marginLeft: 0.5, marginRight: 0.5}} InputLabelProps={{ style: { fontSize: 22 } }} value={newDram.locType} onChange={handleChange('locType')}>
                        {whiskeyLocType.map((option, i) => (
                            <MenuItem key={i} value={option}>{option}</MenuItem>
                        ))}
                    </TextField>    
                    <br/>
                    <Button variant='outlined' sx={{color: 'black', backgroundColor: 'white', border: 3, borderColor: 'brown', marginTop: 0.5, marginBottom: 0.5, marginLeft: 0.5, marginRight: 0.5}} type="submit">Calculate Calories</Button>
                    <Button variant='outlined' sx={{color: 'black', backgroundColor: 'white', border: 3, borderColor: 'brown', marginTop: 0.5, marginBottom: 0.5, marginLeft: 0.5, marginRight: 0.5}} onClick={clearInputs}>Clear form</Button>
                </form>
            </div>
            <div className="caloriesBox">
                <p className="leftText">Calories: {newDram.calories}</p>
            </div>
            <label><input type="checkbox" checked={checked} onChange={handleCheckbox} />This is a retroactive dram addition</label>
            <br></br>
            {checked ? <div className="pickerDisp"><LocalizationProvider dateAdapter={AdapterDateFns}><DateTimePicker maxDate={new Date(currentTime)} renderInput={(props) => <TextField {...props} />} value={value} onChange={(newValue) => {setValue(newValue)}}/></LocalizationProvider></div> : ""}
            {user.id != null ? <Button variant='outlined' sx={{display: 'block', marginLeft: 'auto', marginRight: 'auto', color: 'black', backgroundColor: 'white', border: 3, borderColor: 'brown', marginBottom: 0.5}} onClick={handlePost}>Add this dram</Button> : ''}
            </>
        </Paper>
        </div>
    );
}

export default AddADram;

{/* <DatePicker value={value} onChange={(newValue) => {setValue(newValue)}} className="pickerDisp"/> */}