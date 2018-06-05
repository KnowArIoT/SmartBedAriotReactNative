
import React, { Component } from 'react';
import { View, AsyncStorage, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import LoadingView from 'react-native-loading-view';
import { startLoading, stopLoading } from '../../actions';
import { SHOULD_MOCK } from '../../constants';
import { SmartBedUrler } from '../util/RequestHelper';
// import { VictoryBar } from "victory-native";
import ChartView from 'react-native-chart-view';


const styles = require('./../styles');

type Props = {
  navigation: Object,
  loading: boolean,
  networkEnabled: boolean,
  dispatchStartLoading: () => void,
  dispatchStopLoading: () => void
};

type State = {
  sensorData: Array<Object>
}

class DashboardPage extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      sensorData: null
    }
  }

  componentDidMount() {
    this.props.dispatchStartLoading();
    this.fetchData();
  }

  fetchData() {
    fetch(SmartBedUrler.getSensorData)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Uventet feil');
      })
      .then((responseJson) => {
        console.log(responseJson);
        this.props.dispatchStopLoading();
        this.setState({sensorData: responseJson.sensorStatistics})
      })
      .catch((error) => {
        console.log(error);
      });
      this.props.dispatchStopLoading();
  }

  render() {
    if (!this.props.loading && this.state.sensorData !== null) {
      var newTemperatureSeries = this.state.sensorData[2].history;
      var Highcharts='Highcharts';
      var conf={
              chart: {
                  type: 'spline',
                  animation: Highcharts.svg, // don't animate in old IE
                  marginRight: 10,
                  // events: {
                  //     load: function () {
                  //
                  //         // set up the updating of the chart each second
                  //         var series = this.series[0];
                  //         setInterval(function () {
                  //             var x = (new Date()).getTime(), // current time
                  //                 y = Math.random();
                  //             series.addPoint([this.state.sensorData[2].history[this.state.data], y], true, true);
                  //         }, 1000);
                  //     }
                  // }
              },
              title: {
                  text: 'Temperatur'
              },
              xAxis: {
                  type: 'datetime',
                  tickPixelInterval: 150
              },
              yAxis: {
                  title: {
                      text: 'Value'
                  },
                  plotLines: [{
                      value: 0,
                      width: 1,
                      color: '#808080'
                  }]
              },
              tooltip: {
                  formatter: function () {
                      return '<b>' + this.series.name + '</b><br/>' +
                          Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                          Highcharts.numberFormat(this.y, 2);
                  }
              },
              legend: {
                  enabled: false
              },
              exporting: {
                  enabled: false
              },
              series: [{
                  name: 'Temperatur',
                  data: (function () {
                      // generate an array of random data
                      var i;
                      var data = []
                      for (i = 0; i < newTemperatureSeries.length; i +=1) {
                        var time = new Date(newTemperatureSeries[i].minuteOfTime).getTime()
                        data.push({
                            x: time * 1000,
                            y: newTemperatureSeries[i].averageSensorValue
                        });
                      }
                      return data;
                  }())
              }]
          };

      const options = {
          global: {
              useUTC: false
          },
          lang: {
              decimalPoint: ',',
              thousandsSep: '.'
          }
      };





      var newHumiditySeries = this.state.sensorData[3].history;
      var Highcharts2='Highcharts';
      var conf2={
              chart: {
                  type: 'spline',
                  animation: Highcharts.svg, // don't animate in old IE
                  marginRight: 10,
                  // events: {
                  //     load: function () {
                  //
                  //         // set up the updating of the chart each second
                  //         var series = this.series[0];
                  //         setInterval(function () {
                  //             var x = (new Date()).getTime(), // current time
                  //                 y = Math.random();
                  //             series.addPoint([this.state.sensorData[2].history[this.state.data], y], true, true);
                  //         }, 1000);
                  //     }
                  // }
              },
              title: {
                  text: 'Humidity'
              },
              xAxis: {
                  type: 'datetime',
                  tickPixelInterval: 150
              },
              yAxis: {
                  title: {
                      text: 'Value'
                  },
                  plotLines: [{
                      value: 0,
                      width: 1,
                      color: '#808080'
                  }]
              },
              tooltip: {
                  formatter: function () {
                      return '<b>' + this.series.name + '</b><br/>' +
                          Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                          Highcharts.numberFormat(this.y, 2);
                  }
              },
              legend: {
                  enabled: false
              },
              exporting: {
                  enabled: false
              },
              series: [{
                  name: 'Humidity',
                  data: (function () {
                      // generate an array of random data
                      var i;
                      var data = []
                      for (i = 0; i < newHumiditySeries.length; i +=1) {
                        var time = new Date(newHumiditySeries[i].minuteOfTime).getTime()
                        data.push({
                            x: time * 1000,
                            y: newHumiditySeries[i].averageSensorValue
                        });
                      }
                      return data;
                  }())
              }]
          };

      const options2 = {
          global: {
              useUTC: false
          },
          lang: {
              decimalPoint: ',',
              thousandsSep: '.'
          }
      };



      var newLightSeries = this.state.sensorData[4].history;
      var Highcharts3='Highcharts';
      var conf3={
              chart: {
                  type: 'spline',
                  animation: Highcharts.svg, // don't animate in old IE
                  marginRight: 10,
                  // events: {
                  //     load: function () {
                  //
                  //         // set up the updating of the chart each second
                  //         var series = this.series[0];
                  //         setInterval(function () {
                  //             var x = (new Date()).getTime(), // current time
                  //                 y = Math.random();
                  //             series.addPoint([this.state.sensorData[2].history[this.state.data], y], true, true);
                  //         }, 1000);
                  //     }
                  // }
              },
              title: {
                  text: 'Light'
              },
              xAxis: {
                  type: 'datetime',
                  tickPixelInterval: 150
              },
              yAxis: {
                  title: {
                      text: 'Value'
                  },
                  plotLines: [{
                      value: 0,
                      width: 1,
                      color: '#808080'
                  }]
              },
              tooltip: {
                  formatter: function () {
                      return '<b>' + this.series.name + '</b><br/>' +
                          Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                          Highcharts.numberFormat(this.y, 2);
                  }
              },
              legend: {
                  enabled: false
              },
              exporting: {
                  enabled: false
              },
              series: [{
                  name: 'Light',
                  data: (function () {
                      // generate an array of random data
                      var i;
                      var data = []
                      for (i = 0; i < newLightSeries.length; i +=1) {
                        var time = new Date(newLightSeries[i].minuteOfTime).getTime()
                        data.push({
                            x: time * 1000,
                            y: newLightSeries[i].averageSensorValue
                        });
                      }
                      return data;
                  }())
              }]
          };

      const options3 = {
          global: {
              useUTC: false
          },
          lang: {
              decimalPoint: ',',
              thousandsSep: '.'
          }
      };


      var newFlexSeries = this.state.sensorData[0].history.slice(0, 20);
      var Highcharts4='Highcharts';
      var conf4={
              chart: {
                  type: 'spline',
                  animation: Highcharts.svg, // don't animate in old IE
                  marginRight: 10,
                  // events: {
                  //     load: function () {
                  //
                  //         // set up the updating of the chart each second
                  //         var series = this.series[0];
                  //         setInterval(function () {
                  //             var x = (new Date()).getTime(), // current time
                  //                 y = Math.random();
                  //             series.addPoint([this.state.sensorData[2].history[this.state.data], y], true, true);
                  //         }, 1000);
                  //     }
                  // }
              },
              title: {
                  text: 'Flex'
              },
              xAxis: {
                  type: 'datetime',
                  tickPixelInterval: 150
              },
              yAxis: {
                  title: {
                      text: 'Value'
                  },
                  plotLines: [{
                      value: 0,
                      width: 1,
                      color: '#808080'
                  }]
              },
              tooltip: {
                  formatter: function () {
                      return '<b>' + this.series.name + '</b><br/>' +
                          Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                          Highcharts.numberFormat(this.y, 2);
                  }
              },
              legend: {
                  enabled: false
              },
              exporting: {
                  enabled: false
              },
              series: [{
                  name: 'Flex',
                  data: (function () {
                      // generate an array of random data
                      var i;
                      var data = []
                      for (i = 0; i < newFlexSeries.length; i +=1) {
                        var time = new Date(newFlexSeries[i].minuteOfTime).getTime()
                        data.push({
                            x: time * 1000,
                            y: newFlexSeries[i].averageSensorValue
                        });
                      }
                      return data;
                  }())
              }]
          };

      const options4 = {
          global: {
              useUTC: false
          },
          lang: {
              decimalPoint: ',',
              thousandsSep: '.'
          }
      };

      var newPressureSeries = this.state.sensorData[1].history.slice(0, 20);
      var Highcharts5='Highcharts';
      var conf5={
              chart: {
                  type: 'spline',
                  animation: Highcharts.svg, // don't animate in old IE
                  marginRight: 10,
                  // events: {
                  //     load: function () {
                  //
                  //         // set up the updating of the chart each second
                  //         var series = this.series[0];
                  //         setInterval(function () {
                  //             var x = (new Date()).getTime(), // current time
                  //                 y = Math.random();
                  //             series.addPoint([this.state.sensorData[2].history[this.state.data], y], true, true);
                  //         }, 1000);
                  //     }
                  // }
              },
              title: {
                  text: 'Urine'
              },
              xAxis: {
                  type: 'datetime',
                  tickPixelInterval: 150
              },
              yAxis: {
                  title: {
                      text: 'Value'
                  },
                  plotLines: [{
                      value: 0,
                      width: 1,
                      color: '#808080'
                  }]
              },
              tooltip: {
                  formatter: function () {
                      return '<b>' + this.series.name + '</b><br/>' +
                          Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                          Highcharts.numberFormat(this.y, 2);
                  }
              },
              legend: {
                  enabled: false
              },
              exporting: {
                  enabled: false
              },
              series: [{
                  name: 'Urine',
                  data: (function () {
                      // generate an array of random data
                      var i;
                      var data = []
                      for (i = 0; i < newPressureSeries.length; i +=1) {
                        var time = new Date(newPressureSeries[i].minuteOfTime).getTime()
                        data.push({
                            x: time * 1000,
                            y: newPressureSeries[i].averageSensorValue
                        });
                      }
                      return data;
                  }())
              }]
          };

      const options5 = {
          global: {
              useUTC: false
          },
          lang: {
              decimalPoint: ',',
              thousandsSep: '.'
          }
      };


      return (
        <LoadingView loading={this.props.loading}>
          <ScrollView>
            <ChartView style={{height:300, paddingTop: 30}} config={conf} options={options}></ChartView>
            <ChartView style={{height:300, paddingTop: 5}} config={conf2} options={options2}></ChartView>
            <ChartView style={{height:300, paddingTop: 5}} config={conf3} options={options3}></ChartView>
            <ChartView style={{height:300, paddingTop: 5}} config={conf4} options={options4}></ChartView>
            <ChartView style={{height:300, paddingTop: 5}} config={conf5} options={options5}></ChartView>
          </ScrollView>
        </LoadingView>
      );
    }
    else {
      return (
        <LoadingView loading={true}>
        </LoadingView>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.loading,
    networkEnabled: state.networkEnabled.networkEnabled
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {
    dispatchStartLoading: () => dispatch(startLoading()),
    dispatchStopLoading: () => dispatch(stopLoading())
  };
}

export default translate()(
  connect(mapStateToProps, mapDispatchToProps)(DashboardPage)
);
