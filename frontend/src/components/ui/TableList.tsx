interface TableListProps {
  handleOpen: (mode: string) => void;
}

function TableList({ handleOpen }: TableListProps) {
  const players = [
    {
      id: 1,
      name: 'Dak Prescott',
      team: 'Dallas Cowboys',
      position: 'QB',
      contractTerms: '4 yr(s) / $240000000',
      averageSalary: '$60000000',
      isActive: true,
    },
    {
      id: 2,
      name: 'Matthew Stafford',
      team: 'Los Angeles Rams',
      position: 'QB',
      contractTerms: '2 yr(s) / $84000000',
      averageSalary: '$42000000',
      isActive: true,
    },
    {
      id: 3,
      name: 'Joe Burrow',
      team: 'Cincinnati Bengals',
      position: 'QB',
      contractTerms: '5 yr(s) / $275000000',
      averageSalary: '$55000000',
      isActive: true,
    },
    {
      id: 4,
      name: 'Lamar Jackson',
      team: 'Baltimore Ravens',
      position: 'QB',
      contractTerms: '5 yr(s) / $260000000',
      averageSalary: '$52000000',
      isActive: true,
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Team</th>
            <th>Position</th>
            <th>Contract Terms</th>
            <th>Average Salary</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id} className="hover:bg-base-300">
              <td>{player.id}</td>
              <td>{player.name}</td>
              <td>{player.team}</td>
              <td>{player.position}</td>
              <td>{player.contractTerms}</td>
              <td>{player.averageSalary}</td>
              <td>
                <button className={`btn rounded-full w-20 ${player.isActive ? 'btn-primary' : 'btn-outline btn-primary'}`}>
                  {player.isActive ? 'Active' : 'Inactive'}
                </button>
              </td>
              <td>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleOpen('edit')} 
                    className="btn btn-secondary rounded-full w-20"
                  >
                    Update
                  </button>
                  <button className="btn btn-accent rounded-full w-20">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableList;