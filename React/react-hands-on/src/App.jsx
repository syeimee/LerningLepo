import './App.css';
import { Link, Switch, Route } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Index } from './pages/Index';
import { Todos } from './pages/Todos';
import { NotFound } from './pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="navbar flex justify-around">
        <Link className="btn btn-ghost text-xl" href="/">
          Home
        </Link>
        <Link className="btn btn-ghost text-xl" href="/todos">
          Todos
        </Link>
      </div>
      <Switch>
        <Route path="/" component={Index} />
        <Route path="/todos" component={Todos} />
        <Route component={NotFound} />
      </Switch>
    </QueryClientProvider>
  );
}

export default App;
