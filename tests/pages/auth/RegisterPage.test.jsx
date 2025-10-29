
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import RegisterPage from '../../../src/pages/auth/Register';
import { useAuth } from '../../../src/hooks/useAuth';

// Mock the useAuth hook
vi.mock('../../../src/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

const mockRequestOTP = vi.fn();
const mockRegister = vi.fn();

const renderWithRouter = (ui) => {
  return render(ui, { wrapper: MemoryRouter });
};

describe('RegisterPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuth.mockReturnValue({
      requestOTP: mockRequestOTP,
      register: mockRegister,
      isLoading: false,
      error: null,
    });
    // Mock environment variable
    global.import.meta.env = { VITE_STATIC_OTP: '1006' };
  });

  it('should render the initial phone number step', () => {
    renderWithRouter(<RegisterPage />);
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send otp/i })).toBeInTheDocument();
  });

  it('should show an error for an invalid phone number', () => {
    renderWithRouter(<RegisterPage />);
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /send otp/i }));
    expect(screen.getByText(/please enter a valid 10-digit phone number/i)).toBeInTheDocument();
    expect(mockRequestOTP).not.toHaveBeenCalled();
  });

  it('should call requestOTP and proceed to OTP step on valid phone number', async () => {
    mockRequestOTP.mockResolvedValue({ otp: '1234' });
    renderWithRouter(<RegisterPage />);

    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '1234567890' } });
    fireEvent.click(screen.getByRole('button', { name: /send otp/i }));

    await vi.waitFor(() => {
      expect(mockRequestOTP).toHaveBeenCalledWith('1234567890');
    });

    // Now in OTP step
    expect(screen.getByText(/enter the 4-digit otp/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /verify otp/i })).toBeInTheDocument();
  });

  it('should show an error for an invalid OTP', async () => {
    renderWithRouter(<RegisterPage />);
    // Go to OTP step first
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '1234567890' } });
    fireEvent.click(screen.getByRole('button', { name: /send otp/i }));
    await vi.waitFor(() => expect(screen.getByText(/enter the 4-digit otp/i)).toBeInTheDocument());

    // Enter invalid OTP
    const otpInputs = screen.getAllByRole('textbox');
    fireEvent.change(otpInputs[0], { target: { value: '1' } });
    fireEvent.change(otpInputs[1], { target: { value: '2' } });
    fireEvent.change(otpInputs[2], { target: { value: '3' } });
    fireEvent.change(otpInputs[3], { target: { value: '5' } });
    fireEvent.click(screen.getByRole('button', { name: /verify otp/i }));

    expect(await screen.findByText(/invalid otp. please try again./i)).toBeInTheDocument();
  });

  it('should proceed to details step on valid OTP', async () => {
    renderWithRouter(<RegisterPage />);
    // Go to OTP step
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '1234567890' } });
    fireEvent.click(screen.getByRole('button', { name: /send otp/i }));
    await vi.waitFor(() => expect(screen.getByText(/enter the 4-digit otp/i)).toBeInTheDocument());

    // Enter valid OTP
    const otpInputs = screen.getAllByRole('textbox');
    fireEvent.change(otpInputs[0], { target: { value: '1' } });
    fireEvent.change(otpInputs[1], { target: { value: '0' } });
    fireEvent.change(otpInputs[2], { target: { value: '0' } });
    fireEvent.change(otpInputs[3], { target: { value: '6' } });
    fireEvent.click(screen.getByRole('button', { name: /verify otp/i }));

    // Now in details step
    await vi.waitFor(() => {
        expect(screen.getByText(/otp verified! please complete your registration./i)).toBeInTheDocument();
    });
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /complete registration/i })).toBeInTheDocument();
  });

  it('should show validation errors on the final registration step', async () => {
    renderWithRouter(<RegisterPage />);
    // Manually advance to the details step for the test
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '1234567890' } });
    fireEvent.click(screen.getByRole('button', { name: /send otp/i }));
    await vi.waitFor(() => expect(screen.getByText(/enter the 4-digit otp/i)).toBeInTheDocument());
    const otpInputs = screen.getAllByRole('textbox');
    fireEvent.change(otpInputs[0], { target: { value: '1' } });
    fireEvent.change(otpInputs[1], { target: { value: '0' } });
    fireEvent.change(otpInputs[2], { target: { value: '0' } });
    fireEvent.change(otpInputs[3], { target: { value: '6' } });
    fireEvent.click(screen.getByRole('button', { name: /verify otp/i }));
    await vi.waitFor(() => expect(screen.getByLabelText(/full name/i)).toBeInTheDocument());

    // Test empty fields
    fireEvent.click(screen.getByRole('button', { name: /complete registration/i }));
    expect(await screen.findByText(/all fields are required/i)).toBeInTheDocument();

    // Test short password
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /complete registration/i }));
    expect(await screen.findByText(/password must be at least 6 characters long/i)).toBeInTheDocument();
  });

  it('should call register on successful completion', async () => {
    renderWithRouter(<RegisterPage />);
    // Manually advance to the details step
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '1234567890' } });
    fireEvent.click(screen.getByRole('button', { name: /send otp/i }));
    await vi.waitFor(() => expect(screen.getByText(/enter the 4-digit otp/i)).toBeInTheDocument());
    const otpInputs = screen.getAllByRole('textbox');
    fireEvent.change(otpInputs[0], { target: { value: '1' } });
    fireEvent.change(otpInputs[1], { target: { value: '0' } });
    fireEvent.change(otpInputs[2], { target: { value: '0' } });
    fireEvent.change(otpInputs[3], { target: { value: '6' } });
    fireEvent.click(screen.getByRole('button', { name: /verify otp/i }));
    await vi.waitFor(() => expect(screen.getByLabelText(/full name/i)).toBeInTheDocument());

    // Fill form and submit
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /complete registration/i }));

    await vi.waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        phoneNumber: '1234567890',
        otp: '1006',
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
