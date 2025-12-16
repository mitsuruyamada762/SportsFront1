import React from 'react';
import { getDaysFromTodayToSunday, getDaysFromTodayToSundayFormatted } from '@/theme2/utils/fns';

export const DaysDemo: React.FC = () => {
  const days = getDaysFromTodayToSunday();
  const formattedDays = getDaysFromTodayToSundayFormatted();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Days from Today to Sunday</h1>
      
      <div className="space-y-6">
        {/* Basic format */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Format</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {days.map((day, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${
                  day.isToday 
                    ? 'bg-blue-100 border-blue-300' 
                    : day.isTomorrow 
                    ? 'bg-green-100 border-green-300' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="text-sm font-medium text-gray-700">
                  {day.day}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {day.date}
                </div>
                {day.isToday && (
                  <div className="text-xs text-blue-600 font-medium mt-1">
                    Today
                  </div>
                )}
                {day.isTomorrow && (
                  <div className="text-xs text-green-600 font-medium mt-1">
                    Tomorrow
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Formatted format */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Formatted Format (for dropdowns)</h2>
          <div className="space-y-2">
            {formattedDays.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <span className="font-medium text-gray-700">{day.label}</span>
                  {day.date && (
                    <span className="ml-2 text-sm text-gray-500">({day.date})</span>
                  )}
                </div>
                <div className="text-xs text-gray-400">
                  value: "{day.value}"
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Raw data display */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Raw Data</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {JSON.stringify(days, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};
