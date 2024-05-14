import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

const Button = ({ callback = () => {}, title = '' }) => {
  const call = async () => {
    await callback();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={call} style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'darkgray',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Button;
