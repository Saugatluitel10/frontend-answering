import { useState, useRef } from 'react';
import { FileText, Shield, Target, AlertTriangle, TrendingUp, BarChart3, Share, Download, Activity, CheckCircle2, XCircle, AlertCircle, Calendar, ChevronRight, Sparkles, Zap } from 'lucide-react';
import { CompanySelector } from './CompanySelector';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function ExecutiveDashboard() {
  const [reportGenerated, setReportGenerated] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [maturityLevel, setMaturityLevel] = useState(3);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleGenerateReport = () => {
    setReportGenerated(true);
  };

  const handleExportPDF = async () => {
    if (!reportRef.current) return;

    try {
      // Capture the element as canvas with high quality
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc) => {
          // Find all style tags and replace oklch with hex colors
          const styleTags = clonedDoc.querySelectorAll('style');
          styleTags.forEach((styleTag) => {
            if (styleTag.textContent) {
              // Replace all oklch() color functions with hex equivalents
              let newContent = styleTag.textContent;
              
              // Replace specific oklch colors with hex equivalents
              newContent = newContent.replace(/oklch\(0\.145 0 0\)/g, '#222222');
              newContent = newContent.replace(/oklch\(0\.985 0 0\)/g, '#fafafa');
              newContent = newContent.replace(/oklch\(1 0 0\)/g, '#ffffff');
              newContent = newContent.replace(/oklch\(0\.708 0 0\)/g, '#b4b4b4');
              newContent = newContent.replace(/oklch\(0\.95 0\.0058 264\.53\)/g, '#f3f3f5');
              newContent = newContent.replace(/oklch\(0\.205 0 0\)/g, '#333333');
              newContent = newContent.replace(/oklch\(0\.922 0 0\)/g, '#ebebeb');
              newContent = newContent.replace(/oklch\(0\.97 0 0\)/g, '#f5f5f5');
              newContent = newContent.replace(/oklch\(0\.269 0 0\)/g, '#444444');
              newContent = newContent.replace(/oklch\(0\.439 0 0\)/g, '#707070');
              newContent = newContent.replace(/oklch\(0\.646 0\.222 41\.116\)/g, '#ff8c42');
              newContent = newContent.replace(/oklch\(0\.6 0\.118 184\.704\)/g, '#4fb3d4');
              newContent = newContent.replace(/oklch\(0\.398 0\.07 227\.392\)/g, '#2e4a62');
              newContent = newContent.replace(/oklch\(0\.828 0\.189 84\.429\)/g, '#f4e76e');
              newContent = newContent.replace(/oklch\(0\.769 0\.188 70\.08\)/g, '#f0c929');
              newContent = newContent.replace(/oklch\(0\.488 0\.243 264\.376\)/g, '#6366f1');
              newContent = newContent.replace(/oklch\(0\.696 0\.17 162\.48\)/g, '#22d3ee');
              newContent = newContent.replace(/oklch\(0\.627 0\.265 303\.9\)/g, '#c084fc');
              newContent = newContent.replace(/oklch\(0\.645 0\.246 16\.439\)/g, '#f87171');
              newContent = newContent.replace(/oklch\(0\.396 0\.141 25\.723\)/g, '#8b2e46');
              newContent = newContent.replace(/oklch\(0\.637 0\.237 25\.331\)/g, '#e88a99');
              
              styleTag.textContent = newContent;
            }
          });
          
          // Also check link tags for stylesheets and disable them if needed
          const linkTags = clonedDoc.querySelectorAll('link[rel="stylesheet"]');
          linkTags.forEach((link) => {
            // We can't modify external stylesheets, so we'll override with inline styles
            if (link instanceof HTMLLinkElement) {
              link.disabled = true;
            }
          });
          
          // Add a style tag with safe color overrides
          const safeStyle = clonedDoc.createElement('style');
          safeStyle.textContent = `
            * {
              color: inherit;
            }
            :root {
              --foreground: #222222;
              --card-foreground: #222222;
              --popover: #ffffff;
              --popover-foreground: #222222;
              --primary-foreground: #ffffff;
              --secondary: #f3f3f5;
              --ring: #b4b4b4;
              --chart-1: #ff8c42;
              --chart-2: #4fb3d4;
              --chart-3: #2e4a62;
              --chart-4: #f4e76e;
              --chart-5: #f0c929;
              --sidebar: #fafafa;
              --sidebar-foreground: #222222;
              --sidebar-primary-foreground: #fafafa;
              --sidebar-accent: #f5f5f5;
              --sidebar-accent-foreground: #333333;
              --sidebar-border: #ebebeb;
              --sidebar-ring: #b4b4b4;
            }
          `;
          clonedDoc.head.appendChild(safeStyle);
        }
      });

      // Calculate PDF dimensions
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;

      // Add first page
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        position,
        imgWidth,
        imgHeight,
        undefined,
        'FAST'
      );
      
      heightLeft -= pageHeight;

      // Add additional pages if content is longer than one page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(
          canvas.toDataURL('image/png'),
          'PNG',
          0,
          position,
          imgWidth,
          imgHeight,
          undefined,
          'FAST'
        );
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save('executive-security-dashboard.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  // Evidence Density Chart Data
  const evidenceData = [
    { category: 'Security & Compliance', value: 87 },
    { category: 'Access Control', value: 92 },
    { category: 'Device Policy', value: 78 },
    { category: 'Data Protection', value: 85 },
    { category: 'Infrastructure', value: 73 },
    { category: 'Incident Response', value: 81 },
  ];

  // Content Freshness Chart Data
  const freshnessData = [
    { month: 'Jan', value: 72 },
    { month: 'Feb', value: 75 },
    { month: 'Mar', value: 78 },
    { month: 'Apr', value: 82 },
    { month: 'May', value: 85 },
    { month: 'Jun', value: 88 },
  ];

  const getBarColor = (value: number) => {
    if (value >= 85) return '#10b981';
    if (value >= 75) return '#3380ED';
    return '#f59e0b';
  };

  // Maturity Levels Data
  const maturityLevels = [
    {
      level: 0,
      name: 'Initial - Ad-hoc',
      description: 'Security responses are reactive and inconsistent',
      recommendations: [
        'Establish a centralized security response repository with version control',
        'Create standardized response templates for common security questions',
        'Implement a basic approval workflow for security responses before they go out to customers'
      ]
    },
    {
      level: 1,
      name: 'Repeatable - Basic processes',
      description: 'Basic security documentation exists but lacks consistency',
      recommendations: [
        'Document core security policies (Data Protection, Access Control, Incident Response)',
        'Assign dedicated security response owners for each major category',
        'Create a quarterly review process to update outdated security responses'
      ]
    },
    {
      level: 2,
      name: 'Defined - Documented processes',
      description: 'Security processes are documented and followed',
      recommendations: [
        'Implement formal security awareness training for all response contributors',
        'Establish metrics tracking for response accuracy and customer satisfaction',
        'Begin pursuing foundational compliance certifications (SOC 2 Type I, ISO 27001)'
      ]
    },
    {
      level: 3,
      name: 'Managed - Proactive management',
      description: 'Security processes are measured and controlled',
      recommendations: [
        'Implement continuous security monitoring with real-time threat intelligence integration',
        'Deploy automated response quality scoring with AI-powered recommendations',
        'Establish a Security Champions program across all departments to maintain response excellence',
        'Integrate threat intelligence feeds into security monitoring and incident response processes to proactively identify and mitigate emerging threats before they impact the organization'
      ]
    },
    {
      level: 4,
      name: 'Optimizing - Continuous improvement',
      description: 'Security processes are continuously optimized',
      recommendations: [
        'Implement predictive analytics to anticipate customer security concerns before they arise',
        'Deploy machine learning models to auto-generate context-aware security responses',
        'Establish competitive intelligence program to benchmark responses against industry leaders',
        'Create a security response innovation lab to test emerging best practices'
      ]
    },
    {
      level: 5,
      name: 'Industry Leading - Best in class',
      description: 'Security practices set industry standards',
      recommendations: [
        'Publish security best practices and frameworks for industry adoption',
        'Lead industry working groups and contribute to security standards development',
        'Develop proprietary security methodologies that become competitive differentiators',
        'Achieve industry-leading 95%+ response consistency with zero critical gaps'
      ]
    }
  ];

  const currentMaturityInfo = maturityLevels[maturityLevel];

  // Gauge component
  const GaugeChart = ({ value, label, color }: { value: number; label: string; color: string }) => {
    const angle = (value / 100) * 180;
    const needleRotation = angle - 90;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-48 h-24">
          {/* Background Arc */}
          <svg viewBox="0 0 200 100" className="w-full h-full">
            {/* Gray background arc */}
            <path
              d="M 20 90 A 80 80 0 0 1 180 90"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="20"
              strokeLinecap="round"
            />
            {/* Colored arc */}
            <path
              d="M 20 90 A 80 80 0 0 1 180 90"
              fill="none"
              stroke={color}
              strokeWidth="20"
              strokeLinecap="round"
              strokeDasharray={`${(value / 100) * 251.2} 251.2`}
            />
            {/* Needle */}
            <line
              x1="100"
              y1="90"
              x2="100"
              y2="30"
              stroke="#1f2937"
              strokeWidth="3"
              strokeLinecap="round"
              transform={`rotate(${needleRotation} 100 90)`}
            />
            {/* Center dot */}
            <circle cx="100" cy="90" r="6" fill="#1f2937" />
          </svg>
        </div>
        <div className="text-center mt-2">
          <div className="text-3xl mb-1" style={{ color }}>{value}%</div>
          <div className="text-sm text-gray-600">{label}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section - Center Aligned */}
      <div className="mb-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <h1 className="text-2xl">Executive Intelligence Dashboard</h1>
        </div>
        <p className="text-gray-600 text-sm">
          Strategic insights and performance analytics
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

      {/* Generate Report Button */}
      <div className="mb-8">
        <button
          onClick={handleGenerateReport}
          className="w-full bg-gray-900 hover:bg-black text-white px-6 py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
        >
          <FileText className="w-5 h-5" />
          <span>Generate Executive Report</span>
        </button>
      </div>

      {/* Content Area */}
      {!reportGenerated ? (
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-16 shadow-sm">
          <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
            {/* Chart Icon */}
            <div className="mb-6">
              <BarChart3 className="w-16 h-16 text-blue-600" strokeWidth={1.5} />
            </div>

            {/* Message */}
            <h2 className="text-2xl text-gray-900 mb-3">
              Executive Report Not Generated
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Click the "Generate Executive Report" button above to analyze your
              organization's security posture and receive strategic insights.
            </p>
          </div>
        </div>
      ) : (
        <div ref={reportRef} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Header with Share and Export */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl text-gray-900">Executive Security Response Dashboard</h2>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                <Share className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button 
                onClick={handleExportPDF}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>

          {/* Top Section - Gauges and Key Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Response Readiness Gauge */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-gray-900" />
                <h3 className="text-gray-900">Response Readiness</h3>
              </div>
              <GaugeChart value={87} label="Ready to Deploy" color="#015CE6" />
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Complete Responses</span>
                  <span className="text-gray-900">142/163</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Coverage</span>
                  <span className="text-gray-900">87%</span>
                </div>
              </div>
            </div>

            {/* Style Consistency Gauge */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-gray-900" />
                <h3 className="text-gray-900">Style Consistency</h3>
              </div>
              <GaugeChart value={92} label="Highly Consistent" color="#10b981" />
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Aligned Responses</span>
                  <span className="text-gray-900">150/163</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Consistency Score</span>
                  <span className="text-gray-900">92%</span>
                </div>
              </div>
            </div>

            {/* Category Coverage */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-gray-900" />
                <h3 className="text-gray-900">Category Coverage</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Security & Compliance</span>
                    <span className="text-sm text-gray-900">94%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '94%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Access Control</span>
                    <span className="text-sm text-gray-900">89%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full" style={{ width: '89%', backgroundColor: '#3380ED' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Device Policy</span>
                    <span className="text-sm text-gray-900">81%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full" style={{ width: '81%', backgroundColor: '#3380ED' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Data Protection</span>
                    <span className="text-sm text-gray-900">76%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500" style={{ width: '76%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Response Quality Indicators */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="w-5 h-5 text-gray-900" />
              <h3 className="text-gray-900">Response Quality Indicators</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl text-green-600 mb-1">127</div>
                <div className="text-sm text-gray-600">Excellent</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-center mb-2">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl text-blue-600 mb-1">23</div>
                <div className="text-sm text-gray-600">Good</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center justify-center mb-2">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-2xl text-orange-600 mb-1">9</div>
                <div className="text-sm text-gray-600">Needs Improvement</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center justify-center mb-2">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-2xl text-red-600 mb-1">4</div>
                <div className="text-sm text-gray-600">Critical Gaps</div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Evidence Density */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="w-5 h-5 text-gray-900" />
                <h3 className="text-gray-900">Evidence Density by Category</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={evidenceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="category" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {evidenceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Content Freshness */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-gray-900" />
                <h3 className="text-gray-900">Content Freshness Trend</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={freshnessData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#015CE6" 
                    strokeWidth={3}
                    dot={{ fill: '#015CE6', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">6-Month Trend</span>
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +22% Improvement
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Strategic Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Competitive Strengths */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cyan-50 rounded-lg">
                  <Shield className="w-5 h-5 text-cyan-600" />
                </div>
                <h3 className="text-gray-900">Competitive Strengths</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-900 mb-1">Strong Security Framework</div>
                    <div className="text-xs text-gray-600">Comprehensive SOC 2 Type II compliance with robust controls</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-900 mb-1">Advanced Encryption</div>
                    <div className="text-xs text-gray-600">Industry-leading AES-256 encryption at rest and in transit</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-900 mb-1">Transparent Documentation</div>
                    <div className="text-xs text-gray-600">Clear, detailed responses with evidence and references</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Positioning */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-gray-900">Market Positioning</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Response Time</span>
                    <span className="text-sm text-green-600">Top 15%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Coverage Depth</span>
                    <span className="text-sm text-blue-600">Top 20%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full" style={{ width: '80%', backgroundColor: '#3380ED' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Evidence Quality</span>
                    <span className="text-sm text-green-600">Top 10%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Analysis */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-gray-900">Risk Analysis</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-900 mb-1">Data Retention Gaps</div>
                    <div className="text-xs text-gray-600">4 responses lack specific retention period details</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-900 mb-1">Incident Response Updates</div>
                    <div className="text-xs text-gray-600">9 responses need refresh with current procedures</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-900 mb-1">Third-Party Vetting</div>
                    <div className="text-xs text-gray-600">Vendor assessment process could be more detailed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Opportunities */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-gray-900">Strategic Opportunities</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors cursor-pointer">
                  <ChevronRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-900 mb-1">AI-Enhanced Responses</div>
                    <div className="text-xs text-gray-600">Leverage ML to auto-generate context-aware answers</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors cursor-pointer">
                  <ChevronRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-900 mb-1">Certification Showcase</div>
                    <div className="text-xs text-gray-600">Create dedicated section highlighting compliance achievements</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors cursor-pointer">
                  <ChevronRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-900 mb-1">Competitive Analysis</div>
                    <div className="text-xs text-gray-600">Benchmark responses against industry leaders</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Maturity Analysis */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-gray-900" />
                <h3 className="text-gray-900">Security Maturity Analysis</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Current Maturity Level */}
                <div className="lg:col-span-2">
                  <div className="mb-3">
                    <span className="text-sm text-gray-900">Current Maturity Level: </span>
                    <span className="text-sm" style={{ color: '#015CE6' }}>Defined - Documented security processes, pursuing certifications</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed italic">
                    The assessment of 'Defined - Documented security processes, pursuing certifications' is supported by the following evidence: 1) 
                    Established processes they maintain policies, and PRIVacy, and standards, including Incident Response Policy and Data 
                    Retention Policy as indicated in their responses; 2) They actively pursue and maintain certifications like SOC 2, ISO 27001, and ISO 27701, as evidenced by 
                    their references to these audits in their responses; 3) They have a dedicated Security Governance, Risk, Compliance, and PRIVacy (GRC) 
                    team responsible for overseeing compliance; 4) They offer enterprise clients audit logs, indicating a defined process for security 
                    and accountability. These activities move the company beyond basic ad-hoc security to a more planned approach.
                  </p>
                </div>

                {/* Explore Maturity Levels */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-900">Explore Maturity Levels</span>
                    <span className="text-sm" style={{ color: '#015CE6' }}>{maturityLevel}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-4">
                    Slide to see recommended actions for reaching each level
                  </p>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={maturityLevel}
                    onChange={(e) => setMaturityLevel(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #015CE6 0%, #015CE6 ${(maturityLevel / 5) * 100}%, #e5e7eb ${(maturityLevel / 5) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">0</span>
                    <span className="text-xs text-gray-500">5</span>
                  </div>
                </div>
              </div>

              {/* Target Level Section */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="mb-3">
                  <span className="text-sm text-gray-900">Target Level: </span>
                  <span className="text-sm" style={{ color: '#015CE6' }}>
                    Level {currentMaturityInfo.level} - {currentMaturityInfo.name}
                  </span>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm text-gray-600 italic">{currentMaturityInfo.description}</p>
                </div>

                <div className="mb-3">
                  <h4 className="text-sm text-gray-900 mb-2">Recommendations to reach this level:</h4>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4">
                  <ul className="space-y-3">
                    {currentMaturityInfo.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                        <span className="text-sm text-gray-700 leading-relaxed">{rec}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm italic text-gray-600 mt-4">
                    Focus on these areas to advance your security maturity.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Wins Section */}
            <div className="border-t border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
              <div className="flex items-start gap-3 mb-3">
                <Zap className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm text-gray-900 mb-1">Quick Win - Response Depth Enhancement: </h4>
                  <p className="text-sm text-gray-700">
                    Increase win rates by 10-20% with more thorough responses. Start with: Add quantitative metrics to every response (e.g., "99.9% uptime" not just "high availability"). Timeline: 2-week sprint for 80% completion.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm text-gray-900 mb-1">AI-Powered Response Excellence: </h4>
                  <p className="text-sm text-gray-700">
                    Deploy AI coaching across all responses to maintain competitive advantage. Current differentiation score: 38%. Target: Industry-leading 85%+ consistency.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-1">Overall Security Posture</h3>
                  <p className="text-sm text-gray-600">
                    Your organization demonstrates strong security practices with 87% response readiness and 92% style consistency. 
                    Focus areas: Data retention documentation and incident response updates.
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl text-blue-600 mb-1">A-</div>
                <div className="text-sm text-gray-600">Security Grade</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
