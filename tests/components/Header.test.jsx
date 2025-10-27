
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from '../../../src/components/Header';

// Mock the ProfileMenu component
vi.mock('../../../src/components/profile', () => ({
  default: () => <div data-testid="profile-menu">Profile Menu</div>,
}));

describe('Header Component', () => {
  it('should render the header with a title and campaign count', () => {
    render(<Header isDark={false} onThemeToggle={() => {}} />);
    expect(screen.getByText('ALL CAMPAIGNS')).toBeInTheDocument();
    expect(screen.getByText('18 active campaigns')).toBeInTheDocument();
  });

  it('should render the theme toggle button and ProfileMenu', () => {
    render(<Header isDark={false} onThemeToggle={() => {}} />);
    expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument();
    expect(screen.getByTestId('profile-menu')).toBeInTheDocument();
  });

  it('should call the theme toggle handler on click', () => {
    const handleThemeToggle = vi.fn();
    render(<Header isDark={false} onThemeToggle={handleThemeToggle} />);
    const button = screen.getByLabelText('Toggle theme');
    fireEvent.click(button);
    expect(handleThemeToggle).toHaveBeenCalledTimes(1);
  });
});
