export type GrinderType = "hand" | "electric";
export type GrinderScale = "clicks" | "dial" | "stepless";

export interface Grinder {
  id: string;
  name: string;
  type: GrinderType;
  scale: GrinderScale;
  range: [number, number];
}

export type DripperGeometry = "cone" | "flat";

export interface Dripper {
  id: string;
  name: string;
  geometry: DripperGeometry;
  default_ratio: string;
}

export interface Pour {
  t_sec: number;
  time_label: string;
  label: string;
  water_label: string;
  target_total_g: number;
  desc: string;
}

export interface GrindSetting {
  value: number;
  unit: string;
}

export interface Recipe {
  origin: string;
  process: string;
  roast: string;
  dripper_id: string;
  grinder_id: string;
  ratio: string;
  dose_g: number;
  water_g: number;
  water_temp_c: number;
  total_time_sec: number;
  grind_setting: GrindSetting;
  pours: Pour[];
}

export type RoastLevel = "Light" | "Medium-light" | "Medium" | "Medium-dark" | "Dark";
export type ProcessMethod = "Washed" | "Natural" | "Honey" | "Anaerobic";

export interface AnalysisField {
  key: string;
  label: string;
  values?: string[];
  example?: string;
}

export interface AnalysisResult {
  roast: RoastLevel;
  process: ProcessMethod;
  origin: string;
  confidence: {
    roast: number;
    process: number;
    origin: number;
  };
}

export interface FeedbackTag {
  id: string;
  label: string;
  exclusive: boolean;
}

export type Adjustment = Record<string, string>;
