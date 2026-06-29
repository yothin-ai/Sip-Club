import React from "react";
import { Pressable, Text, View } from "react-native";

interface ScreenHeaderProps {
  label: string;
  screen: 0 | 1 | 2 | 3 | 4;
  onBack?: () => void;
}

const TOTAL_DOTS = 5;

export function ScreenHeader({ label, screen, onBack }: ScreenHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-6 pt-4 pb-3">
      <Pressable
        onPress={onBack}
        disabled={screen === 0}
        className="h-9 w-9 items-center justify-center rounded-pill border border-border"
        style={{ opacity: screen === 0 ? 0 : 1 }}
      >
        <Text className="text-heading">{"‹"}</Text>
      </Pressable>

      <Text className="font-mono text-xs uppercase tracking-widest text-muted">{label}</Text>

      <View className="flex-row items-center gap-1.5">
        {Array.from({ length: TOTAL_DOTS }).map((_, i) => {
          const active = i === screen;
          return (
            <View
              key={i}
              className={active ? "h-1.5 w-5 rounded-pill bg-accent" : "h-1.5 w-1.5 rounded-pill bg-border"}
            />
          );
        })}
      </View>
    </View>
  );
}
