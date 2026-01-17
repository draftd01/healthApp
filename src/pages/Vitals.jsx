/**
 * Vitals page - Track vital signs and lab values
 * Displays and allows adding: blood pressure, heart rate, lab results, etc.
 */

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card, FormGroup } from '../components/shared/UIComponents';

export const Vitals = ({ latestVitals, onVitalUpdate }) => {
  const [expandedSections, setExpandedSections] = useState({
    cardiovascular: true,
    metabolic: false,
    hematologic: false,
    other: false
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleChange = (field, value) => {
    onVitalUpdate({ [field]: value });
  };

  const VitalInput = ({ label, field, unit, min = '0' }) => (
    <div className="col-md-6 mb-3">
      <FormGroup
        label={`${label} (${unit})`}
        input={
          <input
            type="number"
            className="form-control"
            value={latestVitals[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            placeholder="Enter value"
            min={min}
            step="0.1"
          />
        }
      />
    </div>
  );

  return (
    <div className="row">
      {/* Cardiovascular Vitals */}
      <div className="col-12 mb-4">
        <Card title="Cardiovascular Vitals">
          <button
            className="btn btn-sm btn-outline-secondary mb-3"
            onClick={() => toggleSection('cardiovascular')}
          >
            {expandedSections.cardiovascular ? '−' : '+'} Expand
          </button>

          {expandedSections.cardiovascular && (
            <div className="row">
              <VitalInput
                label="Systolic Blood Pressure"
                field="systolicBP"
                unit="mmHg"
              />
              <VitalInput
                label="Diastolic Blood Pressure"
                field="diastolicBP"
                unit="mmHg"
              />
              <VitalInput label="Heart Rate" field="heartRate" unit="bpm" />
              <VitalInput
                label="Respiratory Rate"
                field="respiratoryRate"
                unit="breaths/min"
              />
              <VitalInput
                label="Oxygen Saturation"
                field="oxygenSat"
                unit="%"
              />
              <VitalInput label="Temperature" field="temperature" unit="°C" />
            </div>
          )}
        </Card>
      </div>

      {/* Metabolic Lab Values */}
      <div className="col-12 mb-4">
        <Card title="Metabolic & Glucose Labs">
          <button
            className="btn btn-sm btn-outline-secondary mb-3"
            onClick={() => toggleSection('metabolic')}
          >
            {expandedSections.metabolic ? '−' : '+'} Expand
          </button>

          {expandedSections.metabolic && (
            <div className="row">
              <VitalInput
                label="Blood Glucose"
                field="bloodGlucose"
                unit="mg/dL"
              />
              <VitalInput
                label="Hemoglobin A1C"
                field="hemoglobinA1C"
                unit="%"
              />
              <VitalInput
                label="Total Cholesterol"
                field="totalCholesterol"
                unit="mg/dL"
              />
              <VitalInput label="LDL Cholesterol" field="ldlCholesterol" unit="mg/dL" />
              <VitalInput label="HDL Cholesterol" field="hdlCholesterol" unit="mg/dL" />
              <VitalInput label="Triglycerides" field="triglycerides" unit="mg/dL" />
            </div>
          )}
        </Card>
      </div>

      {/* Renal Function Labs */}
      <div className="col-12 mb-4">
        <Card title="Renal Function Labs">
          <button
            className="btn btn-sm btn-outline-secondary mb-3"
            onClick={() => toggleSection('hematologic')}
          >
            {expandedSections.hematologic ? '−' : '+'} Expand
          </button>

          {expandedSections.hematologic && (
            <div className="row">
              <VitalInput
                label="Creatinine"
                field="creatinine"
                unit="mg/dL"
              />
              <VitalInput label="BUN" field="bun" unit="mg/dL" />
              <VitalInput label="GFR" field="gfr" unit="mL/min" />
              <VitalInput label="Albumin" field="albumin" unit="g/dL" />
              <VitalInput label="Hemoglobin" field="hemoglobin" unit="g/dL" />
              <VitalInput label="White Blood Cells" field="whiteBC" unit="K/µL" />
              <VitalInput label="Platelets" field="platelets" unit="K/µL" />
            </div>
          )}
        </Card>
      </div>

      {/* Other Labs */}
      <div className="col-12 mb-4">
        <Card title="Other Lab Values">
          <button
            className="btn btn-sm btn-outline-secondary mb-3"
            onClick={() => toggleSection('other')}
          >
            {expandedSections.other ? '−' : '+'} Expand
          </button>

          {expandedSections.other && (
            <div className="row">
              <VitalInput label="Thyroid TSH" field="thyroidTSH" unit="mIU/L" />
              <VitalInput label="Vitamin D" field="vitaminD" unit="ng/mL" />
              <VitalInput label="Vitamin B12" field="vitaminB12" unit="pg/mL" />
            </div>
          )}
        </Card>
      </div>

      {/* Reference Ranges */}
      <div className="col-12">
        <div className="alert alert-info">
          <h6>Reference Ranges:</h6>
          <ul className="mb-0 small">
            <li>Blood Pressure (Normal): &lt;120/80 mmHg</li>
            <li>Heart Rate: 60-100 bpm</li>
            <li>Fasting Glucose (Normal): &lt;100 mg/dL</li>
            <li>HbA1c (Normal): &lt;5.7%</li>
            <li>Total Cholesterol: &lt;200 mg/dL (desirable)</li>
            <li>GFR (Normal): &gt;60 mL/min</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Vitals;
