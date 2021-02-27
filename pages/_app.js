import '../services/config'

import '../assets/styles/globals.css'
import '../assets/fonts/fonts.scss'
import '../assets/styles/styles.css'
import '../assets/styles/_variables.scss'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import '../assets/styles/table/table.scss'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
