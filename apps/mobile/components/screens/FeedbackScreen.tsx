import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { feedbackTaxonomy, getAdjustmentText } from "@sip-club/core";
import { ScreenHeader } from "../ScreenHeader";
import { PrimaryButton } from "../PrimaryButton";
import { Card } from "../Card";
import { useAppContext } from "../../context/AppContext";

export function FeedbackScreen() {
  const { feedback, toggleFeedbackTag, saveFeedback, saved, resetForNewBrew, goBack } = useAppContext();
  const adjustmentText = getAdjustmentText(feedback);

  return (
    <View className="flex-1">
      <ScreenHeader label="FEEDBACK" screen={4} onBack={goBack} />
      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 24 }}>
        <Text className="mb-2 font-sans-semibold text-2xl text-heading" style={{ fontSize: 26 }}>
          รสชาติเป็นยังไงบ้าง?
        </Text>
        <Text className="mb-6 font-sans text-sm leading-6 text-body">
          แตะเลือกให้ครบที่สุด เราจะปรับสูตรครั้งหน้าให้ดีขึ้น
        </Text>

        <View className="mb-6 flex-row flex-wrap gap-2">
          {feedbackTaxonomy.map((tag) => {
            const isSelected = feedback.includes(tag.id);
            return (
              <Pressable
                key={tag.id}
                onPress={() => toggleFeedbackTag(tag.id)}
                className={`rounded-chip border px-4 py-2.5 ${
                  isSelected ? "border-border-strong bg-surface-strong" : "border-border bg-transparent"
                }`}
              >
                <Text className={isSelected ? "font-sans-medium text-sm text-accent" : "font-sans text-sm text-body"}>
                  {tag.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {adjustmentText ? (
          <Card className="mb-6 bg-surface-strong">
            <Text className="font-mono text-[10px] text-accent">สูตรปรับหน้า</Text>
            <Text className="mt-2 font-sans text-sm leading-6 text-body-soft">{adjustmentText}</Text>
          </Card>
        ) : null}

        <PrimaryButton
          label={saved ? "บันทึกแล้ว ✓" : "บันทึก feedback"}
          onPress={saveFeedback}
          disabled={feedback.length === 0}
        />

        <Pressable onPress={resetForNewBrew} className="mt-4 items-center py-3">
          <Text className="font-sans text-sm text-accent-2">ชงใหม่อีกแก้ว</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
