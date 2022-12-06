import React from 'react';

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleSubmit(event) {
        alert('Le nom a été soumis : ' + this.state.email + this.state.password);
        event.preventDefault();
    }

    render() {
        return(
            <div className="core">
                <div className="loginPage">
                    <h2>Connexion</h2>
                    <form>
                        <div>
                            <label htmlFor="mail">e-mail: </label>
                            <input type="email" id="mail" onChange={(e) => this.setState({email: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="passWord">Mot de passe : </label>
                            <input type="password" id="passWord" onChange={(e) => this.setState({password: e.target.value})}/>
                        </div>
                        <div className="loginButton">
                            <button type="submit" onClick={(e) => this.handleSubmit(e)}>Connexion</button>
                        </div>
                    </form>
                </div>             
            </div>
    ); 
    }
          
}

export default Login;