interface TableListProps {
  handleOpen: (mode: string) => void;
}

function TableList({ handleOpen }: TableListProps) {
  const players = [
    {
      id: 1,
      name: 'Dak Prescott',
      team: 'Dallas Cowboys',
      position: 'Quarterback',
      contractTerms: '4 yr(s) / $240,000,000',
      isActive: true,
    },
    {
      id: 2,
      name: 'Matthew Stafford',
      team: 'Los Angeles Rams',
      position: 'Quarterback',
      contractTerms: '2 yr(s) / $84,000,000',
      isActive: true,
    },
    {
      id: 3,
      name: 'Joe Burrow',
      team: 'Cincinnati Bengals',
      position: 'Quarterback',
      contractTerms: '5 yr(s) / $275,000,000',
      isActive: true,
    },
    {
      id: 4,
      name: 'Lamar Jackson',
      team: 'Baltimore Ravens',
      position: 'Quarterback',
      contractTerms: '5 yr(s) / $260,000,000',
      isActive: true,
    },
  ];

  return (
    <div className="p-4">
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Team</th>
              <th>Position</th>
              <th>Contract Terms</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id} className="hover:bg-base-300">
                <td>{player.id}</td>
                <td className="font-semibold">{player.name}</td>
                <td>{player.team}</td>
                <td>{player.position}</td>
                <td>{player.contractTerms}</td>
                <td>
                  <button className={`btn btn-xs md:btn-sm ${player.isActive ? 'btn-primary' : 'btn-outline btn-primary'}`}>
                    {player.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td>
                  <div className="flex space-x-1">
                    <button 
                      onClick={() => handleOpen('edit')} 
                      className="btn btn-secondary btn-xs md:btn-sm"
                    >
                      Update
                    </button>
                    <button className="btn btn-accent btn-xs md:btn-sm">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {players.map((player) => (
          <div key={player.id} className="card bg-base-100 shadow-md">
            <div className="card-body p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="card-title text-sm">{player.name}</h3>
                  <p className="text-xs text-gray-600">{player.team} • {player.position}</p>
                </div>
                <span className="badge badge-primary">{player.id}</span>
              </div>
              
              <div className="divider my-2"></div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="font-semibold">Contract:</span>
                  <p>{player.contractTerms}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <button className={`btn btn-xs ${player.isActive ? 'btn-primary' : 'btn-outline btn-primary'}`}>
                  {player.isActive ? 'Active' : 'Inactive'}
                </button>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleOpen('edit')} 
                    className="btn btn-secondary btn-xs"
                  >
                    Update
                  </button>
                  <button className="btn btn-accent btn-xs">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableList;