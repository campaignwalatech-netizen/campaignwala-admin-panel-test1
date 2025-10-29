import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loader from '../../src/components/Loader';

describe('Loader Component', () => {
  it('should render with default props', () => {
    render(<Loader />);
    const loaderContainer = screen.getByText('Loading...').parentElement;
    const loaderSpinner = loaderContainer.firstChild;

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(loaderSpinner).toHaveClass('w-8', 'h-8'); // md
    expect(screen.getByText('Loading...')).toHaveClass('text-base'); // md
  });

  it.each([
    ['sm', 'w-4 h-4', 'text-sm'],
    ['md', 'w-8 h-8', 'text-base'],
    ['lg', 'w-12 h-12', 'text-lg'],
  ])('should render with size "%s"', (size, loaderClass, textClass) => {
    render(<Loader size={size} />);
    const loaderContainer = screen.getByText('Loading...').parentElement;
    const loaderSpinner = loaderContainer.firstChild;

    expect(loaderSpinner).toHaveClass(...loaderClass.split(' '));
    expect(screen.getByText('Loading...')).toHaveClass(textClass);
  });

  it('should display custom text', () => {
    render(<Loader text="Please wait" />);
    expect(screen.getByText('Please wait')).toBeInTheDocument();
  });

  it('should not render text when the text prop is null or empty', () => {
    const { rerender } = render(<Loader text="" />);
    expect(screen.queryByText(/Loading/)).not.toBeInTheDocument();

    rerender(<Loader text={null} />);
    expect(screen.queryByText(/Loading/)).not.toBeInTheDocument();
  });

  it('should apply a custom className', () => {
    render(<Loader className="my-custom-loader" />);
    const loaderContainer = screen.getByText('Loading...').parentElement;
    expect(loaderContainer).toHaveClass('my-custom-loader');
  });
});