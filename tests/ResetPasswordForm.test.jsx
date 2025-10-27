import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ResetPasswordForm from '../src/adminDashboard/forms/ResetPasswordForm';

describe('ResetPasswordForm Component', () => {
  it('should render the form correctly', () => {
    render(<ResetPasswordForm />);

    expect(screen.getByText('Reset User Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByLabelText('New Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByLabelText('OTP Verification')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset Password' })).toBeInTheDocument();
  });

  it('should successfully reset password with valid data', () => {
    window.alert = vi.fn();
    render(<ResetPasswordForm />);

    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('New Password'), { target: { value: 'newpassword123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'newpassword123' } });
    fireEvent.change(screen.getByLabelText('OTP Verification'), { target: { value: '123456' } });

    fireEvent.click(screen.getByRole('button', { name: 'Reset Password' }));

    expect(window.alert).toHaveBeenCalledWith('Password reset successfully!');
  });

  it('should show an error for mismatched passwords', () => {
    window.alert = vi.fn();
    render(<ResetPasswordForm />);

    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('New Password'), { target: { value: 'newpassword123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'wrongpassword' } });
    fireEvent.change(screen.getByLabelText('OTP Verification'), { target: { value: '123456' } });

    fireEvent.click(screen.getByRole('button', { name: 'Reset Password' }));

    expect(window.alert).toHaveBeenCalledWith('Passwords do not match!');
  });

  it('should show an error for an invalid OTP', () => {
    window.alert = vi.fn();
    render(<ResetPasswordForm />);

    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('New Password'), { target: { value: 'newpassword123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'newpassword123' } });
    fireEvent.change(screen.getByLabelText('OTP Verification'), { target: { value: '123' } });

    fireEvent.click(screen.getByRole('button', { name: 'Reset Password' }));

    expect(window.alert).toHaveBeenCalledWith('Please enter a valid 6-digit OTP!');
  });
});
