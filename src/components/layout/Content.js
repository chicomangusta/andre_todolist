import React from 'react';
import { Sidebar } from './Sidebar';
import { Tasks } from '../Tasks';
import { Footer } from './Footer';
import { Aside } from './Aside';
import { Pomodoro } from './Pomodoro';

export const Content = () => (
  <section className="content">
    <Sidebar />
    <Tasks />
    <Footer />
    <Aside />
    {/* <Pomodoro /> */}
  </section>
);