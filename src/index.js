import page from '@page';
import { render } from '@lit';

import { addRender } from './mw/render.js';

import { showIntro } from './views/intro.js';
import { showWheel } from './views/wheel.js';
import { showSettings } from './views/settings.js';
import { showQuiz } from './views/quiz.js';

const root = document.querySelector('main');
page(addRender(root, render));

page('/', showIntro);
page('/index.html', showIntro);
page('/wheel', showWheel);
page('/settings', showSettings);

const navEntries = performance.getEntriesByType('navigation');
const navEntry = /** @type {PerformanceNavigationTiming} */ (navEntries[0]);

const hasHandledRefresh = sessionStorage.getItem('refresh-handled');

if (navEntry && navEntry.type === 'reload' && hasHandledRefresh === 'false') {
    console.log('User refreshed the page — redirecting to main page');
    sessionStorage.setItem('refresh-handled', 'true');

    page.redirect('/'); 
}

page('/quiz', showQuiz);

page.start();
