
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from '../../../src/App';

// Mock child components and hooks
vi.mock('../../../src/adminDashboard/components/Sidebar', () => ({
  default: () => <div>Sidebar</div>,
}));

vi.mock('../../../src/adminDashboard/components/Header', () => ({
  default: ({ onThemeToggle }) => (
    <div>
      <span>Header</span>
      <button onClick={onThemeToggle}>Toggle Theme</button>
    </div>
  ),
}));

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...actual,
      Outlet: () => <div>Outlet</div>,
    };
  });

const mockStore = configureStore([]);

describe('App Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isAuthenticated: true,
        userRole: 'admin',
      },
    });
    store.dispatch = vi.fn();
  });

  it('should render the main layout with Sidebar, Header, and Outlet', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Outlet')).toBeInTheDocument();
  });

  it('should toggle the theme when the theme toggle button is clicked', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const themeToggleButton = screen.getByText('Toggle Theme');

    // Initially, theme is dark
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    // Toggle to light
    fireEvent.click(themeToggleButton);
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Toggle back to dark
    fireEvent.click(themeToggleButton);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should dispatch updateLastActivity on user activity', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    fireEvent.mouseMove(document);

    // Check if the mocked dispatch was called with an action of the correct type
    const dispatchedAction = store.dispatch.mock.calls.find(
        (call) => call[0].type === 'auth/updateLastActivity'
      );
      expect(dispatchedAction).not.toBeUndefined();
  });
});
