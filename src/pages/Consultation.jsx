/**
 * Consultation page - AI-powered health advisor
 * Displays: symptom input, consultation history, clinical analysis, recommendations
 */

import React, { useState } from 'react';
import { Send, MessageCircle, FileText, Pill } from 'lucide-react';
import { Card, Alert } from '../components/shared/UIComponents';

export const Consultation = ({ healthInsights, medicalData, userProfile, latestVitals }) => {
  const [currentQuery, setCurrentQuery] = useState('');
  const [consultations, setConsultations] = useState([]);

  const generateConsultation = () => {
    if (!currentQuery.trim()) return;

    const query = currentQuery.toLowerCase();
    let response = {
      question: currentQuery,
      clinicalAnalysis: '',
      differentialDiagnosis: [],
      recommendedTests: [],
      treatmentOptions: [],
      followUpGuidance: '',
      evidenceLevel: 'Clinical Guidelines',
      timestamp: new Date().toLocaleString()
    };

    // Intelligent analysis based on query content and patient data
    if (query.includes('blood pressure') || query.includes('hypertension')) {
      const bp = `${latestVitals.systolicBP}/${latestVitals.diastolicBP}`;
      const systolic = parseInt(latestVitals.systolicBP) || 0;

      response.clinicalAnalysis =
        `Blood pressure analysis: ${bp} mmHg. ` +
        (systolic >= 140
          ? 'Stage 2 hypertension (≥140 mmHg)'
          : systolic >= 130
          ? 'Stage 1 hypertension (130-139 mmHg)'
          : systolic >= 120
          ? 'Elevated blood pressure (120-129 mmHg)'
          : 'Normal blood pressure (<120 mmHg)') +
        `. Patient profile shows ${
          healthInsights.cardiovascularRisk?.riskLevel || 'undetermined'
        } cardiovascular risk.`;

      response.recommendedTests = [
        '24-hour ambulatory BP monitoring',
        'Basic metabolic panel',
        'Lipid panel',
        'Urinalysis',
        'ECG'
      ];
      response.treatmentOptions =
        systolic >= 140
          ? [
              'ACE inhibitor or ARB',
              'Thiazide diuretic',
              'Calcium channel blocker',
              'Lifestyle modifications'
            ]
          : ['Lifestyle modifications', 'DASH diet', 'Regular exercise', 'Weight management'];
      response.followUpGuidance =
        'Monitor BP weekly, reassess in 4-6 weeks, target <130/80 mmHg';
    } else if (
      query.includes('diabetes') ||
      query.includes('blood sugar') ||
      query.includes('a1c')
    ) {
      const a1c = latestVitals.hemoglobinA1C;
      response.clinicalAnalysis =
        `Diabetes assessment: HbA1c ${a1c}%. ` +
        (a1c >= 6.5
          ? 'Meets diagnostic criteria for diabetes mellitus'
          : a1c >= 5.7
          ? 'Prediabetes range - high risk for progression'
          : 'Normal glucose metabolism') +
        `. BMI: ${userProfile.bmi}, additional risk factors: ${
          healthInsights.diabeticRisk?.riskFactors?.join(', ') || 'none identified'
        }.`;

      response.recommendedTests = [
        'Fasting glucose',
        'Oral glucose tolerance test',
        'Lipid panel',
        'Microalbumin',
        'Diabetic eye exam'
      ];
      response.treatmentOptions =
        a1c >= 6.5
          ? [
              'Metformin first-line',
              'Lifestyle counseling',
              'Diabetes education',
              'Consider additional agents if A1c >7%'
            ]
          : [
              'Lifestyle intervention program',
              'Weight loss counseling',
              'Exercise prescription'
            ];
      response.followUpGuidance = 'Monitor A1c every 3-6 months, target <7% for most patients';
    } else if (query.includes('chest pain') || query.includes('heart')) {
      response.clinicalAnalysis =
        'Chest pain evaluation requires systematic approach. Based on patient age, gender, and risk factors, ' +
        `cardiovascular risk is ${
          healthInsights.cardiovascularRisk?.riskLevel || 'undetermined'
        }. ` +
        'Consider cardiac, pulmonary, GI, and musculoskeletal etiologies.';

      response.differentialDiagnosis = [
        'Acute coronary syndrome (unstable angina/NSTEMI/STEMI)',
        'Stable angina pectoris',
        'Pulmonary embolism',
        'Aortic dissection',
        'Gastroesophageal reflux disease',
        'Costochondritis'
      ];

      response.recommendedTests = [
        'ECG',
        'Cardiac troponins',
        'Chest X-ray',
        'D-dimer if PE suspected',
        'Echocardiogram',
        'Stress testing'
      ];
      response.followUpGuidance = 'Immediate evaluation for acute symptoms, risk stratification for chronic symptoms';
    } else {
      response.clinicalAnalysis =
        `General health inquiry regarding: ${currentQuery}. Based on available patient data: ` +
        `Age ${userProfile.age}, BMI ${userProfile.bmi}, known conditions: ${
          medicalData.conditions.map((c) => c.name).join(', ') || 'none'
        }. ` +
        healthInsights.overallAssessment;

      response.followUpGuidance =
        'Recommend comprehensive history and physical examination with appropriate specialist referral as indicated.';
    }

    setConsultations((prev) => [response, ...prev]);
    setCurrentQuery('');
  };

  return (
    <div className="row">
      {/* Query Input */}
      <div className="col-12 mb-4">
        <Card title="Health Advisor Query">
          <div className="mb-3">
            <label className="form-label">Ask a Health Question</label>
            <div className="input-group input-group-lg">
              <input
                type="text"
                className="form-control"
                value={currentQuery}
                onChange={(e) => setCurrentQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') generateConsultation();
                }}
                placeholder="e.g., What does my blood pressure reading mean? Should I be concerned?"
              />
              <button
                className="btn btn-primary"
                onClick={generateConsultation}
                disabled={!currentQuery.trim()}
                type="button"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
          <small className="text-muted">
            Try asking about blood pressure, diabetes risk, symptoms, or general health concerns.
          </small>
        </Card>
      </div>

      {/* Consultation History */}
      {consultations.map((consultation, idx) => (
        <div key={idx} className="col-12 mb-4">
          {/* Question */}
          <Card className="bg-light">
            <div className="d-flex gap-3">
              <MessageCircle className="text-primary flex-shrink-0" size={24} />
              <div className="flex-grow-1">
                <h6 className="mb-1">{consultation.question}</h6>
                <small className="text-muted">{consultation.timestamp}</small>
              </div>
            </div>
          </Card>

          {/* Clinical Analysis */}
          <Card title="Clinical Analysis" className="mb-4">
            <p className="lead">{consultation.clinicalAnalysis}</p>
            <small className="text-muted">Evidence Level: {consultation.evidenceLevel}</small>
          </Card>

          {/* Differential Diagnosis */}
          {consultation.differentialDiagnosis.length > 0 && (
            <Card title="Differential Diagnosis" className="mb-4">
              <ul className="mb-0">
                {consultation.differentialDiagnosis.map((diagnosis, idx) => (
                  <li key={idx}>{diagnosis}</li>
                ))}
              </ul>
            </Card>
          )}

          {/* Recommended Tests */}
          {consultation.recommendedTests.length > 0 && (
            <Card title="Recommended Tests" className="mb-4">
              <div className="row">
                {consultation.recommendedTests.map((test, idx) => (
                  <div key={idx} className="col-md-6 mb-2">
                    <div className="d-flex align-items-start gap-2">
                      <FileText size={18} className="text-info mt-1 flex-shrink-0" />
                      <span>{test}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Treatment Options */}
          {consultation.treatmentOptions.length > 0 && (
            <Card title="Treatment Options" className="mb-4">
              <div className="list-group">
                {consultation.treatmentOptions.map((option, idx) => (
                  <div key={idx} className="list-group-item d-flex align-items-start gap-2">
                    <Pill size={18} className="text-success mt-1 flex-shrink-0" />
                    <span>{option}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Follow-up Guidance */}
          {consultation.followUpGuidance && (
            <Alert
              type="info"
              title="Follow-up Guidance"
              message={consultation.followUpGuidance}
            />
          )}

          <hr />
        </div>
      ))}

      {/* Empty State */}
      {consultations.length === 0 && (
        <div className="col-12">
          <div className="text-center py-5 text-muted">
            <MessageCircle size={48} className="mb-3 opacity-50" />
            <p>No consultations yet. Start by asking a health question above!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Consultation;
