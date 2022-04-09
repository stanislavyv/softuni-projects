import Categories from "./categories";
import DashboardPetsList from "./dashboard-pets-list.js";

import { useParams } from 'react-router-dom';

const Dashboard = () => {
    const { category } = useParams();
  
    return (
        <section className="dashboard">
            <h1>Dashboard</h1>
            <Categories />
            <DashboardPetsList category={category}/>
        </section>
    );
};

export default Dashboard;