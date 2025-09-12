
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; 

export default function Icon({ name, size = 24, color = "black", onPress }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <FontAwesome name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}