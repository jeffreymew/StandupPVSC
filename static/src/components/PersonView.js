import React from 'react';
import Card from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader'
import TextField from 'material-ui/TextField';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import { store_task } from '../utils/http_functions';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import { COMPLETED, IN_PROGRESS } from '../constants/index';
import moment from 'moment';

const styles = {
  card: {
    margin: 20,
  },
}

class UserCard extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      slideIndex: 0,
    };

    this.date = props.tasks.length > 0 ? moment.utc(props.tasks[0].date).format('MMMM DD, YYYY') : moment().format('MMMM DD, YYYY');
  }

  addTask(e) {
      if (e.key === 'Enter') {
          const task = e.target.value;
          status = this.state.slideIndex == 0 ? COMPLETED : IN_PROGRESS;
          this.props.tasks.push({task: task, date : new Date(), status : status});
          this.setState({ tasks : this.props.tasks });
          store_task(this.props.name, task, status);
          e.target.value = '';
          e.preventDefault();
      }
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    return(
      <Card style={styles.card}>
          <CardHeader 
              avatar={<Avatar>{this.props.name.charAt(0).toUpperCase()}</Avatar>} 
              title={this.props.name}
              subtitle={this.date}/>
          <Tabs
            onChange={this.handleChange}
            value={this.state.slideIndex}
          >
            <Tab label="Completed" value={0} />
            <Tab label="In Progress" value={1} />
          </Tabs>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
          >
            <div>
              {this.props.admin === this.props.email ?
              <div>
                  <TextField
                      hintText="What did you do yesterday?"
                      floatingLabelText="What did you do yesterday?"
                      type="text"
                      onKeyPress={(e) => this.addTask(e)}
                      />
              </div> : <span/>}
              <List>
                  {
                      this.props.tasks.filter((task) => task.status === COMPLETED)
                                      .map((task) => <ListItem leftIcon={<CheckCircle/>}>{task.task}</ListItem>)
                  }
              </List>
            </div>
            <div>
              {this.props.admin === this.props.name ?
              <div>
                  <TextField
                      hintText="What are you going to do today?"
                      floatingLabelText="What are you going to do today?"
                      type="text"
                      onKeyPress={(e) => this.addTask(e)}
                      />
              </div> : <span/>}
              <List>
                  {
                      this.props.tasks.filter((task) => task.status === IN_PROGRESS)
                                      .map((task) => <ListItem leftIcon={<CheckCircle/>}>{task.task}</ListItem>)
                  }
              </List>
            </div>
          </SwipeableViews>
      </Card>
    )
    }
  }

export default UserCard