import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import TempleCard from '@/components/TempleCard/TempleCard';
import { templeData } from '@/data/templeData';

describe('TempleCard', () => {
  const sampleTemple = templeData[0];

  it('renders temple details including name, location, and short description', () => {
    render(<TempleCard temple={sampleTemple} onClick={() => {}} />);

    expect(screen.getByText(sampleTemple.name)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`${sampleTemple.location}, ${sampleTemple.district}`))
    ).toBeInTheDocument();
    expect(screen.getByText(sampleTemple.shortDescription)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: new RegExp(sampleTemple.name) })).toBeInTheDocument();
  });

  it('calls onClick when clicked or when Enter key is pressed', () => {
    const handleClick = vi.fn();
    render(<TempleCard temple={sampleTemple} onClick={handleClick} />);

    const card = screen.getByRole('button', { name: new RegExp(sampleTemple.name) });
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(card, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
