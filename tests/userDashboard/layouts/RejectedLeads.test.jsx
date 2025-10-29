
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import RejectedLeads from '../../../src/userDashboard/layouts/RejectedLeads';

// Mock dependencies
const mockNavigate = vi.fn();
const mockUseLocation = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useLocation: () => mockUseLocation(),
    };
});

describe('RejectedLeads Layout', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseLocation.mockReturnValue({ pathname: '/user/rejected-leads' });
  });

  const renderComponent = (darkMode = false) => {
    return render(
      <MemoryRouter initialEntries={['/user/rejected-leads']}>
        <RejectedLeads darkMode={darkMode} />
      </MemoryRouter>
    );
  };

  it('should render the page title, filters, and tabs', () => {
    renderComponent();
    expect(screen.getByRole('heading', { name: /rejected leads/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search by name, offer, or contact/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /rejected leads/i })).toHaveClass('bg-blue-600');
  });

  it('should display all leads initially', () => {
    renderComponent();
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(5); // 1 header row + 4 data rows
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should filter leads by category', () => {
    renderComponent();
    const categoryFilter = screen.getByRole('combobox');

    fireEvent.change(categoryFilter, { target: { value: 'ICICI Bank' } });

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(2); // 1 header row + 1 data row
    expect(screen.getByText('Robert Johnson')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('should filter leads by search query (name)', () => {
    renderComponent();
    const searchInput = screen.getByPlaceholderText(/search/i);

    fireEvent.change(searchInput, { target: { value: 'Maria' } });

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(2);
    expect(screen.getByText('Maria Garcia')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('should filter leads by search query (contact)', () => {
    renderComponent();
    const searchInput = screen.getByPlaceholderText(/search/i);

    fireEvent.change(searchInput, { target: { value: '9988776655' } });

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(2);
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('should show a message when no leads are found', () => {
    renderComponent();
    const searchInput = screen.getByPlaceholderText(/search/i);

    fireEvent.change(searchInput, { target: { value: 'NonExistentName' } });

    expect(screen.getByText(/no rejected leads found/i)).toBeInTheDocument();
  });

  it('should navigate when a tab is clicked', () => {
    renderComponent();
    const approvedTab = screen.getByRole('button', { name: /approved leads/i });
    fireEvent.click(approvedTab);
    expect(mockNavigate).toHaveBeenCalledWith('/user/approved-leads');
  });
});
