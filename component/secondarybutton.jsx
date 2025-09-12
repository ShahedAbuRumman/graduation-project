import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { BUTTONS } from "../assets/style/buttons";

export default function SecondaryButton({ title, onPress }) {
  return (
    <TouchableOpacity style={BUTTONS.secondary} onPress={onPress}>
      <Text style={BUTTONS.secondaryText}>{title}</Text>
    </TouchableOpacity>
  );
}
