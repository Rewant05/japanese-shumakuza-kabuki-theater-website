import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';

const About = lazy(() => import('./pages/About').then((module) => ({ default: module.About })));
const Performances = lazy(() => import('./pages/Performances').then((module) => ({ default: module.Performances })));
const BeginnerGuide = lazy(() => import('./pages/BeginnerGuide').then((module) => ({ default: module.BeginnerGuide })));
const TheaterExperience = lazy(() => import('./pages/TheaterExperience').then((module) => ({ default: module.TheaterExperience })));
const Contact = lazy(() => import('./pages/Contact').then((module) => ({ default: module.Contact })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then((module) => ({ default: module.PrivacyPolicy })));
const Terms = lazy(() => import('./pages/Terms').then((module) => ({ default: module.Terms })));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<Suspense fallback={null}><About /></Suspense>} />
        <Route path="performances" element={<Suspense fallback={null}><Performances /></Suspense>} />
        <Route path="beginner-guide" element={<Suspense fallback={null}><BeginnerGuide /></Suspense>} />
        <Route path="theater-experience" element={<Suspense fallback={null}><TheaterExperience /></Suspense>} />
        <Route path="contact" element={<Suspense fallback={null}><Contact /></Suspense>} />
        <Route path="privacy-policy" element={<Suspense fallback={null}><PrivacyPolicy /></Suspense>} />
        <Route path="terms" element={<Suspense fallback={null}><Terms /></Suspense>} />
      </Route>
    </Routes>
  );
}

export default App;
