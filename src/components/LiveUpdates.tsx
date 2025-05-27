
import React from 'react';
import { Calendar, Clock, Users, ArrowRight } from 'lucide-react';

const LiveUpdates = () => {
  const updates = [
    {
      id: 1,
      title: "Nuovi protocolli di sicurezza approvati",
      time: "2 ore fa",
      department: "Sicurezza & Qualità",
      type: "update",
      priority: "high"
    },
    {
      id: 2,
      title: "Sessione formativa: Gestione digitale magazzino",
      time: "Domani alle 14:30",
      department: "Logistica",
      type: "event",
      priority: "medium"
    },
    {
      id: 3,
      title: "Aggiornamenti software WMS disponibili",
      time: "1 giorno fa",
      department: "IT & Digital",
      type: "announcement",
      priority: "low"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-500/10';
      case 'medium': return 'border-l-yellow-500 bg-yellow-500/10';
      case 'low': return 'border-l-blue-500 bg-blue-500/10';
      default: return 'border-l-gray-500 bg-gray-500/10';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'event': return Calendar;
      case 'update': return Clock;
      default: return Users;
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Aggiornamenti Live</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm font-medium">Live</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {updates.map((update) => {
          const IconComponent = getTypeIcon(update.type);
          return (
            <div 
              key={update.id} 
              className={`border-l-4 ${getPriorityColor(update.priority)} bg-wurth-gray rounded-r-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer group`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="bg-gray-600 rounded-lg p-2 group-hover:bg-gray-500 transition-colors">
                    <IconComponent className="w-4 h-4 text-gray-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1 group-hover:text-wurth-red transition-colors">
                      {update.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>{update.department}</span>
                      <span>•</span>
                      <span>{update.time}</span>
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 text-center">
        <button className="text-wurth-red hover:text-red-400 font-medium text-sm transition-colors">
          Vedi tutti gli aggiornamenti
        </button>
      </div>
    </section>
  );
};

export default LiveUpdates;
