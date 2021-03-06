import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Features } from '../../features';

import Dashboard from '.';

import { AppMock } from '../../mock/components';

describe('Dashboard', () => {
  const DashboardInApp = (
    <AppMock>
      <Dashboard />
    </AppMock>
  );

  test('loads and displays all Features but "DASHBOARD"', async () => {
    render(DashboardInApp);

    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(screen.getByText('SLICER')).toBeInTheDocument();
    expect(screen.getByText('PHRASER')).toBeInTheDocument();
    expect(screen.getByText('FX')).toBeInTheDocument();
  });

  test('renders all features regardless of enabled or disabled', () => {
    render(DashboardInApp);

    Object.keys(Features)
      .splice(1, 3)
      .every(route => expect(screen.getByText(route)).toBeInTheDocument());
  });

  test('renders all enabled features with correct links', () => {
    const links = [Features.SLICER, Features.PHRASER];

    render(DashboardInApp);

    Object.keys(Features)
      .splice(1, 2) // slicer && phraser
      .forEach((route, index) => {
        const heading = screen.getByText(route) as HTMLHeadingElement;
        const link = heading.parentElement as HTMLLinkElement;

        expect(link.href).toContain(links[index]);
        expect(link.classList).not.toContain('disabled');
      });
  });

  test('renders all disabled features with link to Dashboard', () => {
    render(DashboardInApp);

    Object.keys(Features)
      .splice(3, 1) // fx
      .forEach(route => {
        const heading = screen.getByText(route) as HTMLHeadingElement;
        const link = heading.parentElement as HTMLLinkElement;

        expect(link.href).toContain(Features.DASHBOARD);
        expect(link.classList).toContain('disabled');
      });
  });
});
