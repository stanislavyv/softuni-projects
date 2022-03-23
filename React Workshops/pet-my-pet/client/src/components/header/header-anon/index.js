import { Link } from 'react-router-dom';

const HeaderAnon = () => {
    return (
        <section className="navbar-anonymous">
            <ul>
                <li>
                    <Link to="/register"
                        ><i className="fas fa-user-plus"></i>
                        Register</Link
                    >
                </li>
                <li>
                    <Link to="/login"
                        ><i className="fas fa-sign-in-alt"></i>
                         Login</Link
                    >
                </li>
            </ul>

            <style>{`
                ul li:nth-child(1) a {
                    margin-right: 8px;
                }
            `}</style>
        </section>
    );
}

export default HeaderAnon;