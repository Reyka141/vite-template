// import 'dotenv/config'; // Убираем, так как загрузка происходит в jest.config.ts
import '@testing-library/jest-dom';
import React from 'react';

global.React = React;
