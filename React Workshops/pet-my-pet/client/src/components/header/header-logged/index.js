import LogoutButton from '../../buttons/logout-button'

const HeaderLogged = ({ username }) => {
    return (
        <div className="second-bar">
            <ul>
                <li>Welcome, {username}!</li>
                <li>
                    <LogoutButton />
                </li>
            </ul>
        </div>
    );
}

export default HeaderLogged;