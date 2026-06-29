import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { grinders, drippers } from "@sip-club/core";
import { ScreenHeader } from "../ScreenHeader";
import { Dropdown } from "../Dropdown";
import { PrimaryButton } from "../PrimaryButton";
import { Card } from "../Card";
import { useAppContext } from "../../context/AppContext";

type OpenDropdown = "grinder" | "dripper" | null;

export function OnboardingScreen() {
  const { grinderId, dripperId, setGrinderId, setDripperId, goNext } = useAppContext();
  const [openDropdown, setOpenDropdown] = useState<OpenDropdown>(null);

  return (
    <View className="flex-1">
      <ScreenHeader label="SETUP" screen={0} />
      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 24 }}>
        <Text className="mb-2 font-sans-semibold text-2xl text-heading" style={{ fontSize: 26 }}>
          เลือกอุปกรณ์ของคุณ
        </Text>
        <Text className="mb-8 font-sans text-sm leading-6 text-body">
          ตั้งค่าครั้งเดียว ระบบจำไว้ให้คุณครั้งต่อไป
        </Text>

        <View className="mb-5">
          <Dropdown
            label="เครื่องบดของคุณ"
            options={grinders.map((g) => ({ id: g.id, label: g.name, sublabel: g.scale }))}
            selectedId={grinderId}
            onSelect={(id) => {
              setGrinderId(id);
              setOpenDropdown(null);
            }}
            isOpen={openDropdown === "grinder"}
            onToggle={() => setOpenDropdown((cur) => (cur === "grinder" ? null : "grinder"))}
          />
        </View>

        <View className="mb-6">
          <Dropdown
            label="ดริปเปอร์ของคุณ"
            options={drippers.map((d) => ({ id: d.id, label: d.name, sublabel: d.default_ratio }))}
            selectedId={dripperId}
            onSelect={(id) => {
              setDripperId(id);
              setOpenDropdown(null);
            }}
            isOpen={openDropdown === "dripper"}
            onToggle={() => setOpenDropdown((cur) => (cur === "dripper" ? null : "dripper"))}
          />
        </View>

        <Card className="mb-8 border-dashed bg-transparent">
          <Text className="font-sans-medium text-sm text-body-soft">ไม่มีเครื่องบดของคุณในรายการ?</Text>
          <Text className="mt-1 font-sans text-xs text-muted">
            calibrate เครื่องบดเองได้เลย
          </Text>
        </Card>

        <PrimaryButton label="บันทึกแล้วเริ่มต่อ" onPress={goNext} />
      </ScrollView>
    </View>
  );
}
