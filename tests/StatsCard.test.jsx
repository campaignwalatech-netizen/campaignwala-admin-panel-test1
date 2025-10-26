import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Users } from 'lucide-react'; // Import an icon for testing
import StatsCard from '../src/adminDashboard/components/StatsCard';

describe('StatsCard Component', () => {
  const mockStat = {
    title: 'Total Users',
    value: '10,240',
    icon: Users,
    color: 'bg-blue-500',
    change: '+12%',
  };

  it('should render all data correctly', () => {
    render(<StatsCard stat={mockStat} />);

    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('10,240')).toBeInTheDocument();
    expect(screen.getByText('+12%')).toBeInTheDocument();
  });

  it('should render the icon with the correct background color', () => {
    render(<StatsCard stat={mockStat} />);

    // The icon itself is an SVG, we can check its container
    const iconContainer = screen.getByText('Total Users').parentElement.querySelector('.rounded-lg');
    expect(iconContainer).toHaveClass('bg-blue-500');
  });

  it('should render gracefully if some data is missing', () => {
    const incompleteStat = {
      title: 'Total Revenue',
      value: '$50,000',
      icon: Users, // Re-using icon for simplicity
      color: 'bg-green-500',
      // Missing 'change'
    };

    render(<StatsCard stat={incompleteStat} />);

    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('$50,000')).toBeInTheDocument();
    // The change element should not be in the document
    expect(screen.queryByText(/\+/)).not.toBeInTheDocument();
  });
});
