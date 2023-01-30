import {render, screen, cleanup, waitFor } from '@testing-library/react';
import Countries from '../countries/countries';
import * as api from '../../api/api';

jest.mock('../../api/api');

test('should render Countries component', () => {
    render(<Countries/>);
    const countries = screen.getByTestId('countries');
    expect(countries).toBeInTheDocument();
    expect(countries).toHaveTextContent('Loading');
})

