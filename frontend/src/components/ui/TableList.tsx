import type { Player } from "../../interfaces/Player";

const formatContract = (contractValue: number, contractYears: number): string => {
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(contractValue);

  const yearsText = contractYears === 1 ? 'yr' : 'yrs';
  return `${contractYears} ${yearsText} / ${formattedValue}`;
};

interface TableListProps {
  players: Player[];
  loading: boolean;
  error: string | null;
  onOpenEdit: (player: Player) => void;
  onDeletePlayer: (playerId: number) => void;
  onTogglePlayerStatus: (playerId: number, currentStatus: boolean) => void;
}

export function TableList({ 
  players, 
  loading, 
  error, 
  onOpenEdit, 
  onDeletePlayer, 
  onTogglePlayerStatus 
}: TableListProps) {
  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
        <span className="ml-2">Loading players...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="alert alert-error">
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  if (players.length === 0) {
    return (
      <div className="p-4 text-center py-8">
        <p className="text-lg">No players found</p>
        <p className="text-sm text-gray-600">Try adjusting your search or add a new player</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Desktop Table */}
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
                <td className="font-mono">{player.id}</td>
                <td className="font-semibold">{player.player_name}</td>
                <td>{player.team_name}</td>
                <td>{player.position_name}</td>
                <td className="font-mono">
                  {formatContract(player.contractvalue, player.contractyears)}
                </td>
                <td>
                  <button
                    onClick={() => onTogglePlayerStatus(player.id, player.isactive)}
                    className={`btn btn-xs md:btn-sm ${player.isactive ? 'btn-primary' : 'btn-outline btn-primary'}`}
                  >
                    {player.isactive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td>
                  <div className="flex space-x-1">
                    <button 
                      onClick={() => onOpenEdit(player)} 
                      className="btn btn-secondary btn-xs md:btn-sm"
                    >
                      Update
                    </button>
                    <button 
                      onClick={() => onDeletePlayer(player.id)}
                      className="btn btn-accent btn-xs md:btn-sm"
                    >
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
                  <h3 className="card-title text-sm">{player.player_name}</h3>
                  <p className="text-xs text-gray-600">{player.team_name} • {player.position_name}</p>
                </div>
                <span className="badge badge-primary">ID: {player.id}</span>
              </div>
              
              <div className="divider my-2"></div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="font-semibold">Contract:</span>
                  <p>{formatContract(player.contractvalue, player.contractyears)}</p>
                </div>
                <div>
                  <span className="font-semibold">Status:</span>
                  <p>{player.isactive ? 'Active' : 'Inactive'}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <button
                  onClick={() => onTogglePlayerStatus(player.id, player.isactive)}
                  className={`btn btn-xs ${player.isactive ? 'btn-primary' : 'btn-outline btn-primary'}`}
                >
                  {player.isactive ? 'Active' : 'Inactive'}
                </button>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => onOpenEdit(player)} 
                    className="btn btn-secondary btn-xs"
                  >
                    Update
                  </button>
                  <button 
                    onClick={() => onDeletePlayer(player.id)}
                    className="btn btn-accent btn-xs"
                  >
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