import React from 'react';

const TaskCard = ({ task, onClick, isSelected }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'planning':
        return 'bg-accent-muted text-accent';
      case 'coding':
        return 'bg-accent-muted text-accent-hover glow-border';
      case 'completed':
        return 'bg-green-muted text-green-300';
      case 'failed':
        return 'bg-red-muted text-red-400';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  return (
    <div 
      className={`task-card p-4 rounded-lg border ${isSelected ? 'selected' : ''} glow-border`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-semibold text-gray-100">{task.title}</h3>
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${getStatusClass(task.status)}`}>
          {task.status}
        </span>
      </div>
      
      <p className="text-xs text-gray-400 mb-3 line-clamp-2">{task.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex -space-x-1">
          {task.assignees?.map((assignee, idx) => (
            <div 
              key={idx} 
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-medium ${
                assignee.color || 'bg-gray-600'
              }`}
            >
              {assignee.initials}
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-2 text-xs text-gray-500">
          {task.estimate && (
            <span>{task.estimate}h</span>
          )}
          {task.comments > 0 && (
            <span>💬 {task.comments}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
