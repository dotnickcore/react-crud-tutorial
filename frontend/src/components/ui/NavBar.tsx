function NavBar({ onOpen }: { onOpen: React.MouseEventHandler<HTMLElement> }) {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">NFL Contracts</a>
      </div>
      <div className="navbar-center">
        <input type="text" placeholder="Search" className="input input-bordered w-100 md:w-auto" />
      </div>
      <div className="navbar-end">
        <a className="btn btn-primary" onClick={onOpen}>Add Player</a>
      </div>
    </div>
  );
}

export default NavBar;
