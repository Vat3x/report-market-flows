"use client";

import { useState } from "react";

export function useMultiStepForm(totalSteps: number) {
  const [currentStep, setCurrentStep] = useState(0);

  function next() {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  }

  function back() {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }

  function goTo(step: number) {
    setCurrentStep(step);
  }

  return {
    currentStep,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === totalSteps - 1,
    next,
    back,
    goTo,
    totalSteps,
  };
}
