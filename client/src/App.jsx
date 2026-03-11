import { Navigate, Route, Routes } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreatePaper from './pages/CreatePaper';
import PaperPreview from './pages/PaperPreview';
import QuestionBank from './pages/QuestionBank';
import PastPapers from './pages/PastPapers';
import Settings from './pages/Settings';
import { useAuth } from './context/AuthContext';

function Protected({ children }) {
  const { accessToken } = useAuth();
  return accessToken ? children : <Navigate to="/login" />;
}

const Animated = ({ children }) => <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>{children}</motion.div>;

export default function App() {
  return <AnimatePresence mode="wait"><Routes>
    <Route path="/" element={<Animated><Landing /></Animated>} />
    <Route path="/login" element={<Animated><Login /></Animated>} />
    <Route path="/register" element={<Animated><Register /></Animated>} />
    <Route path="/dashboard" element={<Protected><Animated><Dashboard /></Animated></Protected>} />
    <Route path="/create" element={<Protected><Animated><CreatePaper /></Animated></Protected>} />
    <Route path="/preview" element={<Protected><Animated><PaperPreview /></Animated></Protected>} />
    <Route path="/question-bank" element={<Protected><Animated><QuestionBank /></Animated></Protected>} />
    <Route path="/past-papers" element={<Protected><Animated><PastPapers /></Animated></Protected>} />
    <Route path="/settings" element={<Protected><Animated><Settings /></Animated></Protected>} />
  </Routes></AnimatePresence>;
}
