import './css/index.pcss';

import React from 'react';
import ReactDom from 'react-dom';

import MarkovChainsApp from '@components/markov-chains-app/MarkovChainsApp';

ReactDom.render(
    <MarkovChainsApp />,
    document.querySelector('.markov-chains-app'),
);
