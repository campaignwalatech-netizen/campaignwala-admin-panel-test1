
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import UserDashboardLayout from '../../../src/userDashboard/layouts/UserDashboardLayout';

// Mock child components
vi.mock('../../../src/userDashboard/components/Navbar', () => ({
  default: vi.fn(() => <div>Navbar</div>),
}));
vi.mock('../../../src/userDashboard/components/Sidebar', () => ({
  default: vi.fn(() => <div>Sidebar</div>),
}));
vi.mock('../../../src/userDashboard/components/Footer', () => ({
  default: vi.fn(() => <div>Footer</div>),
}));

// Mock Outlet
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        Outlet: () => <div>Outlet Content</div>,
    };
});

import Navbar from '../../../src/userDashboard/components/Navbar';
import Sidebar from '../../../src/userDashboard/components/Sidebar';

describe('UserDashboardLayout', () => {
  let setDarkMode;

  beforeEach(() => {
    vi.clearAllMocks();
    setDarkMode = vi.fn();
  });

  const renderComponent = (darkMode = false) => {
    return render(
      <MemoryRouter>
        <UserDashboardLayout darkMode={darkMode} setDarkMode={setDarkMode} />
      </MemoryRouter>
    );
  };

  it('should render Navbar, Sidebar, Footer, and Outlet', () => {
    renderComponent();
    expect(screen.getByText('Navbar')).toBeInTheDocument();
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
    expect(screen.getByText('Outlet Content')).toBeInTheDocument();
  });

  it('should pass correct props to child components when sidebar is open', () => {
    renderComponent();
    
    // Check props passed to Sidebar
    expect(Sidebar).toHaveBeenCalledWith(expect.objectContaining({
      isSidebarOpen: true,
      darkMode: false,
    }), {});

    // Check props passed to Navbar
    expect(Navbar).toHaveBeenCalledWith(expect.objectContaining({
      darkMode: false,
      setDarkMode: setDarkMode,
    }), {});
  });

  it('should toggle sidebar state and pass it to children', () => {
    renderComponent();

    // The toggle function is passed to both Navbar and Sidebar.
    // We can grab it from the mock's props and call it.
    const toggleSidebarFn = vi.mocked(Sidebar).mock.calls[0][0].toggleSidebar;
    
    // Toggle the sidebar
    act(() => {
        toggleSidebarFn();
    });

    // Re-render or check if props updated. Since we can't easily re-render,
    // we'll check the class of the main content area.
    const mainContent = screen.getByText('Outlet Content').parentElement.parentElement;
    expect(mainContent).toHaveClass('ml-16'); // Collapsed margin
  });

  it('should pass darkMode prop correctly', () => {
    renderComponent(true);

    expect(Sidebar).toHaveBeenCalledWith(expect.objectContaining({ darkMode: true }), {});
    expect(Navbar).toHaveBeenCalledWith(expect.objectContaining({ darkMode: true }), {});
  });
});
