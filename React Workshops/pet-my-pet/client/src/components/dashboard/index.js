import Categories from "./categories";
import DashboardPetsList from "./dashboard-pets-list.js";

const Dashboard = () => {
    return (
        <section class="dashboard">
        <h1>Dashboard</h1>
        <Categories />
        <DashboardPetsList />
    </section>
    );
};

export default Dashboard;