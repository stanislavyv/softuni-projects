import Categories from "./categories";

const Dashboard = () => {
    return (
        <section class="dashboard">
        <h1>Dashboard</h1>
        <Categories />
        <ul class="other-pets-list">
            <li class="otherPet">
                <h3>Name: Gosho</h3>
                <p>Category: Cat</p>
                <p class="img">
                    <img
                        src="https://pics.clipartpng.com/Cat_PNG_Clip_Art-2580.png"
                    />
                </p>
                <p class="description">This is not my cat Gosho</p>
                <div class="pet-info">
                    <a href="#"
                        ><button class="button">
                            <i class="fas fa-heart"></i> Pet
                        </button></a
                    >
                    <a href="#"
                        ><button class="button">Details</button></a
                    >
                    <i class="fas fa-heart"></i> <span> 2</span>
                </div>
            </li>
            <li class="otherPet">
                <h3>Name: Gosho</h3>
                <p>Category: Cat</p>
                <p class="img">
                    <img
                        src="https://pics.clipartpng.com/Cat_PNG_Clip_Art-2580.png"
                    />
                </p>
                <p class="description">This is not my cat Gosho</p>
                <div class="pet-info">
                    <a href="#"
                        ><button class="button">
                            <i class="fas fa-heart"></i> Pet
                        </button></a
                    >
                    <a href="#"
                        ><button class="button">Details</button></a
                    >
                    <i class="fas fa-heart"></i> <span> 2</span>
                </div>
            </li>
            <li class="otherPet">
                <h3>Name: Kiro</h3>
                <p>Category: Dog</p>
                <p class="img">
                    <img
                        src="http://www.stickpng.com/assets/images/580b57fbd9996e24bc43bbde.png"
                    />
                </p>
                <p class="description">This is my dog Kiro</p>
                <div class="pet-info">
                    <a href="#"
                        ><button class="button">
                            <i class="fas fa-heart"></i> Pet
                        </button></a
                    >
                    <a href="#"
                        ><button class="button">Details</button></a
                    >
                    <i class="fas fa-heart"></i> <span> 4</span>
                </div>
            </li>
        </ul>
    </section>
    );
};

export default Dashboard;