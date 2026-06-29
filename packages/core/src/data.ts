/**
 * Typed seed data ported 1:1 from design_handoff_coffee_drip/coffee_app_base_data.json
 * (README.md section 9 — "Port this 1:1 into typed constants in packages/core").
 */
import type {
  Grinder,
  Dripper,
  Recipe,
  AnalysisField,
  FeedbackTag,
  Adjustment,
} from "./types";

export const grinders: Grinder[] = [
  { id: "comandante_c40", name: "Comandante C40", type: "hand", scale: "clicks", range: [0, 50] },
  { id: "timemore_c3", name: "Timemore C3", type: "hand", scale: "clicks", range: [0, 36] },
  { id: "kingrinder_k6", name: "Kingrinder K6", type: "hand", scale: "clicks", range: [0, 240] },
  { id: "1zpresso_kmax", name: "1Zpresso K-Max", type: "hand", scale: "clicks", range: [0, 90] },
  { id: "fellow_ode_2", name: "Fellow Ode Gen 2", type: "electric", scale: "dial", range: [1, 11] },
  { id: "baratza_encore", name: "Baratza Encore", type: "electric", scale: "dial", range: [1, 40] },
  { id: "df64", name: "DF64", type: "electric", scale: "stepless", range: [0, 100] },
  { id: "mahlkonig_x54", name: "Mahlkonig X54", type: "electric", scale: "dial", range: [1, 100] },
];

export const drippers: Dripper[] = [
  { id: "v60", name: "Hario V60", geometry: "cone", default_ratio: "1:16" },
  { id: "kalita_185", name: "Kalita Wave 185", geometry: "flat", default_ratio: "1:15" },
  { id: "origami", name: "Origami", geometry: "cone", default_ratio: "1:16" },
  { id: "april", name: "April", geometry: "cone", default_ratio: "1:16.6" },
  { id: "orea_v3", name: "Orea V3", geometry: "flat", default_ratio: "1:15.5" },
  { id: "chemex", name: "Chemex", geometry: "cone", default_ratio: "1:16" },
];

export const sampleRecipe: Recipe = {
  origin: "Ethiopia",
  process: "Washed",
  roast: "Medium",
  dripper_id: "v60",
  grinder_id: "comandante_c40",
  ratio: "1:16",
  dose_g: 15,
  water_g: 250,
  water_temp_c: 92,
  total_time_sec: 165,
  grind_setting: { value: 24, unit: "clicks" },
  pours: [
    {
      t_sec: 0,
      time_label: "0:00",
      label: "Bloom",
      water_label: "45g",
      target_total_g: 45,
      desc: "เทน้ำให้ทั่วเมล็ด รอประมาณ 45 วินาที",
    },
    {
      t_sec: 45,
      time_label: "0:45",
      label: "Pour 2",
      water_label: "→ 150g",
      target_total_g: 150,
      desc: "เทน้ำเป็นวงกลมช้าๆ จากตรงกลางออกด้านนอก",
    },
    {
      t_sec: 90,
      time_label: "1:30",
      label: "Pour 3",
      water_label: "→ 250g",
      target_total_g: 250,
      desc: "เทให้ถึงน้ำหนักรวม 250 กรัม",
    },
    {
      t_sec: 135,
      time_label: "2:15",
      label: "Drawdown",
      water_label: "รอน้ำหมด",
      target_total_g: 250,
      desc: "หยุดเท รอน้ำไหลลงจนหมด",
    },
  ],
};

export const analysisFields: AnalysisField[] = [
  { key: "roast", label: "Roast level", values: ["Light", "Medium-light", "Medium", "Medium-dark", "Dark"] },
  { key: "process", label: "Processing", values: ["Washed", "Natural", "Honey", "Anaerobic"] },
  { key: "origin", label: "Origin", example: "Ethiopia" },
];

export const feedbackTaxonomy: FeedbackTag[] = [
  { id: "too_sour", label: "เปรี้ยวเกินไป", exclusive: false },
  { id: "too_bitter", label: "ขมเกินไป", exclusive: false },
  { id: "too_weak", label: "จืดเกินไป", exclusive: false },
  { id: "too_strong", label: "เข้มเกินไป", exclusive: false },
  { id: "astringent", label: "ฝาดปาก", exclusive: false },
  { id: "lacks_sweet", label: "หวานน้อย", exclusive: false },
  { id: "perfect", label: "กำลังดี", exclusive: true },
];

export const adjustments: Adjustment = {
  too_sour: "ลองบดละเอียดขึ้น 2 คลิก และเพิ่มอุณหภูมิน้ำเป็น 94°",
  too_bitter: "ลองบดหยาบขึ้น 2 คลิก และลดอุณหภูมิน้ำเป็น 90°",
  too_weak: "เพิ่มปริมาณกาแฟเป็น 16g ต่อน้ำเท่าเดิม",
  too_strong: "ลดปริมาณกาแฟเหลือ 14g หรือเพิ่มน้ำเล็กน้อย",
  astringent: "บดหยาบขึ้นและลดการเทแบบหมุนวน (agitation)",
  lacks_sweet: "ยืดเวลา drawdown และลดอุณหภูมิน้ำลงเล็กน้อย",
  perfect: "ใช้สูตรนี้เป็นค่าเริ่มต้นของถุงกาแฟแบบนี้ต่อไป",
};
