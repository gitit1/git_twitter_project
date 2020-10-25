import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


//Render Main Components - Check For Header & Main Components Elements
describe('App', () => {

    it('renders App components', async () => {
      render(<App />);
      expect(screen.getByText('GrubHub Twitter Assignment')).toBeInTheDocument();
      setTimeout(() => {
        expect(screen.getByText('Showing Page')).toBeInTheDocument();
        }, 1500);
    });
});

