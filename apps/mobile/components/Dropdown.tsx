import React, { useState } from "react";
import { Pressable, Text, View, ScrollView } from "react-native";

interface DropdownOption {
  id: string;
  label: string;
  sublabel?: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function Dropdown({ label, options, selectedId, onSelect, isOpen, onToggle }: DropdownProps) {
  const selected = options.find((o) => o.id === selectedId);

  return (
    <View className="z-10">
      <Text className="mb-2 font-sans-medium text-xs text-accent">{label}</Text>
      <Pressable
        onPress={onToggle}
        className={`flex-row items-center justify-between rounded-input border px-4 py-4 ${
          isOpen ? "border-border-strong" : "border-border"
        } bg-surface-strong`}
      >
        <Text className="font-sans text-base text-heading">{selected?.label ?? "เลือก..."}</Text>
        <Text className="text-body">{isOpen ? "▲" : "▼"}</Text>
      </Pressable>

      {isOpen && (
        <View className="mt-2 max-h-60 rounded-input border border-border bg-bg-alt">
          <ScrollView>
            {options.map((option, index) => (
              <Pressable
                key={option.id}
                onPress={() => onSelect(option.id)}
                className={`flex-row items-center justify-between px-4 py-3 ${
                  index < options.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <Text className="font-sans text-sm text-body-soft">{option.label}</Text>
                {option.sublabel ? (
                  <Text className="font-mono text-xs text-muted">{option.sublabel}</Text>
                ) : null}
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
