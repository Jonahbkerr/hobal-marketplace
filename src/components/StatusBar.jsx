import React from 'react';

const StatusBar = ({ status, tasks }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'planning':
        return 'text-accent';
      case 'coding':
        return 'text-green-400';
      case 'completed':
        return 'text-green-300';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'planning':
        return 'Planning Phase';
      case 'coding':
        return 'In Development';
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
      default:
        return status;
    }
  };

  return (
    <div className="status-bar px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${status === 'coding' ? 'bg-green-400 animate-pulse' : status === 'failed' ? 'bg-red-500' : 'bg-accent'}`} />
          <span className="text-sm text-gray-300 font-medium">
            {getStatusLabel(status)}
          </span>
        </div>
        
        {tasks && (
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>Total: {tasks.length}</span>
            <span>Planning: {tasks.filter(t => t.status === 'planning').length}</span>
            <span>Coding: {tasks.filter(t => t.status === 'coding').length}</span>
            <span>Done: {tasks.filter(t => t.status === 'completed').length}</span>
          </div>
        )}
      </div>

      <div className="status-glow-line" />
    </div>
  );
};

export default StatusBar;
