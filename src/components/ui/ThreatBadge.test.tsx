import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThreatBadge } from './ThreatBadge';
import '@testing-library/jest-dom/vitest';

describe('ThreatBadge', () => {
  it('renders green for low scores (0-3)', () => {
    render(<ThreatBadge score={2} />);
    const badge = screen.getByText('2');
    expect(badge).toHaveClass('bg-emerald-500/10');
    expect(badge).toHaveClass('text-emerald-500');
  });

  it('renders yellow for medium scores (4-6)', () => {
    render(<ThreatBadge score={5} />);
    const badge = screen.getByText('5');
    expect(badge).toHaveClass('bg-amber-500/10');
    expect(badge).toHaveClass('text-amber-500');
  });

  it('renders red for high scores (7-10)', () => {
    render(<ThreatBadge score={9} />);
    const badge = screen.getByText('9');
    expect(badge).toHaveClass('bg-red-500/10');
    expect(badge).toHaveClass('text-red-500');
  });

  it('handles scores outside 0-10 range', () => {
    render(<ThreatBadge score={15} />);
    const badge = screen.getByText('15');
    expect(badge).toHaveClass('bg-red-500/10');
  });
});
