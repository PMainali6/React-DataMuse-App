import { render, screen } from '@testing-library/react';
import App from './App';
import SearchBar from './components/SearchBar/SearchBar';

test('initial renders', () => {
  render(<App><SearchBar /></App>);
  const linkElement = screen.getByTestId("search");
  expect(linkElement).toBeInTheDocument();
});
