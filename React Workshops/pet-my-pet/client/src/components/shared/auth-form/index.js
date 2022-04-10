const AuthForm = ({ type, onSubmitHandler }) => {
    return (
        <section className={type.toLowerCase()}>
            <form onSubmit={onSubmitHandler}>
                <fieldset>
                    <legend>{type}</legend>
                    <p className="field">
                        <label htmlFor="username">Username</label>
                        <span className="input">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Username"
                            />
                            <span className="actions"></span>
                            <i className="fas fa-user"></i>
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="password">Password</label>
                        <span className="input">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                            />
                            <span className="actions"></span>
                            <i className="fas fa-key"></i>
                        </span>
                    </p>
                    <input
                        className="button submit"
                        type="submit"
                        value={type}
                    />
                </fieldset>
            </form>
        </section>
    );
}

export default AuthForm;