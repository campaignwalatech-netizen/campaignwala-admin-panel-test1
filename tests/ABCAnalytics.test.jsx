
import { render, screen, fireEvent } from '@testing-library/react';
import AnalyticsDashboard from '../src/adminDashboard/forms/ABCAnalytics';

// Mocking recharts library
vi.mock('recharts', () => {
  const OriginalModule = vi.requireActual('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,
    LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
    PieChart: ({ children }) => <div data-testid="pie-chart">{children}</div>,
    Line: () => <div data-testid="line" />,
    Pie: () => <div data-testid="pie" />,
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
    CartesianGrid: () => <div data-testid="cartesian-grid" />,
    Tooltip: () => <div data-testid="tooltip" />,
    Cell: () => <div data-testid="cell" />,
  };
});

// Mocking lucide-react icons
vi.mock('lucide-react', () => ({
  ChevronLeft: () => <div data-testid="chevron-left" />,
  ChevronRight: () => <div data-testid="chevron-right" />,
  Search: () => <div data-testid="search-icon" />,
}));

describe('AnalyticsDashboard', () => {
  test('renders the dashboard title', () => {
    render(<AnalyticsDashboard />);
    expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
  });

  test('renders all metric cards with initial data', () => {
    render(<AnalyticsDashboard />);
    expect(screen.getByText('DateWise Count')).toBeInTheDocument();
    expect(screen.getByText('31')).toBeInTheDocument();

    expect(screen.getByText('Total Count')).toBeInTheDocument();
    expect(screen.getByText('2591')).toBeInTheDocument();

    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('2586')).toBeInTheDocument();

    expect(screen.getByText('Approved')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();

    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('renders all charts', () => {
    render(<AnalyticsDashboard />);
    expect(screen.getByText('Date Wise Account Created')).toBeInTheDocument();
    expect(screen.getAllByTestId('line-chart').length).toBe(1);

    expect(screen.getByText('Pending Account 2586')).toBeInTheDocument();
    expect(screen.getAllByTestId('pie-chart').length).toBe(3);
  });

  test('updates metric cards when a new TL is selected', () => {
    render(<AnalyticsDashboard />);
    const tlSelect = screen.getByRole('combobox', { name: '' });
    fireEvent.change(tlSelect, { target: { value: 'Abhinandan Shukla' } });

    expect(screen.getByText('DateWise Count')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();

    expect(screen.getByText('Total Count')).toBeInTheDocument();
    expect(screen.getByText('3200')).toBeInTheDocument();

    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('2800')).toBeInTheDocument();

    expect(screen.getByText('Approved')).toBeInTheDocument();
    expect(screen.getByText('350')).toBeInTheDocument();

    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
  });
});
