/**
 * Conditions page - Track medical conditions and medications
 * Displays and allows managing: conditions, medications, allergies, surgeries
 */

import React, { useState } from 'react';
import { Plus, Pill, AlertTriangle, Zap } from 'lucide-react';
import {
  Card,
  FormGroup,
  MedicalItemList
} from '../components/shared/UIComponents';

export const Conditions = ({ medicalData, onAddItem, onRemoveItem }) => {
  const [newItems, setNewItems] = useState({
    conditions: '',
    medications: '',
    allergies: '',
    surgeries: ''
  });

  const handleAddItem = (category) => {
    if (newItems[category].trim()) {
      onAddItem(category, newItems[category]);
      setNewItems((prev) => ({ ...prev, [category]: '' }));
    }
  };

  const handleKeyPress = (e, category) => {
    if (e.key === 'Enter') {
      handleAddItem(category);
    }
  };

  return (
    <div className="row">
      {/* Medical Conditions */}
      <div className="col-lg-6 mb-4">
        <Card title="Medical Conditions">
          <FormGroup
            label="Add Condition"
            input={
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={newItems.conditions}
                  onChange={(e) =>
                    setNewItems((prev) => ({
                      ...prev,
                      conditions: e.target.value
                    }))
                  }
                  onKeyPress={(e) => handleKeyPress(e, 'conditions')}
                  placeholder="e.g., Hypertension, Diabetes"
                />
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddItem('conditions')}
                  type="button"
                >
                  <Plus size={18} />
                </button>
              </div>
            }
            helper="Add any diagnosed conditions"
          />

          <hr />

          <MedicalItemList
            items={medicalData.conditions}
            onRemove={(id) => onRemoveItem('conditions', id)}
            emptyMessage="No conditions added"
          />
        </Card>
      </div>

      {/* Medications */}
      <div className="col-lg-6 mb-4">
        <Card title="Medications">
          <FormGroup
            label="Add Medication"
            input={
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={newItems.medications}
                  onChange={(e) =>
                    setNewItems((prev) => ({
                      ...prev,
                      medications: e.target.value
                    }))
                  }
                  onKeyPress={(e) => handleKeyPress(e, 'medications')}
                  placeholder="e.g., Lisinopril 10mg daily"
                />
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddItem('medications')}
                  type="button"
                >
                  <Plus size={18} />
                </button>
              </div>
            }
            helper="Include dosage if possible"
          />

          <hr />

          <MedicalItemList
            items={medicalData.medications}
            onRemove={(id) => onRemoveItem('medications', id)}
            emptyMessage="No medications added"
          />
        </Card>
      </div>

      {/* Allergies */}
      <div className="col-lg-6 mb-4">
        <Card title="Allergies">
          <div className="alert alert-warning d-flex align-items-start gap-2">
            <AlertTriangle size={18} className="mt-1 flex-shrink-0" />
            <small>
              Please list all known allergies including reactions and severity.
            </small>
          </div>

          <FormGroup
            label="Add Allergy"
            input={
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={newItems.allergies}
                  onChange={(e) =>
                    setNewItems((prev) => ({
                      ...prev,
                      allergies: e.target.value
                    }))
                  }
                  onKeyPress={(e) => handleKeyPress(e, 'allergies')}
                  placeholder="e.g., Penicillin (anaphylaxis)"
                />
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddItem('allergies')}
                  type="button"
                >
                  <Plus size={18} />
                </button>
              </div>
            }
            helper="Include severity: mild, moderate, severe, anaphylaxis"
          />

          <hr />

          <MedicalItemList
            items={medicalData.allergies}
            onRemove={(id) => onRemoveItem('allergies', id)}
            emptyMessage="No allergies recorded"
          />
        </Card>
      </div>

      {/* Previous Surgeries */}
      <div className="col-lg-6 mb-4">
        <Card title="Previous Surgeries">
          <FormGroup
            label="Add Surgery"
            input={
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={newItems.surgeries}
                  onChange={(e) =>
                    setNewItems((prev) => ({
                      ...prev,
                      surgeries: e.target.value
                    }))
                  }
                  onKeyPress={(e) => handleKeyPress(e, 'surgeries')}
                  placeholder="e.g., Appendectomy 2020"
                />
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddItem('surgeries')}
                  type="button"
                >
                  <Plus size={18} />
                </button>
              </div>
            }
            helper="Include type and approximate year if known"
          />

          <hr />

          <MedicalItemList
            items={medicalData.surgeries}
            onRemove={(id) => onRemoveItem('surgeries', id)}
            emptyMessage="No surgeries recorded"
          />
        </Card>
      </div>

      {/* Summary Card */}
      <div className="col-12 mb-4">
        <Card title="Medical Summary">
          <div className="row text-center">
            <div className="col-md-3 mb-2">
              <h6 className="text-muted">Conditions</h6>
              <h3 className="text-primary">{medicalData.conditions.length}</h3>
            </div>
            <div className="col-md-3 mb-2">
              <h6 className="text-muted">Medications</h6>
              <h3 className="text-info">{medicalData.medications.length}</h3>
            </div>
            <div className="col-md-3 mb-2">
              <h6 className="text-muted">Allergies</h6>
              <h3 className="text-warning">{medicalData.allergies.length}</h3>
            </div>
            <div className="col-md-3 mb-2">
              <h6 className="text-muted">Surgeries</h6>
              <h3 className="text-secondary">{medicalData.surgeries.length}</h3>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Conditions;
