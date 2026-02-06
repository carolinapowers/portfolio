import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders children content', () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('defaults to type="button"', () => {
    render(<Button>Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('applies custom type attribute', () => {
    render(<Button type="submit">Submit</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button', { name: 'Click me' });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies filter variant styles', () => {
    const { container } = render(<Button variant="filter">Filter</Button>);

    const button = container.firstChild as HTMLElement;
    expect(button.className).toContain('button');
    expect(button.className).toContain('buttonFilter');
  });

  it('applies primary variant styles', () => {
    const { container } = render(<Button variant="primary">Primary</Button>);

    const button = container.firstChild as HTMLElement;
    expect(button.className).toContain('buttonPrimary');
  });

  it('applies secondary variant styles by default', () => {
    const { container } = render(<Button>Secondary</Button>);

    const button = container.firstChild as HTMLElement;
    expect(button.className).toContain('buttonSecondary');
  });

  it('applies ghost variant styles', () => {
    const { container } = render(<Button variant="ghost">Ghost</Button>);

    const button = container.firstChild as HTMLElement;
    expect(button.className).toContain('buttonGhost');
  });

  it('applies small size styles', () => {
    const { container } = render(<Button size="sm">Small</Button>);

    const button = container.firstChild as HTMLElement;
    expect(button.className).toContain('sizeSm');
  });

  it('applies medium size styles by default', () => {
    const { container } = render(<Button>Medium</Button>);

    const button = container.firstChild as HTMLElement;
    expect(button.className).toContain('sizeMd');
  });

  it('applies large size styles', () => {
    const { container } = render(<Button size="lg">Large</Button>);

    const button = container.firstChild as HTMLElement;
    expect(button.className).toContain('sizeLg');
  });

  it('applies active state', () => {
    const { container } = render(<Button active>Active</Button>);

    const button = container.firstChild as HTMLElement;
    expect(button.className).toContain('active');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Button className="custom-button">Custom</Button>
    );

    const button = container.firstChild as HTMLElement;
    expect(button.className).toContain('button');
    expect(button.className).toContain('custom-button');
  });

  it('disables button when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('does not trigger onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('forwards additional props to button element', () => {
    render(
      <Button aria-label="Custom label" data-testid="test-button">
        Button
      </Button>
    );

    const button = screen.getByTestId('test-button');
    expect(button).toHaveAttribute('aria-label', 'Custom label');
  });

  it('applies aria-pressed when provided', () => {
    render(<Button aria-pressed={true}>Pressed</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });
});
