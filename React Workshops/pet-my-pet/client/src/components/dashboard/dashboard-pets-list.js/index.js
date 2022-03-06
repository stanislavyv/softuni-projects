import DashboardPetCard from "../dashboard-pet-card";

const DashboardPetsList = () => {
    return (
        <ul class="other-pets-list">
            <DashboardPetCard />
            <DashboardPetCard />
            <DashboardPetCard />
        </ul>
    );
};

export default DashboardPetsList;