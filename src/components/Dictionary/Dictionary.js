import React, {useContext, useState, useEffect} from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { makeStyles } from '@material-ui/core';
import { yellow, black } from '../../constants';
import AccordionList from '../AccordionList/AccordionList';
import { StoreContext } from '../../App';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
    dictionary: {
        fontFamily: 'Roboto',
        fontSize: '16px',
        color: black,
        margin: '5rem auto',
        backgroundColor: yellow,
        width: '700px',
        minHeight: '500px',
        height: 'auto',
        padding: '1rem',
    },
    heading: {
        textAlign: 'center',
        color: black,
        fontSize: '24px',
        margin: '6rem auto 0',
    }
})

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

function Dictionary() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const { store, dispatch } = useContext(StoreContext);
    const { searchReducers } = store;
    const { tagList, error } = searchReducers;
    const handleClose = () => {
        setOpen(false);
        dispatch({
            type: 'RESET_ERROR'
        });
    }

    useEffect(() => {
        console.log('snackbar error effect')
        if(error.length > 0) {
            setOpen(true)
        }
    }, [error])
    return (
        <div className={classes.dictionary}>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}>
                <Alert  onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
            <SearchBar />
            {tagList.length > 0
                ? tagList.map(tag => <AccordionList key={tag} tagName={tag}/>)
                : <h3 className={classes.heading}>Please type search keyword</h3>
            }
        </div>
    )
}

export default Dictionary;