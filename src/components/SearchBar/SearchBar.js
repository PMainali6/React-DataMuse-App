import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import {StoreContext} from '../../App';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from "@material-ui/core/styles";
import { red } from '../../constants';
import debounce from 'lodash.debounce';
import { fetchSuggestionSearch, searchSuggestion } from '../../Service/searchService';

const useStyles = makeStyles({
    searchWrapper: {
        position: 'relative',
    },
    searchContainer: {
         position: 'relative',
         width: '50%',
         marginBottom: '2rem',
    },
    searchBar: {
        borderRadius: '25px',
        border: 'none',
        padding: '16px 16px 16px 32px',
        fontSize: '1rem',
        width: '100%',

        '&:focus': {
            outline: 'none',
        },

        '&::placeholder': {
            color: '#666666',
        }
    },
    searchIcon: {
        position: 'absolute',
        right: '-25px',
        top: '12px',
        color: red,
        fontSize: '1rem',
    },
    resultsWrapper: {
        backgroundColor: 'white',
        top: '34px',
        width: '57%',
        position: 'absolute',
        zIndex: 2,
        borderRadius: '0 0 25px 25px',
    },
    resultsContainer: {
        padding: '16px 0',
    },
    resultItem: {
        padding: '10px 10px 10px 32px',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#F5F5F5',
        }
    }
  });

function SearchBar() {
    const classes = useStyles();
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ selectedSuggestion, setSelectedSuggestion ] = useState('');
    const inputRef = useRef();
    const { store, dispatch } = useContext(StoreContext);
    const { searchReducers } = store;
    const { suggestionList } = searchReducers;
    const fetchSS = (val) => fetchSuggestionSearch(dispatch, val);
    const debouncedSearch = useCallback(debounce((val) => fetchSS(val), 500), []);
    const handleSuggestionClick = (e) => {
        setSelectedSuggestion(e.target.innerText);
        dispatch({ type: 'RESET_SUGGESTION' })
    }

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
        debouncedSearch(e.target.value)
    }
    
    useEffect(() => {
        console.log('side effect for suggestion clicked')
        if(selectedSuggestion.length > 0) {
            searchSuggestion(dispatch, selectedSuggestion)
            setSearchTerm('');
        }
    }, [selectedSuggestion, dispatch]);

    return (
        <div className={classes.searchWrapper}>
            <div ref={inputRef} className={classes.searchContainer}>
                <input
                    data-testid="search"
                    className={classes.searchBar}
                    value = {searchTerm}
                    onChange = {e => handleChange(e)}
                    placeholder="Seach word"
                ></input>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
            </div>

            <div className={classes.resultsWrapper}>
            {suggestionList.length > 0
                && <div
                     className={classes.resultsContainer}
                    onClick={handleSuggestionClick}>
                        {suggestionList.map(item => 
                        <div className={classes.resultItem} key={item.word}>
                        {item.word}  
                        </div>
                        )}
                </div>}
            </div>
        </div>
    )
}

export default SearchBar;