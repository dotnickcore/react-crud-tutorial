import { useState } from 'react';

function NavBar({ onOpen }: { onOpen: React.MouseEventHandler<HTMLElement> }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className={`navbar-start transition-opacity ${isSearchOpen ? 'opacity-0 absolute' : 'opacity-100'} md:opacity-100 md:static`}>
        <a className="btn btn-ghost text-xl">NFL Contracts</a>
      </div>
      
      <div className={`navbar-center transition-all duration-300 ${isSearchOpen ? 'w-full opacity-100' : 'w-0 opacity-0'} md:opacity-100 md:w-auto`}>
        <div className="form-control w-full relative">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search players..." 
              className="input input-bordered w-full pl-10 pr-4 py-2" 
              autoFocus={isSearchOpen}
            />

            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="navbar-end">
        <button 
          className="btn btn-ghost btn-circle md:hidden"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          {isSearchOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </button>
        
        <a className="btn btn-primary btn-sm md:btn-md ml-2" onClick={onOpen}>
          <span className="hidden sm:inline">Add Player</span>
          <span className="sm:hidden">+</span>
        </a>
      </div>
    </div>
  );
}

export default NavBar;