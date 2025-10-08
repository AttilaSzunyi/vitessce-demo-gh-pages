import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import { Vitessce } from 'vitessce';
import { myViewConfig } from './my-view-config.js';


export default function App() {
  return (
    <Vitessce
      config={myViewConfig}
      theme="light"
    />
  );
}
