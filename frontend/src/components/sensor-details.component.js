import React, { Component } from "react";

import UserService from "../services/user.service";
import SensorService from "../services/sensor.service";
import { withRouter } from "react-router";
import 'chartjs-adapter-luxon';
import $ from 'jquery';
import { connect } from "react-redux";
import { useEffect, useRef } from "react";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

class SensorDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      pagecontent: [],
      value: 1
    };
    this.chartReference = React.createRef(); 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    var currentUser = this.props.user;
    
    //console.log(currentUser);
    if (!currentUser) {
      alert("Not signed in.");
      return;
    }

    const errorHandler = error => {
      alert(error);
    }

    SensorService.setSensorUpdateInterval(this.sensorName, currentUser._id, this.state.value).then(
      response => {
        //alert('Update interval set to  ' + this.state.value);
      },
      errorHandler
    );   

    //event.preventDefault();
  }

  changeHandler(value) {
    this.chart.update();
  }
  

  drawChartFunction() {
    var valuelist = [];
    var datelist = [];
    for (let index = 0; index < this.state.pagecontent.length; index++) {
      valuelist.push(parseFloat(this.state.pagecontent[index].value));
      datelist.push(new Date(this.state.pagecontent[index].date).toUTCString().split(' ').slice(0, 4).join(' '));
    }
    console.log(valuelist);
    console.log(datelist);
    
    this.myChart = new Chart(document.getElementById('myChart'), {
      type: 'line',
      data: {
        labels: datelist,
        datasets: [{
            label: this.sensorName,
            data: valuelist,
            borderWidth: 1,
            borderColor: 'rgb(75, 192, 192)',
        }]
    },
      options: {
          scales: {
              y: {
                  beginAtZero: false
              }
          }
      }
    });
    
  }

  componentDidMount() {
    this.sensorName = this.props.match.params.sensorName;
    const errorHandler = error => {
      this.setState({
        content:
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
      });
      /*
      this.myChart = new Chart(this.canvasRef.current, {
        type: 'bar',
        data: {
          labels: this.props.data.map(d => d.label),
          datasets: [{
            label: this.props.title,
            data: this.props.data.map(d => d.value),
            backgroundColor: this.props.color
          }]
        }
      });
      */
    }

    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      errorHandler
    );
    console.log(this.sensorName);
    SensorService.getSensorsValues(this.sensorName).then(
      response => {
        console.log(response);
        this.setState({
          pagecontent: JSON.parse(response.data)
        });
        
        this.drawChartFunction();
      },
      errorHandler
    );
    SensorService.getSensorSettings(this.sensorName).then(
      response => {
        var jsondata = JSON.parse(response.data);
        console.log(jsondata.length);
        if(jsondata.length > 0)
        {
          console.log();
          console.log(jsondata[0].updateIntervall);
          this.setState({
          value: jsondata[0].updateIntervall
        });
        }
        
      },
      errorHandler
    );
  }
  render() {
    //this.drawChartFunction();
    return (
      <div className="container">
        <header className="jumbotron">
          
          <h3>Chart</h3>
          <canvas id="myChart" />
          <hr/>
          <h3>Update interval</h3>
          <form onSubmit={this.handleSubmit}>
          <div class="form-group">
            <label for="intervalInput1">Update Interval</label>
            <input value={this.state.value} onChange={this.handleChange} type="number" class="form-control" id="intervalInput1" aria-describedby="intervalHelp" placeholder="Enter update interval in seconds"/>
            <small id="intervalHelp" class="form-text text-muted">Set the sensor update interval in seconds.</small>
          </div>
          <button type="submit" class="btn btn-primary">Set</button>
      </form>
      <hr/>
      <h4>RAW:</h4>
      <ul>
        {this.state.pagecontent.map(item => { return <li>{item.date} --- {item.value}</li> })}
      </ul>
      
        </header>
      </div>
    );
    
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(SensorDetails);
//export default withRouter(SensorDetails);
