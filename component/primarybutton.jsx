import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { BUTTONS } from "../assets/style/buttons";

export default function PrimaryButton({ title, onPress }) {
  return (
    <TouchableOpacity style={BUTTONS.primary} onPress={onPress}>
      <Text style={BUTTONS.primaryText}>{title}</Text>
    </TouchableOpacity>
  );
}