
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';


const styles = require('./../styles');

type Props = {
  loading: boolean
};



class CustomHoldButton extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button
        style={{flex: 1, backgroundColor: 'skyblue', marginHorizontal: 3}}
        textStyle={{ fontSize: 18 }}
        isDisabled={this.props.loading}
        onPressIn={this.props.onPressInButton}
        onPressOut={this.props.onPressOutButton}
      >
        <Icon
          name={this.props.iconName}
          size={26}
          style={[styles.icon, { color: this.props.iconColor}]}
        />
        {this.props.buttonText}
      </Button>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.loading
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomHoldButton);
