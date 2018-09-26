import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/data';
import UserCard from './PersonView';


function mapStateToProps(state) {
    return {
        data: state.data,
        token: state.auth.token,
        loaded: state.data.loaded,
        isFetching: state.data.isFetching,
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class StandupView extends React.Component {
    componentDidMount() {
        this.fetchData();
    }


    fetchData() {
        const token = this.props.token;
        this.props.fetchProtectedData(token);
        console.log(this.props);
    }


    render() {
        return (
            <div>
                {!this.props.loaded
                    ? <h1>Loading data...</h1>
                    : [ 
                        (!this.props.data.user_has_tasks ? 
                        <UserCard admin={this.props.userName} email={this.props.userName} name={this.props.data.data.first_name} tasks={[]}></UserCard> :
                        <span/> ),
                        this.props.data.users.map(([key, value]) => 
                            <UserCard admin={this.props.userName} email={key} name={value[0].user_id} tasks={value}></UserCard>
                        )
                    ] 

                }
            </div>
        );
    }
}

StandupView.propTypes = {
    fetchProtectedData: React.PropTypes.func,
    loaded: React.PropTypes.bool,
    userName: React.PropTypes.string,
    data: React.PropTypes.any,
    token: React.PropTypes.string,
};
