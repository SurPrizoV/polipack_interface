import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';
import { describe, it, expect } from 'vitest';

describe('Input component', () => {
  it('renders correctly with placeholder', () => {
    render(<Input placeholder='Enter text' value='' handleChange={() => {}} />);
    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeInTheDocument();
  });

  it('renders with the correct value', () => {
    render(
      <Input placeholder='Enter text' value='Hello' handleChange={() => {}} />
    );
    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement.value).toBe('Hello');
  });

  it('calls handleChange function when value changes', () => {
    const handleChange = vi.fn();
    render(
      <Input placeholder='Enter text' value='' handleChange={handleChange} />
    );
    const inputElement = screen.getByPlaceholderText('Enter text');
    fireEvent.change(inputElement, { target: { value: 'New value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders children correctly', () => {
    render(
      <Input placeholder='Enter text' value='' handleChange={() => {}}>
        <span>Label</span>
      </Input>
    );
    const childElement = screen.getByText('Label');
    expect(childElement).toBeInTheDocument();
  });

  it('renders with default type "text"', () => {
    render(<Input placeholder='Enter text' value='' handleChange={() => {}} />);
    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  it('renders with correct type when provided', () => {
    render(
      <Input
        placeholder='Enter password'
        type='password'
        value=''
        handleChange={() => {}}
      />
    );
    const inputElement = screen.getByPlaceholderText('Enter password');
    expect(inputElement).toHaveAttribute('type', 'password');
  });
});
