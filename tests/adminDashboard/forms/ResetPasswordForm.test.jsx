
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ResetPasswordForm from '../../../../src/adminDashboard/forms/ResetPasswordForm';

describe('ResetPasswordForm Component', () => {
  it('should render the form with all fields', () => {
    render(<ResetPasswordForm />);
    expect(screen.getByText('Reset User Password')).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/otp verification/i)).toBeInTheDocument();
  });

  it('should show an alert if passwords do not match', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<ResetPasswordForm />);
    fireEvent.change(screen.getByLabelText(/new password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password456' } });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));
    expect(alertSpy).toHaveBeenCalledWith('Passwords do not match!');
    alertSpy.mockRestore();
  });

  it('should show an alert for an invalid OTP', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<ResetPasswordForm />);
    fireEvent.change(screen.getByLabelText(/new password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/otp verification/i), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));
    expect(alertSpy).toHaveBeenCalledWith('Please enter a valid 6-digit OTP!');
    alertSpy.mockRestore();
  });

  it('should show a success alert on valid submission', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<ResetPasswordForm />);
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/new password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/otp verification/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));
    expect(alertSpy).toHaveBeenCalledWith('Password reset successfully!');
    alertSpy.mockRestore();
  });
});
