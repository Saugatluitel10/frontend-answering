export function ResponseMetrics() {
  const metrics = [
    {
      label: 'Response Volume',
      value: '1420',
      description: 'Total responses analyzed',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Average Length',
      value: '11',
      description: 'Words per response',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Style Consistency',
      value: '23.1%',
      description: 'Derived from all-opening variance',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'Coverage',
      value: '40',
      description: 'Security categories covered',
      bgColor: 'bg-red-50'
    },
    {
      label: 'Completeness',
      value: '13%',
      description: 'Responses with substantive content',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Evidence Density',
      value: '0%',
      description: 'Responses with quantified evidence',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
      {metrics.map((metric, index) => {
        return (
          <div
            key={index}
            className={`${metric.bgColor} rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all`}
          >
            <p className="text-xs text-gray-600 mb-3">{metric.label}</p>
            
            <div className="mb-1">
              <p className="text-3xl text-gray-900">{metric.value}</p>
            </div>
            
            <p className="text-xs text-gray-500">{metric.description}</p>
          </div>
        );
      })}
    </div>
  );
}
