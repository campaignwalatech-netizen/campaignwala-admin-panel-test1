import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ActivityFeed from '../src/adminDashboard/components/ActivityFeed';

describe('ActivityFeed Component', () => {
  const mockActivities = [
    { id: 1, user: 'John Doe', action: 'updated a product', time: '2 hours ago' },
    { id: 2, user: 'Jane Smith', action: 'approved a project', time: '3 hours ago' },
  ];

  it('should render the title and a list of activities correctly', () => {
    render(<ActivityFeed activities={mockActivities} />);

    // Check for the title
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();

    // Check that user names are rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();

    // Check that actions are rendered
    expect(screen.getByText('updated a product')).toBeInTheDocument();
    expect(screen.getByText('approved a project')).toBeInTheDocument();
  });

  it('should render only the title when the activity list is empty', () => {
    render(<ActivityFeed activities={[]} />);

    // Check for the title
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();

    // Ensure no activity-specific text is present
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('should not crash and should render gracefully if a user is null or undefined', () => {
    const activitiesWithNullUser = [
      { id: 1, user: null, action: 'did something', time: '1 hour ago' },
      mockActivities[1]
    ];

    // The render should not throw an error
    expect(() => render(<ActivityFeed activities={activitiesWithNullUser} />)).not.toThrow();

    // Check that the valid activity is still rendered
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    
    // Check that the title is still there
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
  });

  it('should render gracefully if action or time is missing', () => {
    const activitiesWithMissingKeys = [
      { id: 1, user: 'Test User', action: null, time: null },
    ];
    render(<ActivityFeed activities={activitiesWithMissingKeys} />);

    expect(screen.getByText('Test User')).toBeInTheDocument();
    // It should not display the text "null"
    expect(screen.queryByText('null')).not.toBeInTheDocument();
  });
});
