import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export function HexColorInput({ title, value, setValue, addValue, setAddValue }: {
  title: string;
  value: string;
  setValue(value: string): void;
  addValue: string;
  setAddValue(value: string): void;
}) {
  function handleChangeValue(value: string) {
    const validateHex = value.match(/[a-fA-F0-9]/g)?.join('') || ''
    if (validateHex.length <= 2) {
      setValue(validateHex)
    }
  }
  function handleChangeAddValue(value: string) {
    const numberValue = Number(value)
    if (numberValue <= 255) {
      setAddValue(String(numberValue))
    }
  }
  return (
    <View style={styles.hexColorInput}>
      <Text style={styles.title} adjustsFontSizeToFit>{title}</Text>
      <TextInput
        value={value}
        onChangeText={handleChangeValue}
        autoCorrect={false}
        autoCapitalize='characters'
        style={styles.textInput}
      />
      <TextInput
        value={String(addValue)}
        onChangeText={handleChangeAddValue}
        keyboardType='numeric'
        autoCorrect={false}
        style={styles.textInput}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  hexColorInput: {
    flexDirection: 'row',
    width: '100%',
  },
  title: {
    width: 90,
    textAlign: 'right',
    paddingRight: 12,
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
  textInput: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#d3d3d3',
    margin: 1,
    height: 35,
    borderRadius: 5,
  }
})