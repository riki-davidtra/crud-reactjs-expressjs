import React from 'react';
import logo from '../logo.svg';
import '../App.css';

const HomePage: React.FC = () => {
    return (
        <div>
            <div className="container mb-5">
                <h1 className='mb-3'>Home Page</h1>

                <div className="mb-3">
                    <h5>Name: Riki Davidtra</h5>
                    <table className='table'>
                        <tr style={{ width: '1%' }}>
                            <td>GitHub</td>
                            <td>:</td>
                            <td><a href="https://github.com/jamanit" target='_blank' className='text-primary'>https://github.com/jamanit</a></td>
                        </tr>
                        <tr>
                            <td style={{ width: '1%' }}>LinkedIn</td>
                            <td>:</td>
                            <td><a href="https://www.linkedin.com/in/riki-davidtra-a30752237" target='_blank' className='text-primary'>https://www.linkedin.com/in/riki-davidtra-a30752237</a></td>
                        </tr>
                        <tr>
                            <td style={{ width: '1%' }}>Youtube</td>
                            <td>:</td>
                            <td><a href="https://www.youtube.com/@jaman_it" target='_blank' className='text-primary'>https://www.youtube.com/@jaman_it</a></td>
                        </tr>
                        <tr>
                            <td style={{ width: '1%' }}>Instagram</td>
                            <td>:</td>
                            <td><a href="https://www.instagram.com/riki_davidtra" target='_blank' className='text-primary'>https://www.instagram.com/riki_davidtra</a></td>
                        </tr>
                    </table>
                </div>

                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <p>
                            Edit <code>src/App.tsx</code> and save to reload.
                        </p>
                        <a
                            className="App-link"
                            href="https://reactjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn React
                        </a>
                    </header>
                </div>
            </div>
        </div >
    );
};

export default HomePage;
