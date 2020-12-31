
import { createGlobalStyle } from 'styled-components';

import normalize from 'normalize.css';

//CSS as a JS template literal

export default createGlobalStyle`
	${normalize}

	*, *:before, *:after {
		box-sizing: border-box;
	}

	body,
	html {
		height: 100%;
		margin: 0;
	}

	body {
		font-famiy: -apple-system, BlinkMacSystemFont, 'Segoe UI',
		Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', 
		sans-serif;
		background-color: #fff;
		line-height: 1.4;
	}

	a:link,
	a:visited {
		color: #0077cc;
	}

	a:hover,
	a:focus {
		color: #00449;
	}

	code,
	pre {
		max-width: 100%;
	}
`;