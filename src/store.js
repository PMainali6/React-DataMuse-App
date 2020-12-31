import { searchData, searchReducers } from './reducers/searchReducers';

const combineReducers = reducers => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce(
        (nextState, key) => {
            nextState[key] = reducers[key] (
            state[key],
            action
            );
            return nextState;
        }, {});
    };
    };

export const initialState = {
    searchReducers: searchData,
};

export const reducers = combineReducers({searchReducers});
