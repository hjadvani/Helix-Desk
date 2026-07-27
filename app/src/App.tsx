import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '@/routes/Login'
import ForgotPassword from '@/routes/ForgotPassword'
import UpdatePassword from '@/routes/UpdatePassword'
import { AppLayout } from '@/components/app-layout'
import Dashboard from '@/routes/Dashboard'
import Queue from '@/routes/Queue'
import TicketDetail from '@/routes/TicketDetail'
import NewTicket from '@/routes/NewTicket'
import Catalog from '@/routes/Catalog'
import Assets from '@/routes/Assets'
import Knowledge from '@/routes/Knowledge'
import Article from '@/routes/Article'
import Team from '@/routes/Team'

// BrowserRouter (clean URLs, no #). The mount path is never hardcoded here — the engine
// bakes it in as Vite's `base` (VITE_APP_BASE, see vite.config.ts) and the app reads it
// back as BASE_URL, so one value covers every slot it serves. A deploy build bakes '/'
// (the app's domain root → basename normalizes to undefined = root); a preview slot bakes
// its /agent-api/… path. The trailing slash goes because react-router rejects '/a/b'
// against basename '/a/b/'.
const APP_BASE = import.meta.env.BASE_URL
const basename = (APP_BASE.startsWith('/') ? APP_BASE.replace(/\/+$/, '') : '') || undefined

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/queue" element={<Queue />} />
          <Route path="/tickets/new" element={<NewTicket />} />
          <Route path="/tickets/:id" element={<TicketDetail />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/knowledge/:id" element={<Article />} />
          <Route path="/team" element={<Team />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
