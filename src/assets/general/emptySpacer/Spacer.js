import React from 'react';
import { View } from 'react-native';

const Spacer = ({ height }) => (
  <View style={{ height: height || 10 }} />
);

export default Spacer;
