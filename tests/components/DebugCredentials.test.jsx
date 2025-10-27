
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DebugCredentials from '../../../src/components/DebugCredentials';

describe('DebugCredentials Component', () => {
  it('should render the component with credentials and a button', () => {
    render(<DebugCredentials />);
    expect(screen.getByText('Debug Credentials')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /test credentials in console/i })).toBeInTheDocument();
    expect(screen.getByText(/user: 9876543211 \/ user123/i)).toBeInTheDocument();
    expect(screen.getByText(/admin: 9876543210 \/ admin123/i)).toBeInTheDocument();
  });

  it('should log test credentials to the console when the button is clicked', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    render(<DebugCredentials />);
    const button = screen.getByRole('button', { name: /test credentials in console/i });
    fireEvent.click(button);
    expect(consoleSpy).toHaveBeenCalledWith('=== CREDENTIAL TEST ===');
    expect(consoleSpy).toHaveBeenCalledWith('=== ADMIN TEST ===');
    consoleSpy.mockRestore();
  });
});
