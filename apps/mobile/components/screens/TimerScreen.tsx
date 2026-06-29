import React, { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { ScreenHeader } from "../ScreenHeader";
import { PrimaryButton } from "../PrimaryButton";
import { Card } from "../Card";
import { CircularProgress } from "../CircularProgress";
import { useAppContext } from "../../context/AppContext";

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function TimerScreen() {
  const { recipe, timer, tickTimer, toggleTimerRunning, finishBrew } = useAppContext();
  const pulse = useRef(new Animated.Value(1)).current;

  // Tick every 1s while running (README.md section 7: "Timer: 1-second interval").
  useEffect(() => {
    if (!timer.running) return;
    const interval = setInterval(() => {
      tickTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [timer.running, tickTimer]);

  useEffect(() => {
    if (!timer.running) {
      pulse.setValue(1);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.04, duration: 900, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [timer.running, pulse]);

  if (!recipe) {
    return (
      <View className="flex-1">
        <ScreenHeader label="Timer" screen={3} />
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-body">Start a brew from the recipe screen first.</Text>
        </View>
      </View>
    );
  }

  const { pours, total_time_sec } = recipe;
  const elapsed = timer.elapsed;

  // Current step = last pour whose t_sec <= elapsed; next step = the one after it.
  let currentIndex = 0;
  for (let i = 0; i < pours.length; i++) {
    if (pours[i].t_sec <= elapsed) currentIndex = i;
  }
  const currentStep = pours[currentIndex];
  const nextStep = pours[currentIndex + 1] ?? null;

  const progress = total_time_sec > 0 ? elapsed / total_time_sec : 0;

  return (
    <View className="flex-1">
      <ScreenHeader label="Brew timer" screen={3} />
      <View className="flex-1 px-6" style={{ paddingBottom: 24 }}>
        <View className="items-center py-6">
          <Animated.View style={{ transform: [{ scale: pulse }] }}>
            <CircularProgress size={220} strokeWidth={14} progress={progress}>
              <Text className="font-mono-semibold text-3xl text-heading">{formatTime(elapsed)}</Text>
              <Text className="font-mono text-xs text-muted">/ {formatTime(total_time_sec)}</Text>
              <View className="mt-2 rounded-pill border border-border-strong px-3 py-1">
                <Text className="font-mono text-xs text-accent">{currentStep.water_label}</Text>
              </View>
            </CircularProgress>
          </Animated.View>
        </View>

        <Card className="mb-3 border-border-strong bg-surface-strong">
          <Text className="font-mono text-[10px] uppercase tracking-widest text-accent">Current step</Text>
          <View className="mt-2 flex-row items-center justify-between">
            <Text className="font-sans-medium text-base text-heading">{currentStep.label}</Text>
            <Text className="font-mono text-xs text-muted">{currentStep.time_label}</Text>
          </View>
          <Text className="mt-2 font-sans text-sm leading-5 text-body-soft">{currentStep.desc}</Text>
        </Card>

        {nextStep && (
          <Card className="mb-6 bg-transparent" style={{ opacity: 0.55 }}>
            <Text className="font-mono text-[10px] uppercase tracking-widest text-muted">Next step</Text>
            <View className="mt-2 flex-row items-center justify-between">
              <Text className="font-sans-medium text-base text-body-soft">{nextStep.label}</Text>
              <Text className="font-mono text-xs text-muted">{nextStep.time_label}</Text>
            </View>
          </Card>
        )}

        <View className="mt-auto gap-3">
          <Pressable
            onPress={toggleTimerRunning}
            className="items-center rounded-pill border border-border-strong py-4"
          >
            <Text className="font-sans-medium text-base text-heading">
              {timer.running ? "Pause" : "Resume"}
            </Text>
          </Pressable>
          <PrimaryButton label="Finish brew" onPress={finishBrew} />
        </View>
      </View>
    </View>
  );
}
