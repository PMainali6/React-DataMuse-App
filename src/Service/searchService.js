import axios from 'axios';

export const fetchSuggestionSearch = async (dispatch, searchTerm) => {
    if(searchTerm.length > 0) {
        try {
            const res = await axios.get(`https://api.datamuse.com/sug?s=${searchTerm}`);
            dispatch({
                type: 'FETCH_SUGGESTION',
                payload: res.data,
            })
        } catch(err) {
            console.error(err);
            dispatch({
                type: 'FETCH_ERROR',
                payload: 'API Failed! Please try again later'
            })
        }
    } else {
        dispatch({
            type: 'RESET_SUGGESTION',
        })
    }   
}

const formatData = (dispatch, [def, syn, ant]) => {
    const tagList = [];
    const searchMap = new Map();
    if(def[0].defs) {
        def[0].defs.forEach(item => {
            const [tag, meaning] = item.split('\t');
            tagList.push(tag);
            if(!searchMap.has(tag)) {
                searchMap.set(tag, [meaning])
            } else {
                const res = searchMap.get(tag);
                searchMap.set(tag, [...res, meaning])
            }
        })
        const tagMap = [...new Set(tagList)];
        dispatch({
            type: 'FETCH_SEARCH_RESULTS',
            payload: [tagMap, searchMap, syn, ant, def[0].word],
        })
    } else {
        dispatch({
            type: 'FETCH_ERROR',
            payload: 'No meaning available, try another keyword'
        })
    }

}

export const searchSuggestion = (dispatch, term) => {
    try {
        const def = new Promise((resolve, reject) => {
            try {
                axios
                    .get(`https://api.datamuse.com/words?sp=${term}&qe=sp&md=d&max=1`)
                    .then(res => resolve(res.data))

            } catch(err) {
                reject(err);
            }
        });
        const syn = new Promise((resolve, reject) => {
            try {
                axios
                    .get(`https://api.datamuse.com/words?rel_syn=${term}`)
                    .then(res => resolve(res.data))
            } catch(err) {
                reject(err);
            }
        });
        const ant = new Promise((resolve, reject) => {
            try {
                axios
                    .get(`https://api.datamuse.com/words?rel_ant=${term}`)
                    .then(res => resolve(res.data))
            } catch(err) {
                reject(err);
            }
        });
        Promise.all([def, syn, ant])
        .then(res => {
            formatData(dispatch, res)
        })
       
    } catch(err) {
        console.error(err);
        dispatch({
            type: 'FETCH_ERROR',
            payload: 'API Failed! Please try again later'
        })
    }
}
