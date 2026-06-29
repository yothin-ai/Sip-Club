import React from "react";
import { ScrollView, Text, View } from "react-native";
import { drippers, grinders } from "@sip-club/core";
import { ScreenHeader } from "../ScreenHeader";
import { PrimaryButton } from "../PrimaryButton";
import { Card } from "../Card";
import { useAppContext } from "../../context/AppContext";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="flex-1 bg-surface-strong">
      <Text className="font-mono text-[10px] uppercase tracking-widest text-muted">{label}</Text>
      <Text className="mt-2 font-mono-semibold text-lg text-heading">{value}</Text>
    </Card>
  );
}

export function RecipeScreen() {
  const { recipe, startBrew } = useAppContext();

  if (!recipe) {
    return (
      <View className="flex-1">
        <ScreenHeader label="สูตร" screen={2} />
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-body">ถ่ายรูปถุงกาแฟก่อน เพื่อให้ระบบคำนวณสูตรให้</Text>
        </View>
      </View>
    );
  }

  const dripper = drippers.find((d) => d.id === recipe.dripper_id);
  const grinder = grinders.find((g) => g.id === recipe.grinder_id);
  const totalMin = Math.floor(recipe.total_time_sec / 60);
  const totalSec = recipe.total_time_sec % 60;

  return (
    <View className="flex-1">
      <ScreenHeader label="สูตร" screen={2} />
      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 24 }}>
        <Text className="mb-2 font-sans-semibold text-2xl text-heading" style={{ fontSize: 26 }}>
          สูตรของคุณ
        </Text>
        <Text className="mb-6 font-sans text-sm text-body-soft">
          {recipe.origin} · {recipe.process} · {recipe.roast} roast บน {dripper?.name ?? "ดริปเปอร์ของคุณ"}
        </Text>

        <View className="mb-5 flex-row gap-grid-gap">
          <StatCard label="อัตราส่วน" value={recipe.ratio} />
          <StatCard label="อุณหภูมิน้ำ" value={`${recipe.water_temp_c}°`} />
          <StatCard label="เวลารวม" value={`${totalMin}:${String(totalSec).padStart(2, "0")}`} />
        </View>

        <Card className="mb-6 bg-surface-strong">
          <Text className="font-mono text-[10px] text-accent">เบอร์บดสำหรับ {grinder?.name ?? recipe.grinder_id}</Text>
          <Text className="mt-1 font-mono-semibold text-2xl text-accent">
            {recipe.grind_setting.value} {recipe.grind_setting.unit === "clicks" ? "คลิก" : recipe.grind_setting.unit}
          </Text>
          <Text className="mt-2 font-mono text-xs text-muted">
            กาแฟ / น้ำ · {recipe.dose_g}g / {recipe.water_g}g
          </Text>
        </Card>

        <Text className="mb-3 font-mono text-xs text-accent">จังหวะเทน้ำ</Text>
        <View className="mb-8">
          {recipe.pours.map((pour, i) => (
            <View key={pour.t_sec} className="flex-row">
              <View className="mr-3 items-center">
                <View className="h-3 w-3 rounded-full bg-accent" />
                {i < recipe.pours.length - 1 && <View className="w-px flex-1 bg-border" style={{ minHeight: 36 }} />}
              </View>
              <View className="mb-5 flex-1">
                <View className="flex-row items-center justify-between">
                  <Text className="font-sans-medium text-sm text-heading">{pour.label}</Text>
                  <Text className="font-mono text-xs text-muted">{pour.time_label}</Text>
                </View>
                <Text className="mt-1 font-mono text-xs text-accent-2">{pour.water_label}</Text>
                <Text className="mt-1 font-sans text-xs leading-5 text-body">{pour.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <PrimaryButton label="เริ่มชง" onPress={startBrew} />
      </ScrollView>
    </View>
  );
}
