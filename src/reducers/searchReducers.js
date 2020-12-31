export const searchData = {
    suggestionList: [],
    syn: [],
    ant: [],
    searchList: [],
    error: '',
    tagList: [],
    searchWord: '',
}

export const searchReducers = (state={}, action) => {
    switch(action.type) {
        case 'FETCH_SUGGESTION': {
            return {
                ...state,
                error: '',
                suggestionList: action.payload,
            }
        }

        case 'FETCH_SEARCH_RESULTS': {
            return {
                ...state,
                error: '',
                tagList: action.payload[0],
                searchList: action.payload[1],
                syn: action.payload[2],
                ant: action.payload[3],
                searchWord: action.payload[4],
            }
        }

        case 'FETCH_ERROR': {
            return {
                ...state,
                error: action.payload
            }
        }

        case 'RESET_SUGGESTION': {
            return {
                ...state,
                suggestionList: [],
            };
        }

        case 'RESET_ERROR': {
            return {
                ...state,
                error: '',
            };
        }

        default:
            return state;
    }
}