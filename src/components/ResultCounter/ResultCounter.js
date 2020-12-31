import React, { useRef } from 'react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import './result-counter.scss';

function ResultCounter({current, total, handleBtnClick, interval, index}) {
    let isNext;
    if(current === total) {
        isNext = false;
    } else {
        isNext = index < total;
    }
    const isPrev = index > 0;
    const rightRef = useRef(null);
    const leftRef = useRef(null);

    
    
    const handlePagination = ref => {
        const el = ref.current;
        if(!el.className.includes('active')) {
            return;
        } else {
            console.log('correct btn');
            if(el.className.includes('right-icon')) {
                handleBtnClick(prevVal => prevVal + interval)
            } else {
                handleBtnClick(prevVal => prevVal - interval)
            }
        }
    }


    return (
        <div className="result-counter">
            <div className="text">{`${current} OUT OF ${total} RESUTLS`}</div>
            <div className="btn-collection">
                <div
                    data-testid="leftBtn" 
                    role="presentation"
                    onClick={() => handlePagination(leftRef)}
                    ref={leftRef}
                    className={`left-icon ${isPrev ? 'active': ''}`}
                >< ChevronLeftIcon /></div>
                <div
                    data-testid="rightBtn" 
                    role="presentation"
                    onClick={() => handlePagination(rightRef)}
                    ref={rightRef}
                    className={`right-icon ${isNext ? 'active' : ''}`} 
                >< ChevronRightIcon /></div>
            </div>
        </div>
    )
}

export default ResultCounter;