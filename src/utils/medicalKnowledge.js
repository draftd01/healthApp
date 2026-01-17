/**
 * Comprehensive medical knowledge base with clinical decision support
 * Provides risk assessment and clinical analysis functions
 */

export const medicalKnowledge = {
  cardiovascularRisk: {
    assessRisk: (profile, vitals) => {
      const age = parseInt(profile.age) || 0;
      const systolic = parseInt(vitals.systolicBP) || 0;
      const cholesterol = parseInt(vitals.totalCholesterol) || 0;
      const hdl = parseInt(vitals.hdlCholesterol) || 0;

      let riskScore = 0;
      let riskFactors = [];

      if (age > 65) {
        riskScore += 2;
        riskFactors.push('Age > 65');
      }
      if (age > 45 && profile.gender === 'male') {
        riskScore += 1;
        riskFactors.push('Male > 45');
      }
      if (age > 55 && profile.gender === 'female') {
        riskScore += 1;
        riskFactors.push('Female > 55');
      }
      if (systolic >= 140) {
        riskScore += 2;
        riskFactors.push('Hypertension (SBP ≥140)');
      }
      if (systolic >= 130) {
        riskScore += 1;
        riskFactors.push('Elevated BP (SBP 130-139)');
      }
      if (cholesterol >= 240) {
        riskScore += 2;
        riskFactors.push('High cholesterol (≥240)');
      }
      if (hdl < 40) {
        riskScore += 1;
        riskFactors.push('Low HDL (<40)');
      }
      if (profile.smokingHistory === 'current') {
        riskScore += 2;
        riskFactors.push('Current smoker');
      }
      if (profile.familyHistory?.includes('heart')) {
        riskScore += 1;
        riskFactors.push('Family history of heart disease');
      }

      let riskLevel = 'Low';
      if (riskScore >= 6) riskLevel = 'High';
      else if (riskScore >= 3) riskLevel = 'Moderate';

      return { riskLevel, riskScore, riskFactors };
    }
  },

  diabeticRisk: {
    assessRisk: (profile, vitals) => {
      const bmi = parseFloat(profile.bmi) || 0;
      const a1c = parseFloat(vitals.hemoglobinA1C) || 0;
      const glucose = parseInt(vitals.bloodGlucose) || 0;
      const age = parseInt(profile.age) || 0;

      let riskFactors = [];
      let recommendations = [];

      if (a1c >= 6.5) {
        return {
          status: 'Diabetes Diagnosis Criteria Met',
          message: 'HbA1c ≥6.5% meets diagnostic criteria for diabetes. Immediate medical evaluation recommended.',
          urgency: 'high'
        };
      } else if (a1c >= 5.7) {
        riskFactors.push(`Prediabetes (A1C: ${a1c}%)`);
        recommendations.push('Lifestyle modification program', 'Weight loss if overweight', 'Regular exercise');
      }

      if (bmi >= 30) riskFactors.push(`Obesity (BMI: ${bmi})`);
      if (age >= 45) riskFactors.push('Age ≥45');
      if (profile.familyHistory?.includes('diabetes')) riskFactors.push('Family history of diabetes');
      if (profile.ethnicity?.toLowerCase().includes('hispanic') ||
          profile.ethnicity?.toLowerCase().includes('african') ||
          profile.ethnicity?.toLowerCase().includes('asian')) {
        riskFactors.push('High-risk ethnicity');
      }

      return { riskFactors, recommendations, status: 'Assessment Complete' };
    }
  },

  symptomAnalyzer: {
    analyze: (symptoms, vitals, conditions) => {
      const analyses = [];

      symptoms.forEach(symptom => {
        const desc = symptom.description.toLowerCase();
        let analysis = {
          symptom: symptom.description,
          possibleCauses: [],
          redFlags: [],
          recommendations: []
        };

        if (desc.includes('chest pain') || desc.includes('chest pressure')) {
          analysis.possibleCauses = [
            'Cardiac: Angina, MI, pericarditis',
            'Pulmonary: PE, pneumonia, pleuritis',
            'GI: GERD, esophageal spasm',
            'Musculoskeletal: Costochondritis, muscle strain'
          ];
          analysis.redFlags = [
            'Crushing/squeezing pain',
            'Radiation to arm/jaw',
            'Shortness of breath',
            'Sweating, nausea'
          ];
          analysis.recommendations = [
            'Immediate medical evaluation if red flags present',
            'EKG and cardiac enzymes',
            'Consider stress testing'
          ];
        }

        if (desc.includes('headache')) {
          analysis.possibleCauses = [
            'Tension-type (90%): Stress, poor posture, eye strain',
            'Migraine: Unilateral, throbbing, photophobia',
            'Cluster: Severe, periorbital, seasonal pattern',
            'Secondary: Hypertension, medication overuse, infection'
          ];
          analysis.redFlags = [
            'Sudden severe "thunderclap" headache',
            'Headache with fever and neck stiffness',
            'New headache pattern after age 50',
            'Headache with neurological deficits'
          ];
          analysis.recommendations = [
            'Headache diary',
            'Identify triggers',
            'Consider prophylactic treatment if >4/month'
          ];
        }

        if (desc.includes('shortness of breath') || desc.includes('dyspnea')) {
          analysis.possibleCauses = [
            'Cardiac: Heart failure, arrhythmia, valvular disease',
            'Pulmonary: Asthma, COPD, pneumonia, PE',
            'Systemic: Anemia, thyroid disorders, deconditioning'
          ];
          analysis.redFlags = [
            'Orthopnea',
            'Paroxysmal nocturnal dyspnea',
            'Chest pain',
            'Hemoptysis'
          ];
          analysis.recommendations = [
            'Echocardiogram',
            'Chest X-ray',
            'BNP/NT-proBNP',
            'Pulmonary function tests'
          ];
        }

        analyses.push(analysis);
      });

      return analyses;
    }
  }
};
