import React from 'react';
import SearchBar from './SearchBar';
import App from '../../App';
import { render, fireEvent, cleanup, screen} from '@testing-library/react';
import * as Reducer from '../../reducers/searchReducers';

afterEach(cleanup)

it('Inputing search term updates the state', () => {
    render(<App> <SearchBar /></App>);

    expect(screen.getByTestId("search").textContent).toBe("")

    fireEvent.change(screen.getByTestId("search"), {target: {value: 'Func' } } )

    expect(screen.getByTestId("search").value).not.toBe("")
 })


 describe('test the reducer and actions', () => {
    it('should return the initial state', () => {
      expect(Reducer.searchData).toEqual({ 
        suggestionList: [],
        syn: [],
        ant: [],
        searchList: [],
        error: '',
        tagList: [],
        searchWord: '',
       })
    })
  
    it('should change error from empty to not empty', () => {
      expect(Reducer.searchReducers(Reducer.searchData.error, {type: 'FETCH_ERROR', payload: 'API Error'} ))
        .toEqual({ error: 'API Error'  })
    })
  })

