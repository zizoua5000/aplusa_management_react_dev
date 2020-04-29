import React from 'react'
import preloader from '../../../assets/images/preloader5.svg'

const Preloader = (props) =>{
    return <div className="pt-5 justify-content-center d-flex">
        <img src = {preloader } alt="There should be gif" className="pt-5"/>
    </div>
}
export default Preloader