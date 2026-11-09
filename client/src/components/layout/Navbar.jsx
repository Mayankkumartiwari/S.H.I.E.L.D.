import { Bell, Menu, Search } from 'lucide-react'

export default function Navbar({ onMenu }) {
  return (
    <header className="topbar">
      <button className="icon-button mobile-menu" onClick={onMenu} aria-label="Open navigation"><Menu size={20} /></button>
      <div className="topbar-actions">
        <label className="search-inline">
          <Search size={16} />
          <input className="input" placeholder="Search S.H.I.E.L.D." aria-label="Search" />
        </label>
      </div>
      <div className="topbar-actions">
        <button className="icon-button" aria-label="Notifications"><Bell size={18} /></button>
        <div className="avatar">JD</div>
      </div>
    </header>
  )
}
