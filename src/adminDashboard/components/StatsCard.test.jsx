import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatsCard from './StatsCard';

// Mock Icon component for testing purposes
const MockIcon = (props) => <svg data-testid="mock-icon" {...props} />;

describe('StatsCard Component', () => {
  const mockStat = {
    title: 'Total Revenue',
    value: '$34,567',
    change: '+5.2%',
    color: 'bg-green-500',
    icon: MockIcon,
  };

  it('should render the title, value, and change text correctly', () => {
    render(<StatsCard stat={mockStat} />);

    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('$34,567')).toBeInTheDocument();
    expect(screen.getByText('+5.2%')).toBeInTheDocument();
  });

  it('should render the icon component', () => {
    render(<StatsCard stat={mockStat} />);

    const icon = screen.getByTestId('mock-icon');
    expect(icon).toBeInTheDocument();
  });

  it('should apply the correct color class to the icon container', () => {
    render(<StatsCard stat={mockStat} />);

    // The icon is wrapped in a div that receives the color class
    const iconContainer = screen.getByTestId('mock-icon').parentElement;
    expect(iconContainer).toHaveClass('bg-green-500');
  });
});
