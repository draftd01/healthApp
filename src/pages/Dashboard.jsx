/**
 * Dashboard page - Overview of health status
 * Displays: Key insights, risk assessments, overall health assessment
 */

import React from 'react';
import {
  AlertTriangle,
  TrendingUp,
  Target,
  CheckCircle
} from 'lucide-react';
import { Card, Alert } from '../components/shared/UIComponents';

export const Dashboard = ({ healthInsights, userProfile }) => {
  return (
    <div className="row">
      {/* Overall Assessment */}
      <div className="col-lg-8 mb-4">
        <Card title="Health Overview">
          <div className="mb-4">
            <h6 className="d-flex align-items-center gap-2 mb-3">
              <CheckCircle size={20} className="text-success" />
              Overall Assessment
            </h6>
            <p className="lead">{healthInsights.overallAssessment}</p>
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="col-lg-4 mb-4">
        <Card title="Quick Stats">
          <div className="text-center mb-3">
            <h6>Age</h6>
            <p className="lead">{userProfile.age || 'Not set'}</p>
          </div>
          <hr />
          <div className="text-center mb-3">
            <h6>BMI</h6>
            <p className="lead">{userProfile.bmi || 'Not calculated'}</p>
          </div>
          <hr />
          <div className="text-center">
            <h6>Gender</h6>
            <p className="lead">{userProfile.gender || 'Not set'}</p>
          </div>
        </Card>
      </div>

      {/* Cardiovascular Risk */}
      {healthInsights.cardiovascularRisk && (
        <div className="col-lg-6 mb-4">
          <Card title="Cardiovascular Risk Assessment">
            <div className="mb-3">
              <h6 className="d-flex align-items-center gap-2">
                <TrendingUp size={18} />
                Risk Level: {' '}
                <span
                  className={`badge bg-${
                    healthInsights.cardiovascularRisk.riskLevel === 'High'
                      ? 'danger'
                      : healthInsights.cardiovascularRisk.riskLevel === 'Moderate'
                      ? 'warning'
                      : 'success'
                  }`}
                >
                  {healthInsights.cardiovascularRisk.riskLevel}
                </span>
              </h6>
            </div>
            {healthInsights.cardiovascularRisk.riskLevel !== 'Low' && (
              <Alert
                type={
                  healthInsights.cardiovascularRisk.riskLevel === 'High'
                    ? 'danger'
                    : 'warning'
                }
                message="Risk Factors Detected"
                details={healthInsights.cardiovascularRisk.riskFactors}
              />
            )}
            {healthInsights.cardiovascularRisk.riskLevel === 'Low' && (
              <div className="alert alert-success">
                No significant cardiovascular risk factors detected.
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Diabetic Risk */}
      {healthInsights.diabeticRisk && (
        <div className="col-lg-6 mb-4">
          <Card title="Diabetes Risk Assessment">
            <div className="mb-3">
              <h6 className="d-flex align-items-center gap-2">
                <Target size={18} />
                Status: {' '}
                <span className="badge bg-info">
                  {healthInsights.diabeticRisk.status}
                </span>
              </h6>
            </div>
            {healthInsights.diabeticRisk.message && (
              <Alert
                type="danger"
                message={healthInsights.diabeticRisk.message}
              />
            )}
            {healthInsights.diabeticRisk.riskFactors.length > 0 && (
              <div className="mt-3">
                <h6>Risk Factors:</h6>
                <ul className="mb-0">
                  {healthInsights.diabeticRisk.riskFactors.map((factor, idx) => (
                    <li key={idx}>{factor}</li>
                  ))}
                </ul>
              </div>
            )}
            {healthInsights.diabeticRisk.recommendations.length > 0 && (
              <div className="mt-3">
                <h6>Recommendations:</h6>
                <ul className="mb-0">
                  {healthInsights.diabeticRisk.recommendations.map(
                    (rec, idx) => (
                      <li key={idx}>{rec}</li>
                    )
                  )}
                </ul>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Symptom Analysis */}
      {healthInsights.symptomAnalyses.length > 0 && (
        <div className="col-12 mb-4">
          <Card title="Symptom Analysis">
            <div className="row">
              {healthInsights.symptomAnalyses.map((analysis, idx) => (
                <div key={idx} className="col-lg-6 mb-3">
                  <div className="border rounded p-3">
                    <h6 className="d-flex align-items-center gap-2 mb-3">
                      <AlertTriangle size={18} className="text-warning" />
                      {analysis.symptom}
                    </h6>

                    {analysis.possibleCauses.length > 0 && (
                      <div className="mb-2">
                        <small className="text-muted d-block">
                          <strong>Possible Causes:</strong>
                        </small>
                        <small>
                          {analysis.possibleCauses.join('; ')}
                        </small>
                      </div>
                    )}

                    {analysis.redFlags.length > 0 && (
                      <div className="mb-2 p-2 bg-danger-light rounded">
                        <small className="text-muted d-block">
                          <strong>⚠ Red Flags:</strong>
                        </small>
                        <small>{analysis.redFlags.join('; ')}</small>
                      </div>
                    )}

                    {analysis.recommendations.length > 0 && (
                      <div>
                        <small className="text-muted d-block">
                          <strong>Recommendations:</strong>
                        </small>
                        <small>{analysis.recommendations.join('; ')}</small>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
