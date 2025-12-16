import { useState } from 'react';
import { GraduationCap, Sparkles, Copy, Check, Target, FileText, TrendingUp, Settings, ClipboardList, Briefcase, User, MessageCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CompanySelector } from './CompanySelector';

interface Persona {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export function AICoachingDashboard() {
  const [selectedPersona, setSelectedPersona] = useState<string>('technical');
  const [showResults, setShowResults] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState(false);
  const [copiedQuestion, setCopiedQuestion] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const personas: Persona[] = [
    {
      id: 'technical',
      name: 'Technical Expert',
      description: 'Deep technical detail and specificity',
      icon: <Settings className="w-8 h-8 text-gray-900" />,
      color: '#015CE6'
    },
    {
      id: 'compliance',
      name: 'Compliance Officer',
      description: 'Framework references and audit-ready language',
      icon: <ClipboardList className="w-8 h-8 text-gray-900" />,
      color: '#1A6EEA'
    },
    {
      id: 'sales',
      name: 'Sales Enablement',
      description: 'Customer-friendly and persuasive tone',
      icon: <Briefcase className="w-8 h-8 text-gray-900" />,
      color: '#3380ED'
    },
    {
      id: 'executive',
      name: 'Executive Advisor',
      description: 'Strategic and business-focused approach',
      icon: <User className="w-8 h-8 text-gray-900" />,
      color: '#4C92F1'
    }
  ];

  const sampleResponse = `Scoped data is not shared with any 3rd parties. However, Client does leverage sub-processors to deliver the architecture and services the platform is built on, but we do not grant access to the data itself. For more information regarding the purposes of sharing customer data, please refer to the provided link: https://xyz.com/legal/data-sub-processors/`;

  const sampleQuestion = `Do you share customer data with third parties? If so, please explain.`;

  const handleGetCoaching = () => {
    setShowResults(true);
  };

  const copyToClipboard = (text: string, type: 'response' | 'question') => {
    navigator.clipboard.writeText(text);
    if (type === 'response') {
      setCopiedResponse(true);
      setTimeout(() => setCopiedResponse(false), 2000);
    } else {
      setCopiedQuestion(true);
      setTimeout(() => setCopiedQuestion(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <h1 className="text-2xl">AI-Powered Response Coaching with Personas</h1>
        </div>
        <p className="text-gray-600 text-sm">
          Get personalized coaching tailored to different stakeholder perspectives
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

      {/* Response for Coaching Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label style={{ color: '#015CE6' }}>Response for Coaching</label>
          <button
            onClick={() => copyToClipboard(sampleResponse, 'response')}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
          >
            {copiedResponse ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
          <p className="text-gray-700 leading-relaxed">{sampleResponse}</p>
        </div>
      </div>

      {/* Original Question Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <label style={{ color: '#015CE6' }}>Original Question</label>
          <button
            onClick={() => copyToClipboard(sampleQuestion, 'question')}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
          >
            {copiedQuestion ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
          <p className="text-gray-700 leading-relaxed">{sampleQuestion}</p>
        </div>
      </div>

      {/* Select Coaching Persona Section */}
      <div className="mb-8">
        <label className="block mb-4" style={{ color: '#015CE6' }}>Select Coaching Persona</label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {personas.map((persona) => (
            <button
              key={persona.id}
              onClick={() => setSelectedPersona(persona.id)}
              className={`p-6 rounded-xl border-2 transition-all duration-300 text-center backdrop-blur-sm ${
                selectedPersona === persona.id
                  ? 'opacity-100 shadow-lg transform scale-105'
                  : 'opacity-40 hover:opacity-60 hover:shadow-md hover:scale-102'
              }`}
              style={{
                background: selectedPersona === persona.id
                  ? `linear-gradient(135deg, ${persona.color}60, ${persona.color}30)`
                  : `linear-gradient(135deg, ${persona.color}15, ${persona.color}08)`,
                borderColor: selectedPersona === persona.id
                  ? persona.color
                  : `${persona.color}30`,
                boxShadow: selectedPersona === persona.id
                  ? `0 8px 32px ${persona.color}40`
                  : undefined
              }}
            >
              <div className="flex flex-col items-center mb-3">
                <div className="mb-3">
                  {persona.icon}
                </div>
                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                  style={{
                    borderColor: selectedPersona === persona.id ? persona.color : `${persona.color}60`,
                    backgroundColor: 'white'
                  }}
                >
                  {selectedPersona === persona.id && (
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: persona.color }}
                    ></div>
                  )}
                </div>
              </div>
              <h3 className="mb-2 text-gray-900">
                {persona.name}
              </h3>
              <p className="text-sm text-gray-600">
                {persona.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Get Coaching Button */}
      <div className="flex justify-end mb-8">
        <button
          onClick={handleGetCoaching}
          className="bg-gray-900 hover:bg-black text-white px-8 py-3.5 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg shadow-gray-900/30 hover:shadow-xl hover:shadow-gray-900/40 hover:scale-105"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Get Coaching</span>
        </button>
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Tabs defaultValue="alignment" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="alignment">
                Persona Alignment Score
              </TabsTrigger>
              <TabsTrigger value="coached" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Coached Response
              </TabsTrigger>
              <TabsTrigger value="improvements">
                Key Improvements
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: Persona Alignment Score */}
            <TabsContent value="alignment">
              <div className="bg-gradient-to-br from-white to-blue-50 border-2 border-blue-100 rounded-xl p-6 shadow-lg">
                <div className="mb-4">
                  <h3 className="text-xl text-gray-900">Persona Alignment Score</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-5 border border-blue-100 shadow-sm">
                    <p className="text-sm text-gray-600 mb-2">Current Score</p>
                    <p className="text-4xl mb-1 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                      68%
                    </p>
                    <p className="text-sm text-gray-500">Moderate alignment</p>
                  </div>
                  <div className="bg-white rounded-lg p-5 border border-green-100 shadow-sm">
                    <p className="text-sm text-gray-600 mb-2">Potential Score</p>
                    <p className="text-4xl text-green-600 mb-1">92%</p>
                    <p className="text-sm text-gray-500">Strong alignment</p>
                  </div>
                  <div className="bg-white rounded-lg p-5 border border-purple-100 shadow-sm">
                    <p className="text-sm text-gray-600 mb-2">Improvement</p>
                    <p className="text-4xl text-purple-600 mb-1">+24%</p>
                    <p className="text-sm text-gray-500">Significant boost</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Tab 2: Coached Response */}
            <TabsContent value="coached">
              <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-100 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <GraduationCap className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl text-gray-900">Coached Response - Technical Expert</h3>
                      <p className="text-sm text-gray-600">
                        Enhanced with deep technical detail and specificity
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-lg p-5">
                    <p className="text-gray-800 leading-relaxed mb-4">
                      Client employs a strict data isolation architecture where customer data remains
                      within designated processing boundaries. While we leverage certified sub-processors
                      (AWS, GCP) for infrastructure services, these entities provide compute and storage
                      resources only - they do not have logical access to customer data payloads.
                    </p>
                    <p className="text-gray-800 leading-relaxed mb-4">
                      Our data sharing model adheres to the principle of least privilege: sub-processors
                      receive only metadata required for service delivery (e.g., resource allocation
                      metrics). All data-at-rest is encrypted using AES-256, with customer-managed keys
                      (CMK) available for enhanced control.
                    </p>
                    <p className="text-gray-800 leading-relaxed">
                      For complete transparency, our comprehensive sub-processor registry documents each
                      entity's role, data categories processed, and applicable safeguards. Reference:{' '}
                      <span className="text-blue-600">
                        https://xyz.com/legal/data-sub-processors/
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Tab 3: Key Improvements */}
            <TabsContent value="improvements">
              <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100 px-6 py-4">
                  <div>
                    <h3 className="text-xl text-gray-900">Key Improvements</h3>
                    <p className="text-sm text-gray-600">
                      Enhancements made to align with Technical Expert persona
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex gap-4 p-4 bg-green-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                        ✓
                      </div>
                      <div>
                        <h4 className="text-gray-900 mb-1">Added Technical Architecture Details</h4>
                        <p className="text-sm text-gray-600">
                          Specified data isolation architecture and processing boundary concepts
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-green-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                        ✓
                      </div>
                      <div>
                        <h4 className="text-gray-900 mb-1">Included Specific Security Controls</h4>
                        <p className="text-sm text-gray-600">
                          Referenced AES-256 encryption and customer-managed keys for technical
                          credibility
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-green-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                        ✓
                      </div>
                      <div>
                        <h4 className="text-gray-900 mb-1">Applied Principle-Based Language</h4>
                        <p className="text-sm text-gray-600">
                          Used "principle of least privilege" to demonstrate security expertise
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-green-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                        ✓
                      </div>
                      <div>
                        <h4 className="text-gray-900 mb-1">Enhanced Transparency</h4>
                        <p className="text-sm text-gray-600">
                          Provided detailed explanation of sub-processor role and data access limitations
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
