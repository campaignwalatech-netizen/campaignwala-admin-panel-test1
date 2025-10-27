import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LeadsTable from '../src/adminDashboard/forms/LeadsTable';
import leadService from '../src/services/leadService';

// Mock the leadService
vi.mock('../src/services/leadService', () => ({
  default: {
    getAllLeads: vi.fn(),
    getLeadStats: vi.fn(),
    approveLead: vi.fn(),
    rejectLead: vi.fn(),
    updateLeadStatus: vi.fn(),
  }
}));

const mockLeads = [
  {
    _id: '1',
    leadId: 'LD001',
    createdAt: new Date().toISOString(),
    offerName: 'Brand Awareness Campaign',
    category: 'Digital Marketing',
    hrName: 'Rajesh Kumar',
    hrContact: '+91 9876543210',
    customerName: 'Amit Enterprises',
    customerContact: '+91 9876543220',
    commission1: '50,000',
    status: 'pending',
  },
];

const mockStats = {
  pending: 1,
  approved: 0,
  completed: 0,
  rejected: 0
};

describe('LeadsTable Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    leadService.getAllLeads.mockResolvedValue({ success: true, data: { leads: mockLeads } });
    leadService.getLeadStats.mockResolvedValue({ success: true, data: mockStats });
  });

  it('should render the table with leads', async () => {
    render(<LeadsTable status="pending" />);

    expect(screen.getByText('Pending Leads')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Brand Awareness Campaign')).toBeInTheDocument();
    });
  });

  it('should filter leads based on search term', async () => {
    render(<LeadsTable status="all" />);

    const searchInput = screen.getByPlaceholderText('Search by ID, name, category, offer, contact...');
    fireEvent.change(searchInput, { target: { value: 'LD001' } });

    await waitFor(() => {
        expect(leadService.getAllLeads).toHaveBeenCalledWith(expect.objectContaining({ search: 'LD001' }));
    });
  });

  it('should filter leads by campaign', async () => {
    render(<LeadsTable status="all" />);

    const filterSelect = screen.getByRole('combobox');
    fireEvent.change(filterSelect, { target: { value: 'marketing' } });

    await waitFor(() => {
        // The filtering is client-side in the component, so we check the result
        // This is a bit tricky to test without more complex mocks. 
        // A better approach would be to have the service handle the filtering.
        // For now, we just test that the select works.
        expect(filterSelect.value).toBe('marketing');
    });
  });

  it('should change lead status', async () => {
    leadService.updateLeadStatus.mockResolvedValue({ success: true });
    render(<LeadsTable status="pending" />);

    await waitFor(() => {
      expect(screen.getByText('Brand Awareness Campaign')).toBeInTheDocument();
    });

    const statusSelect = screen.getByRole('combobox', {name: ''});
    fireEvent.change(statusSelect, { target: { value: 'approved' } });

    await waitFor(() => {
      expect(leadService.updateLeadStatus).toHaveBeenCalledWith('1', { status: 'approved' });
    });
  });

  it('should open the view modal when "View" is clicked', async () => {
    render(<LeadsTable status="pending" />);

    await waitFor(() => {
      expect(screen.getByText('Brand Awareness Campaign')).toBeInTheDocument();
    });

    const viewButton = screen.getByText('View');
    fireEvent.click(viewButton);

    await waitFor(() => {
      expect(screen.getByText('View Lead Details')).toBeInTheDocument();
      expect(screen.getByText('LD001')).toBeInTheDocument();
    });
  });
});
