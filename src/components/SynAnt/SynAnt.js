import React, {useContext, useState, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ResultCounter from '../ResultCounter/ResultCounter';
import { StoreContext } from '../../App';
import { searchSuggestion } from '../../Service/searchService';
import { blue } from '../../constants';

function TabPanel(props) {
    const [ dataIndex, setDataIndex ] = useState(0);
    const classes = useStyles();
    const { dispatch, value, index, data, resetDefIndex } = props;

    const dataList = data.slice(dataIndex, dataIndex+9);
    const total = data.length;

   const handleClickSearch = (e) => {
        const val = e.target.innerText;
        resetDefIndex(0);
        setDataIndex(0);
        searchSuggestion(dispatch, val);
   }

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
    >
      {value === index && (
        <Fragment>
        <Box p={3}>
              <div
                onClick={(e) => handleClickSearch(e)}
                className={classes.dataContainer}>
                    {dataList.map(el => 
                        <div 
                            key={el.word}
                            role="presentation"
                            className={classes.dataItem}
                        >{el.word}</div>
                    )}
              </div>
        </Box>
          <ResultCounter
            handleBtnClick={setDataIndex}
            total={total}
            current={dataIndex+dataList.length}
            interval={9}
            index={dataIndex}
            />
            </Fragment>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
      boxShadow: 'none',
      marginTop: '32px',
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  dataItem: {
      width: 'calc(33% - 24px)',
      textDecoration: 'underline',
      cursor: 'pointer',
      color: blue,
      marginRight: '24px',
      fontWeight: '800',
      marginBottom: '4px',
      textTransform: 'capitalize',
  },
  tabTitle: {
    color: 'red'
  }
}));

export default function SynAnt({ resetDefIndex }) {
    const { store, dispatch } = useContext(StoreContext);
    const { searchReducers } = store;
    const { syn, ant } = searchReducers;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.root} square>
        <Tabs value={value} onChange={handleChange} >
          <Tab label="Synonyms" {...a11yProps(0)} />
          <Tab label="Antonyms" {...a11yProps(1)} />
        </Tabs>
      </Paper>
      <TabPanel dispatch={dispatch} value={value} index={0} data={syn} resetDefIndex={resetDefIndex}>
        Synonyms
      </TabPanel>
      <TabPanel dispatch={dispatch} value={value} index={1} data={ant} resetDefIndex={resetDefIndex}>
        Antonyms
      </TabPanel>

    </div>
  );
}
