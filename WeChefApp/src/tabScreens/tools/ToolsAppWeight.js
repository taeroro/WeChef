import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { MKTextField, MKColor } from 'react-native-material-kit';
import convert from 'convert-units';

class ToolsAppWeight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      unit1: 'lb',
      unit2: 'oz',
      inputValue: '',
    };

    this.onChangeText = this.onChangeText.bind(this);

    this.unit1Ref = this.updateRef.bind(this, 'unit1');
    this.unit2Ref = this.updateRef.bind(this, 'unit2');
  }

  onChangeText(text) {
    ['unit1', 'unit2']
      .map((name) => ({ name, ref: this[name] }))
      .filter(({ ref }) => ref && ref.isFocused())
      .forEach(({ name, ref }) => {
        this.setState({ [name]: text });
      });
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  convertResult() {
    let input = this.state.inputValue;
    if (input === '') return '-';
    let output = convert(parseFloat(input)).from(this.state.unit1).to(this.state.unit2);
    return output.toFixed(2);
  }

  render() {
    let { unit1, unit2, inputValue } = this.state;

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.innerContainer}>
            <View style={styles.fieldsContainer}>
              <Dropdown
                ref={this.unit1Ref}
                value={unit1}
                onChangeText={this.onChangeText}
                dropdownPosition={0}
                containerStyle={styles.unitContainer}
                label='Input Unit'
                data={unitData}
              />

              <TextfieldWithFloatingLabel
                underlineSize={1}
                ref="defaultInput"
                onChangeText={(inputValue) => this.setState({inputValue})}
                value={inputValue.toString()}
                testID='inputAmountTextField'
              />
            </View>

            <View style={styles.fieldsContainer}>
              <Dropdown
                ref={this.unit2Ref}
                value={unit2}
                onChangeText={this.onChangeText}
                dropdownPosition={0}
                containerStyle={styles.unitContainer}
                label='Convert Unit'
                data={unitData}
              />

              <View style={styles.outputLabelContainer}>
                <Text style={styles.outputLabel}>Converted Amount</Text>
                <Text style={styles.outputText} selectable>
                  {this.convertResult()}
                </Text>
              </View>
            </View>

          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default ToolsAppWeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  innerContainer: {
    flex: 1,
    marginTop: 10,
    paddingLeft: 25,
    paddingRight: 25,
  },
  fieldsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unitContainer: {
    width: '48%',
  },
  outputLabelContainer: {
    width: '48%',
  },
  outputLabel: {
    paddingTop: 8,
    fontSize: 10,
    fontWeight: '200',
    color: '#9E9E9E',
  },
  outputText: {
    paddingTop: 26 - 15,
    paddingBottom: 10,
  },
  textfieldWithFloatingLabel: {
    marginTop: 7,
    height: 48,  // have to do it on iOS
    width: '48%',
  },
});

const unitData = [
  { value: 'lb' },
  { value: 'oz' },
  { value: 'kg' },
  { value: 'g' },
];

const TextfieldWithFloatingLabel = MKTextField.textfieldWithFloatingLabel()
  .withPlaceholder('Input Amount')
  .withStyle(styles.textfieldWithFloatingLabel)
  .withTextInputStyle({
    flex: 1,
    color: '#000',
  })
  .withFloatingLabelFont({
    fontSize: 13,
    fontWeight: '200',
  })
  .withKeyboardType('numeric')
  .build();
