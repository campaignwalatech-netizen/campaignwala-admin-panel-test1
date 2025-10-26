import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  DeleteModal,
  EditModal,
  ConfirmModal,
} from '../src/adminDashboard/components/Modals';

describe('Modal Components', () => {
  describe('DeleteModal', () => {
    const mockOnClose = vi.fn();
    const mockOnConfirm = vi.fn();

    it('should not render when isOpen is false', () => {
      const { container } = render(
        <DeleteModal isOpen={false} onClose={mockOnClose} onConfirm={mockOnConfirm} itemName="Test Item" />
      );
      expect(container.firstChild).toBeNull();
    });

    it('should render correctly when isOpen is true', () => {
      render(<DeleteModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} itemName="Test Item" />);
      expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
      expect(screen.getByText(/Are you sure you want to delete/)).toBeInTheDocument();
      expect(screen.getByText('Test Item')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Delete/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    });

    it('should call onClose when the close and cancel buttons are clicked', () => {
      render(<DeleteModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} itemName="Test Item" />);
      fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
      expect(mockOnClose).toHaveBeenCalledTimes(1);

      fireEvent.click(screen.getByLabelText('Close'));
      expect(mockOnClose).toHaveBeenCalledTimes(2);
    });

    it('should call onConfirm when the delete button is clicked', () => {
      render(<DeleteModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} itemName="Test Item" />);
      fireEvent.click(screen.getByRole('button', { name: /Delete/i }));
      expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });
  });

  describe('EditModal', () => {
    const mockOnClose = vi.fn();
    const mockOnConfirm = vi.fn();

    it('should not render when isOpen is false', () => {
        const { container } = render(
            <EditModal isOpen={false} onClose={mockOnClose} onConfirm={mockOnConfirm} title="Edit Item">
              <div>Child Content</div>
            </EditModal>
          );
          expect(container.firstChild).toBeNull();
    });

    it('should render correctly with title and children', () => {
      render(
        <EditModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} title="Edit Item">
          <div>Child Content</div>
        </EditModal>
      );
      expect(screen.getByText('Edit Item')).toBeInTheDocument();
      expect(screen.getByText('Child Content')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Save Changes/i })).toBeInTheDocument();
    });

    it('should call onClose when the close and cancel buttons are clicked', () => {
        render(
          <EditModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} title="Edit Item">
            <div>Child Content</div>
          </EditModal>
        );
        fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
        expect(mockOnClose).toHaveBeenCalledTimes(1);
  
        fireEvent.click(screen.getByLabelText('Close'));
        expect(mockOnClose).toHaveBeenCalledTimes(2);
      });
  });

  describe('ConfirmModal', () => {
    const mockOnClose = vi.fn();
    const mockOnConfirm = vi.fn();

    it('should render with custom props', () => {
      render(
        <ConfirmModal
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          title="Confirm Action"
          message="Are you sure?"
          confirmText="Yes, Proceed"
        />
      );
      expect(screen.getByText('Confirm Action')).toBeInTheDocument();
      expect(screen.getByText('Are you sure?')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Yes, Proceed/i })).toBeInTheDocument();
    });

    it('should call onClose when the close and cancel buttons are clicked', () => {
        render(
            <ConfirmModal
                isOpen={true}
                onClose={mockOnClose}
                onConfirm={mockOnConfirm}
                title="Confirm Action"
                message="Are you sure?"
                confirmText="Yes, Proceed"
            />
        );
        fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    
        fireEvent.click(screen.getByLabelText('Close'));
        expect(mockOnClose).toHaveBeenCalledTimes(2);
    });

    it('should apply the correct color class to the confirm button', () => {
        render(
          <ConfirmModal
            isOpen={true}
            onClose={mockOnClose}
            onConfirm={mockOnConfirm}
            title="Confirm Action"
            message="Are you sure?"
            confirmText="Yes, Proceed"
            confirmColor="green"
          />
        );
        expect(screen.getByRole('button', { name: /Yes, Proceed/i })).toHaveClass('bg-green-600');
      });
  });
});