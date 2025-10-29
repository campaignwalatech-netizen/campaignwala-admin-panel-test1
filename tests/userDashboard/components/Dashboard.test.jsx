
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../../../src/userDashboard/components/Dashboard';
import api from '../../../src/services/api';

// Mock dependencies
vi.mock('../../../src/services/api');

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

const mockCategories = [
  { _id: '1', name: 'Category 1', description: 'Description 1' },
  { _id: '2', name: 'Category 2', description: 'Description 2' },
];

describe('User Dashboard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (darkMode = false) => {
    return render(
      <MemoryRouter>
        <Dashboard darkMode={darkMode} />
      </MemoryRouter>
    );
  };

  it('should render the welcome message and static cards', () => {
    api.get.mockResolvedValue({ data: { success: false, data: { categories: [] } } });
    renderComponent();
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    expect(screen.getByText(/current balance/i)).toBeInTheDocument();
    expect(screen.getByText(/total earnings/i)).toBeInTheDocument();
    expect(screen.getByText(/total bonus/i)).toBeInTheDocument();
  });

  it('should show a loading state while fetching categories', () => {
    api.get.mockReturnValue(new Promise(() => {})); // Promise that never resolves
    renderComponent();
    expect(screen.getByText(/loading categories.../i)).toBeInTheDocument();
  });

  it('should display categories when the API call is successful', async () => {
    api.get.mockResolvedValue({ data: { success: true, data: { categories: mockCategories } } });
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Category 1')).toBeInTheDocument();
      expect(screen.getByText('Category 2')).toBeInTheDocument();
    });

    // Fallback cards should not be present
    expect(screen.queryByText(/industrial bank credit card/i)).not.toBeInTheDocument();
  });

  it('should display fallback offers if the API call fails', async () => {
    api.get.mockRejectedValue(new Error('API Error'));
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/industrial bank credit card/i)).toBeInTheDocument();
    });
    expect(screen.queryByText('Category 1')).not.toBeInTheDocument();
  });

  it('should navigate when a stat card is clicked', () => {
    api.get.mockResolvedValue({ data: { success: false, data: { categories: [] } } });
    renderComponent();

    fireEvent.click(screen.getByText(/current balance/i));
    expect(mockNavigate).toHaveBeenCalledWith('/user/wallet-withdrawl');

    fireEvent.click(screen.getByText(/total earnings/i));
    expect(mockNavigate).toHaveBeenCalledWith('/user/total-balance');
  });

  it('should navigate when a category card is clicked', async () => {
    api.get.mockResolvedValue({ data: { success: true, data: { categories: mockCategories } } });
    renderComponent();

    await waitFor(() => {
      fireEvent.click(screen.getByText('Category 1'));
    });

    expect(mockNavigate).toHaveBeenCalledWith('/user/category-offers/1', {
      state: {
        categoryId: '1',
        categoryName: 'Category 1',
        categoryDescription: 'Description 1',
      },
    });
  });

  it('should apply dark mode classes when darkMode is true', () => {
    api.get.mockResolvedValue({ data: { success: false, data: { categories: [] } } });
    const { container } = renderComponent(true);
    expect(container.firstChild).toHaveClass('text-gray-100');
  });
});
