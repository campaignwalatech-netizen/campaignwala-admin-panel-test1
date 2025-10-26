import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import {
  DistributeLeadsForm,
  UploadLeadsForm,
  ApproveAccountForm,
  AddAccountForm,
  DefaultView,
} from '../src/adminDashboard/components/DummyForms';

describe('DummyForms Components', () => {
  describe('DistributeLeadsForm', () => {
    it('should render all form elements correctly', () => {
      render(<DistributeLeadsForm />);
      expect(screen.getByText('Distribute Leads')).toBeInTheDocument();
      expect(screen.getByLabelText('Select Team Member')).toBeInTheDocument();
      expect(screen.getByLabelText('Number of Leads')).toBeInTheDocument();
      expect(screen.getByLabelText('Priority')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Distribute/i })).toBeInTheDocument();
    });

    it('should allow user input', async () => {
      const user = userEvent.setup();
      render(<DistributeLeadsForm />);
      
      await user.selectOptions(screen.getByLabelText('Select Team Member'), 'Jane Smith');
      await user.type(screen.getByLabelText('Number of Leads'), '10');
      await user.selectOptions(screen.getByLabelText('Priority'), 'High');

      expect(screen.getByLabelText('Select Team Member')).toHaveValue('Jane Smith');
      expect(screen.getByLabelText('Number of Leads')).toHaveValue(10);
      expect(screen.getByLabelText('Priority')).toHaveValue('High');
    });
  });

  describe('UploadLeadsForm', () => {
    it('should render all form elements correctly', () => {
      render(<UploadLeadsForm />);
      expect(screen.getByText('Upload Fresh Leads')).toBeInTheDocument();
      expect(screen.getByLabelText('Upload CSV File')).toBeInTheDocument();
      expect(screen.getByLabelText('Campaign Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Description')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Upload Leads/i })).toBeInTheDocument();
    });

    it('should allow user input', async () => {
        const user = userEvent.setup();
        render(<UploadLeadsForm />);
        const file = new File(['(⌐□_□)'], 'chucknorris.csv', { type: 'text/csv' });

        await user.upload(screen.getByLabelText('Upload CSV File'), file);
        await user.type(screen.getByLabelText('Campaign Name'), 'Test Campaign');
        await user.type(screen.getByLabelText('Description'), 'Test Description');

        expect(screen.getByLabelText('Campaign Name')).toHaveValue('Test Campaign');
        expect(screen.getByLabelText('Description')).toHaveValue('Test Description');
        // We can't easily check the file input value, but we can check that the upload action was triggered.
        expect(screen.getByLabelText('Upload CSV File').files[0]).to.equal(file);
      });
  });

  describe('ApproveAccountForm', () => {
    it('should render the component correctly', () => {
      render(<ApproveAccountForm />);
      expect(screen.getByText('Approve Account')).toBeInTheDocument();
      expect(screen.getAllByText('Pending').length).toBeGreaterThan(0);
      expect(screen.getAllByRole('button', { name: /Approve/i }).length).toBeGreaterThan(0);
      expect(screen.getAllByRole('button', { name: /Reject/i }).length).toBeGreaterThan(0);
    });
  });

  describe('AddAccountForm', () => {
    it('should render all form elements correctly', () => {
      render(<AddAccountForm />);
      expect(screen.getByText('Add New Account')).toBeInTheDocument();
      expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Phone')).toBeInTheDocument();
      expect(screen.getByLabelText('Role')).toBeInTheDocument();
      expect(screen.getByLabelText('Address')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Add Account/i })).toBeInTheDocument();
    });

    it('should allow user input', async () => {
        const user = userEvent.setup();
        render(<AddAccountForm />);
        
        await user.type(screen.getByLabelText('Full Name'), 'Test User');
        await user.type(screen.getByLabelText('Email'), 'test@example.com');
        await user.type(screen.getByLabelText('Phone'), '1234567890');
        await user.selectOptions(screen.getByLabelText('Role'), 'Manager');
        await user.type(screen.getByLabelText('Address'), '123 Test St');
  
        expect(screen.getByLabelText('Full Name')).toHaveValue('Test User');
        expect(screen.getByLabelText('Email')).toHaveValue('test@example.com');
        expect(screen.getByLabelText('Phone')).toHaveValue('1234567890');
        expect(screen.getByLabelText('Role')).toHaveValue('Manager');
        expect(screen.getByLabelText('Address')).toHaveValue('123 Test St');
      });
  });

  describe('DefaultView', () => {
    it('should render the welcome message', () => {
      render(<DefaultView />);
      expect(screen.getByText('Welcome to Campaignwala Admin Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Select a menu item from the sidebar to get started')).toBeInTheDocument();
    });
  });
});
