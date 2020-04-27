import React, {useState} from 'react'
import styles from './Paginator.module.css'
import cn from 'classnames'


let Paginator = ({totalItemsCount, pageSize,
                                      currentPage,
                                      onPageChanged,
                                      portionSize = 10}) => {

    console.log("==========Paginator=============") 
                                  
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages= [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
 
    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
   
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    console.log(portionNumber)
    console.log(portionCount)
  

    console.log("==========Paginator=============") 
  

     

    return <div className={cn(styles.paginator)}>
        { portionNumber > 1 &&
        <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button> }

            {pages
                .filter(p => p >= leftPortionPageNumber && p<=rightPortionPageNumber)
                .map((p) => {
                return <span className={ currentPage === p ?'btn btn-danger m-1': 'btn btn-secondary m-1'}
                             key={p}
                             onClick={(e) => {
                                 onPageChanged(p);
                             }}>{p}</span>
            })}
        { portionCount > portionNumber &&
            <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button> }
    </div>
}

export default Paginator;