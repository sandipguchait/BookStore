import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authCheck } from '../actions/index';

export default function ( ComposedClass ) {
    class AuthenticationCheck extends Component {

        state = {
            loading: true
        }

        componentWillMount(){
            this.props.authCheck()
        }

        componentWillReceiveProps(nextProps){
            this.setState({ loading: false })
        }

         render(){
             if(this.state.loading) {
                 return <div className="loader">Loading..</div>
             }
             return (
                 <ComposedClass {...this.props}/>
             )
         }
    }

    const mapStateToProps = (state) => {
        return {
            user: state.user
        }
    }

    return connect(mapStateToProps, { authCheck }) (AuthenticationCheck)
}