import React from "react";
import { View, type ViewProps } from "react-native";

export function Card({ className, style, ...rest }: ViewProps & { className?: string }) {
  return (
    <View
      className={`rounded-card border border-border bg-surface p-card-padding ${className ?? ""}`}
      style={style}
      {...rest}
    />
  );
}
