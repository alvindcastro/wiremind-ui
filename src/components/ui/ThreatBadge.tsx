import { cn } from '@/lib/utils';

interface ThreatBadgeProps {
  score: number;
  className?: string;
}

export function ThreatBadge({ score, className }: ThreatBadgeProps) {
  const getBadgeStyles = (n: number) => {
    if (n <= 3) return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    if (n <= 6) return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    return 'bg-red-500/10 text-red-500 border-red-500/20';
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-medium border transition-colors',
        getBadgeStyles(score),
        className
      )}
    >
      {score}
    </span>
  );
}
