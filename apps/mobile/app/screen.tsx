import React from "react";
import { useAppContext } from "../context/AppContext";
import { OnboardingScreen } from "../components/screens/OnboardingScreen";
import { PhotoScanScreen } from "../components/screens/PhotoScanScreen";
import { RecipeScreen } from "../components/screens/RecipeScreen";
import { TimerScreen } from "../components/screens/TimerScreen";
import { FeedbackScreen } from "../components/screens/FeedbackScreen";

export default function ScreenRouter() {
  const { screen } = useAppContext();

  switch (screen) {
    case 0:
      return <OnboardingScreen />;
    case 1:
      return <PhotoScanScreen />;
    case 2:
      return <RecipeScreen />;
    case 3:
      return <TimerScreen />;
    case 4:
      return <FeedbackScreen />;
    default:
      return <OnboardingScreen />;
  }
}
