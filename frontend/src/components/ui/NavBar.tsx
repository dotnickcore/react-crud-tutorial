function NavBar({ onOpen }: { onOpen: React.MouseEventHandler<HTMLElement> }) {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">NFL Contracts</a>
      </div>
      
      <div className="navbar-center">
        <div className="form-control">
          <input 
            type="text" 
            placeholder="Search" 
            className="input input-bordered w-full md:w-auto" 
          />
        </div>
      </div>
      
      <div className="navbar-end">
        <a className="btn btn-primary btn-sm md:btn-md" onClick={onOpen}>
          <span className="hidden sm:inline">Add Player</span>
          <span className="sm:hidden">+</span>
        </a>
      </div>
    </div>
  );
}

export default NavBar;