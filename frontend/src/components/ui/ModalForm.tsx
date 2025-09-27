import { useState, useEffect } from 'react';
import axios from 'axios';

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  onSubmit: () => void;
  player?: Player;
}

interface Player {
  id: number;
  player_name: string;
  team_name: string;
  position_name: string;
  contractvalue: number;
  contractyears: number;
  isactive: boolean;
}

interface Team {
  id: number;
  name: string;
  isactive: boolean;
}

interface Position {
  id: number;
  name: string;
  isactive: boolean;
}

function ModalForm({
  isOpen,
  onClose,
  mode,
  onSubmit,
  player,
}: ModalFormProps) {
  const [formData, setFormData] = useState({
    name: '', // Changed from player_name to name
    team_id: '',
    position_id: '',
    contractvalue: '',
    contractyears: 1,
    isactive: true,
  });
  const [teams, setTeams] = useState<Team[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchDropdownData();
      setError(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (
      isOpen &&
      mode === 'edit' &&
      player &&
      teams.length > 0 &&
      positions.length > 0
    ) {
      const team = teams.find((t) => t.name === player.team_name);
      const position = positions.find((p) => p.name === player.position_name);

      setFormData({
        name: player.player_name,
        team_id: team?.id?.toString() || '',
        position_id: position?.id?.toString() || '',
        contractvalue: player.contractvalue.toString(),
        contractyears: player.contractyears,
        isactive: player.isactive,
      });
    } else if (isOpen && mode === 'add') {
      setFormData({
        name: '',
        team_id: '',
        position_id: '',
        contractvalue: '',
        contractyears: 1,
        isactive: true,
      });
    }
  }, [isOpen, mode, player, teams, positions]);

  const fetchDropdownData = async () => {
    try {
      setLoadingData(true);
      setError(null);

      // Fetch teams and positions concurrently
      const [teamsResponse, positionsResponse] = await Promise.all([
        axios.get('http://localhost:3000/api/v1/teams'),
        axios.get('http://localhost:3000/api/v1/positions'),
      ]);

      // Handle the actual API response structure - direct arrays
      let teamsData: Team[] = [];
      let positionsData: Position[] = [];

      // Teams are returned as a direct array
      if (Array.isArray(teamsResponse.data)) {
        teamsData = teamsResponse.data;
      } else if (
        teamsResponse.data.data &&
        Array.isArray(teamsResponse.data.data)
      ) {
        teamsData = teamsResponse.data.data;
      }

      // Positions are likely returned as a direct array too
      if (Array.isArray(positionsResponse.data)) {
        positionsData = positionsResponse.data;
      } else if (
        positionsResponse.data.data &&
        Array.isArray(positionsResponse.data.data)
      ) {
        positionsData = positionsResponse.data.data;
      }

      setTeams(teamsData);
      setPositions(positionsData);

      if (teamsData.length === 0) {
        setError('No teams available. Please check the API endpoints.');
      }
      if (positionsData.length === 0) {
        setError('No positions available. Please check the API endpoints.');
      }
    } catch (err) {
      console.error('Error fetching dropdown data:', err);
      setError(
        'Failed to load teams and positions. Please check the console for details.'
      );
    } finally {
      setLoadingData(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'contractyears' ? Number(value) : value,
    }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      isactive: e.target.value === 'Active',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate form data
      if (!formData.name.trim() || !formData.team_id || !formData.position_id) {
        throw new Error('Please fill in all required fields');
      }

      const contractValueNum = parseFloat(
        formData.contractvalue.replace(/,/g, '')
      );
      if (isNaN(contractValueNum) || contractValueNum < 0) {
        throw new Error('Please enter a valid contract value');
      }

      if (formData.contractyears < 1 || formData.contractyears > 30) {
        throw new Error('Contract years must be between 1 and 30');
      }

      const payload = {
        name: formData.name.trim(), // Changed from player_name to name
        team_id: parseInt(formData.team_id),
        position_id: parseInt(formData.position_id),
        contractValue: contractValueNum,
        contractYears: formData.contractyears,
        isactive: formData.isactive,
      };

      console.log('Submitting payload:', payload);

      if (mode === 'add') {
        // Add new player
        await axios.post('http://localhost:3000/api/v1/players', payload);
      } else {
        // Update existing player
        await axios.put(
          `http://localhost:3000/api/v1/players/${player?.id}`,
          payload
        );
      }

      onSubmit(); // Refresh data in parent
      onClose(); // Close modal
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatCurrencyInput = (value: string) => {
    // Remove non-numeric characters except decimal point
    const numericValue = value.replace(/[^\d.]/g, '');

    // Format with commas
    const number = parseFloat(numericValue);
    if (!isNaN(number)) {
      return number.toLocaleString('en-US');
    }
    return numericValue;
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCurrencyInput(e.target.value);
    setFormData((prev) => ({
      ...prev,
      contractvalue: formattedValue,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-full md:max-w-2xl mx-4 md:mx-0">
        <h3 className="font-bold text-lg py-4">
          {mode === 'edit' ? 'Edit Player Contract' : 'Add New Player Contract'}
        </h3>

        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
            <button className="btn btn-xs ml-2" onClick={() => setError(null)}>
              ✕
            </button>
          </div>
        )}

        {loadingData && (
          <div className="flex justify-center items-center py-8">
            <span className="loading loading-spinner loading-lg"></span>
            <span className="ml-2">Loading teams and positions...</span>
          </div>
        )}

        {!loadingData && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Player Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Player Name *</span>
                </label>
                <input
                  type="text"
                  name="name" // Changed from player_name to name
                  className="input input-bordered"
                  value={formData.name} // Changed from player_name to name
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>

              {/* Team */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Team *</span>
                </label>
                <select
                  name="team_id"
                  className="select select-bordered"
                  value={formData.team_id}
                  onChange={handleInputChange}
                  required
                  disabled={loading || teams.length === 0}
                >
                  <option value="">Select Team</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
                {teams.length === 0 && !loadingData && (
                  <span className="text-xs text-error mt-1">
                    No teams available
                  </span>
                )}
              </div>

              {/* Position */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Position *</span>
                </label>
                <select
                  name="position_id"
                  className="select select-bordered"
                  value={formData.position_id}
                  onChange={handleInputChange}
                  required
                  disabled={loading || positions.length === 0}
                >
                  <option value="">Select Position</option>
                  {positions.map((position) => (
                    <option key={position.id} value={position.id}>
                      {position.name}
                    </option>
                  ))}
                </select>
                {positions.length === 0 && !loadingData && (
                  <span className="text-xs text-error mt-1">
                    No positions available
                  </span>
                )}
              </div>

              {/* Contract Value */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Contract Value *</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={formData.contractvalue}
                  onChange={handleCurrencyChange}
                  placeholder="0.00"
                  required
                  disabled={loading}
                />
              </div>

              {/* Contract Years */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Contract Years *</span>
                </label>
                <input
                  type="number"
                  name="contractyears"
                  className="input input-bordered"
                  value={formData.contractyears}
                  onChange={handleInputChange}
                  min="1"
                  max="30"
                  required
                  disabled={loading}
                />
              </div>

              {/* Status */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  className="select select-bordered"
                  value={formData.isactive ? 'Active' : 'Inactive'}
                  onChange={handleStatusChange}
                  disabled={loading}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-success"
                disabled={
                  loading || teams.length === 0 || positions.length === 0
                }
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : mode === 'edit' ? (
                  'Save Changes'
                ) : (
                  'Add Player'
                )}
              </button>
            </div>
          </form>
        )}

        <button
          type="button"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
          disabled={loading}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default ModalForm;
