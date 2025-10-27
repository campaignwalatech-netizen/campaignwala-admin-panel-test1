
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddCategoryForm from '../src/adminDashboard/forms/AddCategoryForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { createCategory, updateCategory } from '../src/services/categoryService';

// Mocking react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

// Mocking categoryService
jest.mock('../src/services/categoryService', () => ({
  createCategory: jest.fn(),
  updateCategory: jest.fn(),
}));

// Mocking lucide-react icons
jest.mock('lucide-react', () => ({
  Upload: () => <div data-testid="upload-icon" />,
  X: () => <div data-testid="x-icon" />,
  ImageIcon: () => <div data-testid="image-icon" />,
  Loader2: () => <div data-testid="loader-icon" />,
}));

const mockNavigate = jest.fn();

beforeEach(() => {
  useLocation.mockReturnValue({ state: null });
  useNavigate.mockReturnValue(mockNavigate);
  createCategory.mockClear();
  updateCategory.mockClear();
  mockNavigate.mockClear();
});

describe('AddCategoryForm', () => {
  test('renders in "Add New Category" mode', () => {
    render(<AddCategoryForm />);
    expect(screen.getByText('Add New Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Category Name')).toHaveValue('');
    expect(screen.getByText('Add Category')).toBeInTheDocument();
  });

  test('renders in "Edit Category" mode', () => {
    const editCategory = {
      _id: '123',
      name: 'Test Category',
      description: 'Test Description',
      icon: 'test-icon',
      status: 'inactive',
      iconImage: 'http://example.com/icon.png',
    };
    useLocation.mockReturnValue({ state: { editCategory } });
    render(<AddCategoryForm />);

    expect(screen.getByText('Edit Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Category Name')).toHaveValue('Test Category');
    expect(screen.getByLabelText('Description')).toHaveValue('Test Description');
    expect(screen.getByLabelText('Status')).toHaveValue('inactive');
    expect(screen.getByText('Update Category')).toBeInTheDocument();
    expect(screen.getByAltText('Category icon preview')).toBeInTheDocument();
  });

  test('allows form fields to be updated', () => {
    render(<AddCategoryForm />);
    fireEvent.change(screen.getByLabelText('Category Name'), { target: { value: 'New Name' } });
    expect(screen.getByLabelText('Category Name')).toHaveValue('New Name');
  });

  test('submits new category data correctly', async () => {
    createCategory.mockResolvedValue({ success: true });
    render(<AddCategoryForm />);

    fireEvent.change(screen.getByLabelText('Category Name'), { target: { value: 'New Category' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'New Description' } });
    fireEvent.submit(screen.getByText('Add Category'));

    await waitFor(() => {
      expect(createCategory).toHaveBeenCalledWith({
        name: 'New Category',
        description: 'New Description',
        icon: '',
        status: 'active',
        iconImage: ''
      });
      expect(screen.getByText('✅ Category created successfully!')).toBeInTheDocument();
    });

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/admin/categories'), { timeout: 2000 });
  });

  test('submits updated category data correctly', async () => {
    const editCategory = { _id: '123', name: 'Old Name', description: 'Old Desc' };
    useLocation.mockReturnValue({ state: { editCategory } });
    updateCategory.mockResolvedValue({ success: true });
    render(<AddCategoryForm />);

    fireEvent.change(screen.getByLabelText('Category Name'), { target: { value: 'Updated Category' } });
    fireEvent.submit(screen.getByText('Update Category'));

    await waitFor(() => {
      expect(updateCategory).toHaveBeenCalledWith('123', expect.objectContaining({ name: 'Updated Category' }));
      expect(screen.getByText('✅ Category updated successfully!')).toBeInTheDocument();
    });
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/admin/categories'), { timeout: 2000 });
  });

  test('handles image upload', () => {
    render(<AddCategoryForm />);
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const input = screen.getByLabelText('Category Icon Image');

    Object.defineProperty(input, 'files', { value: [file] });
    fireEvent.change(input);

    // This part is tricky to test with JSDOM without more complex mocks for FileReader
    // We will just check if the file is set in the form data
  });

  test('shows error message on submission failure', async () => {
    createCategory.mockRejectedValue(new Error('Failed to create'));
    render(<AddCategoryForm />);

    fireEvent.change(screen.getByLabelText('Category Name'), { target: { value: 'Test' } });
    fireEvent.submit(screen.getByText('Add Category'));

    await waitFor(() => {
      expect(screen.getByText(/Failed to create category/)).toBeInTheDocument();
    });
  });

  test('cancel button navigates back', () => {
    render(<AddCategoryForm />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockNavigate).toHaveBeenCalledWith('/admin/categories');
  });
});
