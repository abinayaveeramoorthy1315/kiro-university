import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import HeroSection from '@/components/HeroSection/HeroSection';

describe('HeroSection', () => {
  it('renders heading, tagline, and CTA button', () => {
    render(<HeroSection />);

    expect(
      screen.getByRole('heading', { level: 1, name: /Pride Temples of Tamil Nadu/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Granite Towers • Sacred Sculptures • Timeless Dynasties/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /Explore The Sacred Collection/i })
    ).toBeInTheDocument();
  });
});
