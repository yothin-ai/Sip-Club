import React, { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { ScreenHeader } from "../ScreenHeader";
import { PrimaryButton } from "../PrimaryButton";
import { Card } from "../Card";
import { useAppContext } from "../../context/AppContext";

function ResultChip({ label, value, confidence }: { label: string; value: string; confidence: number }) {
  return (
    <Card className="mb-3 flex-row items-center justify-between bg-surface-strong">
      <View>
        <Text className="font-mono text-[10px] uppercase tracking-widest text-muted">{label}</Text>
        <Text className="mt-1 font-sans-medium text-base text-heading">{value}</Text>
      </View>
      <View className="rounded-pill border border-border-strong px-3 py-1">
        <Text className="font-mono text-xs text-accent">{Math.round(confidence * 100)}%</Text>
      </View>
    </Card>
  );
}

export function PhotoScanScreen() {
  const { analyzed, analysisResult, runAnalysis, goNext } = useAppContext();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // TODO: call supabase analyze-bag edge function instead of mocking.
  // runAnalysis() in context/AppContext.tsx currently mocks a ~1.5s delay.
  const handleScan = async () => {
    setIsAnalyzing(true);
    await runAnalysis();
    setIsAnalyzing(false);
  };

  return (
    <View className="flex-1">
      <ScreenHeader label="Scan bag" screen={1} />
      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 24 }}>
        <Text className="mb-2 font-sans-semibold text-2xl text-heading" style={{ fontSize: 26 }}>
          Scan your coffee bag
        </Text>
        <Text className="mb-8 font-sans text-sm leading-6 text-body">
          ถ่ายรูปหรืออัปโหลดรูปถุงกาแฟ เราจะวิเคราะห์ roast, process และ origin ให้
        </Text>

        <View className="mb-6 items-center justify-center rounded-card border border-dashed border-border bg-surface py-16">
          <View className="mb-3 h-12 w-12 items-center justify-center rounded-icon-badge border border-border-strong">
            <Text className="text-xl text-accent">↑</Text>
          </View>
          <Text className="font-sans text-sm text-body">ลากรูปมาวาง หรือแตะเพื่ออัปโหลด</Text>
        </View>

        {!analyzed && (
          <PrimaryButton
            label={isAnalyzing ? "Analyzing..." : "Scan / Upload"}
            onPress={handleScan}
            disabled={isAnalyzing}
          />
        )}

        {isAnalyzing && (
          <View className="mt-6 items-center">
            <ActivityIndicator color="#b9a3ff" />
          </View>
        )}

        {analyzed && analysisResult && (
          <View className="mt-2">
            <ResultChip label="Roast level" value={analysisResult.roast} confidence={analysisResult.confidence.roast} />
            <ResultChip label="Processing" value={analysisResult.process} confidence={analysisResult.confidence.process} />
            <ResultChip label="Origin" value={analysisResult.origin} confidence={analysisResult.confidence.origin} />

            <View className="mt-6">
              <PrimaryButton label="Continue to recipe" onPress={goNext} />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
