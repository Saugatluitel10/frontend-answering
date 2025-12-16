import { useState } from 'react';
import { Activity, AlertTriangle, AlertCircle, TrendingUp, Clock, Info, FileText, PieChart, BarChart3, Wrench, Calendar, MessageSquare, Shield, Target, Zap, TrendingDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CompanySelector } from './CompanySelector';

interface RiskResponse {
  priority: 'High' | 'Medium' | 'Low';
  question: string;
  response: string;
  riskScore: number;
  issuesFound: string;
  recommendedAction: string;
}

export function PredictiveMaintenanceDashboard() {
  const [showCards, setShowCards] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleAnalyze = () => {
    setShowCards(true);
  };

  // Dummy data for the table
  const atRiskResponses: RiskResponse[] = [
    {
      priority: 'High',
      question: 'Do you have a disaster recovery plan?',
      response: 'Yes, we have basic procedures documented.',
      riskScore: 92,
      issuesFound: 'Outdated (24 months), Lacks metrics, No testing schedule',
      recommendedAction: 'Update with RTO/RPO metrics and quarterly testing schedule'
    },
    {
      priority: 'Medium',
      question: 'Do you conduct security awareness training?',
      response: 'Yes, we provide annual training to all employees with 95% completion.',
      riskScore: 76,
      issuesFound: 'Could include frequency details, Missing simulation results',
      recommendedAction: 'Add quarterly phishing simulation metrics and update frequency'
    },
    {
      priority: 'Low',
      question: 'Do you use multi-factor authentication?',
      response: 'Yes, MFA is enforced for all users with TOTP and hardware key support.',
      riskScore: 45,
      issuesFound: 'Could add adoption rate metrics',
      recommendedAction: 'Include current adoption percentage (e.g., 99.8%)'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="flex-1">
      {/* Header Section */}
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-3 mb-2">
          <h1 className="text-2xl">Predictive Maintenance</h1>
        </div>
        <p className="text-gray-600 text-sm">
          Proactively identify and update at-risk responses before they become problematic
        </p>
      </div>

      {/* Company Selector */}
      <div className="bg-white rounded-lg border border-gray-200 p-3 mb-4">
        <CompanySelector
          selectedFile={selectedFile}
          onFileUpload={setSelectedFile}
          onDecodeStyle={() => {}}
        />
      </div>
        
      {/* Analyze Button */}
      {!showCards && (
        <div className="text-center mb-6">
          <button
            onClick={handleAnalyze}
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2 mx-auto"
          >
            <Activity className="w-4 h-4" />
            <span>Analyze Response Health</span>
          </button>
        </div>
      )}

      {/* Risk Cards */}
      {showCards && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {/* High Risk Card */}
          <div className="bg-white border-2 border-red-500 rounded-xl p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600 text-sm">High Risk</span>
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
            <div className="mb-1">
              <span className="text-3xl text-gray-900">24</span>
            </div>
            <p className="text-xs text-gray-500">
              Responses need immediate attention
            </p>
          </div>

          {/* Medium Risk Card */}
          <div className="bg-white border-2 border-yellow-500 rounded-xl p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600 text-sm">Medium Risk</span>
              <AlertCircle className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="mb-1">
              <span className="text-3xl text-gray-900">52</span>
            </div>
            <p className="text-xs text-gray-500">
              Responses should be reviewed
            </p>
          </div>

          {/* Low Risk Card */}
          <div className="bg-white border-2 border-green-500 rounded-xl p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600 text-sm">Low Risk</span>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="mb-1">
              <span className="text-3xl text-gray-900">38</span>
            </div>
            <p className="text-xs text-gray-500">
              Minor improvements needed
            </p>
          </div>

          {/* Avg Age Card */}
          <div className="bg-white border-2 border-purple-500 rounded-xl p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600 text-sm">Avg Age</span>
              <Clock className="w-4 h-4 text-purple-500" />
            </div>
            <div className="mb-1">
              <span className="text-3xl text-gray-900">18</span>
            </div>
            <p className="text-xs text-gray-500">
              Months since last update
            </p>
          </div>
        </div>
      )}

      {/* Tabbed Content */}
      {showCards && (
        <div className="mt-8">
          <Tabs defaultValue="at-risk" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="at-risk" className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                At-Risk Responses (Top 20)
              </TabsTrigger>
              <TabsTrigger value="detailed" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Detailed Response Analysis
              </TabsTrigger>
              <TabsTrigger value="distribution" className="flex items-center gap-2">
                <PieChart className="w-4 h-4" />
                Risk Distribution by Category
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: At-Risk Responses */}
            <TabsContent value="at-risk">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {/* Table Header */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-gray-200 px-6 py-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-xl">At-Risk Responses (Top 20)</h2>
                      <p className="text-sm text-gray-600">Responses that need immediate attention based on multiple risk factors</p>
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-4 py-4 text-left text-sm text-gray-600 w-24">Priority</th>
                        <th className="px-4 py-4 text-left text-sm text-gray-600 w-56">Question</th>
                        <th className="px-4 py-4 text-left text-sm text-gray-600 w-64">Response</th>
                        <th className="px-4 py-4 text-left text-sm text-gray-600 w-36">Risk Score</th>
                        <th className="px-4 py-4 text-left text-sm text-gray-600 w-64">Issues Found</th>
                        <th className="px-4 py-4 text-left text-sm text-gray-600 w-80">Recommended Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {atRiskResponses.map((item, index) => (
                        <tr 
                          key={index} 
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-4 align-top">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs border whitespace-nowrap ${getPriorityColor(item.priority)}`}>
                              {item.priority}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900 align-top">
                            {item.question}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600 align-top">
                            {item.response}
                          </td>
                          <td className="px-4 py-4 align-top">
                            <div className="flex items-center gap-2 whitespace-nowrap">
                              <span className={`text-sm ${getRiskScoreColor(item.riskScore)}`}>
                                {item.riskScore}
                              </span>
                              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${
                                    item.riskScore >= 80 ? 'bg-red-500' : 
                                    item.riskScore >= 60 ? 'bg-yellow-500' : 
                                    'bg-green-500'
                                  }`}
                                  style={{ width: `${item.riskScore}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600 align-top">
                            {item.issuesFound}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600 align-top">
                            <div className="flex items-start gap-2">
                              <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span>{item.recommendedAction}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Tab 2: Detailed Response Analysis */}
            <TabsContent value="detailed">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 px-6 py-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl">Detailed Response Analysis</h2>
                      <p className="text-sm text-gray-600">In-depth analysis of each response with recommendations</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <Tabs defaultValue="risk-factors" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="risk-factors">Risk Factors Analyzed</TabsTrigger>
                      <TabsTrigger value="common-issues">Most Common Issues</TabsTrigger>
                    </TabsList>

                    {/* Sub-Tab 1: Risk Factors Analyzed */}
                    <TabsContent value="risk-factors">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {/* Response Age */}
                        <div 
                          className="relative rounded-xl p-6 backdrop-blur-sm border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden group"
                          style={{
                            background: 'linear-gradient(135deg, #8B5CF625, #8B5CF610)',
                            borderColor: '#8B5CF680',
                          }}
                        >
                          <div className="relative">
                            <p className="text-sm mb-3" style={{ color: '#8B5CF6' }}>Response Age</p>
                            <p className="text-4xl text-gray-900 mb-2">18 <span className="text-xl text-gray-600">months</span></p>
                            <p className="text-sm text-gray-600">Average time since last update</p>
                          </div>
                        </div>

                        {/* Vagueness Score */}
                        <div 
                          className="relative rounded-xl p-6 backdrop-blur-sm border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden group"
                          style={{
                            background: 'linear-gradient(135deg, #EC488925, #EC488910)',
                            borderColor: '#EC488980',
                          }}
                        >
                          <div className="relative">
                            <p className="text-sm mb-3" style={{ color: '#EC4899' }}>Vagueness Score</p>
                            <p className="text-4xl text-gray-900 mb-2">72<span className="text-xl text-gray-600">%</span></p>
                            <p className="text-sm text-gray-600">Lack of specific details</p>
                          </div>
                        </div>

                        {/* Compliance Gap */}
                        <div 
                          className="relative rounded-xl p-6 backdrop-blur-sm border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden group"
                          style={{
                            background: 'linear-gradient(135deg, #10B98125, #10B98110)',
                            borderColor: '#10B98180',
                          }}
                        >
                          <div className="relative">
                            <p className="text-sm mb-3" style={{ color: '#10B981' }}>Compliance Gap</p>
                            <p className="text-4xl text-gray-900 mb-2">45<span className="text-xl text-gray-600">%</span></p>
                            <p className="text-sm text-gray-600">Missing framework references</p>
                          </div>
                        </div>

                        {/* Evidence Density */}
                        <div 
                          className="relative rounded-xl p-6 backdrop-blur-sm border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden group"
                          style={{
                            background: 'linear-gradient(135deg, #F59E0B25, #F59E0B10)',
                            borderColor: '#F59E0B80',
                          }}
                        >
                          <div className="relative">
                            <p className="text-sm mb-3" style={{ color: '#F59E0B' }}>Evidence Density</p>
                            <p className="text-4xl text-gray-900 mb-2">12<span className="text-xl text-gray-600">%</span></p>
                            <p className="text-sm text-gray-600">Quantified proof included</p>
                          </div>
                        </div>

                        {/* Technical Depth */}
                        <div 
                          className="relative rounded-xl p-6 backdrop-blur-sm border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden group"
                          style={{
                            background: 'linear-gradient(135deg, #3B82F625, #3B82F610)',
                            borderColor: '#3B82F680',
                          }}
                        >
                          <div className="relative">
                            <p className="text-sm mb-3" style={{ color: '#3B82F6' }}>Technical Depth</p>
                            <p className="text-4xl text-gray-900 mb-2">3.2<span className="text-xl text-gray-600">/10</span></p>
                            <p className="text-sm text-gray-600">Level of technical detail</p>
                          </div>
                        </div>

                        {/* Rejection Rate */}
                        <div 
                          className="relative rounded-xl p-6 backdrop-blur-sm border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden group"
                          style={{
                            background: 'linear-gradient(135deg, #06B6D425, #06B6D410)',
                            borderColor: '#06B6D480',
                          }}
                        >
                          <div className="relative">
                            <p className="text-sm mb-3" style={{ color: '#06B6D4' }}>Rejection Rate</p>
                            <p className="text-4xl text-gray-900 mb-2">28<span className="text-xl text-gray-600">%</span></p>
                            <p className="text-sm text-gray-600">Follow-up questions received</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Sub-Tab 2: Most Common Issues */}
                    <TabsContent value="common-issues">
                      <div className="space-y-4">
                        {/* Vague or Generic Statements */}
                        <div 
                          className="bg-white rounded-lg p-5 flex items-start gap-4 border-2 relative overflow-hidden transition-shadow hover:shadow-md"
                          style={{ borderColor: '#EF444450' }}
                        >
                          <div className="w-1 bg-red-500 rounded-full flex-shrink-0 absolute left-0 top-0 bottom-0" style={{ backgroundColor: '#EF4444' }}></div>
                          <div className="flex-1 pl-4">
                            <h4 className="text-gray-900 mb-1">Vague or Generic Statements</h4>
                            <p className="text-sm text-gray-600">52 responses lack specific details, tools, or processes</p>
                          </div>
                          <div className="text-red-600 text-lg" style={{ color: '#EF4444' }}>46%</div>
                        </div>

                        {/* Missing Compliance References */}
                        <div 
                          className="bg-white rounded-lg p-5 flex items-start gap-4 border-2 relative overflow-hidden transition-shadow hover:shadow-md"
                          style={{ borderColor: '#F59E0B50' }}
                        >
                          <div className="w-1 bg-yellow-500 rounded-full flex-shrink-0 absolute left-0 top-0 bottom-0" style={{ backgroundColor: '#F59E0B' }}></div>
                          <div className="flex-1 pl-4">
                            <h4 className="text-gray-900 mb-1">Missing Compliance References</h4>
                            <p className="text-sm text-gray-600">38 responses don't mention relevant frameworks or standards</p>
                          </div>
                          <div className="text-yellow-600 text-lg" style={{ color: '#F59E0B' }}>34%</div>
                        </div>

                        {/* Outdated Terminology */}
                        <div 
                          className="bg-white rounded-lg p-5 flex items-start gap-4 border-2 relative overflow-hidden transition-shadow hover:shadow-md"
                          style={{ borderColor: '#10B98150' }}
                        >
                          <div className="w-1 bg-green-500 rounded-full flex-shrink-0 absolute left-0 top-0 bottom-0" style={{ backgroundColor: '#10B981' }}></div>
                          <div className="flex-1 pl-4">
                            <h4 className="text-gray-900 mb-1">Outdated Terminology</h4>
                            <p className="text-sm text-gray-600">24 responses use deprecated terms or old standards</p>
                          </div>
                          <div className="text-green-600 text-lg" style={{ color: '#10B981' }}>21%</div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </TabsContent>

            {/* Tab 3: Risk Distribution by Category */}
            <TabsContent value="distribution">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-8">
                  <h2 className="text-xl text-gray-900 mb-2">Risk Distribution by Category</h2>
                  <p className="text-sm text-gray-600">Breakdown of at-risk responses across security categories</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
