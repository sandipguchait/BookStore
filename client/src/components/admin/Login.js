import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/index';


class Login extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        success: false
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        this.props.loginUser(this.state)
    }

    // This takes in the coming data from state as props and check 
    // whether the isAuth of login state is true, if true then push them to different Route
    componentWillReceiveProps(nextProps) {
        if(nextProps.user.login.isAuth){
            this.props.history.push('/user')
        }
    }

    // VALIDATING THE FORM
    validateForm =()=> {
        const {email,  password} = this.state;
        const isInvalid = !email || !password 
        return isInvalid;
    }


    render() {
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Log in Here</h2>
                    <div className="form_element">
                        <input
                            type="email"
                            name="email"
                            value={this.state.email}
                            placeholder="Enter your email"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form_element">
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            placeholder="Enter your Password"
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit" disabled={this.validateForm()}>Log in</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = ( state ) => {
    console.log(state)
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {loginUser})(Login);