import { useState } from 'react';
import { Search, BarChart2, FileText, PieChart, X, FolderOpen, Layers, Calculator, MessageSquare, Award, CheckCircle, Lightbulb } from 'lucide-react';
import { PieChart as RechartsPie, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { CompanySelector } from './CompanySelector';

type TopicTab = 'Topic Distribution Overview' | 'Detailed Topic Breakdown' | 'Response Formulas by Topic' | 'Example Q&As by Topic';

type DetailedTopic = 'Data Storage' | 'Data Encryption' | 'Remote Policy' | 'Access Control' | null;

type FormulaTab = 'Top 3 Response Formulas' | 'Must-Have Elements' | 'Formula Applied';

interface CategoryDeepDiveDashboardProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

export function CategoryDeepDiveDashboard({ setIsModalOpen }: CategoryDeepDiveDashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [activeTopicTab, setActiveTopicTab] = useState<TopicTab>('Topic Distribution Overview');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedDetailedTopic, setSelectedDetailedTopic] = useState<DetailedTopic>(null);
  const [selectedQATopic, setSelectedQATopic] = useState<string | null>(null);
  const [activeFormulaTab, setActiveFormulaTab] = useState<FormulaTab>('Top 3 Response Formulas');
  const [isFormulaTransitioning, setIsFormulaTransitioning] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const categories = [
    'Security & Compliance',
    'Data Privacy',
    'Infrastructure & Network',
    'Access Control',
    'Incident Response',
    'Business Continuity',
    'Risk Management',
    'Third-Party Security',
    'Application Security',
    'Encryption & Cryptography'
  ];

  const topicTabs: TopicTab[] = [
    'Topic Distribution Overview',
    'Detailed Topic Breakdown',
    'Response Formulas by Topic',
    'Example Q&As by Topic'
  ];

  const getTabIcon = (tab: TopicTab) => {
    switch(tab) {
      case 'Topic Distribution Overview':
        return <PieChart className="w-4 h-4" />;
      case 'Detailed Topic Breakdown':
        return <Layers className="w-4 h-4" />;
      case 'Response Formulas by Topic':
        return <Calculator className="w-4 h-4" />;
      case 'Example Q&As by Topic':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleAnalyze = () => {
    if (selectedCategory) {
      setShowAnalysis(true);
    }
  };

  const handleTopicTabChange = (tab: TopicTab) => {
    if (tab !== activeTopicTab) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveTopicTab(tab);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const handleFormulaTabChange = (tab: FormulaTab) => {
    if (tab !== activeFormulaTab) {
      setIsFormulaTransitioning(true);
      setTimeout(() => {
        setActiveFormulaTab(tab);
        setIsFormulaTransitioning(false);
      }, 150);
    }
  };

  const handleTopicSelect = (topic: DetailedTopic) => {
    setSelectedDetailedTopic(topic);
    setIsModalOpen(true);
  };

  const handleTopicModalClose = () => {
    setSelectedDetailedTopic(null);
    setIsModalOpen(false);
  };

  const formulaTabs: FormulaTab[] = [
    'Top 3 Response Formulas',
    'Must-Have Elements',
    'Formula Applied'
  ];

  const getFormulaTabIcon = (tab: FormulaTab) => {
    switch(tab) {
      case 'Top 3 Response Formulas':
        return <Award className="w-4 h-4" />;
      case 'Must-Have Elements':
        return <CheckCircle className="w-4 h-4" />;
      case 'Formula Applied':
        return <Lightbulb className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // Sample data for charts
  const topicDistributionData = [
    { name: 'Authentication', value: 28, color: '#015CE6' },
    { name: 'Authorization', value: 22, color: '#3380ED' },
    { name: 'Encryption', value: 18, color: '#80B6F7' },
    { name: 'Monitoring', value: 16, color: '#B3DAFE' },
    { name: 'Compliance', value: 16, color: '#1A6EEA' },
  ];

  const responseLengthData = [
    { topic: 'Authentication', avgWords: 145 },
    { topic: 'Authorization', avgWords: 132 },
    { topic: 'Encryption', avgWords: 178 },
    { topic: 'Monitoring', avgWords: 98 },
    { topic: 'Compliance', avgWords: 165 },
  ];

  const responseCharacteristicsData = [
    { attribute: 'Clarity', categoryA: 85, categoryB: 78, categoryC: 92 },
    { attribute: 'Completeness', categoryA: 90, categoryB: 85, categoryC: 88 },
    { attribute: 'Technical Depth', categoryA: 75, categoryB: 82, categoryC: 70 },
    { attribute: 'Conciseness', categoryA: 80, categoryB: 75, categoryC: 85 },
    { attribute: 'Consistency', categoryA: 88, categoryB: 90, categoryC: 86 },
  ];

  const technicalDepthData = [
    { topic: 'Authentication', depth: 3.8 },
    { topic: 'Authorization', depth: 3.5 },
    { topic: 'Encryption', depth: 4.2 },
    { topic: 'Monitoring', depth: 2.9 },
    { topic: 'Compliance', depth: 3.6 },
  ];

  const renderTopicTabContent = () => {
    switch (activeTopicTab) {
      case 'Topic Distribution Overview':
        return (
          <div className="space-y-6 p-6">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-xl mb-1">Topic Distribution Overview</h2>
              <p className="text-sm text-gray-600">Comprehensive breakdown of topics within {selectedCategory}</p>
            </div>

            {/* Top Row: Topic Distribution and Response Length */}
            <div className="grid grid-cols-2 gap-6">
              {/* Topic Distribution Pie Chart */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-sm mb-4 text-gray-900">Topic Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPie>
                    <Pie
                      data={topicDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {topicDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                      labelStyle={{ color: '#111827' }}
                    />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>

              {/* Response Length by Topic Bar Chart */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-sm mb-4 text-gray-900">Response Length by Topic</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={responseLengthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="topic" stroke="#6b7280" tick={{ fill: '#6b7280' }} />
                    <YAxis stroke="#6b7280" tick={{ fill: '#6b7280' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                      labelStyle={{ color: '#111827' }}
                    />
                    <Bar dataKey="avgWords" fill="#3380ED" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bottom Row: Response Characteristics and Technical Depth */}
            <div className="grid grid-cols-2 gap-6">
              {/* Response Characteristics Radar Chart */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-sm mb-4 text-gray-900">Response Characteristics</h3>
                <p className="text-xs text-gray-600 mb-4">Analysis of key response attributes</p>
                <ResponsiveContainer width="100%" height={250}>
                  <RadarChart data={responseCharacteristicsData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="attribute" stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <PolarRadiusAxis stroke="#6b7280" tick={{ fill: '#6b7280' }} />
                    <Radar name="Category A" dataKey="categoryA" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                    <Radar name="Category B" dataKey="categoryB" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    <Radar name="Category C" dataKey="categoryC" stroke="#a855f7" fill="#a855f7" fillOpacity={0.3} />
                    <Legend 
                      wrapperStyle={{ color: '#111827' }}
                      iconType="circle"
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                      labelStyle={{ color: '#111827' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Technical Depth by Topics Bar Chart */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-sm mb-4 text-gray-900">Technical Depth by Topics</h3>
                <p className="text-xs text-gray-600 mb-4">Complexity score across topic areas</p>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={technicalDepthData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" domain={[0, 5]} stroke="#6b7280" tick={{ fill: '#6b7280' }} />
                    <YAxis type="category" dataKey="topic" stroke="#6b7280" tick={{ fill: '#6b7280' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                      labelStyle={{ color: '#111827' }}
                    />
                    <Bar dataKey="depth" fill="#80B6F7" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Topic Legend */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-sm mb-4 text-gray-900">Topic Legend</h3>
              <div className="grid grid-cols-5 gap-4">
                {topicDistributionData.map((topic, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: topic.color }}></div>
                    <span className="text-sm text-gray-700">{topic.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'Detailed Topic Breakdown':
        return (
          <div className="p-8">
            {/* Topic Buttons */}
            <div className="text-center mb-6">
              <h2 className="text-xl mb-6 text-gray-900">Select a Topic for Detailed Analysis</h2>
              <div className="grid grid-cols-4 gap-4">
                <button
                  onClick={() => handleTopicSelect('Data Storage')}
                  className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                    selectedDetailedTopic === 'Data Storage'
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div className="p-6">
                    <div className="text-4xl mb-3">💾</div>
                    <h3 className={`text-sm transition-colors ${
                      selectedDetailedTopic === 'Data Storage'
                        ? 'text-blue-900'
                        : 'text-gray-900 group-hover:text-blue-900'
                    }`}>
                      Data Storage
                    </h3>
                  </div>
                  {selectedDetailedTopic === 'Data Storage' && (
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>

                <button
                  onClick={() => handleTopicSelect('Data Encryption')}
                  className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                    selectedDetailedTopic === 'Data Encryption'
                      ? 'border-purple-500 bg-purple-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
                  }`}
                >
                  <div className="p-6">
                    <div className="text-4xl mb-3">🔒</div>
                    <h3 className={`text-sm transition-colors ${
                      selectedDetailedTopic === 'Data Encryption'
                        ? 'text-purple-900'
                        : 'text-gray-900 group-hover:text-purple-900'
                    }`}>
                      Data Encryption
                    </h3>
                  </div>
                  {selectedDetailedTopic === 'Data Encryption' && (
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>

                <button
                  onClick={() => handleTopicSelect('Remote Policy')}
                  className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                    selectedDetailedTopic === 'Remote Policy'
                      ? 'border-green-500 bg-green-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-md'
                  }`}
                >
                  <div className="p-6">
                    <div className="text-4xl mb-3">🌐</div>
                    <h3 className={`text-sm transition-colors ${
                      selectedDetailedTopic === 'Remote Policy'
                        ? 'text-green-900'
                        : 'text-gray-900 group-hover:text-green-900'
                    }`}>
                      Remote Policy
                    </h3>
                  </div>
                  {selectedDetailedTopic === 'Remote Policy' && (
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>

                <button
                  onClick={() => handleTopicSelect('Access Control')}
                  className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                    selectedDetailedTopic === 'Access Control'
                      ? 'border-orange-500 bg-orange-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-orange-300 hover:shadow-md'
                  }`}
                >
                  <div className="p-6">
                    <div className="text-4xl mb-3">🔑</div>
                    <h3 className={`text-sm transition-colors ${
                      selectedDetailedTopic === 'Access Control'
                        ? 'text-orange-900'
                        : 'text-gray-900 group-hover:text-orange-900'
                    }`}>
                      Access Control
                    </h3>
                  </div>
                  {selectedDetailedTopic === 'Access Control' && (
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      case 'Response Formulas by Topic':
        const renderFormulaContent = () => {
          switch(activeFormulaTab) {
            case 'Top 3 Response Formulas':
              return (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg mb-4 text-gray-900">Top 3 Response Formulas</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500 rounded-bl-full opacity-10"></div>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl text-blue-600">1</span>
                          <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs">45%</span>
                        </div>
                        <h4 className="text-sm text-gray-900 mb-2">Direct Affirmation/Negation + Brief Explanation</h4>
                        <p className="text-xs text-gray-600 italic">
                          Example: Yes enterprise wide MFA is deployed internally where the capability exists.
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-green-500 rounded-bl-full opacity-10"></div>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl text-green-600">2</span>
                          <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs">25%</span>
                        </div>
                        <h4 className="text-sm text-gray-900 mb-2">Policy/Procedure Reference + Brief Description</h4>
                        <p className="text-xs text-gray-600 italic">
                          Example: BC/DR policy outlines our controls in this area.
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500 rounded-bl-full opacity-10"></div>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl text-purple-600">3</span>
                          <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-xs">15%</span>
                        </div>
                        <h4 className="text-sm text-gray-900 mb-2">Technology Used + Minimal Detail</h4>
                        <p className="text-xs text-gray-600 italic">
                          Example: Agile deploys Azure Disk Encryption.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            case 'Must-Have Elements':
              return (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg mb-4 text-gray-900">Must-Have Elements</h3>
                  <div className="flex items-center justify-center gap-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-800">Direct answer to the question</span>
                    </div>
                    <div className="w-px h-8 bg-blue-200"></div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-800">Supporting detail or proof</span>
                    </div>
                    <div className="w-px h-8 bg-blue-200"></div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-800">Clear conclusion</span>
                    </div>
                  </div>
                </div>
              );
            case 'Formula Applied':
              return (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg mb-4 text-gray-900">Formula Applied</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-xs text-gray-500 mb-2">Question:</p>
                      <p className="text-sm text-gray-900">
                        Is Cybersecurity Supply Chain Risk Management (C-SCRM) included in the organization's privacy program?
                      </p>
                    </div>
                    <div className="border-l-4 border-blue-600 bg-blue-50 rounded-r-lg p-4">
                      <p className="text-xs text-gray-500 mb-2">Response:</p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        <span className="text-gray-900">Yes</span> Aprio implements and maintains industry-recognized Supply Chain Risk Management (SCRM) practices to strengthen the security and resilience of its third-party provider ecosystem. We also require contractual requirements for cybersecurity & data privacy requirements with third parties, reflecting...
                      </p>
                    </div>
                  </div>
                </div>
              );
            default:
              return null;
          }
        };

        return (
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-xl text-gray-900 mb-2">Response Formula Analysis</h2>
              <p className="text-sm text-gray-600">
                Understanding the most effective response patterns for {selectedCategory}
              </p>
            </div>

            {/* Formula Tabs */}
            <div className="bg-gray-100 rounded-full p-1.5 flex gap-1 mb-4">
              {formulaTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleFormulaTabChange(tab)}
                  className={`flex-1 px-6 py-2.5 rounded-full text-sm transition-all duration-300 whitespace-nowrap flex items-center justify-center gap-2 ${
                    activeFormulaTab === tab
                      ? 'bg-white text-gray-900 shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {getFormulaTabIcon(tab)}
                  {tab}
                </button>
              ))}
            </div>

            {/* Formula Tab Content */}
            <div 
              className={`transition-all duration-300 ${
                isFormulaTransitioning 
                  ? 'opacity-0 transform translate-y-2' 
                  : 'opacity-100 transform translate-y-0'
              }`}
            >
              {renderFormulaContent()}
            </div>
          </div>
        );
      case 'Example Q&As by Topic':
        const qaExamples = [
          {
            topic: 'Access Control Policy and Governance',
            color: '#10b981',
            question: 'Has your organization approved an access control policy, communicated it to contractors, and periodically reviewed it?',
            answer: 'Our access control policy has been approved by the CISO. Information security related responsibilities are communicated to contractors through orientation and periodic training.'
          },
          {
            topic: 'User Access Provisioning and Revocation',
            color: '#9333ea',
            question: 'Does the organization\'s process for assigning or revoking physical or logical access include formal authorization?',
            answer: 'Yes Access privileges is removed immediately when the temporary access permission has expired.'
          },
          {
            topic: 'User Access Provisioning and Revocation',
            color: '#9333ea',
            question: 'Is your process for assigning or revoking physical or logical access rights automated?',
            answer: 'Yes Access is automated, based on Access Provisioning Workflow, Automated, modified, or removed.'
          }
        ];

        return (
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-xl text-gray-900 mb-2">Example Q&As by Topic</h2>
              <p className="text-sm text-gray-600">
                Real-world question and answer examples from the {selectedCategory} category
              </p>
            </div>

            {/* Q&A Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-6 py-3 text-sm text-gray-700">Topic</th>
                      <th className="text-left px-6 py-3 text-sm text-gray-700">Question</th>
                      <th className="text-left px-6 py-3 text-sm text-gray-700">Answer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {qaExamples.map((qa, index) => (
                      <tr key={index} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 align-top w-1/5">
                          <div className="flex items-start gap-3">
                            <div
                              className="w-1 h-full min-h-[60px] rounded-full flex-shrink-0"
                              style={{ backgroundColor: qa.color }}
                            ></div>
                            <span className="text-sm text-gray-700 leading-relaxed">{qa.topic}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 align-top leading-relaxed w-2/5">
                          {qa.question}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 align-top leading-relaxed w-2/5">
                          {qa.answer}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-3 mb-2">
          <h1 className="text-2xl">Category & Topic Analysis</h1>
        </div>
        <p className="text-gray-600 text-sm">
          AI-powered insights into your security questionnaire responses by category
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

      <div className="bg-white rounded-lg border border-gray-200 p-3 mb-3">
        <div className="flex justify-between items-end gap-3">
          <div className="flex-1">
            <label htmlFor="category-select" className="block text-sm mb-1 text-gray-700">
              Select Category
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Choose a category...</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!selectedCategory}
            className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
          >
            <Search className="w-4 h-4" />
            Analyze Topics
          </button>
        </div>
      </div>

      {/* Analysis Results Cards */}
      {showAnalysis && selectedCategory && (
        <>
          <div className="grid grid-cols-3 gap-3 mb-3">
            {/* Total Questions Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-sm text-blue-900 mb-2">Total Questions</h3>
              <div className="text-3xl mb-1 text-blue-900">0</div>
              <p className="text-xs text-blue-700">{selectedCategory} category</p>
            </div>

            {/* Avg Response Length Card */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 p-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-sm text-purple-900 mb-2">Avg Response Length</h3>
              <div className="text-3xl mb-1 text-purple-900">0</div>
              <p className="text-xs text-purple-700">words per response</p>
            </div>

            {/* Topics Identified Card */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 p-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-sm text-green-900 mb-2">Topics Identified</h3>
              <div className="text-3xl mb-1 text-green-900">0</div>
              <p className="text-xs text-green-700">unique topic clusters</p>
            </div>
          </div>

          {/* Topic Analysis Tabs */}
          <div className="mb-6 mt-5">
            {/* Tab Navigation - Pill Style */}
            <div className="bg-gray-100 rounded-full p-1.5 flex gap-1 mb-4">
              {topicTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTopicTabChange(tab)}
                  className={`flex-1 px-6 py-2.5 rounded-full text-sm transition-all duration-300 whitespace-nowrap flex items-center justify-center gap-2 ${
                    activeTopicTab === tab
                      ? 'bg-white text-gray-900 shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {getTabIcon(tab)}
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content Container */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Tab Content with Fade Animation */}
              <div 
                className={`transition-all duration-300 ${
                  isTransitioning 
                    ? 'opacity-0 transform translate-y-2' 
                    : 'opacity-100 transform translate-y-0'
                }`}
              >
                <div className="text-center">
                  {renderTopicTabContent()}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modal for Detailed Topic */}
      {selectedDetailedTopic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl">
                {selectedDetailedTopic === 'Data Storage' ? '💾 Data Storage' : '🔒 Data Encryption'}
              </h2>
              <button
                onClick={handleTopicModalClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="overflow-auto flex-1 p-6">
              {selectedDetailedTopic === 'Data Storage' ? (
                <div className="space-y-6">
                  {/* Description */}
                  <p className="text-sm text-gray-600 text-center">
                    This dummy data simulates storage usage, costs, and availability across different storage tiers.
                  </p>

                  {/* Data Table */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-600">Storage ID</th>
                            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-600">Data Set Name</th>
                            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-600">Storage Tier</th>
                            <th className="px-4 py-3 text-right text-xs uppercase tracking-wider text-gray-600">Capacity (TB)</th>
                            <th className="px-4 py-3 text-right text-xs uppercase tracking-wider text-gray-600">Used (TB)</th>
                            <th className="px-4 py-3 text-right text-xs uppercase tracking-wider text-gray-600">Cost ($/Month)</th>
                            <th className="px-4 py-3 text-right text-xs uppercase tracking-wider text-gray-600">Uptime (%)</th>
                            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-600">Primary Use Case</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-900">DS-001</td>
                            <td className="px-4 py-3 text-sm text-gray-900">Customer_Records_DB</td>
                            <td className="px-4 py-3 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-red-100 text-red-800">
                                Hot Tier (SSD)
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">5</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">4.8</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">$1,500</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">99.999</td>
                            <td className="px-4 py-3 text-sm text-gray-700">High-frequency read/write</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-900">DS-002</td>
                            <td className="px-4 py-3 text-sm text-gray-900">Archive_Logs_2022</td>
                            <td className="px-4 py-3 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                                Cold Tier (Tape)
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">50</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">45.2</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">$80</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">99.9</td>
                            <td className="px-4 py-3 text-sm text-gray-700">Long-term compliance storage</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-900">DS-003</td>
                            <td className="px-4 py-3 text-sm text-gray-900">Dev_Environments</td>
                            <td className="px-4 py-3 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-amber-100 text-amber-800">
                                Warm Tier (HDD)
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">10</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">7.5</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">$350</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">99.99</td>
                            <td className="px-4 py-3 text-sm text-gray-700">Backup and staging data</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-900">DS-004</td>
                            <td className="px-4 py-3 text-sm text-gray-900">Video_Assets_Raw</td>
                            <td className="px-4 py-3 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-red-100 text-red-800">
                                Hot Tier (SSD)
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">8</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">7.9</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">$2,200</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">99.999</td>
                            <td className="px-4 py-3 text-sm text-gray-700">Media streaming and editing</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-900">DS-005</td>
                            <td className="px-4 py-3 text-sm text-gray-900">Backup_Snapshots</td>
                            <td className="px-4 py-3 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                                Cold Tier (Cloud)
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">20</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">18.0</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">$120</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">99.95</td>
                            <td className="px-4 py-3 text-sm text-gray-700">Disaster Recovery</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Comprehensive Analysis */}
                  <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg mb-4 text-gray-900">Comprehensive Analysis: Data Storage</h3>
                    <div className="space-y-4 text-left">
                      <div>
                        <h4 className="text-sm text-gray-900 mb-2">Tiered Strategy</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          The data shows a clear tiered storage strategy. Hot Tier (DS-001, DS-004) has the highest cost but provides maximum performance and uptime, ideal for mission-critical, frequently accessed data. Cold Tier (DS-002, DS-005) is significantly cheaper and is used for data that must be retained but is rarely accessed, such as old logs or backups.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-900 mb-2">Cost Efficiency</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          The Archive Logs (DS-002) is highly cost-efficient, storing over 45 TB for only $80/month, emphasizing the value of using cold storage for archival data. Conversely, the Video Assets (DS-004) consume the largest budget due to the performance demands of raw media files.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-900 mb-2">Capacity Management</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          Customer_Records_DB (DS-001) is nearing full capacity (4.8 out of 5 TB used), flagging a need for capacity planning or migration to a larger resource to maintain performance and prevent outages.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedDetailedTopic === 'Data Encryption' ? (
                <div className="space-y-6">
                  {/* Description */}
                  <p className="text-sm text-gray-600 text-center">
                    This dummy data shows the encryption status, method, and key management for various data assets.
                  </p>

                  {/* Data Table */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-600">Asset Name</th>
                            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-600">Data Type</th>
                            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-600">Encryption Status</th>
                            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-600">Encryption Method</th>
                            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-600">Key Management</th>
                            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-600">Compliance Standard</th>
                            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-600">Last Key Rotation</th>
                            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-600">Encryption Performance Overhead</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-900">PII_Database</td>
                            <td className="px-4 py-3 text-sm text-gray-900">Customer PII</td>
                            <td className="px-4 py-3 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                                Encrypted (At Rest & In Transit)
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">AES-256</td>
                            <td className="px-4 py-3 text-sm text-gray-700">Managed Service (AWS KMS)</td>
                            <td className="px-4 py-3 text-sm text-gray-700">GDPR, CCPA</td>
                            <td className="px-4 py-3 text-sm text-gray-700">2025-10-01</td>
                            <td className="px-4 py-3 text-sm text-gray-700">Low (2%)</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-900">Internal_Documents</td>
                            <td className="px-4 py-3 text-sm text-gray-900">HR Records</td>
                            <td className="px-4 py-3 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                                Encrypted (At Rest)
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">Twofish</td>
                            <td className="px-4 py-3 text-sm text-gray-700">Hardware Security Module (HSM)</td>
                            <td className="px-4 py-3 text-sm text-gray-700">ISO 27001</td>
                            <td className="px-4 py-3 text-sm text-gray-700">2025-07-15</td>
                            <td className="px-4 py-3 text-sm text-gray-700">Moderate (5%)</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-900">Public_Website_Cache</td>
                            <td className="px-4 py-3 text-sm text-gray-900">Non-sensitive</td>
                            <td className="px-4 py-3 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800">
                                None
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">N/A</td>
                            <td className="px-4 py-3 text-sm text-gray-700">N/A</td>
                            <td className="px-4 py-3 text-sm text-gray-700">N/A</td>
                            <td className="px-4 py-3 text-sm text-gray-700">N/A</td>
                            <td className="px-4 py-3 text-sm text-gray-700">N/A</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-900">Financial_Ledgers</td>
                            <td className="px-4 py-3 text-sm text-gray-900">Transaction Data</td>
                            <td className="px-4 py-3 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                                Encrypted (At Rest & In Transit)
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">RSA (4096-bit)</td>
                            <td className="px-4 py-3 text-sm text-gray-700">On-Premise Vault</td>
                            <td className="px-4 py-3 text-sm text-gray-700">PCI DSS</td>
                            <td className="px-4 py-3 text-sm text-gray-700">2025-11-05</td>
                            <td className="px-4 py-3 text-sm text-gray-700">High (8%)</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-900">Backup_Files</td>
                            <td className="px-4 py-3 text-sm text-gray-900">Various</td>
                            <td className="px-4 py-3 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                                Encrypted (At Rest)
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">ChaCha20</td>
                            <td className="px-4 py-3 text-sm text-gray-700">Managed Service (Azure Key Vault)</td>
                            <td className="px-4 py-3 text-sm text-gray-700">Internal Policy</td>
                            <td className="px-4 py-3 text-sm text-gray-700">2025-09-20</td>
                            <td className="px-4 py-3 text-sm text-gray-700">Low (3%)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Comprehensive Analysis */}
                  <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg mb-4 text-gray-900">Comprehensive Analysis: Data Encryption</h3>
                    <div className="space-y-4 text-left">
                      <div>
                        <h4 className="text-sm text-gray-900 mb-2">Defense-in-Depth</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          Critical assets like PII_Database and Financial_Ledgers use end-to-end encryption (At Rest and In Transit), providing strong protection against breaches and eavesdropping.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-900 mb-2">Method and Performance Trade-offs</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          The Financial_Ledgers use a high-bit RSA encryption (4096-bit), which provides maximum security but results in the highest performance overhead (8%). This illustrates the trade-off between cryptographic strength and system speed. The common and efficient AES-256 (PII_Database) provides strong security with minimal performance impact.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-900 mb-2">Key Management</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          The use of both Managed Services (AWS KMS, Azure Key Vault) and specialized hardware (HSM) demonstrates a commitment to secure key management, which is as vital as the encryption itself. Keys for highly sensitive data like HR Records are stored in an HSM for the highest level of tamper protection.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-900 mb-2">Scope</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          The Public_Website_Cache remains unencrypted, which is acceptable because it contains non-sensitive data, reducing unnecessary processing load.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedDetailedTopic === 'Remote Policy' ? (
                <div className="space-y-6">
                  {/* Description */}
                  <p className="text-sm text-gray-600 text-center">
                    This dummy data tracks remote user compliance, connection methods, and security incident rates.
                  </p>

                  {/* Data Table */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-600">User Group</th>
                            <th className="px-4 py-3 text-right text-xs uppercase tracking-wider text-gray-600">Total Users</th>
                            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-600">Policy Version</th>
                            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-600">Connection Method</th>
                            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-600">MFA Enforcement</th>
                            <th className="px-4 py-3 text-right text-xs uppercase tracking-wider text-gray-600">Device Compliance Rate</th>
                            <th className="px-4 py-3 text-right text-xs uppercase tracking-wider text-gray-600">Security Incidents (Q4)</th>
                            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-600">Allowed Geo-Locations</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-900">Executive Team</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">15</td>
                            <td className="px-4 py-3 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-red-100 text-red-800">
                                3.1 (Strict)
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">Zero Trust Network Access (ZTNA)</td>
                            <td className="px-4 py-3 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                                Mandatory
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">100%</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">0</td>
                            <td className="px-4 py-3 text-sm text-gray-700">Internal/Home Office</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-900">Development Team</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">80</td>
                            <td className="px-4 py-3 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                                3.0 (Standard)
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">Site-to-Site VPN</td>
                            <td className="px-4 py-3 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                                Mandatory
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">92%</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">5</td>
                            <td className="px-4 py-3 text-sm text-gray-700">Global (Contractors)</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-900">Sales Team</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">120</td>
                            <td className="px-4 py-3 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                                3.0 (Standard)
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">Cloud-Managed Endpoint</td>
                            <td className="px-4 py-3 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                                Mandatory
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">85%</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">12</td>
                            <td className="px-4 py-3 text-sm text-gray-700">Regional</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-900">Administrative</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">45</td>
                            <td className="px-4 py-3 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-red-100 text-red-800">
                                3.1 (Strict)
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">Client VPN</td>
                            <td className="px-4 py-3 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                                Mandatory
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">98%</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">1</td>
                            <td className="px-4 py-3 text-sm text-gray-700">Internal/Home Office</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Comprehensive Analysis */}
                  <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg mb-4 text-gray-900">Comprehensive Analysis: Remote Policy</h3>
                    <div className="space-y-4 text-left">
                      <div>
                        <h4 className="text-sm text-gray-900 mb-2">Security Protocol Disparity</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          The Executive Team utilizes ZTNA (Zero Trust Network Access), representing the highest level of security, ensuring no device is trusted by default. Other groups primarily use VPNs or cloud endpoints, which are more traditional.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-900 mb-2">Compliance and Risk</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          The Sales Team has the lowest Device Compliance Rate (85%) and the highest number of Security Incidents (12). This correlation suggests a direct link between device non-compliance (e.g., outdated OS, missing security patches) and increased security risks. This area requires immediate attention for remediation and training.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-900 mb-2">Policy Versioning</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          Two versions are in use: 3.1 (Strict) for Executive and Administrative users (handling very sensitive data or with elevated privileges) and 3.0 (Standard) for others. This shows policy segmentation based on risk profile.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-900 mb-2">Global Access Management</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          The Development Team has the widest geographical access, necessary for international collaboration, but requiring stringent monitoring as evidenced by 5 incidents.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedDetailedTopic === 'Access Control' ? (
                <div className="space-y-6">
                  {/* Description */}
                  <p className="text-sm text-gray-600 text-center">
                    This dummy data illustrates the access levels granted to different user roles across various critical systems, following the principle of Least Privilege.
                  </p>

                  {/* Data Table */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-600">Role/Group</th>
                            <th className="px-4 py-3 text-center text-xs uppercase tracking-wider text-gray-600">Database (PII)</th>
                            <th className="px-4 py-3 text-center text-xs uppercase tracking-wider text-gray-600">Financial Reports</th>
                            <th className="px-4 py-3 text-center text-xs uppercase tracking-wider text-gray-600">Internal Wiki</th>
                            <th className="px-4 py-3 text-center text-xs uppercase tracking-wider text-gray-600">Source Code Repository</th>
                            <th className="px-4 py-3 text-center text-xs uppercase tracking-wider text-gray-600">HR System (Payroll)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-900">CEO/Executive</td>
                            <td className="px-4 py-3 text-sm text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                                Read-Only
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                                Full Access
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                                Full Access
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-gray-200 text-gray-800">
                                None
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                                Read-Only
                              </span>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-900">Data Analyst</td>
                            <td className="px-4 py-3 text-sm text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                                Full Access
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                                Read-Only
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                                Read-Only
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-gray-200 text-gray-800">
                                None
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-gray-200 text-gray-800">
                                None
                              </span>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-900">Software Developer</td>
                            <td className="px-4 py-3 text-sm text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-gray-200 text-gray-800">
                                None
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-gray-200 text-gray-800">
                                None
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                                Read-Only
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                                Full Access
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-gray-200 text-gray-800">
                                None
                              </span>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-900">HR Manager</td>
                            <td className="px-4 py-3 text-sm text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-gray-200 text-gray-800">
                                None
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                                Read-Only
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                                Read-Only
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-gray-200 text-gray-800">
                                None
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                                Full Access
                              </span>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-900">General Employee</td>
                            <td className="px-4 py-3 text-sm text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-gray-200 text-gray-800">
                                None
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                                Read-Only
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                                Full Access
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-gray-200 text-gray-800">
                                None
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-gray-200 text-gray-800">
                                None
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Comprehensive Analysis */}
                  <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg mb-4 text-gray-900">Comprehensive Analysis: Access Control</h3>
                    <div className="space-y-4 text-left">
                      <div>
                        <h4 className="text-sm text-gray-900 mb-2">Principle of Least Privilege (PoLP)</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          The table clearly demonstrates PoLP. Users only have the necessary access for their job function: The Software Developer has Full Access only to the Source Code Repository but None to the highly sensitive PII Database or HR System. The HR Manager has Full Access to the HR System but None to the PII Database.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-900 mb-2">Role-Based Access Control (RBAC)</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          Access is defined by the user's role (e.g., Data Analyst, HR Manager) rather than individual user names. This makes management scalable and auditing simpler.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-900 mb-2">Controlled Visibility</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          The CEO/Executive has a blend of access: Full Access to Financial Reports and the Internal Wiki, but only Read-Only access to the PII Database and HR System, limiting the ability to accidentally or maliciously modify core records.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-900 mb-2">Granularity</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          Even within 'access,' there is granularity. Data Analysts get Full Access to the PII Database (necessary for their work) but only Read-Only access to Financial Reports, preventing unauthorized changes to fiscal records.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
