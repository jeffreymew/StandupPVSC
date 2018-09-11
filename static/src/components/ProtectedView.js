import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/data';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AssignmentIcon from '@material-ui/icons/Assignment'
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  });

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
export default class ProtectedView extends React.Component {
    componentDidMount() {
        this.fetchData();
    }


    fetchData() {
        const token = this.props.token;
        this.props.fetchProtectedData(token);
    }

    render() {
        const { classes } = props;
        return (
            <div className={classes.root}>
                <List>
                <ListItem>
                    <Avatar>
                    <AssignmentIcon />
                    </Avatar>
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                </ListItem>
                <li>
                    <Divider inset />
                </li>
                <ListItem>
                    <Avatar>
                    <AssignmentIcon />
                    </Avatar>
                    <ListItemText primary="Work" secondary="Jan 7, 2014" />
                </ListItem>
                <Divider inset component="li" />
                <ListItem>
                    <Avatar>
                    <AssignmentIcon />
                    </Avatar>
                    <ListItemText primary="Vacation" secondary="July 20, 2014" />
                </ListItem>
                </List>
          </div>
        );
    }
}

ProtectedView.propTypes = {
    fetchProtectedData: React.PropTypes.func,
    loaded: React.PropTypes.bool,
    userName: React.PropTypes.string,
    data: React.PropTypes.any,
    token: React.PropTypes.string,
    classes: PropTypes.object.isRequired,
};
