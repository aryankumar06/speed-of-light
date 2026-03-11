export default function PricingModal({ open, onClose }) {
  if (!open) return null;
  return <div className="fixed inset-0 bg-black/40 grid place-items-center z-50" onClick={onClose}><div className="bg-white p-6 rounded-xl w-[90%] max-w-2xl" onClick={(e) => e.stopPropagation()}>
    <h3 className="font-heading text-2xl text-navy mb-4">Upgrade Plan</h3>
    <div className="grid md:grid-cols-3 gap-3">
      {['Free (₹0)','Teacher Pro (₹499)','Institute (₹2,999)'].map(plan => <div key={plan} className="card p-4"><h4 className="font-semibold">{plan}</h4><button className="btn-primary mt-3 w-full">Choose</button></div>)}
    </div>
  </div></div>;
}
