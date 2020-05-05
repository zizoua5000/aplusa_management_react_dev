import React, {useState} from 'react'
import styles from './Paginator.module.css'
import cn from 'classnames'


let Paginator = ({totalItemsCount, pageSize,
                                      currentPage,
                                      onPageChanged,
                                      portionSize = 2}) => {
                                  
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages= [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let initialPortionNumber=Math.ceil(currentPage / portionSize);
    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(initialPortionNumber);
   
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    let onClickPrev=()=>{
        onPageChanged(currentPage-1);
        if(portionNumber>=currentPage){
            setPortionNumber(portionNumber - 1)
        }
    }

    let onClickNext=()=>{
        onPageChanged(currentPage+1);
        if(portionNumber>=currentPage){
            setPortionNumber(portionNumber +1)
        }
    }

    return <div className={cn(styles.paginator)}>
        { portionNumber > 1 &&
        <button className="btn btn-secondary" onClick={onClickPrev}>PREV</button> }

            {pages
                .filter(p => p >= leftPortionPageNumber && p<=rightPortionPageNumber)
                .map((p) => {
                return <span className={ currentPage === p ?'btn btn-info m-1': 'btn btn-secondary m-1'}
                             key={p}
                             onClick={(e) => {
                                 onPageChanged(p);
                             }}>{p}</span>
            })}
        { portionCount > portionNumber &&
            <button className="btn btn-secondary" onClick={onClickNext}>NEXT</button> }
    </div>
}

export default Paginator;