import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import TempleDetailModal from '@/components/TempleDetailModal/TempleDetailModal';
import { templeData } from '@/data/templeData';

describe('TempleDetailModal', () => {
  const sampleTemple = templeData[0];

  it('renders null when temple is null', () => {
    const { container } = render(<TempleDetailModal temple={null} onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders all detail sections when temple is provided', () => {
    render(<TempleDetailModal temple={sampleTemple} onClose={() => {}} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(sampleTemple.name)).toBeInTheDocument();
    expect(screen.getByText(sampleTemple.detailedHistory)).toBeInTheDocument();
    expect(screen.getByText(sampleTemple.significance)).toBeInTheDocument();
    sampleTemple.notableFeatures.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<TempleDetailModal temple={sampleTemple} onClose={handleClose} />);

    const closeBtn = screen.getByRole('button', { name: /Close temple details modal/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    const handleClose = vi.fn();
    render(<TempleDetailModal temple={sampleTemple} onClose={handleClose} />);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
