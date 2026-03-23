import React from 'react';

const TaskDetail = ({ task, onClose }) => {
  if (!task) return null;

  const getShimmerClass = (status) => {
    if (status === 'planning' || status === 'coding') {
      return 'shimmer';
    }
    return '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="glass-card w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl border border-accent/10">
        {/* Detail Header */}
        <div className={`detail-header shimmer p-6 ${getShimmerClass(task.status)}`}>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-100 mb-2">{task.title}</h2>
              <div className="flex gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                  task.status === 'coding' 
                    ? 'bg-accent-muted text-accent-hover border border-accent/20'
                    : task.status === 'completed'
                    ? 'bg-green-muted text-green-300 border border-green/20'
                    : task.status === 'failed'
                    ? 'bg-red-muted text-red-400 border border-red/20'
                    : 'bg-gray-700 text-gray-300'
                }`}>
                  {task.status}
                </span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Detail Content */}
        <div className="p-6 bg-bg-base">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wide">Description</h3>
            <p className="text-gray-300 leading-relaxed">{task.description}</p>
          </div>

          {task.comments && task.comments.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Comments</h3>
              <div className="space-y-3">
                {task.comments.map((comment, idx) => (
                  <div key={idx} className="glass-panel p-3 rounded-lg border border-border-subtle/50">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-accent">{comment.author}</span>
                      <span className="text-[10px] text-gray-500">{comment.date}</span>
                    </div>
                    <p className="text-sm text-gray-300">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {task.files && task.files.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Files</h3>
              <div className="grid grid-cols-2 gap-3">
                {task.files.map((file, idx) => (
                  <div key={idx} className="glass-panel p-3 rounded-lg border border-border-subtle/50 hover:border-accent/30 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">📄</span>
                      <span className="text-sm text-gray-300 truncate">{file.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {task.estimate && (
            <div className="flex justify-between items-center pt-4 border-t border-border-subtle">
              <span className="text-sm text-gray-500">Estimate</span>
              <span className="text-lg font-semibold text-accent">{task.estimate} hours</span>
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="detail-footer glass-panel p-4 border-t border-border-subtle/50 flex justify-end gap-3">
          {task.status !== 'completed' && (
            <button 
              onClick={() => console.log('Mark complete')}
              className="btn-primary px-6 py-2 rounded-lg font-medium"
            >
              Mark Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
