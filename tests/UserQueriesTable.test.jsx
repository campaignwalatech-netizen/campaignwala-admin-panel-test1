import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UserQueriesTable from '../src/adminDashboard/forms/UserQueriesTable';
import { ThemeProvider } from '../src/context-api/ThemeContext';

const renderWithTheme = (component) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('UserQueriesTable Component', () => {
  it('should render the queries correctly', () => {
    renderWithTheme(<UserQueriesTable />);

    expect(screen.getByText('QUERIES')).toBeInTheDocument();
    expect(screen.getByText('Jahnavi Verma')).toBeInTheDocument();
    expect(screen.getByText('Login Button Issue')).toBeInTheDocument();
  });

  it('should open the reply modal when "Reply" is clicked', async () => {
    renderWithTheme(<UserQueriesTable />);

    const replyButtons = screen.getAllByText('Reply');
    fireEvent.click(replyButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Reply to Query')).toBeInTheDocument();
      expect(screen.getByText('Original Query:')).toBeInTheDocument();
    });
  });

  it('should send a reply and close the modal', async () => {
    renderWithTheme(<UserQueriesTable />);

    const replyButtons = screen.getAllByText('Reply');
    fireEvent.click(replyButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Reply to Query')).toBeInTheDocument();
    });

    const replyTextarea = screen.getByPlaceholderText('Type your response here...');
    fireEvent.change(replyTextarea, { target: { value: 'Test reply' } });

    const sendButton = screen.getByText('Send Reply');
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.queryByText('Reply to Query')).not.toBeInTheDocument();
    });

    // The card should now show "Reply Again"
    const jahnaviCard = screen.getByText('Jahnavi Verma').closest('div.shadow-md');
    expect(jahnaviCard).toHaveTextContent('Reply Again');
  });

  it('should close the modal when "Cancel" is clicked', async () => {
    renderWithTheme(<UserQueriesTable />);

    const replyButtons = screen.getAllByText('Reply');
    fireEvent.click(replyButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Reply to Query')).toBeInTheDocument();
    });

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByText('Reply to Query')).not.toBeInTheDocument();
    });
  });
});
