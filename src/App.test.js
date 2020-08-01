import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { getHeroDetail } from './api';

jest.mock('./api');

const renderApp = () => {
  const utils = render(<App />);
  const getInput = () => screen.getByLabelText(/^search hero$/i);
  const getSubmit = () => screen.getByRole('button', { name: /^go$/i });
  return {
    ...utils,
    getInput,
    getSubmit,
    runSearchJourney: async (name, pendingCallback) => {
      userEvent.type(getInput(), name);
      userEvent.click(getSubmit());
      if (pendingCallback) pendingCallback();
      await waitForElementToBeRemoved(() => screen.getByText('loading'));
    },
  };
};

describe('App', () => {
  const SUPERMAN = {
    id: 1,
    name: 'Superman',
    avatar:
      'https://cdn.theatlantic.com/thumbor/xuePShEYRyEQec_THgWcYFhYLnw=/540x0:2340x1800/500x500/media/img/mt/2016/01/superman/original.jpg',
    description:
      'Superman is a fictional superhero. The character was created by writer Jerry Siegel and artist Joe Shuster, and first appeared in the comic book Action Comics #1 (cover-dated June 1938 and published April 18, 1938).[1] The character regularly appears in comic books published by DC Comics, and has been adapted to a number of radio serials, movies, and television shows.',
  };
  beforeEach(() => {
    jest.clearAllMocks();
    getHeroDetail.mockResolvedValue(SUPERMAN);
  });
  it('should have Input & submit button', () => {
    const { getInput, getSubmit } = renderApp();
    expect(getInput());
    expect(getSubmit());
  });

  it('call "getHeroDetail" with name when submitted', async () => {
    const { getInput, runSearchJourney } = renderApp();

    await runSearchJourney('superman');
    expect(getInput()).toHaveValue('superman');

    expect(getHeroDetail).toHaveBeenCalledWith('superman');
  });

  it('show loading while calling "getHeroDetail"', async () => {
    const { runSearchJourney } = renderApp();
    await runSearchJourney('superman', () => {
      screen.getByText('loading');
    });
  });

  it('shows avatar, name and description if successful', async () => {
    const { runSearchJourney } = renderApp();
    await runSearchJourney('superman');
    expect(screen.getByAltText(`Avatar of ${SUPERMAN.name}`)).toHaveAttribute(
      'src',
      SUPERMAN.avatar
    );
    expect(screen.getByText(SUPERMAN.name));
    expect(screen.getByText(SUPERMAN.description));
  });
});
