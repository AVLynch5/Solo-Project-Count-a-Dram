import React, {useState} from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { useDispatch } from "react-redux";
import { Bar } from 'react-chartjs-2';
import useData from "../../hooks/useData";
import './AnalyzeDrams.css';
import {Chart} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
Chart.register(annotationPlugin);
import {Paper} from '@mui/material';
import {Button} from '@mui/material';
import swal from 'sweetalert';


function AnalyzeDrams(){
    const [value, setValue] = useState(new Date());

    const [barStuff, setBarStuff] = useState({dates: [], calData: [], quantData: []});

    const dispatch = useDispatch();

    const dataArray = useData();

    const average = (array) => {
        let total = 0;
        for (let num of array) {
            total += parseInt(num);
        }
        const avg = total/array.length;
        return avg;
    }

    let barData = {
        labels: barStuff.dates,
        datasets: [
            {
                label: 'Calories',
                yAxisID: 'A',
                data: barStuff.calData,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
            {
                label: 'Drams',
                yAxisID: 'B',
                data: barStuff.quantData,
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            }
        ]
    }

    const options = {
        //responsive: true,
        maintainAspectRatio: false,
        scales: {
            A: {
                display: true,
                title: {
                    display: true,
                    text: 'Number of Calories',
                    color: 'rgba(54, 162, 235, 1)',
                    font: {
                        size: 16
                    }
                },
                type: 'linear',
                position: 'left',
                ticks: {
                    beginAtZero: true,
                },
            },
            B: {
                display: true,
                title: {
                    display: true,
                    text: 'Number of drams (fl. oz)',
                    color: 'rgba(255, 159, 64, 1)',
                    font: {
                        size: 16
                    }
                },
                type: 'linear',
                position: 'right',
                ticks: {
                    beginAtZero: true,
                },
            }
        },
        plugins: {
            legend: false,
            annotation: {
                annotations: [
                    {
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'A',
                        borderWidth: 2,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        value: parseInt(average(barStuff.calData)),
                        label: {
                          content: `Average Calories: ${parseInt(average(barStuff.calData))}`,
                          enabled: true,
                          font: {
                              size: 10,
                          }
                        },
                    },
                    {
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'B',
                        borderWidth: 2,
                        borderColor: 'rgba(255, 159, 64, 1)',
                        value: parseInt(average(barStuff.quantData)),
                        label: {
                          content: `Average Drams: ${parseInt(average(barStuff.quantData))}`,
                          enabled: true,
                          font: {
                              size: 10,
                          }
                        },
                    },
                ],
            },
            title: {
                display: true,
                text: 'Total Calorie and Dram Consumption by Date',
                font: {
                    size: 18
                }
            },
        },
    };

    function populateChart() {
        let dateString='';
        let calDataString='';
        let quantDataString='';
        for (let dataDay of dataArray) {
            console.log(dataDay.dram_date, dataDay.SUM_CALS, dataDay.SUM_DRAMS);
            if (dataArray.indexOf(dataDay) != dataArray.length-1) {
                dateString = dateString + moment(dataDay.dram_date).format('YYYY-MM-DD') + '_';
                calDataString = calDataString + dataDay.SUM_CALS + '_';
                quantDataString = quantDataString + dataDay.SUM_DRAMS + '_';
            } else {
                dateString = dateString + moment(dataDay.dram_date).format('YYYY-MM-DD');
                calDataString = calDataString + dataDay.SUM_CALS;
                quantDataString = quantDataString + dataDay.SUM_DRAMS;
            }

            
        }
        setBarStuff({dates: dateString.split('_'), calData: calDataString.split('_'), quantData: quantDataString.split('_')});
        console.log(barData);
    }

    function onChange(nextValue) {
        setValue(nextValue);
        const dateToDisplay1=(moment(nextValue[0]).format('YYYY-MM-DD'));//first date selected by user when selectRange true
        const dateToDisplay2=(moment(nextValue[1]).format('YYYY-MM-DD'));//2nd date selected by user when selectRange true
        swal(`The selected range is ${dateToDisplay1} to ${dateToDisplay2}`);
        const rangeString = dateToDisplay1+"_"+dateToDisplay2;
        dispatch({type: 'GET_RANGE_DRAMS', payload: rangeString});
    }
    return(
        <>
        <div className="wholePage">
        <Paper className="pageContainer" elevation={10} sx={{backgroundColor: '#F09F41'}}>
            <div className="calendar">
                <h3>Pick Two Dates - Date Range</h3>
                <div className="calContainer">
                    <Calendar 
                        onChange={onChange}
                        value={value}
                        selectRange={true}
                        className="calendarDisp"
                    />
                </div>
            </div>
            <div className="buttonDiv">
                <Button variant='contained' sx={{color: 'black' }} onClick={populateChart}>Plot Data</Button>
            </div>
            <div className="chart">
                <h3>Plotted Data from Selected Dates</h3>
                <div className="chartBox">
                    <Bar 
                        data={barData} 
                        options={options}
                        //className="chartDisp"
                    />
                </div>
            </div>
            </Paper>
            </div>
        </>
    );
}

export default AnalyzeDrams;