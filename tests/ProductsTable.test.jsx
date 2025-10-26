import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductsTable from '../src/adminDashboard/components/ProductsTable';

describe('ProductsTable Component', () => {
  // Mock the alert function
  const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

  beforeEach(() => {
    alertMock.mockClear();
  });

  it('should render the table with title, toolbar, and correct headers', () => {
    render(<ProductsTable />);

    expect(screen.getByText('ALL Offers 18')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Export/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Filter/i })).toBeInTheDocument();

    // Check for table headers
    expect(screen.getByRole('columnheader', { name: /IMAGE/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /DATE/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /LATEST STAGE/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /COMMISSION/i })).toBeInTheDocument();
  });

  it('should render the correct number of rows based on mock data', () => {
    render(<ProductsTable />);
    // Get all rows in the table body
    const rows = screen.getAllByRole('row');
    // The mock data has 5 items, plus 1 header row
    expect(rows).toHaveLength(6);
  });

  it('should display data correctly in a table row', () => {
    render(<ProductsTable />);
    // Check content of the first data row (Google)
    expect(screen.getByRole('cell', { name: /Google/i })).toBeInTheDocument();
    expect(screen.getByText('08/06/2025')).toBeInTheDocument();
    expect(screen.getAllByText('UPLOAD')[0]).toBeInTheDocument(); // There might be multiple
    expect(screen.getAllByText('₹50')[0]).toBeInTheDocument();
  });

  it('should call the export alert when the export button is clicked', () => {
    render(<ProductsTable />);
    const exportButton = screen.getByRole('button', { name: /Export/i });
    fireEvent.click(exportButton);
    expect(alertMock).toHaveBeenCalledWith('Exporting campaigns data...');
  });

  it('should have clickable action buttons in each row', () => {
    render(<ProductsTable />);
    // Get all action buttons (MoreVertical icon)
    const actionButtons = screen.getAllByRole('button', { name: /more/i });
    // Check if the first one is clickable
    fireEvent.click(actionButtons[0]);
    // No specific outcome, just ensuring it doesn't crash and is interactive
    expect(actionButtons[0]).toBeEnabled();
  });
});
