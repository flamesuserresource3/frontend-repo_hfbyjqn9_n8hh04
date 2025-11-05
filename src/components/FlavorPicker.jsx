import React from 'react';
import { Plus, Minus } from 'lucide-react';

const FlavorCard = ({ flavor, count, onAdd, onRemove, disabled }) => {
  return (
    <div className="group rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div
          className="h-10 w-10 rounded-full ring-2 ring-white/30"
          style={{ background: flavor.color }}
        />
        <div className="flex-1">
          <div className="font-semibold text-white/90">{flavor.name}</div>
          <div className="text-xs text-white/60">${flavor.price.toFixed(2)} per scoop</div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-white/80">Scoops: <span className="font-semibold">{count}</span></div>
        <div className="flex items-center gap-2">
          <button
            onClick={onRemove}
            disabled={count === 0}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={`Remove ${flavor.name} scoop`}
          >
            <Minus size={18} />
          </button>
          <button
            onClick={onAdd}
            disabled={disabled}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 text-white hover:bg-pink-400 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={`Add ${flavor.name} scoop`}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const FlavorPicker = ({ flavors, selected, onAdd, onRemove, maxScoops }) => {
  const totalScoops = Object.values(selected).reduce((a, b) => a + b, 0);
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between">
        <h2 className="text-xl font-bold text-white">Pick your scoops</h2>
        <span className="text-sm text-white/70">{totalScoops}/{maxScoops} scoops</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {flavors.map((flavor) => (
          <FlavorCard
            key={flavor.name}
            flavor={flavor}
            count={selected[flavor.name] || 0}
            onAdd={() => onAdd(flavor.name)}
            onRemove={() => onRemove(flavor.name)}
            disabled={totalScoops >= maxScoops}
          />
        ))}
      </div>
      <p className="text-xs text-white/60">Mix & match up to {maxScoops} scoops. Go wild!</p>
    </section>
  );
};

export default FlavorPicker;
