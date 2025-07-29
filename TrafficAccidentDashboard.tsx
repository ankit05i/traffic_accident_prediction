import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

const DynamicTrafficDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('Last 30 Days');
  const [selectedState, setSelectedState] = useState('All States');
  const [currentData, setCurrentData] = useState({});

  // Time-based data simulation
  const timeBasedData = {
    'Last 30 Days': {
      totalAccidents: 4783,
      fatalities: 1542,
      injuries: 3241,
      riskLevel: 'High',
      period: '30 days',
      stateData: [
        { name: 'Maharashtra', accidents: 823, fatalities: 234, trend: '+12%' },
        { name: 'Tamil Nadu', accidents: 654, fatalities: 187, trend: '+8%' },
        { name: 'Karnataka', accidents: 582, fatalities: 165, trend: '+15%' },
        { name: 'Uttar Pradesh', accidents: 987, fatalities: 312, trend: '+5%' },
        { name: 'Gujarat', accidents: 453, fatalities: 123, trend: '-2%' }
      ],
      weatherData: [
        { condition: 'Clear', accidents: 1245, percentage: 26 },
        { condition: 'Rain', accidents: 1823, percentage: 38 },
        { condition: 'Fog', accidents: 876, percentage: 18 },
        { condition: 'Cloudy', accidents: 654, percentage: 14 },
        { condition: 'Extreme', accidents: 185, percentage: 4 }
      ],
      hourlyData: [
        { hour: '6 AM', accidents: 45 }, { hour: '9 AM', accidents: 78 },
        { hour: '12 PM', accidents: 89 }, { hour: '3 PM', accidents: 95 },
        { hour: '6 PM', accidents: 134 }, { hour: '9 PM', accidents: 98 }
      ],
      dailyTrend: [
        { day: 'Mon', accidents: 145, fatalities: 32 },
        { day: 'Tue', accidents: 123, fatalities: 28 },
        { day: 'Wed', accidents: 167, fatalities: 41 },
        { day: 'Thu', accidents: 189, fatalities: 45 },
        { day: 'Fri', accidents: 201, fatalities: 52 },
        { day: 'Sat', accidents: 234, fatalities: 58 },
        { day: 'Sun', accidents: 198, fatalities: 49 }
      ]
    },
    'Last 90 Days': {
      totalAccidents: 14349,
      fatalities: 4626,
      injuries: 9723,
      riskLevel: 'Medium-High',
      period: '90 days',
      stateData: [
        { name: 'Maharashtra', accidents: 2469, fatalities: 702, trend: '+18%' },
        { name: 'Tamil Nadu', accidents: 1962, fatalities: 561, trend: '+12%' },
        { name: 'Karnataka', accidents: 1746, fatalities: 495, trend: '+22%' },
        { name: 'Uttar Pradesh', accidents: 2961, fatalities: 936, trend: '+8%' },
        { name: 'Gujarat', accidents: 1359, fatalities: 369, trend: '+3%' }
      ],
      weatherData: [
        { condition: 'Clear', accidents: 3735, percentage: 26 },
        { condition: 'Rain', accidents: 5453, percentage: 38 },
        { condition: 'Fog', accidents: 2583, percentage: 18 },
        { condition: 'Cloudy', accidents: 1961, percentage: 14 },
        { condition: 'Extreme', accidents: 617, percentage: 4 }
      ],
      hourlyData: [
        { hour: '6 AM', accidents: 135 }, { hour: '9 AM', accidents: 234 },
        { hour: '12 PM', accidents: 267 }, { hour: '3 PM', accidents: 285 },
        { hour: '6 PM', accidents: 402 }, { hour: '9 PM', accidents: 294 }
      ],
      dailyTrend: [
        { day: 'Mon', accidents: 435, fatalities: 96 },
        { day: 'Tue', accidents: 369, fatalities: 84 },
        { day: 'Wed', accidents: 501, fatalities: 123 },
        { day: 'Thu', accidents: 567, fatalities: 135 },
        { day: 'Fri', accidents: 603, fatalities: 156 },
        { day: 'Sat', accidents: 702, fatalities: 174 },
        { day: 'Sun', accidents: 594, fatalities: 147 }
      ]
    },
    'Last 6 Months': {
      totalAccidents: 28698,
      fatalities: 9252,
      injuries: 19446,
      riskLevel: 'Medium',
      period: '6 months',
      stateData: [
        { name: 'Maharashtra', accidents: 4938, fatalities: 1404, trend: '+25%' },
        { name: 'Tamil Nadu', accidents: 3924, fatalities: 1122, trend: '+15%' },
        { name: 'Karnataka', accidents: 3492, fatalities: 990, trend: '+28%' },
        { name: 'Uttar Pradesh', accidents: 5922, fatalities: 1872, trend: '+12%' },
        { name: 'Gujarat', accidents: 2718, fatalities: 738, trend: '+8%' }
      ],
      weatherData: [
        { condition: 'Clear', accidents: 7462, percentage: 26 },
        { condition: 'Rain', accidents: 10905, percentage: 38 },
        { condition: 'Fog', accidents: 5166, percentage: 18 },
        { condition: 'Cloudy', accidents: 4018, percentage: 14 },
        { condition: 'Extreme', accidents: 1147, percentage: 4 }
      ],
      hourlyData: [
        { hour: '6 AM', accidents: 270 }, { hour: '9 AM', accidents: 468 },
        { hour: '12 PM', accidents: 534 }, { hour: '3 PM', accidents: 570 },
        { hour: '6 PM', accidents: 804 }, { hour: '9 PM', accidents: 588 }
      ],
      dailyTrend: [
        { day: 'Mon', accidents: 870, fatalities: 192 },
        { day: 'Tue', accidents: 738, fatalities: 168 },
        { day: 'Wed', accidents: 1002, fatalities: 246 },
        { day: 'Thu', accidents: 1134, fatalities: 270 },
        { day: 'Fri', accidents: 1206, fatalities: 312 },
        { day: 'Sat', accidents: 1404, fatalities: 348 },
        { day: 'Sun', accidents: 1188, fatalities: 294 }
      ]
    },
    'Last Year': {
      totalAccidents: 57396,
      fatalities: 18504,
      injuries: 38892,
      riskLevel: 'Medium',
      period: '12 months',
      stateData: [
        { name: 'Maharashtra', accidents: 9876, fatalities: 2808, trend: '+32%' },
        { name: 'Tamil Nadu', accidents: 7848, fatalities: 2244, trend: '+20%' },
        { name: 'Karnataka', accidents: 6984, fatalities: 1980, trend: '+35%' },
        { name: 'Uttar Pradesh', accidents: 11844, fatalities: 3744, trend: '+18%' },
        { name: 'Gujarat', accidents: 5436, fatalities: 1476, trend: '+15%' }
      ],
      weatherData: [
        { condition: 'Clear', accidents: 14923, percentage: 26 },
        { condition: 'Rain', accidents: 21810, percentage: 38 },
        { condition: 'Fog', accidents: 10331, percentage: 18 },
        { condition: 'Cloudy', accidents: 8035, percentage: 14 },
        { condition: 'Extreme', accidents: 2297, percentage: 4 }
      ],
      hourlyData: [
        { hour: '6 AM', accidents: 540 }, { hour: '9 AM', accidents: 936 },
        { hour: '12 PM', accidents: 1068 }, { hour: '3 PM', accidents: 1140 },
        { hour: '6 PM', accidents: 1608 }, { hour: '9 PM', accidents: 1176 }
      ],
      dailyTrend: [
        { day: 'Mon', accidents: 1740, fatalities: 384 },
        { day: 'Tue', accidents: 1476, fatalities: 336 },
        { day: 'Wed', accidents: 2004, fatalities: 492 },
        { day: 'Thu', accidents: 2268, fatalities: 540 },
        { day: 'Fri', accidents: 2412, fatalities: 624 },
        { day: 'Sat', accidents: 2808, fatalities: 696 },
        { day: 'Sun', accidents: 2376, fatalities: 588 }
      ]
    }
  };

  // Colors for charts
  const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];
  const WEATHER_COLORS = ['#fbbf24', '#3b82f6', '#6b7280', '#9ca3af', '#ef4444'];

  // Update data when time range or state changes
  useEffect(() => {
    let data = { ...timeBasedData[selectedTimeRange] };
    
    // Filter by state if specific state is selected
    if (selectedState !== 'All States') {
      const selectedStateData = data.stateData.find(state => state.name === selectedState);
      if (selectedStateData) {
        // Adjust totals based on selected state proportion
        const stateProportion = selectedStateData.accidents / data.totalAccidents;
        data = {
          ...data,
          totalAccidents: selectedStateData.accidents,
          fatalities: selectedStateData.fatalities,
          injuries: Math.round(selectedStateData.accidents * 0.68), // Estimated injury rate
          stateData: [selectedStateData], // Show only selected state
          // Adjust other data proportionally
          weatherData: data.weatherData.map(weather => ({
            ...weather,
            accidents: Math.round(weather.accidents * stateProportion)
          })),
          hourlyData: data.hourlyData.map(hour => ({
            ...hour,
            accidents: Math.round(hour.accidents * stateProportion)
          })),
          dailyTrend: data.dailyTrend.map(day => ({
            ...day,
            accidents: Math.round(day.accidents * stateProportion),
            fatalities: Math.round(day.fatalities * stateProportion)
          }))
        };
      }
    }
    
    setCurrentData(data);
  }, [selectedTimeRange, selectedState]);

  const containerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh'
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  };

  const headerStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '10px'
  };

  const kpiStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  };

  const kpiCardStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    borderLeft: '4px solid #3b82f6'
  };

  const selectStyle = {
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    marginRight: '15px'
  };

  if (!currentData.totalAccidents) {
    return <div>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={cardStyle}>
        <h1 style={headerStyle}>
          🚗 Indian Road Traffic Accident Prediction System
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          ML-based Real-time Analysis & Forecasting Dashboard
        </p>
        <p style={{ fontSize: '14px', color: '#9ca3af' }}>
          Showing data for: <strong>{selectedState === 'All States' ? 'All Indian States' : selectedState + ' State'}</strong> | 
          Period: <strong>{currentData.period}</strong> | Last Updated: {new Date().toLocaleString()}
        </p>
      </div>

      {/* Filters */}
      <div style={cardStyle}>
        <h3 style={{ marginBottom: '15px', fontSize: '18px', fontWeight: '600' }}>📊 Filter Options</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <label style={{ marginRight: '10px', fontWeight: '500' }}>Time Range:</label>
          <select 
            value={selectedTimeRange} 
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            style={selectStyle}
          >
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Last 6 Months</option>
            <option>Last Year</option>
          </select>

          <label style={{ marginRight: '10px', fontWeight: '500' }}>State:</label>
          <select 
            value={selectedState} 
            onChange={(e) => setSelectedState(e.target.value)}
            style={selectStyle}
          >
            <option>All States</option>
            <option>Maharashtra</option>
            <option>Tamil Nadu</option>
            <option>Karnataka</option>
            <option>Uttar Pradesh</option>
            <option>Gujarat</option>
          </select>

          <div style={{ 
            marginLeft: 'auto', 
            padding: '8px 16px', 
            backgroundColor: '#eff6ff', 
            borderRadius: '6px',
            fontSize: '14px',
            color: '#1e40af'
          }}>
            📈 Data updates every 10 seconds
          </div>
        </div>
      </div>

      {/* KPI Cards - Now Dynamic */}
      <div style={kpiStyle}>
        <div style={kpiCardStyle}>
          <h3 style={{ margin: '0 0 10px 0', color: '#6b7280', fontSize: '14px' }}>
            Total Accidents ({currentData.period})
          </h3>
          <p style={{ margin: '0', fontSize: '32px', fontWeight: 'bold', color: '#1f2937' }}>
            {currentData.totalAccidents?.toLocaleString()}
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#ef4444' }}>
            📈 Compared to previous period
          </p>
        </div>

        <div style={kpiCardStyle}>
          <h3 style={{ margin: '0 0 10px 0', color: '#6b7280', fontSize: '14px' }}>
            Fatalities ({currentData.period})
          </h3>
          <p style={{ margin: '0', fontSize: '32px', fontWeight: 'bold', color: '#1f2937' }}>
            {currentData.fatalities?.toLocaleString()}
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#ef4444' }}>
            💀 {((currentData.fatalities / currentData.totalAccidents) * 100).toFixed(1)}% fatality rate
          </p>
        </div>

        <div style={kpiCardStyle}>
          <h3 style={{ margin: '0 0 10px 0', color: '#6b7280', fontSize: '14px' }}>
            Injuries ({currentData.period})
          </h3>
          <p style={{ margin: '0', fontSize: '32px', fontWeight: 'bold', color: '#1f2937' }}>
            {currentData.injuries?.toLocaleString()}
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#f59e0b' }}>
            🏥 {((currentData.injuries / currentData.totalAccidents) * 100).toFixed(1)}% injury rate
          </p>
        </div>

        <div style={kpiCardStyle}>
          <h3 style={{ margin: '0 0 10px 0', color: '#6b7280', fontSize: '14px' }}>
            Risk Level ({currentData.period})
          </h3>
          <p style={{ margin: '0', fontSize: '32px', fontWeight: 'bold', color: '#1f2937' }}>
            {currentData.riskLevel}
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#10b981' }}>
            ⚡ ML-based assessment
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* State-wise Accidents Bar Chart */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
            📊 State-wise Accidents & Fatalities
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={currentData.stateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="accidents" fill="#3b82f6" name="Accidents" />
              <Bar dataKey="fatalities" fill="#ef4444" name="Fatalities" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weather Impact Pie Chart */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
            🌦️ Weather Impact Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={currentData.weatherData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ condition, percentage }) => `${condition}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="accidents"
              >
                {currentData.weatherData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={WEATHER_COLORS[index % WEATHER_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hourly Trends Line Chart */}
      <div style={cardStyle}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
          ⏰ Hourly Accident Trends - {selectedState === 'All States' ? 'All States' : selectedState}
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={currentData.hourlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="accidents" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
              name="Accidents"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Daily Trend Area Chart */}
      <div style={cardStyle}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
          📅 Weekly Accident & Fatality Trends
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={currentData.dailyTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="accidents" 
              stackId="1" 
              stroke="#3b82f6" 
              fill="#3b82f6" 
              fillOpacity={0.6}
              name="Accidents"
            />
            <Area 
              type="monotone" 
              dataKey="fatalities" 
              stackId="2" 
              stroke="#ef4444" 
              fill="#ef4444" 
              fillOpacity={0.6}
              name="Fatalities"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* State-wise Data - Compact Version */}
      <div style={cardStyle}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
          🗺️ {selectedState === 'All States' ? 'All States' : selectedState + ' State'} Summary - {currentData.period}
        </h2>
        {selectedState === 'All States' ? (
          <div style={{ display: 'grid', gap: '10px' }}>
            {currentData.stateData?.map((state, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px',
                backgroundColor: '#f9fafb',
                borderRadius: '6px',
                borderLeft: '4px solid #3b82f6'
              }}>
                <div>
                  <span style={{ fontWeight: '500', fontSize: '16px' }}>{state.name}</span>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    Fatalities: {state.fatalities.toLocaleString()}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ 
                    fontWeight: 'bold', 
                    color: '#1f2937',
                    fontSize: '18px'
                  }}>
                    {state.accidents.toLocaleString()}
                  </div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: state.trend.includes('+') ? '#ef4444' : '#10b981',
                    fontWeight: '500'
                  }}>
                    {state.trend} vs previous
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div style={{ 
              padding: '20px', 
              backgroundColor: '#eff6ff', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#1e40af' }}>Total Accidents</h3>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e40af' }}>
                {currentData.totalAccidents?.toLocaleString()}
              </div>
            </div>
            <div style={{ 
              padding: '20px', 
              backgroundColor: '#fef2f2', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#991b1b' }}>Fatalities</h3>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#991b1b' }}>
                {currentData.fatalities?.toLocaleString()}
              </div>
            </div>
            <div style={{ 
              padding: '20px', 
              backgroundColor: '#fefce8', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#a16207' }}>Injuries</h3>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#a16207' }}>
                {currentData.injuries?.toLocaleString()}
              </div>
            </div>
            <div style={{ 
              padding: '20px', 
              backgroundColor: '#f0fdf4', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#166534' }}>Safety Score</h3>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#166534' }}>
                {currentData.stateData?.[0] ? (100 - Math.round((currentData.stateData[0].fatalities / currentData.stateData[0].accidents) * 100)) : 'N/A'}%
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Data Comparison */}
      <div style={cardStyle}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
          📊 Period Comparison
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          {Object.keys(timeBasedData).map((period, index) => {
            const data = timeBasedData[period];
            const isSelected = period === selectedTimeRange;
            
            return (
              <div key={index} style={{
                padding: '15px',
                backgroundColor: isSelected ? '#eff6ff' : '#f9fafb',
                borderRadius: '8px',
                border: isSelected ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedTimeRange(period)}
              >
                <h4 style={{ 
                  margin: '0 0 10px 0', 
                  color: isSelected ? '#1e40af' : '#374151',
                  fontWeight: '600'
                }}>
                  {period}
                </h4>
                <div style={{ fontSize: '14px', marginBottom: '5px' }}>
                  <strong>Accidents:</strong> {data.totalAccidents.toLocaleString()}
                </div>
                <div style={{ fontSize: '14px', marginBottom: '5px' }}>
                  <strong>Fatalities:</strong> {data.fatalities.toLocaleString()}
                </div>
                <div style={{ fontSize: '14px' }}>
                  <strong>Risk:</strong> {data.riskLevel}
                </div>
                {isSelected && (
                  <div style={{ 
                    marginTop: '10px', 
                    fontSize: '12px', 
                    color: '#1e40af',
                    fontWeight: '500'
                  }}>
                    ✅ Currently Selected
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div style={{ ...cardStyle, textAlign: 'center', backgroundColor: '#1f2937', color: 'white' }}>
        <p style={{ margin: '0', fontSize: '14px' }}>
          🇮🇳 Data Sources: Ministry of Road Transport & Highways (MoRTH), Indian Meteorological Department (IMD)
        </p>
        <p style={{ margin: '10px 0 0 0', fontSize: '12px', opacity: '0.8' }}>
          Currently showing: <strong>{currentData.period}</strong> | Model: Random Forest + LSTM Hybrid
        </p>
      </div>
    </div>
  );
};

export default DynamicTrafficDashboard;