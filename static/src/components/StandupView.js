import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/data';
import Card from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader'
import TextField from 'material-ui/TextField';
import List from 'material-ui/List';
import Button from 'material-ui/FlatButton';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import get_latest_tasks from '../utils/http_functions';

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
        this.state.tasks = get_latest_tasks(token);
    }

    addTask(e) {
        if (e.key === 'Enter') {
            const task = e.target.value;
            this.state.tasks.push(task)
            //Add new todo item
            e.target.value = '';
            e.preventDefault();
        }
    }

    render() {
        return (
            <div>
                {!this.props.loaded
                    ? <h1>Loading data...</h1>
                    :
                    <div>
                        <h1>Welcome back,
                            {this.props.userName}!</h1>
                        <h1>{this.props.data.data.email}</h1>
                        <Card>
                            <CardHeader 
                                avatar={<Avatar>J</Avatar>} 
                                title="Jeffrey Mew"
                                subtitle="September 14, 2016"/>
                            <div>
                                <TextField
                                    hintText="What did you do yesterday?"
                                    floatingLabelText="Task"
                                    type="text"
                                    onKeyPress={(e) => this.addTask(e)}
                                    />
                            </div>
                            <List>
                                {
                                    this.state.tasks.map((task) => 
                                        <ListItem leftIcon={<CheckCircle/>}>{this.state.tasks[key]}</ListItem>
                                    )
                                }
                            </List>
                        </Card>
                    </div>
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
    tasks: React.PropTypes.any,
};
