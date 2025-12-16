import { useState, useEffect } from 'react';
import { Sparkles, Send, RefreshCw, Copy, Check, ChevronDown, Wand2, MessageSquare, Target, Search, X, FileText, Zap, Edit3 } from 'lucide-react';
import { CompanySelector } from './CompanySelector';

interface GenerateResponseDashboardProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

export function GenerateResponseDashboard({ setIsModalOpen }: GenerateResponseDashboardProps) {
  const [question, setQuestion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categorizedResult, setCategorizedResult] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [relatedCategories, setRelatedCategories] = useState<Array<{name: string, percentage: number}>>([]);
  const [generatedResponse, setGeneratedResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [autoCategorize, setAutoCategorize] = useState(false);
  const [showSimilarQAs, setShowSimilarQAs] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [autoCategorizeMessage, setAutoCategorizeMessage] = useState('');
  
  // Response Parameters state
  const [responseStyle, setResponseStyle] = useState('Direct');
  const [includeMetrics, setIncludeMetrics] = useState(true);
  const [includeExamples, setIncludeExamples] = useState(false);
  const [technicalDepth, setTechnicalDepth] = useState(5);

  // Update modal state in parent component
  useEffect(() => {
    setIsModalOpen(showSimilarQAs);
  }, [showSimilarQAs, setIsModalOpen]);

  // Auto-categorize when question changes and auto-categorize is enabled
  useEffect(() => {
    if (autoCategorize && question.trim()) {
      handleAutoCategorize(true);
    } else if (autoCategorize && !question.trim()) {
      setAutoCategorizeMessage('');
      setCategorizedResult('');
      setConfidence(0);
      setRelatedCategories([]);
    }
  }, [question, autoCategorize]);

  // Similar Q&As data
  const similarQAs = [
    {
      question: "Does your organization implement multi-factor authentication (MFA)?",
      answer: "Yes, we enforce MFA across all user accounts. Our implementation includes TOTP-based authenticators and hardware security keys with 99.8% adoption rate among active users.",
      category: "Access Control",
      similarity: 90
    },
    {
      question: "How does your organization handle data encryption at rest?",
      answer: "We utilize AES-256 encryption for all data at rest. Our encryption keys are managed through AWS KMS with automatic rotation every 90 days and strict access controls.",
      category: "Data Privacy",
      similarity: 87
    },
    {
      question: "What is your incident response time for critical security events?",
      answer: "Our average response time for critical security incidents is 15 minutes, with 24/7 SOC monitoring. We maintain a 99.2% SLA for incident acknowledgment within 30 minutes.",
      category: "Incident Response",
      similarity: 85
    },
    {
      question: "Do you conduct regular security awareness training?",
      answer: "Yes, we provide mandatory quarterly security awareness training to all employees, with completion rates exceeding 98%. Training includes phishing simulations and hands-on security scenarios.",
      category: "Security & Compliance",
      similarity: 82
    },
    {
      question: "How do you manage third-party vendor security assessments?",
      answer: "We conduct comprehensive security assessments for all third-party vendors handling sensitive data. This includes annual reviews, continuous monitoring, and contractual security requirements with 100% vendor compliance.",
      category: "Third-Party Security",
      similarity: 79
    },
    {
      question: "What backup and disaster recovery procedures do you have in place?",
      answer: "We maintain automated daily backups with 30-day retention, stored in geographically distributed locations. Our RTO is 4 hours and RPO is 1 hour, tested quarterly through full disaster recovery drills.",
      category: "Business Continuity",
      similarity: 76
    },
    {
      question: "How do you ensure secure software development practices?",
      answer: "We follow OWASP guidelines and implement secure SDLC practices including code reviews, automated security testing, and dependency scanning. 100% of production code undergoes security review before deployment.",
      category: "Application Security",
      similarity: 74
    },
    {
      question: "What network security controls are in place?",
      answer: "Our network security includes next-generation firewalls, intrusion detection/prevention systems (IDS/IPS), and network segmentation with zero-trust architecture. We maintain 99.99% uptime for security monitoring.",
      category: "Infrastructure & Network",
      similarity: 71
    },
    {
      question: "How do you manage privileged access?",
      answer: "Privileged access is managed through a PAM solution with session recording, just-in-time access provisioning, and automatic de-provisioning. All privileged sessions are logged and reviewed with 100% audit coverage.",
      category: "Access Control",
      similarity: 88
    },
    {
      question: "What are your data retention and disposal policies?",
      answer: "We follow industry-standard data retention policies with automatic deletion after the retention period. Secure disposal includes cryptographic erasure for digital data and certified destruction for physical media, maintaining 100% compliance with regulatory requirements.",
      category: "Data Privacy",
      similarity: 83
    }
  ];

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
    'Encryption & Cryptography',
    'Device Policy'
  ];

  const handleAutoCategorize = (checked: boolean) => {
    setAutoCategorize(checked);
    
    if (checked && question.trim()) {
      // Auto categorize to Device Policy when checkbox is enabled
      const category = 'Device Policy';
      setSelectedCategory(category);
      setAutoCategorizeMessage(`Auto Categorized the security question "${question}" into ${category} category.`);
      
      // Set categorization results
      const result = {
        confidence: 89,
        related: [
          { name: 'Access Control', percentage: 76 },
          { name: 'Security & Compliance', percentage: 71 },
          { name: 'Infrastructure & Network', percentage: 65 }
        ]
      };
      
      setCategorizedResult(category);
      setConfidence(result.confidence);
      setRelatedCategories(result.related);
    } else {
      setAutoCategorizeMessage('');
      if (checked) {
        setCategorizedResult('');
        setConfidence(0);
        setRelatedCategories([]);
      }
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    
    if (category) {
      // Simulate categorization result based on selected category
      const categoryResults: Record<string, {confidence: number, related: Array<{name: string, percentage: number}>}> = {
        'Access Control': {
          confidence: 94,
          related: [
            { name: 'Third-Party Risk', percentage: 78 },
            { name: 'Privacy', percentage: 72 },
            { name: 'Compliance', percentage: 68 }
          ]
        },
        'Data Privacy': {
          confidence: 91,
          related: [
            { name: 'Compliance', percentage: 85 },
            { name: 'Encryption & Cryptography', percentage: 73 },
            { name: 'Access Control', percentage: 67 }
          ]
        },
        'Security & Compliance': {
          confidence: 88,
          related: [
            { name: 'Risk Management', percentage: 81 },
            { name: 'Access Control', percentage: 74 },
            { name: 'Data Privacy', percentage: 70 }
          ]
        },
        'Device Policy': {
          confidence: 89,
          related: [
            { name: 'Access Control', percentage: 76 },
            { name: 'Security & Compliance', percentage: 71 },
            { name: 'Infrastructure & Network', percentage: 65 }
          ]
        }
      };
      
      const result = categoryResults[category] || {
        confidence: 85,
        related: [
          { name: 'Security & Compliance', percentage: 75 },
          { name: 'Risk Management', percentage: 68 },
          { name: 'Data Privacy', percentage: 62 }
        ]
      };
      
      setCategorizedResult(category);
      setConfidence(result.confidence);
      setRelatedCategories(result.related);
    } else {
      setCategorizedResult('');
      setConfidence(0);
      setRelatedCategories([]);
    }
  };

  const handleGenerate = () => {
    if (!question.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate response generation
    setTimeout(() => {
      setGeneratedResponse(
        `No, we do not share customer data with third parties for marketing or commercial purposes. However, we do work with carefully vetted sub-processors to deliver our service effectively.

All sub-processors are subject to strict data processing agreements (DPAs) and are required to maintain SOC 2 Type II compliance. We conduct annual security assessments of all vendors with access to customer data.

Key Metrics:

• 100% of sub-processors maintain active SOC 2 Type II certification
• All vendors undergo quarterly security reviews
• Zero data breach incidents involving third-party vendors in the past 3 years

A complete list of our sub-processors is available in our Trust Center and is updated quarterly. We provide 30 days notice before onboarding any new sub-processor that will have access to customer data.`
      );
      setIsGenerating(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedResponse);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex-1">
      {/* Header Section */}
      <div className="mb-4 text-center">
        <h1 className="text-2xl mb-2">Style-Aware Response Generation</h1>
        <p className="text-gray-600 text-sm">
          Generate intelligent, brand-consistent responses to security questionnaires
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-3 mb-4">
        <CompanySelector
          selectedFile={selectedFile}
          onFileUpload={setSelectedFile}
          onDecodeStyle={() => {}}
        />
      </div>

      {/* Combined Card: Question Input, Generate Button, and Category */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        {/* Question Input Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <h2 className="text-gray-900">Enter Security Question</h2>
          </div>
          <div className="flex gap-4 items-center">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., Does your organization implement multi-factor authentication?"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
            />
            <button
              onClick={handleGenerate}
              disabled={!question.trim() || isGenerating}
              className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md whitespace-nowrap"
            >
              Generate with Style
            </button>
          </div>
        </div>

        {/* Question Category Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-900">Question Category</h2>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoCategorize}
                onChange={(e) => handleAutoCategorize(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">Auto Categorize</span>
            </label>
          </div>
          
          {/* Auto Categorize Message */}
          {autoCategorizeMessage && (
            <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">{autoCategorizeMessage}</p>
            </div>
          )}
          
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              disabled={autoCategorize}
              className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-gray-900 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              <option value="">Select category...</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* Response Parameters Section */}
        <div>
          <h2 className="text-gray-900 mb-4">Response Parameters</h2>
          
          {/* Response Style */}
          <div className="mb-4">
            <label className="text-sm text-blue-600 mb-2 block">Response Style</label>
            <div className="flex gap-2">
              {['Direct', 'Detailed', 'Comprehensive', 'Elaborative'].map((style) => (
                <button
                  key={style}
                  onClick={() => setResponseStyle(style)}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    responseStyle === style
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeMetrics}
                onChange={(e) => setIncludeMetrics(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-900">Include Metrics</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeExamples}
                onChange={(e) => setIncludeExamples(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-900">Include Examples</span>
            </label>
          </div>

          {/* Technical Depth Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-blue-600">Technical Depth</label>
              <div className="flex items-center gap-2">
                <span className="text-gray-900">{technicalDepth}</span>
                <span className="text-gray-400">10</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={technicalDepth}
              onChange={(e) => setTechnicalDepth(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
              style={{
                background: `linear-gradient(to right, #015CE6 0%, #015CE6 ${(technicalDepth - 1) * 11.11}%, #e5e7eb ${(technicalDepth - 1) * 11.11}%, #e5e7eb 100%)`
              }}
            />
            <p className="text-sm text-gray-600 mt-2">Non-technical, layperson-friendly</p>
          </div>
        </div>
      </div>

      {/* Generated Response and Style Match Analysis - Side by Side */}
      <div className="grid grid-cols-2 gap-6">
        {/* Generated Response */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg text-gray-900">Generated Response</h2>
            </div>
            
            {generatedResponse && (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setGeneratedResponse('');
                    setQuestion('');
                    setCategorizedResult('');
                  }}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded-lg transition-all"
                  title="Regenerate"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCopy}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded-lg transition-all"
                  title="Copy to clipboard"
                >
                  {isCopied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Response Content */}
          <div>
            {isGenerating ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-md">
                  <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
                <p className="text-gray-600">Generating response...</p>
              </div>
            ) : generatedResponse ? (
              <div className="w-full">
                <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {generatedResponse}
                  </p>
                </div>
                
                {/* Response Metrics */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
                    <p className="text-xs text-gray-600 mb-1">Word Count</p>
                    <p className="text-lg text-gray-900">{generatedResponse.split(' ').length}</p>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
                    <p className="text-xs text-gray-600 mb-1">Tone Match</p>
                    <p className="text-lg text-green-600">98%</p>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
                    <p className="text-xs text-gray-600 mb-1">Confidence</p>
                    <p className="text-lg text-blue-600">High</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-md">
                  <Edit3 className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">Enter a question to generate a response</p>
                <p className="text-sm text-gray-400 mt-2">
                  AI will craft a brand-consistent answer
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Style Match Analysis */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg text-blue-600">Style Match Analysis</h2>
          </div>

          {generatedResponse ? (
            <div>
              {/* Overall Style Match */}
              <div className="mb-6">
                <h3 className="text-blue-600 mb-4">Overall Style Match</h3>
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-700">Match Score</span>
                    <span className="text-4xl text-blue-600">94%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    This response closely matches your "Direct" style with appropriate metrics inclusion
                  </p>
                </div>
              </div>

              {/* Style Attributes */}
              <div>
                <h3 className="text-blue-600 mb-4">Style Attributes</h3>
                <div className="space-y-3">
                  {/* Conciseness */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700">Conciseness</span>
                      <span className="text-gray-900">92%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>

                  {/* Technical Depth */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700">Technical Depth</span>
                      <span className="text-gray-900">88%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>

                  {/* Metrics Usage */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700">Metrics Usage</span>
                      <span className="text-gray-900">96%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '96%' }}></div>
                    </div>
                  </div>

                  {/* Compliance Framing */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700">Compliance Framing</span>
                      <span className="text-gray-900">95%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                <Target className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">Style analysis will appear here</p>
              <p className="text-sm text-gray-400 mt-2">
                Generate a response to see the match analysis
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Find Similar Q&As Button */}
      <div className="mt-6">
        <button 
          onClick={() => setShowSimilarQAs(true)}
          className="w-full bg-gray-200 hover:bg-gray-800 text-gray-900 hover:text-white py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          <span>Find Similar Q&As</span>
        </button>
      </div>

      {/* Similar Q&As Modal */}
      {showSimilarQAs && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center gap-3">
                <Search className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl text-gray-900">Similar Q&As</h2>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm ml-2">
                  {similarQAs.length} Matches Found
                </span>
              </div>
              <button
                onClick={() => setShowSimilarQAs(false)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-all"
                title="Close"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-88px)] p-6">
              <div className="space-y-4">
                {similarQAs.map((qa, index) => (
                  <div 
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
                  >
                    {/* Category Badge */}
                    <div className="mb-3 flex items-center justify-between">
                      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {qa.category}
                      </span>
                      <span className="text-sm text-gray-600">
                        {qa.similarity}% similar
                      </span>
                    </div>

                    {/* Question */}
                    <div className="mb-3">
                      <h3 className="text-gray-900 mb-2">Q: {qa.question}</h3>
                    </div>

                    {/* Answer */}
                    <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-600">
                      <p className="text-gray-700">
                        <span className="text-blue-600 mr-2">A:</span>
                        {qa.answer}
                      </p>
                    </div>

                    {/* Use This Answer Button */}
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={() => {
                          setQuestion(qa.question);
                          setGeneratedResponse(qa.answer);
                          setShowSimilarQAs(false);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm"
                      >
                        Use This Answer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}