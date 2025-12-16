import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function ResponseDNA() {
  const [selectedCharacteristic, setSelectedCharacteristic] = useState<string | null>(null);
  const [selectedVoiceProfile, setSelectedVoiceProfile] = useState<string | null>(null);
  const [responseElementsModalOpen, setResponseElementsModalOpen] = useState(false);
  const [openingPatternsModalOpen, setOpeningPatternsModalOpen] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  const voiceProfileMetrics = [
    { label: 'Formality', score: '7/10', description: 'Professional, business-formal' },
    { label: 'Confidence', score: '6/10', description: 'Confident with nuance' },
    { label: 'Technical Depth', score: '4/10', description: 'Balanced technical/business' },
    { label: 'Clarity Score', score: '8/10', description: 'In good structure' },
    { label: 'Empathy Level', score: '5/10', description: 'Based on policies' },
    { label: 'Style Consistency', score: '35%', description: 'Variable - Highly adaptive' }
  ];

  const voiceProfileDetails = [
    {
      id: 'formality',
      label: 'Formality',
      score: '8/10',
      subtitle: 'Highly formal, executive-appropriate',
      insight: 'AcmeCorp maintains a high level of formality through professional language and avoidance of casual terms. Their responses use precise terminology and demonstrate adherence to professional standards. While this formality strengthens credibility, it might benefit from occasional simplification for broader audiences.',
      example: 'Example: "Yes Security policies at AcmeCorp are documented in a secure repository, accessible only to authorized personnel through role-based access controls."',
      analysis: 'Analysis: AcmeCorp expresses a generally high degree of confidence in their security posture. They manage this without being over-confident though as they mention more actual metrics to back up the claims.'
    },
    {
      id: 'confidence',
      label: 'Confidence',
      score: '7/10',
      subtitle: 'Confident with nuance',
      insight: 'AcmeCorp expresses a generally high degree of confidence in their security posture. They rarely mention or report on their outcomes, but they manage this without being over-confident as they provide actual metrics to back up the claims.',
      example: 'Example: "Yes AcmeCorp\'s incident response plan includes defined roles, communication procedures, and the use of security information and event management (SIEM) tools for real-time monitoring."',
      analysis: 'Analysis: AcmeCorp expresses a generally high degree of confidence in their security posture, as robust and well-managed. This confident tone is reassuring, but they need to provide more actual metrics to back up the claims.'
    },
    {
      id: 'technical',
      label: 'Technical Depth',
      score: '9/10',
      subtitle: 'Deep technical, engineering-focused',
      insight: 'AcmeCorp demonstrates a strong technical focus, delving into specific technologies and processes. While this depth is valuable for technical audiences, it could be overwhelming for those with less technical expertise.',
      example: 'Example: "Yes Firewall configurations at AcmeCorp include rulesets that deny traffic by default, allowing only necessary ports and protocols. Regular audits ensure rule effectiveness."',
      analysis: 'Analysis: AcmeCorp demonstrates a strong technical focus, delving into specific technologies and processes. While this depth is valuable for technical audiences, it could be overwhelming for those with less technical expertise. They provide details on encryption algorithms, network segmentation, and security tools. In balance, they do not overuse technical jargon and are able to keep descriptive tone.'
    },
    {
      id: 'clarity',
      label: 'Clarity Score',
      score: '8/10',
      subtitle: 'Clear with good structure',
      insight: 'AcmeCorp\'s clarity is generally good, but the responses sometimes suffer from excessive detail and technical terms that obscure the main points. Although the main points are easily understood, the structure could be clearer for a broader audience. Simplifying technical descriptions and providing concrete examples could significantly improve clarity. They key is the sensitivity of the detail.',
      example: 'Example: "Yes AcmeCorp\'s data loss prevention (DLP) strategy includes endpoint monitoring, network scanning, and user training to prevent unauthorized data transfer."',
      analysis: 'Analysis: AcmeCorp\'s clarity is generally good, but the responses sometimes suffer from excessive detail and technical terms that obscure the main points. Although the main points are easily understood, the structure could be clearer for a broader audience. Simplifying technical descriptions and providing concrete examples could significantly improve clarity. They key is the sensitivity of the detail.'
    },
    {
      id: 'empathy',
      label: 'Empathy Level',
      score: '3/10',
      subtitle: 'Process-focused, less personal',
      insight: 'AcmeCorp\'s responses are primarily process-focused, lacking explicit empathy or consideration for the questioner\'s concerns. Unlike some companies that emphasize understanding and addressing client needs and concerns in security questionnaires, AcmeCorp focuses on describing processes and capabilities. While this technical approach is valid, demonstrating empathy by framing security measures in terms of customer protection and trust could enhance their perceived value. There is also very little in the way of quantifying or providing concrete numbers - everything is a black box.',
      example: 'Example: "Yes Security policies at AcmeCorp are documented in a secure repository, accessible only to authorized personnel through role-based access controls."',
      analysis: 'Analysis: AcmeCorp\'s responses lack explicit empathy, focusing primarily on processes and capabilities. Unlike some companies that emphasize understanding client concerns in security questionnaires, AcmeCorp takes a more purely technical approach. Demonstrating empathy by framing security measures in terms of customer protection and trust could enhance their perceived value. There is also very little in the way of quantifying or providing concrete numbers.'
    },
    {
      id: 'consistency',
      label: 'Style Consistency',
      score: '57%',
      subtitle: 'Moderate - Some variation',
      insight: 'AcmeCorp exhibits moderate style consistency. While there is a general tone of professionalism and technical depth, the level of detail and formality varies somewhat across responses. Some answers are concise and direct, while others are more verbose. Developing a consistent style guide could help ensure uniformity across all responses.',
      example: 'Example: Inconsistencies appear between responses like the concise "Yes Antivirus software at AcmeCorp is centrally managed..." versus more verbose responses.',
      analysis: 'Analysis: AcmeCorp exhibits moderate style consistency, with variations in detail level and formality across responses. Some answers are concise and direct, while others are more verbose. Developing a consistent style guide could help ensure uniformity.'
    }
  ];

  const radarData = [
    { subject: 'Formality', value: 7, industry: 8 },
    { subject: 'Confidence', value: 6, industry: 7 },
    { subject: 'Technical Depth', value: 4, industry: 6 },
    { subject: 'Clarity', value: 8, industry: 7 },
    { subject: 'Empathy', value: 5, industry: 8 }
  ];

  // Response DNA Analysis Data
  const openingPatternsData = [
    { name: 'Direct', value: 77.1, color: '#3B82F6' },
    { name: 'Contextual', value: 8.3, color: '#10B981' },
    { name: 'Affirmative', value: 0, color: '#A855F7' },
    { name: 'Other', value: 14.6, color: '#F59E0B' }
  ];

  const responseElementsData = [
    { name: 'Metrics', value: 0, color: '#EF4444' },
    { name: 'Technical', value: 24, color: '#EF4444' },
    { name: 'Compliance', value: 6, color: '#EF4444' },
    { name: 'Process', value: 14, color: '#EF4444' }
  ];

  const structureTypesData = [
    { name: 'None > Details', value: 75 },
    { name: 'Answer > Details', value: 10 },
    { name: 'Context > Technical', value: 5 }
  ];

  const trustBuildersData = [
    { name: 'Certifications', value: 35 },
    { name: 'Metrics', value: 5 },
    { name: 'Policies', value: 60 },
    { name: 'Encryption', value: 25 },
    { name: 'Links', value: 42 }
  ];

  const openingPatternExamples = [
    {
      name: 'Direct',
      value: 77.5,
      description: 'Starts with Yes/No/We',
      question: 'Q: Does your organization have a formal incident response plan?',
      answer: 'A: Yes, AcmeCorp has a comprehensive incident response plan that includes defined roles, communication procedures, and the use of security information and event management (SIEM) tools for real-time monitoring.'
    },
    {
      name: 'Contextual',
      value: 8.3,
      description: 'Provides context first',
      question: 'Q: How does your organization handle data encryption?',
      answer: 'A: At AcmeCorp, we recognize data encryption as a critical component of our security strategy. We implement AES-256 encryption for data at rest and TLS 1.3 for data in transit across all systems.'
    },
    {
      name: 'Affirmative',
      value: 0,
      description: 'Affirms with certainty',
      question: 'Q: Can you describe your access control mechanisms?',
      answer: 'A: Absolutely. AcmeCorp employs role-based access controls (RBAC) with multi-factor authentication (MFA) for all privileged accounts, ensuring that only authorized personnel can access sensitive systems.'
    },
    {
      name: 'Other',
      value: 14.6,
      description: 'Various other patterns',
      question: 'Q: What is your approach to vulnerability management?',
      answer: 'A: Our vulnerability management program includes regular scanning, prioritization based on risk, and a 30-day SLA for critical vulnerabilities.'
    }
  ];

  const responseElementExamples = [
    {
      name: 'Process',
      question: 'Q: What is the process for handling security incidents?',
      answer: 'A: Our incident response process includes immediate detection and triage, containment of the threat, eradication of the root cause, recovery of affected systems, and post-incident analysis. We follow a documented playbook with defined roles and escalation procedures.'
    },
    {
      name: 'Compliance',
      question: 'Q: Is your organization SOC 2 certified?',
      answer: 'A: Yes, AcmeCorp maintains SOC 2 Type 2 certification, which is independently audited annually. Our certification covers security, availability, and confidentiality trust service criteria, demonstrating our commitment to protecting customer data.'
    },
    {
      name: 'Technical',
      question: 'Q: What encryption methods do you use?',
      answer: 'A: We implement AES-256 encryption for data at rest and TLS 1.3 for data in transit. All encryption keys are managed through a Hardware Security Module (HSM) with automatic rotation every 90 days. Additionally, we use RSA-4096 for asymmetric encryption where applicable.'
    },
    {
      name: 'Metrics',
      question: 'Q: What is your data retention period?',
      answer: 'A: Our standard data retention period is 30 days for operational logs, 90 days for security event logs, and 7 years for compliance-related records. Customer data is retained according to contractual agreements, with secure deletion processes executed within 30 days of termination.'
    }
  ];

  const characteristics = [
    {
      id: 'communication',
      icon: '🎭',
      title: 'Communication Personality',
      borderColor: 'border-l-[#015CE6]',
      insight: "AcmeCorp's responses are generally thorough and informative, demonstrating a strong understanding of security topics. They consistently provide detailed explanations and context around their answers, reflecting a proactive approach to security. However, the responses sometimes veer into excessive technical jargon, potentially alienating readers who prefer more descriptive information. The style of response is appropriate, but has been more descriptive in the answer section. While generally professional, a slightly more concise approach could improve readability. The communication rarely deflects, providing direct answers and backing them up with detailed descriptions of how things work.",
      example: "This personality is evident in responses like: \"Yes Antivirus software at AcmeCorp is centrally managed, with regular signature updates and heuristic analysis to detect and prevent a broad range of malware...\"",
      action: "⚡ Codify this unique voice in style guides and training materials to maintain consistency across all team members"
    },
    {
      id: 'opening',
      icon: '🎯',
      title: 'Opening Strategy',
      borderColor: 'border-l-[#3380ED]',
      insight: "Primary pattern: Direct (78%)",
      example: "Typical opening: \"Yes Antivirus software at AcmeCorp is centrally managed, with regular signature updates and heuristic analysis to detect and prevent a broad range of malware...\"",
      action: "⚡ Train new team members on the Direct pattern as it represents 78% of responses"
    },
    {
      id: 'trust',
      icon: '🛡️',
      title: 'Trust Building Arsenal',
      borderColor: 'border-l-[#80B6F7]',
      insight: "Primary tools: Compliance certifications, metrics, and detailed processes",
      example: "Yes AcmeCorp undergoes regular audits, including SOC 2 Type 2 assessments, conducted by certified auditors. These assessments evaluate controls such as access management, data encryption, and incident response...",
      action: "⚡ Continue leading with compliance while diversifying with metrics for comprehensive trust"
    },
    {
      id: 'balance',
      icon: '⚖️',
      title: 'Technical/Business Balance',
      borderColor: 'border-l-[#B3DAFE]',
      insight: "Ratio: Technical 90% | Deep technical, engineering-focused",
      example: "Yes Firewall configurations at AcmeCorp include rulesets that deny traffic by default, allowing only necessary ports and protocols. Regular audits ensure rule effectiveness...",
      action: "⚡ Simplify technical content for optimal engagement"
    },
    {
      id: 'signature',
      icon: '✨',
      title: 'Signature Elements',
      borderColor: 'border-l-[#1A6EEA]',
      insight: "Distinctive phrases: \"AcmeCorps\", \"at AcmeCorp\"",
      example: "Uses AcmeCorp's ongoing security awareness programs use gamification, newsletters, and periodic assessments to reinforce key security principles...",
      action: "⚡ Document these signature elements in brand voice guidelines"
    },
    {
      id: 'template',
      icon: '🧬',
      title: 'Response DNA Template',
      borderColor: 'border-l-[#4C92F1]',
      insight: "\"Yes, [Subject] at AcmeCorp includes [detailed technical explanation].\"",
      example: "Applied in practice: \"Yes Antivirus software at AcmeCorp is centrally managed, with regular signature updates and heuristic analysis to detect and prevent a broad range of malware...\"",
      action: "⚡ Create response templates for each category that follow this proven formula"
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-8 mb-6">
      <h2 className="text-xl mb-6 text-center font-semibold">Agile's Response DNA Decoded</h2>

      <div className="mb-8">
        <h3 className="text-lg mb-3 text-center font-semibold">Communication Personality</h3>
        <p className="text-gray-700 leading-relaxed text-justify">
          <span className="font-semibold">Insight:</span> Agile's communication style in these security questionnaire responses is generally professional but varies in depth and directness. 
          While many responses offer clear, concise answers, a significant portion tends to be somewhat vague or deflective, particularly when it comes to sharing specific 
          internal documentation or revealing policies or their implementation details. The responses are mature in tone, avoiding overly casual language but offering a 'bridge letter' 
          instead, which can appear evasive.
        </p>
      </div>

      <div className="mb-8">
        <div className="mb-4 text-center">
          <h3 className="text-lg mb-1 font-semibold">Key Characteristics</h3>
          <p className="text-sm text-gray-600">Detailed analysis of your response patterns</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {characteristics.map((char) => (
            <button
              key={char.id}
              onClick={() => setSelectedCharacteristic(char.id)}
              className={`bg-white/40 backdrop-blur-md rounded-lg border-l-4 ${char.borderColor} border border-gray-300 p-5 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer text-left`}
            >
              <h4 className="font-semibold">{char.title}</h4>
            </button>
          ))}
        </div>
      </div>

      {/* Characteristic Detail Modal */}
      <Dialog open={selectedCharacteristic !== null} onOpenChange={() => setSelectedCharacteristic(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-2xl">{characteristics.find(c => c.id === selectedCharacteristic)?.icon}</span>
              <span>{characteristics.find(c => c.id === selectedCharacteristic)?.title}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="font-semibold mb-2">Insight:</h4>
              <p className="text-gray-700 text-sm">{characteristics.find(c => c.id === selectedCharacteristic)?.insight}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="text-gray-700 text-sm italic">{characteristics.find(c => c.id === selectedCharacteristic)?.example}</p>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <p className="text-gray-700 text-sm">{characteristics.find(c => c.id === selectedCharacteristic)?.action}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="mb-8">
        <h3 className="text-lg mb-4">Voice Profile:</h3>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
          {/* Left Column - First 3 metrics */}
          <div className="space-y-4 flex flex-col">
            {voiceProfileDetails.slice(0, 3).map((metric, index) => (
              <button
                key={index} 
                onClick={() => setSelectedVoiceProfile(metric.id)}
                className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer flex-1 text-left"
              >
                <div className="text-xs text-gray-600 mb-1">{metric.label}</div>
                <div className="text-2xl mb-1">{metric.score}</div>
                <div className="text-xs text-gray-600">{metric.subtitle}</div>
              </button>
            ))}
          </div>

          {/* Middle - Communication Style Fingerprint */}
          <div className="bg-white rounded-xl p-6 w-[400px] flex flex-col border border-gray-200 shadow-sm">
            <div className="text-center mb-2">
              <h4 className="text-black">Communication Style Fingerprint</h4>
              <p className="text-gray-600 text-xs">Your unique communication profile</p>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#D1D5DB" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#374151', fontSize: 12 }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 10]} 
                    tick={{ fill: '#6B7280', fontSize: 10 }}
                  />
                  <Radar 
                    name="Communication Style" 
                    dataKey="value" 
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.6} 
                  />
                  <Radar 
                    name="Industry Average" 
                    dataKey="industry" 
                    stroke="#EF4444" 
                    fill="#EF4444" 
                    fillOpacity={0.3}
                    strokeDasharray="5 5"
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="line"
                    formatter={(value) => (
                      <span style={{ color: value === "Communication Style" ? '#3B82F6' : '#EF4444', fontSize: '12px' }}>
                        {value}
                      </span>
                    )}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Column - Last 3 metrics */}
          <div className="space-y-4 flex flex-col">
            {voiceProfileDetails.slice(3, 6).map((metric, index) => (
              <button
                key={index} 
                onClick={() => setSelectedVoiceProfile(metric.id)}
                className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer flex-1 text-left"
              >
                <div className="text-xs text-gray-600 mb-1">{metric.label}</div>
                <div className="text-2xl mb-1">{metric.score}</div>
                <div className="text-xs text-gray-600">{metric.subtitle}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Voice Profile Detail Modal */}
      <Dialog open={selectedVoiceProfile !== null} onOpenChange={() => setSelectedVoiceProfile(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-lg">{voiceProfileDetails.find(v => v.id === selectedVoiceProfile)?.label}: {voiceProfileDetails.find(v => v.id === selectedVoiceProfile)?.score}</span>
              <span className="text-sm text-gray-600">- {voiceProfileDetails.find(v => v.id === selectedVoiceProfile)?.subtitle}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 rounded border-l-4 border-blue-500 bg-gray-50">
              <p className="text-gray-700 text-sm">{voiceProfileDetails.find(v => v.id === selectedVoiceProfile)?.insight}</p>
            </div>
            
            <div className="p-4 rounded border-l-4 border-green-500 bg-gray-50">
              <p className="text-gray-700 text-sm">{voiceProfileDetails.find(v => v.id === selectedVoiceProfile)?.example}</p>
            </div>
            
            <div className="p-4 rounded border-l-4 border-purple-500 bg-gray-50">
              <p className="text-gray-700 text-sm">{voiceProfileDetails.find(v => v.id === selectedVoiceProfile)?.analysis}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div>
        <h3 className="text-lg mb-3">Areas for Improvement:</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Decrease evasiveness by providing more details in responses, avoiding vague statements.</li>
          <li>Reduce evasiveness by directly answering questions and minimizing the use of 'bridge letter' as a substitute for documentation.</li>
          <li>Enhance empathy by demonstrating a better understanding of client concerns.</li>
        </ol>
      </div>
    </div>
  );
}

export function ResponseDNAAnalysis() {
  const [openingPatternsModalOpen, setOpeningPatternsModalOpen] = useState(false);
  const [responseElementsModalOpen, setResponseElementsModalOpen] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  // Response DNA Analysis Data
  const openingPatternsData = [
    { name: 'Direct', value: 77.1, color: '#3B82F6' },
    { name: 'Contextual', value: 8.3, color: '#10B981' },
    { name: 'Affirmative', value: 0, color: '#A855F7' },
    { name: 'Other', value: 14.6, color: '#F59E0B' }
  ];

  const responseElementsData = [
    { name: 'Metrics', value: 0, color: '#EF4444' },
    { name: 'Technical', value: 24, color: '#EF4444' },
    { name: 'Compliance', value: 6, color: '#EF4444' },
    { name: 'Process', value: 14, color: '#EF4444' }
  ];

  const structureTypesData = [
    { name: 'None > Details', value: 75 },
    { name: 'Answer > Details', value: 10 },
    { name: 'Context > Technical', value: 5 }
  ];

  const trustBuildersData = [
    { name: 'Certifications', value: 35 },
    { name: 'Metrics', value: 5 },
    { name: 'Policies', value: 60 },
    { name: 'Encryption', value: 25 },
    { name: 'Links', value: 42 }
  ];

  const openingPatternExamples = [
    {
      name: 'Direct',
      value: 77.5,
      description: 'Starts with Yes/No/We',
      question: 'Q: Does your organization have a formal incident response plan?',
      answer: 'A: Yes, AcmeCorp has a comprehensive incident response plan that includes defined roles, communication procedures, and the use of security information and event management (SIEM) tools for real-time monitoring.'
    },
    {
      name: 'Contextual',
      value: 8.3,
      description: 'Provides context first',
      question: 'Q: How does your organization handle data encryption?',
      answer: 'A: At AcmeCorp, we recognize data encryption as a critical component of our security strategy. We implement AES-256 encryption for data at rest and TLS 1.3 for data in transit across all systems.'
    },
    {
      name: 'Affirmative',
      value: 0,
      description: 'Affirms with certainty',
      question: 'Q: Can you describe your access control mechanisms?',
      answer: 'A: Absolutely. AcmeCorp employs role-based access controls (RBAC) with multi-factor authentication (MFA) for all privileged accounts, ensuring that only authorized personnel can access sensitive systems.'
    },
    {
      name: 'Other',
      value: 14.6,
      description: 'Various other patterns',
      question: 'Q: What is your approach to vulnerability management?',
      answer: 'A: Our vulnerability management program includes regular scanning, prioritization based on risk, and a 30-day SLA for critical vulnerabilities.'
    }
  ];

  const responseElementExamples = [
    {
      name: 'Process',
      question: 'Q: What is the process for handling security incidents?',
      answer: 'A: Our incident response process includes immediate detection and triage, containment of the threat, eradication of the root cause, recovery of affected systems, and post-incident analysis. We follow a documented playbook with defined roles and escalation procedures.'
    },
    {
      name: 'Compliance',
      question: 'Q: Is your organization SOC 2 certified?',
      answer: 'A: Yes, AcmeCorp maintains SOC 2 Type 2 certification, which is independently audited annually. Our certification covers security, availability, and confidentiality trust service criteria, demonstrating our commitment to protecting customer data.'
    },
    {
      name: 'Technical',
      question: 'Q: What encryption methods do you use?',
      answer: 'A: We implement AES-256 encryption for data at rest and TLS 1.3 for data in transit. All encryption keys are managed through a Hardware Security Module (HSM) with automatic rotation every 90 days. Additionally, we use RSA-4096 for asymmetric encryption where applicable.'
    },
    {
      name: 'Metrics',
      question: 'Q: What is your data retention period?',
      answer: 'A: Our standard data retention period is 30 days for operational logs, 90 days for security event logs, and 7 years for compliance-related records. Customer data is retained according to contractual agreements, with secure deletion processes executed within 30 days of termination.'
    }
  ];

  const [selectedCharacteristic, setSelectedCharacteristic] = useState<string | null>(null);

  const characteristics = [
    {
      id: 'communication',
      icon: '🎭',
      title: 'Communication Personality',
      borderColor: 'border-l-[#015CE6]',
      insight: "AcmeCorp's responses are generally thorough and informative, demonstrating a strong understanding of security topics. They consistently provide detailed explanations and context around their answers, reflecting a proactive approach to security. However, the responses sometimes veer into excessive technical jargon, potentially alienating readers who prefer more descriptive information. The style of response is appropriate, but has been more descriptive in the answer section. While generally professional, a slightly more concise approach could improve readability. The communication rarely deflects, providing direct answers and backing them up with detailed descriptions of how things work.",
      example: "This personality is evident in responses like: \"Yes Antivirus software at AcmeCorp is centrally managed, with regular signature updates and heuristic analysis to detect and prevent a broad range of malware...\"",
      action: "⚡ Codify this unique voice in style guides and training materials to maintain consistency across all team members"
    },
    {
      id: 'opening',
      icon: '🎯',
      title: 'Opening Strategy',
      borderColor: 'border-l-[#3380ED]',
      insight: "Primary pattern: Direct (78%)",
      example: "Typical opening: \"Yes Antivirus software at AcmeCorp is centrally managed, with regular signature updates and heuristic analysis to detect and prevent a broad range of malware...\"",
      action: "⚡ Train new team members on the Direct pattern as it represents 78% of responses"
    },
    {
      id: 'trust',
      icon: '🛡️',
      title: 'Trust Building Arsenal',
      borderColor: 'border-l-[#80B6F7]',
      insight: "Primary tools: Compliance certifications, metrics, and detailed processes",
      example: "Yes AcmeCorp undergoes regular audits, including SOC 2 Type 2 assessments, conducted by certified auditors. These assessments evaluate controls such as access management, data encryption, and incident response...",
      action: "⚡ Continue leading with compliance while diversifying with metrics for comprehensive trust"
    },
    {
      id: 'balance',
      icon: '⚖️',
      title: 'Technical/Business Balance',
      borderColor: 'border-l-[#B3DAFE]',
      insight: "Ratio: Technical 90% | Deep technical, engineering-focused",
      example: "Yes Firewall configurations at AcmeCorp include rulesets that deny traffic by default, allowing only necessary ports and protocols. Regular audits ensure rule effectiveness...",
      action: "⚡ Simplify technical content for optimal engagement"
    },
    {
      id: 'signature',
      icon: '✨',
      title: 'Signature Elements',
      borderColor: 'border-l-[#1A6EEA]',
      insight: "Distinctive phrases: \"AcmeCorps\", \"at AcmeCorp\"",
      example: "Uses AcmeCorp's ongoing security awareness programs use gamification, newsletters, and periodic assessments to reinforce key security principles...",
      action: "⚡ Document these signature elements in brand voice guidelines"
    },
    {
      id: 'template',
      icon: '🧬',
      title: 'Response DNA Template',
      borderColor: 'border-l-[#4C92F1]',
      insight: "\"Yes, [Subject] at AcmeCorp includes [detailed technical explanation].\"",
      example: "Applied in practice: \"Yes Antivirus software at AcmeCorp is centrally managed, with regular signature updates and heuristic analysis to detect and prevent a broad range of malware...\"",
      action: "⚡ Create response templates for each category that follow this proven formula"
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-6 mb-6">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-semibold text-black mb-1">Response DNA Analysis</h2>
        <p className="text-gray-600 font-semibold">Pattern breakdown across responses</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Opening Patterns */}
        <div 
          onClick={() => setOpeningPatternsModalOpen(true)}
          className="bg-gray-50 rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-all"
        >
          <div className="p-4">
            <div className="mb-3">
              <h3 className="text-black mb-1 font-semibold text-center">Opening Patterns</h3>
              <p className="text-gray-600 text-sm text-center">How responses typically begin</p>
            </div>
            
            <div className="flex items-center justify-center mb-2">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={openingPatternsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {openingPatternsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {openingPatternsData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-700">{item.name} {item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Response Elements */}
        <div 
          onClick={() => setResponseElementsModalOpen(true)}
          className="bg-gray-50 rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-all"
        >
          <div className="p-4">
            <div className="mb-3">
              <h3 className="text-black mb-1 font-semibold text-center">Response Elements</h3>
              <p className="text-gray-600 text-sm text-center">Key components in responses</p>
            </div>
            
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={responseElementsData}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#374151', fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fill: '#374151', fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                  labelStyle={{ color: '#000000' }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#EF4444" 
                  radius={[4, 4, 0, 0]}
                  label={{
                    position: 'center',
                    fill: 'white',
                    fontSize: 14,
                    fontWeight: 'bold',
                    formatter: (value: number) => value > 0 ? `${value}%` : ''
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Structure Types */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-black mb-1 font-semibold text-center">Structure Types</h3>
          <p className="text-gray-600 text-sm mb-3 text-center">Response organization patterns</p>
          
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={structureTypesData}>
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#374151', fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fill: '#374151', fontSize: 10 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                labelStyle={{ color: '#000000' }}
              />
              <Bar dataKey="value" fill="#4C92F1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Trust Builders */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-black mb-1 font-semibold text-center">Trust Builders</h3>
          <p className="text-gray-600 text-sm mb-3 text-center">Evidence types used</p>
          
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={trustBuildersData}>
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#374151', fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fill: '#374151', fontSize: 10 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                labelStyle={{ color: '#000000' }}
              />
              <Bar dataKey="value" fill="#66A4F4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Opening Patterns Modal */}
      <Dialog open={openingPatternsModalOpen} onOpenChange={setOpeningPatternsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Opening Patterns - Example Q&A Pairs</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {openingPatternExamples.map((pattern, index) => (
              <div 
                key={index} 
                className="p-4 rounded-lg border-l-4 bg-gray-50"
                style={{ borderLeftColor: openingPatternsData.find(p => p.name === pattern.name)?.color }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold">{pattern.name} ({pattern.value}%)</h5>
                  <span className="text-sm text-gray-600">{pattern.description}</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{pattern.question}</p>
                <p className="text-sm text-gray-900 italic">{pattern.answer}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Response Elements Modal */}
      <Dialog open={responseElementsModalOpen} onOpenChange={setResponseElementsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Response Elements - Example Q&A Pairs</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {responseElementExamples.map((element, index) => (
              <div 
                key={index} 
                className="p-4 rounded-lg border-l-4 border-red-500 bg-gray-50"
              >
                <div className="mb-3">
                  <h5 className="font-semibold text-lg">{element.name}</h5>
                </div>
                <div className="bg-white p-3 rounded mb-2">
                  <p className="text-sm text-gray-700 font-semibold">{element.question}</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="text-sm text-gray-900 italic">{element.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}