import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription } from './Card';
import { Users } from 'lucide-react';

describe('Card', () => {
  it('renders children content', () => {
    render(
      <Card>
        <p>Test content</p>
      </Card>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders as a div by default', () => {
    const { container } = render(<Card>Content</Card>);

    const card = container.firstChild;
    expect(card?.nodeName).toBe('DIV');
  });

  it('renders as a section when specified', () => {
    const { container } = render(<Card as="section">Content</Card>);

    const card = container.firstChild;
    expect(card?.nodeName).toBe('SECTION');
  });

  it('renders as an article when specified', () => {
    const { container } = render(<Card as="article">Content</Card>);

    const card = container.firstChild;
    expect(card?.nodeName).toBe('ARTICLE');
  });

  it('applies custom className alongside base styles', () => {
    const { container } = render(
      <Card className="custom-class">Content</Card>
    );

    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('card');
    expect(card.className).toContain('custom-class');
  });

  it('passes through ARIA attributes', () => {
    render(
      <Card
        role="region"
        aria-labelledby="card-title"
        aria-describedby="card-description"
      >
        <h2 id="card-title">Title</h2>
        <p id="card-description">Description</p>
      </Card>
    );

    const card = screen.getByRole('region');
    expect(card).toHaveAttribute('aria-labelledby', 'card-title');
    expect(card).toHaveAttribute('aria-describedby', 'card-description');
  });

  it('renders nested components correctly', () => {
    render(
      <Card>
        <h2>Heading</h2>
        <p>Paragraph</p>
        <button type="button">Action</button>
      </Card>
    );

    expect(screen.getByRole('heading', { name: 'Heading' })).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('applies purple variant styles when specified', () => {
    const { container } = render(<Card variant="purple">Content</Card>);

    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('card');
    expect(card.className).toContain('cardPurple');
  });

  it('does not apply purple variant by default', () => {
    const { container } = render(<Card>Content</Card>);

    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('card');
    expect(card.className).not.toContain('cardPurple');
  });
});

describe('CardHeader', () => {
  it('renders children content', () => {
    render(
      <CardHeader>
        <h2>Test Header</h2>
      </CardHeader>
    );

    expect(screen.getByRole('heading', { name: 'Test Header' })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <CardHeader className="custom-header">Content</CardHeader>
    );

    const header = container.firstChild as HTMLElement;
    expect(header.className).toContain('cardHeader');
    expect(header.className).toContain('custom-header');
  });
});

describe('CardTitle', () => {
  it('renders title text', () => {
    render(<CardTitle>Test Title</CardTitle>);

    expect(screen.getByRole('heading', { name: 'Test Title' })).toBeInTheDocument();
  });

  it('renders with icon', () => {
    render(
      <CardTitle icon={<Users data-testid="icon" size={20} />}>
        Title with Icon
      </CardTitle>
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Title with Icon' })).toBeInTheDocument();
  });

  it('applies id attribute', () => {
    render(<CardTitle id="section-heading">Test Title</CardTitle>);

    const heading = screen.getByRole('heading', { name: 'Test Title' });
    expect(heading).toHaveAttribute('id', 'section-heading');
  });

  it('applies custom className', () => {
    const { container } = render(
      <CardTitle className="custom-title">Title</CardTitle>
    );

    const title = container.firstChild as HTMLElement;
    expect(title.className).toContain('cardTitle');
    expect(title.className).toContain('custom-title');
  });
});

describe('CardDescription', () => {
  it('renders description text', () => {
    render(<CardDescription>Test description text</CardDescription>);

    expect(screen.getByText('Test description text')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <CardDescription className="custom-desc">Description</CardDescription>
    );

    const description = container.firstChild as HTMLElement;
    expect(description.className).toContain('cardDescription');
    expect(description.className).toContain('custom-desc');
  });
});
