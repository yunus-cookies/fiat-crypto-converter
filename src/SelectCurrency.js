import React from 'react';
import './App.css';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default function SelectCurrency({ toggleSelect }) {
    
    return (
        <>
            <InputLabel id="demo-simple-select-filled-label">Money</InputLabel>
            <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value="money"
                onChange={toggleSelect}
            >
                <MenuItem>Fiat</MenuItem>
                <MenuItem>Crypto</MenuItem>
            </Select>
        </>
    )
}
