import { useDispatch } from "react-redux";
import { useState } from "react";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import swal from 'sweetalert';
import Button from '@mui/material/Button';

function ViewDramChild({dramList, entry}) {
    const dispatch = useDispatch();

     //function to handle DELETE and make dispatch. Requires dram id to DELETE and date to GET updated dram array
    const handleDelete = (dramDate, dramID) => {
        swal({
            title: 'Really delete this dram entry?',
            text: 'Once deleted, this dram entry cannot be recovered!',
            icon: 'warning',
            buttons: ['HECK no', 'Delete!'],
            dangerMode: true,
        }).then((confirmDelete) => {
            if (confirmDelete) {
                swal('The dram entry was deleted', {button: 'Great!', icon: 'success',});
                dispatch({type: 'DELETE_DRAM', payload: {date: dramDate, id: dramID}});
            } else {
                swal('The dram entry was not deleted', {button: 'Excellent!'});
                return;//cancels function, deleteFeedback not called
            }
        })
    }

    //state var to toggle b/t editMode
    const [editMode, setEditMode] = useState(false);
    
    //editMode toggle function
    const editDram = () => {
        setEditMode(!editMode);
    }

    //function calCals to calculate calories given user input
    const calcCals = (proof, quantity) => {
        const ozAlc = (proof*quantity)/200;//(proof/2) -> % alcohol, (% alcohol/100) -> decimal alcohol, (decimal alcohol * quantity in oz) -> oz alcohol
        const mLAlc = 29.5735*ozAlc;//(29.5735 mL/oz)* oz Alcohol -> mL Alcohol
        const gAlc = 0.789*mLAlc;//(0.789g/mL)* mL Alcohol -> g alcohol
        const dramCals = 7*gAlc;//(7 calories/g)* g alcohol -> calories alcohol
        return parseInt(dramCals); 
    }

    //function to validate inputted numbers
    const validateNums = (proof, quantity) => {
        //inputted nums should not be negative
        if (proof < 0 || quantity < 0) {
            return false;
        }
        //proof cannot exceed 200 
        if (proof > 200) {
            return false;
        }
        else 
            return true
    }

    //function handlePut
    const handlePut = () =>{
        const index = dramList.indexOf(entry);
        const proof = entry.whiskey_proof;
        const quantity = entry.dram_quantity;
        if (validateNums(proof, quantity)) {
            const waitForCals = calcCals(proof, quantity);
            dispatch({type: 'EDIT_DRAM_CALORIES', payload: {index: index, calories: waitForCals}})
            dispatch({type: 'EDIT_DB_DRAM', payload: {...entry, dram_calories: waitForCals}});
            setEditMode(!editMode);
        } else {
            swal('Please enter valid proof and quantity values');
            return;
        }
    }

    //double-arrow functions to clean-up onChange 
    const handleChange = (propertyKey) => (event) => {
        dispatch({type: `EDIT_WHISKEY_${propertyKey}`, payload: {index: dramList.indexOf(entry), [propertyKey]: event.target.value}})
    }

    const whiskeyLocType = ['Scotch', 'Bourbon', 'Rye'];

    return(
        <>
            <TableRow>
                <TableCell align={"center"}>{editMode ? <input type="text" value={dramList[dramList.indexOf(entry)].whiskey_name} onChange={handleChange('NAME')}/> : entry.whiskey_name}</TableCell>
                <TableCell align={"center"}>{editMode ? <input required type="number" value={dramList[dramList.indexOf(entry)].whiskey_proof} onChange={handleChange('PROOF')}/> : entry.whiskey_proof}</TableCell>
                <TableCell align={"center"}>{editMode ? <select required value={dramList[dramList.indexOf(entry)].whiskey_type} onChange={handleChange('TYPE')}>
                    {whiskeyLocType.map((optionType) => (
                        <option value={optionType}>{optionType}</option>
                    ))}
                    </select> : entry.whiskey_type}</TableCell>
                <TableCell align={"center"}>{editMode ? <input required type="number" value={dramList[dramList.indexOf(entry)].dram_quantity} onChange={handleChange('QUANTITY')}/> : entry.dram_quantity}</TableCell>
                <TableCell align={"center"}>{entry.dram_calories}</TableCell>
                <TableCell align={"center"}><Button onClick={() => handleDelete(entry.dram_date, entry.id)}>{<DeleteIcon />}</Button></TableCell>
                <TableCell align={"center"}>{editMode ? <Button onClick={handlePut}>{<DoneIcon />}</Button> : <Button onClick={editDram}>{<EditIcon />}</Button>}</TableCell>
            </TableRow>
        </>
    );
}

export default ViewDramChild;

//prev dispatch
//(event) => dispatch({type: 'EDIT_WHISKEY_NAME', payload: {index: dramList.indexOf(entry), name: event.target.value}})