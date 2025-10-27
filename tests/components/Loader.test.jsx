
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loader from '../../../src/components/Loader';

describe('Loader Component', () => {
  it('should render a medium-sized loader with default text', () => {
    render(<Loader />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    const loader = screen.getByText('Loading...').previousSibling;
    expect(loader).toHaveClass('w-8 h-8');
  });

  it('should render a small loader', () => {
    render(<Loader size="sm" />);
    const loader = screen.getByText('Loading...').previousSibling;
    expect(loader).toHaveClass('w-4 h-4');
  });

  it('should render a large loader', () => {
    render(<Loader size="lg" />);
    const loader = screen.getByText('Loading...').previousSibling;
    expect(loader).toHaveClass('w-12 h-12');
  });

  it('should display custom text', () => {
    render(<Loader text="Please wait" />);
    expect(screen.getByText('Please wait')).toBeInTheDocument();
  });

  it('should render without text if the text prop is an empty string', () => {
    render(<Loader text="" />);
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});
