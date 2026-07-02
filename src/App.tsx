import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Performances } from './pages/Performances';
import { BeginnerGuide } from './pages/BeginnerGuide';
import { TheaterExperience } from './pages/TheaterExperience';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Terms } from './pages/Terms';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="performances" element={<Performances />} />
        <Route path="beginner-guide" element={<BeginnerGuide />} />
        <Route path="theater-experience" element={<TheaterExperience />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<Terms />} />
      </Route>
    </Routes>
  );
}

export default App;
