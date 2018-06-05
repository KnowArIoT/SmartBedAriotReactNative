
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';


const styles = require('./../styles');

type Props = {
  loading: boolean
};



class CustomClickButton extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button
        style={{flex: 1, backgroundColor: 'skyblue', marginHorizontal: 3}}
        textStyle={{ fontSize: 18 }}
        isDisabled={this.props.loading || this.props.isDisabled}
        onPress={this.props.onPressButton}
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomClickButton);
