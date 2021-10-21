import React from 'react';


import MainContent from '../../Components/MainContent';
import Sidebar from '../../Components/Sidebar';

import './Dashboard.styles.scss';

const Dashboard = (): JSX.Element => {
    return (
        <section id="dashboard">
            {/* Sidebar component */}
            <Sidebar />

            {/* Main Content */}
            <MainContent />
        </section>
    );
};

export default Dashboard;