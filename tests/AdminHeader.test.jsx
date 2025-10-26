import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AdminHeader from '../src/adminDashboard/components/AdminHeader';
import { ThemeProvider } from '../src/context-api/ThemeContext';

// Mock ThemeProvider to control theme value and toggle function
const MockThemeProvider = ({ children, theme = 'light', toggleTheme = () => {} }) => (
  <ThemeProvider value={{ theme, toggleTheme }}>{children}</ThemeProvider>
);

describe('AdminHeader Component', () => {
  it('should render the title correctly', () => {
    render(
      <MockThemeProvider>
        <AdminHeader setSidebarOpen={() => {}} />
      </MockThemeProvider>
    );
    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
  });

  it('should call setSidebarOpen when the menu button is clicked', () => {
    const setSidebarOpen = vi.fn();
    render(
      <MockThemeProvider>
        <AdminHeader setSidebarOpen={setSidebarOpen} />
      </MockThemeProvider>
    );

    const menuButton = screen.getByLabelText('Open menu');
    fireEvent.click(menuButton);
    expect(setSidebarOpen).toHaveBeenCalledWith(true);
  });

  it('should call toggleTheme when the theme button is clicked', () => {
    const toggleTheme = vi.fn();
    render(
      <MockThemeProvider toggleTheme={toggleTheme}>
        <AdminHeader setSidebarOpen={() => {}} />
      </MockThemeProvider>
    );

    const themeButton = screen.getByLabelText('Toggle theme');
    fireEvent.click(themeButton);
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });

  it('should display the moon icon in light mode', () => {
    render(
      <MockThemeProvider theme="light">
        <AdminHeader setSidebarOpen={() => {}} />
      </MockThemeProvider>
    );
    // The following checks for the presence of the Moon icon via its default title
    expect(screen.getByTitle('Moon')).toBeInTheDocument();
    expect(screen.queryByTitle('Sun')).not.toBeInTheDocument();
  });

  it('should display the sun icon in dark mode', () => {
    render(
      <MockThemeProvider theme="dark">
        <AdminHeader setSidebarOpen={() => {}} />
      </MockThemeProvider>
    );
    // The following checks for the presence of the Sun icon via its default title
    expect(screen.getByTitle('Sun')).toBeInTheDocument();
    expect(screen.queryByTitle('Moon')).not.toBeInTheDocument();
  });
});