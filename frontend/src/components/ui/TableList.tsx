function TableList() {
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
            <th>Is Active</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index} className="hover:bg-base-300">
              <td>{player.id}</td>
              <td>{player.name}</td>
              <td>{player.team}</td>
              <td>{player.position}</td>
              <td>{player.contractTerms}</td>
              <td>{player.averageSalary}</td>
              <td><button className={`btn rounded-full w-20 ${player.isActive ? `btn-primary` : `btn-outline btn-primary`}`}>{player.isActive ? 'Active' : 'Inactive'}</button></td>
              <td><button className="btn btn-secondary rounded-full w-20">Update</button></td>
              <td><button className="btn btn-accent rounded-full w-20">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableList;
