import React, { Suspense, lazy, ReactElement } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import documentTitleBuilder from './utils/DocumentTitleBuilder';
import localizer from './utils/Localizer';
import pageService from './packages/page/services/PageService';
import logger, { LogLevel } from './utils/Logger';
import httpHandler from './utils/HttpHandler';
import { LOCALE_NAME_ENGLISH, localeEn } from './locales/en.js';
import pageMockInterface from './packages/page/services/PageMockInterface';
import { ThemeProvider } from '@material-ui/core';
import { castTheme } from './packages/shared/styles/castTheme';
// import pageHttpInterface from './packages/page/services/PageHttpInterface';

logger.logLevel = LogLevel.Debug;
localizer.setLocale(LOCALE_NAME_ENGLISH, localeEn);
localizer.useFallbackLocale(LOCALE_NAME_ENGLISH);
documentTitleBuilder.rootParts = [localizer.localeMap.routes.root];
httpHandler.setDefaultHeader('X-USER-ID', 'test@email.com');
httpHandler.baseEndpoint = 'http://localhost:8782';
// pageService.pageInterface = pageHttpInterface;
pageService.pageInterface = pageMockInterface;

const Pages = lazy(() => import('./routes/PagesRoute'));
const Page = lazy(() => import('./routes/PageRoute'));
const Home = lazy(() => import('./routes/HomeRoute'));

const App = ():ReactElement => {
  return (
    <ThemeProvider theme={castTheme}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/pages/:pageId" component={Page}/>
            <Route exact path="/pages" component={Pages}/>
            <Route exact path="/" component={Home}/>
            <Route path="*">
              <Redirect to="/"></Redirect>
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
