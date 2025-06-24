// src/components/FogBackground.tsx
export default function FogBackground() {
  return (
    <div
      className="fixed inset-0 z-0 fumaca opacity-60"
      style={{ backgroundImage: "url('/fog.png')" }}
    />
  );
}
