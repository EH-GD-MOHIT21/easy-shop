import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import "./Adddukan.css"

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({slug}) {
    const [useBasicDetails, setuseBasicDetails] = React.useState(null)
    const [open, setOpen] = React.useState(false);
    const [userName,setUserName] = React.useState("");
    const [personName, setPersonName] = React.useState(["READ SHOP"]);

    const handleClickOpen = (slug) => {
        console.log(slug);
        setOpen(true);
    };

    const handleClose = (slug) => {
        setOpen(false);
        console.log(slug)
        const data = {
            dukaan: slug,
            permission: personName.join(","),
            username: userName

        }
        fetch('http://127.0.0.1:8000/managepermission', {

            method: "POST",

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            withCredentials: true,
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((datas) => {
                console.log('Success:', datas);
                alert(datas['message']);
                setuseBasicDetails(datas["data"])

            })
            .catch((error) => {
                console.error('Error:', error);
            });

    };

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const csrftoken = getCookie('X-CSRFToken');

    const handleChangeInput = (e) => {
        setUserName(e.target.value)
        const data = { username: e.target.value }
        console.log(e.target.value);
        fetch('http://127.0.0.1:8000/userbasicdetails', {

            method: "POST",

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            withCredentials: true,
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((datas) => {
                console.log('Success:', datas);
                setuseBasicDetails(datas["data"])

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const names = [
        "WRITE SHOP",
        "DELETE SHOP"
    ];


    const handleChange = (event) => {
        console.log(event.target.value)
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
const handleCheckBox = (name) =>{

}
console.log(personName)
    return (
        <div>
            <Button variant="contained" size="large" color="secondary" onClick={()=>handleClickOpen(slug)}>
                Manage
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" className='DialogText'>
                        Let Google help apps determine location. This means sending anonymous
                    </DialogContentText>
                    <TextField
                        fullWidth
                        color="secondary"
                        id="filled-search"
                        label="Search field"
                        type="search"
                        variant="filled"
                        onChange={handleChangeInput}
                        className="inputUserName"
                    />
                    <div className='DialogBody'>
                        <div className='DialogBodyLeft'>
                            {useBasicDetails && <img src={useBasicDetails?.profile_pic} className="dialog_user_profile" />}
                        </div>
                        {
                            useBasicDetails && 
                            <div className='DialogBodyRight'>
                            <p>Name: {useBasicDetails?.name}</p>
                            <p>User Name: {useBasicDetails?.username}</p>
                        </div>
                        }
                    </div>
                </DialogContent>

                <div className='formControl'>
                    <FormControl sx={{ m: 1, width: 300 }} fullWidth>
                        <InputLabel id="demo-multiple-checkbox-label" color="secondary" fullWidth>Tag</InputLabel>
                        <Select
                            fullWidth
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                            color="secondary"
                        ><MenuItem>
                                <Checkbox checked={true} disabled />
                                <ListItemText primary={"READ SHOP"} />
                            </MenuItem>
                            {names.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={personName.indexOf(name) > -1} 
                                        onChange={()=>handleCheckBox(name)}
                                    />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <DialogActions>
                    <Button onClick={()=>handleClose(slug)} color="secondary">Agree</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
