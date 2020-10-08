import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import LoginForm from './LoginForm';
import MutationObserver from 'mutation-observer';

global.MutationObserver = MutationObserver;

describe('Login Form', () => {
  it('should render input fields and button', () => {
    const renderResult = render(<LoginForm />);
    const emailInputElement = renderResult.getAllByText('Email Address')[0];
    const buttonElement = renderResult.getByText('Sign In');
    const passwordInputElement = renderResult.getAllByText('Password')[0];

    expect(buttonElement).toBeVisible();
    expect(emailInputElement).toBeVisible();
    expect(passwordInputElement).toBeVisible();
  });
});
