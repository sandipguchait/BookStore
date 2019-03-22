import React, { Component } from 'react';
import { connect } from 'react-redux0';


export default function ( ComposedClass ) {
    class AuthenticationCheck extends Component {

        state = {
            loading: true
        }

         render(){
             if(this.state.loading) {
                 return <div className="loader">Loading..</div>
             }
             return (
                 <ComposedClass/>
             )
         }
    }

    const mapStateToProps = (state) => {
        return {
            user: state.user
        }
    }

    return connect(mapStateToProps) (AuthenticationCheck)
}