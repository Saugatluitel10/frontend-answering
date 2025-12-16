import { Database, CheckCircle, TrendingUp } from 'lucide-react';

export function FeatureCards() {
  const features = [
    {
      icon: Database,
      title: 'Company-level Analysis',
      description: 'Analyze response patterns across your entire organization with intelligent caching for instant insights.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: CheckCircle,
      title: 'Authentic Responses',
      description: "Generate responses that match your company's unique communication style and maintain brand consistency.",
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: TrendingUp,
      title: 'Continuous Improvement',
      description: 'Learn from every interaction to refine communication patterns and enhance response quality over time.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col items-center">
            <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
              <feature.icon className={`w-6 h-6 ${feature.color}`} />
            </div>
            <h3 className="mb-2 text-center font-semibold">{feature.title}</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed text-justify">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}
