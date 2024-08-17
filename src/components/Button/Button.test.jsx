import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import { describe, it, expect } from 'vitest';

describe('Button component', () => {
  it('renders with the correct name', () => {
    render(<Button name='Click me' handleClick={() => {}} disabled={false} />);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
  });

  it('calls the handleClick function when clicked', () => {
    const handleClick = vi.fn();
    render(
      <Button name='Click me' handleClick={handleClick} disabled={false} />
    );
    const button = screen.getByText('Click me');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when the disabled prop is true', () => {
    render(<Button name='Click me' handleClick={() => {}} disabled={true} />);
    const button = screen.getByText('Click me');
    expect(button).toBeDisabled();
  });
});
