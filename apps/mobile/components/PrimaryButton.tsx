import React from "react";
import { Pressable, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

export function PrimaryButton({ label, onPress, disabled }: PrimaryButtonProps) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={{ opacity: disabled ? 0.5 : 1 }}>
      <LinearGradient
        colors={["#b9a3ff", "#7c5cfa"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: 999, paddingVertical: 16, alignItems: "center" }}
      >
        <Text className="font-sans-semibold text-base" style={{ color: "#140d22" }}>
          {label}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}
