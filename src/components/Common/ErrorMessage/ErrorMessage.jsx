import React from 'react'

const ErrorMessage = ({message}) => {
    console.log(message)
    let note;
    if(message==='request'){
        note = 'Check your internet connection'
    } else if(message==='response'){
        note='Check your api structure'
    } else{
        note = 'Check out please'
    }
    return (<div>
        <h1>Something Went Wrong! </h1>
        <h4>{note}</h4>
        
    </div>
    )
}
export default ErrorMessage