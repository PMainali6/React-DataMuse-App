import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ResultCounter from '../ResultCounter/ResultCounter';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { blue, yellow } from '../../constants';
import { StoreContext } from '../../App';
import SynAnt from '../SynAnt/SynAnt';

const Accordion = withStyles({
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      marginBottom: '16px',
      borderRadius: '25px',
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: '16px',
      },
    },
    expanded: {},
  })(MuiAccordion);

  const AccordionDetails = withStyles((theme) => ({
    root: {
      borderRadius: '25px',
      display: 'block',
    },
  }))(MuiAccordionDetails);

  const AccordionSummary = withStyles(theme => ({
    root: {
      '&$expanded': {
        margin: '20px 0 0 0',
      },
    },
  }))(MuiAccordionSummary);

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    letterContainer: {
        width: '0.5rem',
        height: '0.5em',
        borderRadius: '50%',
        backgroundColor: yellow,
        padding: '16px',
        marginRight: '16px',
    },
    letter: {
        fontSize: '20px',
        fontWeight: '900',
        position: 'relative',
        top: '-8px',
        left: '-3px',
        color: blue,
    },
    title: {
        fontWeight: '900',
        color: blue,
        marginTop: '10px',
        fontSize: '18px',
        textTransform: 'capitalize',
    },
    meaning: {
      marginLeft: '3.5rem',
      fontWeight: '500',
      fontSize: '18px',
      marginBottom: '16px',
    }
  }));

  const map = {
    'n': 'Noun',
    'v': 'Verb',
    'adj': 'Adjective',
    'adv': 'Adverb',
}

function AccordionList({ tagName }) {
    const [ index, setIndex ] = useState(0); 
    const classes = useStyles();
    const { store } = useContext(StoreContext);
    const { searchReducers } = store;
    const { searchList, searchWord } = searchReducers;
    const letter = map[tagName].charAt(0).toUpperCase();
    const total = searchList.get(tagName).length;
    return (
        <Accordion square >
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            >
               <div className={classes.heading}>
                    <div className={classes.letterContainer}>
                        <span className={classes.letter}>{letter}</span>
                    </div>
                    <div className={classes.title}>{map[tagName]} - {searchWord}</div>
               </div>
            </AccordionSummary>
            <AccordionDetails>
                <div
                  data-testid="meaning" 
                  className={classes.meaning}>
                    {searchList.get(tagName)[index]}
                </div>
               <ResultCounter
                  handleBtnClick={setIndex}
                  total={total}
                  current={index+1}
                  interval={1}
                  index={index}
                  />
                <SynAnt resetDefIndex={setIndex}/>
            </AccordionDetails>
      </Accordion>
    )
}

export default AccordionList;