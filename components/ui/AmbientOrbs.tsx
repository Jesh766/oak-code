export default function AmbientOrbs({ variant = 'default' }: { variant?: 'default' | 'subtle' }) {
  return (
    <div className="ambient-orbs" style={{ opacity: variant === 'subtle' ? 0.5 : 1 }}>
      <div className="ambient-orb orb-1" />
      <div className="ambient-orb orb-2" />
    </div>
  );
}