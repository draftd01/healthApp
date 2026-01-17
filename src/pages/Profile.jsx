/**
 * Profile page - User profile and lifestyle information
 * Displays and allows editing of: demographics, lifestyle factors
 */

import React, { useState } from 'react';
import { Card, FormGroup } from '../components/shared/UIComponents';

export const Profile = ({ userProfile, onProfileUpdate }) => {
  const handleChange = (field, value) => {
    onProfileUpdate(field, value);
  };

  return (
    <div className="row">
      {/* Personal Information */}
      <div className="col-lg-6 mb-4">
        <Card title="Personal Information">
          <FormGroup
            label="Full Name Initials"
            input={
              <input
                type="text"
                className="form-control"
                value={userProfile.initials}
                onChange={(e) => handleChange('initials', e.target.value)}
                placeholder="e.g., JD"
                maxLength="3"
              />
            }
            helper="Enter your initials"
          />

          <FormGroup
            label="Age"
            input={
              <input
                type="number"
                className="form-control"
                value={userProfile.age}
                onChange={(e) => handleChange('age', e.target.value)}
                placeholder="e.g., 45"
                min="0"
                max="150"
              />
            }
          />

          <FormGroup
            label="Gender"
            input={
              <select
                className="form-select"
                value={userProfile.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            }
          />

          <FormGroup
            label="Ethnicity"
            input={
              <input
                type="text"
                className="form-control"
                value={userProfile.ethnicity}
                onChange={(e) => handleChange('ethnicity', e.target.value)}
                placeholder="e.g., Asian, African, Hispanic"
              />
            }
          />

          <FormGroup
            label="Occupation"
            input={
              <input
                type="text"
                className="form-control"
                value={userProfile.occupation}
                onChange={(e) => handleChange('occupation', e.target.value)}
                placeholder="e.g., Engineer, Teacher"
              />
            }
          />
        </Card>
      </div>

      {/* Physical Measurements */}
      <div className="col-lg-6 mb-4">
        <Card title="Physical Measurements">
          <FormGroup
            label="Height (cm)"
            input={
              <input
                type="number"
                className="form-control"
                value={userProfile.height}
                onChange={(e) => handleChange('height', e.target.value)}
                placeholder="e.g., 175"
                min="50"
                max="250"
              />
            }
            helper="Height in centimeters"
          />

          <FormGroup
            label="Weight (kg)"
            input={
              <input
                type="number"
                className="form-control"
                value={userProfile.weight}
                onChange={(e) => handleChange('weight', e.target.value)}
                placeholder="e.g., 75"
                min="20"
                max="300"
                step="0.1"
              />
            }
            helper="Weight in kilograms"
          />

          <div className="alert alert-info">
            <strong>BMI:</strong> {userProfile.bmi || 'Calculate by entering height and weight'}
          </div>
        </Card>
      </div>

      {/* Lifestyle Information */}
      <div className="col-lg-6 mb-4">
        <Card title="Lifestyle Information">
          <FormGroup
            label="Smoking History"
            input={
              <select
                className="form-select"
                value={userProfile.smokingHistory}
                onChange={(e) => handleChange('smokingHistory', e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="never">Never Smoked</option>
                <option value="former">Former Smoker</option>
                <option value="current">Current Smoker</option>
              </select>
            }
          />

          <FormGroup
            label="Alcohol Use"
            input={
              <select
                className="form-select"
                value={userProfile.alcoholUse}
                onChange={(e) => handleChange('alcoholUse', e.target.value)}
              >
                <option value="">Select Frequency</option>
                <option value="none">None</option>
                <option value="occasional">Occasional</option>
                <option value="moderate">Moderate</option>
                <option value="heavy">Heavy</option>
              </select>
            }
          />

          <FormGroup
            label="Exercise Frequency"
            input={
              <select
                className="form-select"
                value={userProfile.exerciseFrequency}
                onChange={(e) => handleChange('exerciseFrequency', e.target.value)}
              >
                <option value="">Select Frequency</option>
                <option value="none">None</option>
                <option value="1-2">1-2 times/week</option>
                <option value="3-4">3-4 times/week</option>
                <option value="5plus">5+ times/week</option>
              </select>
            }
          />

          <FormGroup
            label="Average Sleep Hours"
            input={
              <input
                type="number"
                className="form-control"
                value={userProfile.sleepHours}
                onChange={(e) => handleChange('sleepHours', e.target.value)}
                placeholder="e.g., 7"
                min="0"
                max="24"
                step="0.5"
              />
            }
            helper="Hours per night"
          />
        </Card>
      </div>

      {/* Family History */}
      <div className="col-lg-6 mb-4">
        <Card title="Family History">
          <FormGroup
            label="Family History of Conditions"
            input={
              <textarea
                className="form-control"
                value={userProfile.familyHistory}
                onChange={(e) => handleChange('familyHistory', e.target.value)}
                placeholder="e.g., heart disease, diabetes, cancer"
                rows="4"
              ></textarea>
            }
            helper="List any significant medical conditions in your family"
          />

          <div className="alert alert-info">
            <small>
              This information helps assess your risk for hereditary conditions.
            </small>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
