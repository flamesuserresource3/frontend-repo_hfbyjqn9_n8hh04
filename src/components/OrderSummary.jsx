import React from 'react';
import { ShoppingCart, Check } from 'lucide-react';

const Line = ({ label, amount }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-white/70">{label}</span>
    <span className="text-white">${amount.toFixed(2)}</span>
  </div>
);

const OrderSummary = ({
  scoopsTotal,
  conePrice,
  toppingsTotal,
  total,
  onCheckout,
  canCheckout,
  placing,
  success,
}) => {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-white">Your order</h2>
      <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur">
        <div className="space-y-2">
          <Line label="Scoops" amount={scoopsTotal} />
          <Line label="Cone" amount={conePrice} />
          <Line label="Toppings" amount={toppingsTotal} />
          <div className="h-px bg-white/10 my-2" />
          <div className="flex items-center justify-between">
            <span className="text-white/80 font-semibold">Total</span>
            <span className="text-white font-bold text-lg">${total.toFixed(2)}</span>
          </div>
        </div>
        <button
          onClick={onCheckout}
          disabled={!canCheckout || placing}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-pink-500 px-4 py-3 font-medium text-white shadow hover:bg-pink-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {success ? (
            <>
              <Check size={18} /> Ordered!
            </>
          ) : (
            <>
              <ShoppingCart size={18} /> {placing ? 'Placing order...' : 'Place order'}
            </>
          )}
        </button>
        <p className="mt-2 text-xs text-white/60">No payment needed in this demo. Have fun crafting your dream cone!</p>
      </div>
    </section>
  );
};

export default OrderSummary;
