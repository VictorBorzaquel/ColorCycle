import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export function UIButton({ title, backgroundColor, onPress, type }: {
  title: string;
  backgroundColor: string;
  onPress(): void;
  type: 'header' | 'start'
}) {
  return (
    <TouchableOpacity style={[styles[type], { backgroundColor }]} onPress={onPress}>
      <Text style={styles.buttonTitle}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    // flex: 1,
    height: '100%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  start: {
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonTitle: {
    fontWeight: 'bold'
  }
})