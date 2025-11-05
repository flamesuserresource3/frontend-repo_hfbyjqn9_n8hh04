import React from 'react';

const ToppingChip = ({ topping, active, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all backdrop-blur ${
        active
          ? 'bg-pink-500/20 border-pink-400 text-white'
          : 'bg-white/5 border-white/15 text-white/80 hover:bg-white/10'
      }`}
    >
      <span className="text-lg" aria-hidden>{topping.emoji}</span>
      <span>{topping.name}</span>
      <span className="text-white/60 text-xs">+${topping.price.toFixed(2)}</span>
    </button>
  );
};

const ToppingsGrid = ({ toppings, selected, onToggle }) => {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold text-white">Add some toppings</h2>
      <div className="flex flex-wrap gap-2">
        {toppings.map((t) => (
          <ToppingChip
            key={t.name}
            topping={t}
            active={selected.has(t.name)}
            onToggle={() => onToggle(t.name)}
          />
        ))}
      </div>
      <p className="text-xs text-white/60">Pro tip: a little crunch goes a long way.</p>
    </section>
  );
};

export default ToppingsGrid;
