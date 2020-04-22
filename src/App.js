import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Provider } from 'react-redux'
import store from './redux/store'
import Navbar from './components/Navbar/Navbar';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer'
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {
    render() {
        
        return (
            <BrowserRouter >
                <Provider store={store} >
                
                    <div id="wrapper" >
                        <Navbar />
                        <Content />                        
                    </div>
                </Provider>
            </BrowserRouter >
        )
    }
}


export default App