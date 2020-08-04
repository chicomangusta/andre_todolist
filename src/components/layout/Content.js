import React from 'react';
import { Sidebar } from './Sidebar';
import { Tasks } from '../Tasks';
import { Footer } from './Footer';

export const Content = () => (
  <section className="content">
    <Sidebar />
    <Tasks />
    <Footer />
  </section>
);