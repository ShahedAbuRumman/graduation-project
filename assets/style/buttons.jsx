import { StyleSheet } from "react-native";
import { COLORS } from "./colors";

export const BUTTONS = StyleSheet.create({
  primary: {
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  secondary: {
    backgroundColor: COLORS.lightGray,
    height: 48,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: {
    color: COLORS.black,
    fontWeight: "bold",
    fontSize: 16,
  },
});
