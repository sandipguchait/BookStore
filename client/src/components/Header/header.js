import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import Nav from './sidenav';


class Header extends Component {

    state = {
        showNav: false
    }
    // closes the navigation panel on click on sides on the navbar
    onHideNav = () => {
        this.setState({ showNav: false })
    }

    render() {
        return (
            <header>
               <div className="open-nav">
                    <FontAwesome name="bars"
                        onClick={()=> this.setState({ showNav: true })}
                        style={{
                            color:'#ffffff',
                            padding: '10px',
                            cursor:'pointer'
                        }}
                    />
                </div>
                {/* Navbar compoenent to close the Navbar */}
                <Nav showNav={this.state.showNav} onHideNav={()=>this.onHideNav()}/>
                    <Link to="/" className="logo">
                        The BookStore
                    </Link>
            </header>
        );
    }
}

export default Header;