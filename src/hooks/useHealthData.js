/**
 * Custom hook for managing health data state and insights
 * Centralizes all health data management logic
 */

import { useState, useMemo } from 'react';
import { medicalKnowledge } from '../utils/medicalKnowledge';

export const useHealthData = () => {
  const [userProfile, setUserProfile] = useState({
    initials: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    bmi: '',
    ethnicity: '',
    occupation: '',
    familyHistory: '',
    smokingHistory: '',
    alcoholUse: '',
    exerciseFrequency: '',
    sleepHours: ''
  });

  const [medicalData, setMedicalData] = useState({
    conditions: [],
    medications: [],
    allergies: [],
    surgeries: [],
    symptoms: [],
    vitals: []
  });

  const [latestVitals, setLatestVitals] = useState({
    systolicBP: '',
    diastolicBP: '',
    heartRate: '',
    temperature: '',
    respiratoryRate: '',
    oxygenSat: '',
    bloodGlucose: '',
    hemoglobinA1C: '',
    totalCholesterol: '',
    ldlCholesterol: '',
    hdlCholesterol: '',
    triglycerides: '',
    creatinine: '',
    bun: '',
    gfr: '',
    albumin: '',
    hemoglobin: '',
    whiteBC: '',
    platelets: '',
    thyroidTSH: '',
    vitaminD: '',
    vitaminB12: ''
  });

  // Calculate comprehensive health insights
  const healthInsights = useMemo(() => {
    const insights = {
      cardiovascularRisk: null,
      diabeticRisk: null,
      symptomAnalyses: [],
      overallAssessment: '',
      priorityRecommendations: []
    };

    if (userProfile.age && latestVitals.systolicBP) {
      insights.cardiovascularRisk = medicalKnowledge.cardiovascularRisk.assessRisk(
        userProfile,
        latestVitals
      );
    }

    if (userProfile.bmi || latestVitals.hemoglobinA1C) {
      insights.diabeticRisk = medicalKnowledge.diabeticRisk.assessRisk(userProfile, latestVitals);
    }

    if (medicalData.symptoms.length > 0) {
      insights.symptomAnalyses = medicalKnowledge.symptomAnalyzer.analyze(
        medicalData.symptoms,
        latestVitals,
        medicalData.conditions
      );
    }

    // Overall assessment
    let assessments = [];
    if (insights.cardiovascularRisk?.riskLevel === 'High')
      assessments.push('High cardiovascular risk detected');
    if (insights.diabeticRisk?.status?.includes('Diabetes'))
      assessments.push('Diabetes evaluation needed');
    if (insights.symptomAnalyses.some((s) => s.redFlags.length > 0))
      assessments.push('Symptoms requiring urgent evaluation');

    insights.overallAssessment =
      assessments.length > 0
        ? assessments.join('. ')
        : 'Current data suggests stable health status';

    return insights;
  }, [userProfile, latestVitals, medicalData]);

  const handleProfileUpdate = (field, value) => {
    setUserProfile((prev) => {
      const updated = { ...prev, [field]: value };
      if (
        (field === 'weight' || field === 'height') &&
        updated.height &&
        updated.weight
      ) {
        const heightM = updated.height / 100;
        updated.bmi = (updated.weight / (heightM * heightM)).toFixed(1);
      }
      return updated;
    });
  };

  const addMedicalItem = (category, item) => {
    if (item.trim()) {
      setMedicalData((prev) => ({
        ...prev,
        [category]: [
          ...prev[category],
          {
            id: Date.now(),
            name: item.trim(),
            dateAdded: new Date().toLocaleDateString(),
            ...(category === 'symptoms' && { severity: 'moderate', frequency: 'occasional' })
          }
        ]
      }));
    }
  };

  const removeMedicalItem = (category, id) => {
    setMedicalData((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item.id !== id)
    }));
  };

  const addVital = (vitalData) => {
    setLatestVitals((prev) => ({ ...prev, ...vitalData }));
  };

  return {
    userProfile,
    medicalData,
    latestVitals,
    healthInsights,
    handleProfileUpdate,
    addMedicalItem,
    removeMedicalItem,
    addVital,
    setUserProfile,
    setMedicalData,
    setLatestVitals
  };
};
