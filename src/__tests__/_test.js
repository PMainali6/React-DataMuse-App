import React from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import App from '../App';
import Enzyme, { shallow } from 'enzyme';
import { render, fireEvent, cleanup, screen} from '@testing-library/react';
import * as Reducer from '../reducers/searchReducers';
import AccordionList from '../components/AccordionList/AccordionList';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() })
afterEach(cleanup)

it('inputing search term updates the state', () => {
    render(<App> <SearchBar /></App>);

    expect(screen.getByTestId("search").textContent).toBe("")

    fireEvent.change(screen.getByTestId("search"), {target: {value: 'func' } } )

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
  
    it('should change error in store from empty to not empty', () => {
      expect(Reducer.searchReducers(Reducer.searchData.error, {type: 'FETCH_ERROR', payload: 'API Error'} ))
        .toEqual({ error: 'API Error'  })
    })

    it('accordion meaning is populated', () => {
      const mockList = new Map();
      mockList.set('v', ["perform as expected when applied","serve a purpose, role, or function","perform duties attached to a particular office or place or function"])
      Reducer.searchReducers(Reducer.searchData, {type: 'FETCH_SEARCH_RESULTS', payload: [['v'], mockList, [], [], []]} );
      
      const component = shallow(<App><AccordionList tagName='v'/></App>);

      expect(component.find(".meaning").textContent).not.toBe("");
    })
  })

