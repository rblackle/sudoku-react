import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles/CssVarsProvider';
import {DarkModeSelector} from "./Components/DarkModeSelector";
import Sheet from '@mui/joy/Sheet';

function App() {
  return (
      <CssVarsProvider>
          <Sheet sx={{flex: 1}}>
            <DarkModeSelector/>
          </Sheet>
      </CssVarsProvider>
  );
}

export default App;
