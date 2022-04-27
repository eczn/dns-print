import React from 'react';
import { render } from 'ink';
import { App } from './app';

export function mount(hostname: string) {
  render(<App hostname={hostname} />)
}
