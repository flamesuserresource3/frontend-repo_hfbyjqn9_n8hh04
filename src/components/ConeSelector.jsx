import React from 'react';

const ConeCard = ({ option, selected, onSelect }) => {
  const isActive = selected === option.id;
  return (
    <button
      onClick={() => onSelect(option.id)}
      className={`rounded-2xl border p-4 text-left transition-all backdrop-blur bg-white/5 hover:bg-white/10 ${
        isActive ? 'border-pink-400 ring-2 ring-pink-400/50' : 'border-white/15'
      }`}
      aria-pressed={isActive}
    >
      <div className="flex items-center gap-3">
        <div className="text-2xl" aria-hidden>{option.emoji}</div>
        <div>
          <div className="font-semibold text-white/90">{option.label}</div>
          <div className="text-xs text-white/60">${option.price.toFixed(2)}</div>
        </div>
      </div>
    </button>
  );
};

const ConeSelector = ({ options, selected, onSelect }) => {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold text-white">Choose your cone</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {options.map((opt) => (
          <ConeCard key={opt.id} option={opt} selected={selected} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
};

export default ConeSelector;
