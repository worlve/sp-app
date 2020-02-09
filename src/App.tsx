import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import documentTitleBuilder from './utils/DocumentTitleBuilder';
import localizer from './utils/Localizer';
import pageService from './packages/page/services/PageService';
import pageHttpInterface from './packages/page/services/PageHttpInterface';
import logger, { LogLevel } from './utils/Logger';
import interfaceHandler, { RunState, InterfaceState } from './utils/InterfaceHandler';
import { LOCALE_NAME_ENGLISH, localeEn } from './locales/en.js';
import './App.css';

localizer.setLocale(LOCALE_NAME_ENGLISH, localeEn);
localizer.useFallbackLocale(LOCALE_NAME_ENGLISH);
documentTitleBuilder.rootParts = [localizer.localeMap.routes.root];
interfaceHandler.setDefaultHeader('X-USER-ID', 'test@email.com');
interfaceHandler.localBaseEndpoint = 'http://localhost:8782';
interfaceHandler.runState = RunState.Local;
interfaceHandler.interfaceState = InterfaceState.Http;
// interfaceHandler.interfaceState = InterfaceState.Mock;
pageService.pageInterface = pageHttpInterface;
logger.logLevel = LogLevel.Debug;


const Pages = lazy(() => import('./routes/Pages'));
const Page = lazy(() => import('./routes/Page'));
const Home = lazy(() => import('./routes/Home'));

const App = () => {
  return (
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
  );
}

export default App;
