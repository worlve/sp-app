import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import documentTitleBuilder from './utils/DocumentTitleBuilder';
import localizer from './utils/Localizer';
import { LOCALE_NAME_ENGLISH, localeEn } from './locales/en.js';
import './App.css';

localizer.setLocale(LOCALE_NAME_ENGLISH, localeEn);
localizer.useFallbackLocale(LOCALE_NAME_ENGLISH);
documentTitleBuilder.rootParts = [localizer.localeMap.routes.root];

const Nodes = lazy(() => import('./routes/Nodes'));
const Node = lazy(() => import('./routes/Node'));
const Home = lazy(() => import('./routes/Home'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/pages/:nodeId" component={Node}/>
          <Route exact path="/pages" component={Nodes}/>
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
