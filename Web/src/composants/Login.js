import React from 'react';

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        };


    }

    render() {
        return(
            <div className="core">
                <div className="loginPage">
                    <h2>Connexion</h2>
                    <form action="/ma-page-de-traitement" method="post">
                        <div>
                            <label htmlFor="mail">e-mail: </label>
                            <input type="email" id="mail" name="userMail"/>
                        </div>
                        <div>
                            <label htmlFor="passWord">Mot de passe : </label>
                            <input type="password" id="passWord" name="userPassWord"></input>
                        </div>
                        <div className="loginButton">
                            <button type="submit">Connexion</button>
                        </div>
                    </form>
                </div>             
            </div>
    ); 
    }
          
}

export default Login;