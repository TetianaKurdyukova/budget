import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Main extends Component {
     render() {    
        return (
            <div className='container'>
                <div>
                    <h2>Добро пожаловать</h2>
                    <ul className='login-list list-group'>
                        <li className='d-flex justify-content-center'><Link to="/sign-in-form">Войти</Link></li>
                        <li className='d-flex justify-content-center'><Link to="/sign-up-form">Зарегистрироваться</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
};

export default Main;