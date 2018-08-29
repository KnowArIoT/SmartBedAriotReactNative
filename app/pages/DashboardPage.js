
import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import LoadingView from 'react-native-loading-view';
import { startLoading, stopLoading } from '../../actions';
import { SHOULD_MOCK } from '../../constants';
import { SmartBedUrler } from '../util/RequestHelper';
import ChartView from 'react-native-highcharts';

const styles = require('./../styles');

var Highcharts='Highcharts';
const chartOptions = {
    global: {
        useUTC: false
    },
    lang: {
        decimalPoint: ',',
        thousandsSep: '.'
    }
};


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

  getChartConf(dataSeries, dataName) {
    var conf={
      chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10
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
          text: dataName
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
          name: dataName,
          data: (function () {
              var i;
              var data = [];

              // var time = (new Date()).getTime();
              // for (i = -19; i <= 0; i += 1) {
              //   data.push({
              //       x: time + i * 1000,
              //       y: Math.random()
              //   });
              // }
              for (i = 0; i < Math.min(60*6, dataSeries.length); i +=1) {
                var time = new Date(dataSeries[i].minuteOfTime)
                data.push({
                    x: time.getTime() - 2*60*60*1000,
                    y: parseFloat(dataSeries[i].averageSensorValue)
                });
              }
              return data;
          }())
      }]
    };
    return conf;
  }

  render() {
    if (!this.props.loading && this.state.sensorData !== null) {
      var flexSeries = this.state.sensorData[0].history;
      var pressureSeries = this.state.sensorData[1].history;
      var temperatureSeries = this.state.sensorData[2].history;
      var humiditySeries = this.state.sensorData[3].history;
      var lightSeries = this.state.sensorData[4].history;


      return (
        <LoadingView loading={this.props.loading}>
          <ScrollView>
            <ChartView style={{height:300, paddingTop: 30}} config={this.getChartConf(flexSeries, "Flex")} options={chartOptions}></ChartView>
            <ChartView style={{height:300, paddingTop: 5}} config={this.getChartConf(pressureSeries, "Urin")} options={chartOptions}></ChartView>
            <ChartView style={{height:300, paddingTop: 5}} config={this.getChartConf(temperatureSeries, "Temperatur (°C)")} options={chartOptions}></ChartView>
            <ChartView style={{height:300, paddingTop: 5}} config={this.getChartConf(humiditySeries, "Luftfuktighet")} options={chartOptions}></ChartView>
            <ChartView style={{height:300, paddingTop: 5}} config={this.getChartConf(lightSeries, "Lys")} options={chartOptions}></ChartView>
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
