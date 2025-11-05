import React, { useMemo, useState } from 'react';
import FlavorPicker from './components/FlavorPicker';
import ConeSelector from './components/ConeSelector';
import ToppingsGrid from './components/ToppingsGrid';
import OrderSummary from './components/OrderSummary';

function App() {
  const maxScoops = 3;

  // Menu data
  const flavors = [
    { name: 'Vanilla Bean', price: 2.5, color: 'linear-gradient(135deg,#fff1cc,#ffe6a1)' },
    { name: 'Chocolate Fudge', price: 2.8, color: 'linear-gradient(135deg,#5b3a29,#7a4a32)' },
    { name: 'Strawberry Swirl', price: 2.7, color: 'linear-gradient(135deg,#ff90c2,#ff5ca8)' },
    { name: 'Mint Chip', price: 2.6, color: 'linear-gradient(135deg,#b0f3d0,#63e6be)' },
    { name: 'Cookie Dough', price: 3.0, color: 'linear-gradient(135deg,#f6e2c8,#e3c7a2)' },
    { name: 'Salted Caramel', price: 2.9, color: 'linear-gradient(135deg,#ffd2a1,#ffb575)' },
  ];

  const cones = [
    { id: 'waffle', label: 'Waffle Cone', price: 1.2, emoji: '🧇' },
    { id: 'sugar', label: 'Sugar Cone', price: 1.0, emoji: '🍦' },
    { id: 'cup', label: 'Cup', price: 0.8, emoji: '🥣' },
  ];

  const toppings = [
    { name: 'Rainbow Sprinkles', price: 0.5, emoji: '🌈' },
    { name: 'Choco Chips', price: 0.6, emoji: '🍫' },
    { name: 'Crushed Nuts', price: 0.7, emoji: '🥜' },
    { name: 'Caramel Drizzle', price: 0.6, emoji: '🍯' },
    { name: 'Whipped Cream', price: 0.5, emoji: '🍥' },
    { name: 'Cherries', price: 0.4, emoji: '🍒' },
  ];

  // Selections
  const [selectedFlavors, setSelectedFlavors] = useState({}); // { name: count }
  const [selectedCone, setSelectedCone] = useState('waffle');
  const [selectedToppings, setSelectedToppings] = useState(new Set());
  const [placing, setPlacing] = useState(false);
  const [success, setSuccess] = useState(false);

  const totalScoops = useMemo(
    () => Object.values(selectedFlavors).reduce((a, b) => a + b, 0),
    [selectedFlavors]
  );

  const addScoop = (name) => {
    if (totalScoops >= maxScoops) return;
    setSelectedFlavors((prev) => ({ ...prev, [name]: (prev[name] || 0) + 1 }));
  };

  const removeScoop = (name) => {
    setSelectedFlavors((prev) => {
      const next = { ...prev };
      if (!next[name]) return next;
      next[name] -= 1;
      if (next[name] <= 0) delete next[name];
      return next;
    });
  };

  const toggleTopping = (name) => {
    setSelectedToppings((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const scoopsTotal = useMemo(() => {
    return Object.entries(selectedFlavors).reduce((sum, [name, count]) => {
      const f = flavors.find((x) => x.name === name);
      return sum + (f ? f.price * count : 0);
    }, 0);
  }, [selectedFlavors, flavors]);

  const conePrice = useMemo(() => cones.find((c) => c.id === selectedCone)?.price || 0, [selectedCone]);

  const toppingsTotal = useMemo(() => {
    return Array.from(selectedToppings).reduce((sum, name) => {
      const t = toppings.find((x) => x.name === name);
      return sum + (t ? t.price : 0);
    }, 0);
  }, [selectedToppings, toppings]);

  const total = useMemo(() => scoopsTotal + conePrice + toppingsTotal, [scoopsTotal, conePrice, toppingsTotal]);

  const handleCheckout = async () => {
    if (placing || totalScoops === 0) return;
    setPlacing(true);
    setSuccess(false);
    await new Promise((r) => setTimeout(r, 900));
    setPlacing(false);
    setSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 via-fuchsia-600 to-indigo-600">
      {/* Decorative blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-yellow-300/10 blur-3xl" />
      </div>

      <main className="relative mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur">
            <span className="text-2xl">🍨</span>
            <span className="text-sm font-medium tracking-wide text-white/90">Mix & Match Ice Cream Lab</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white drop-shadow">
            Build your dream cone
          </h1>
          <p className="max-w-2xl text-white/80">
            Pick scoops, choose a cone, sprinkle magic. Everything updates live as you craft the perfect treat.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <FlavorPicker
              flavors={flavors}
              selected={selectedFlavors}
              onAdd={addScoop}
              onRemove={removeScoop}
              maxScoops={maxScoops}
            />
            <ConeSelector options={cones} selected={selectedCone} onSelect={setSelectedCone} />
            <ToppingsGrid toppings={toppings} selected={selectedToppings} onToggle={toggleTopping} />
          </div>

          <div className="lg:col-span-1">
            <OrderSummary
              scoopsTotal={scoopsTotal}
              conePrice={conePrice}
              toppingsTotal={toppingsTotal}
              total={total}
              onCheckout={handleCheckout}
              canCheckout={totalScoops > 0}
              placing={placing}
              success={success}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
