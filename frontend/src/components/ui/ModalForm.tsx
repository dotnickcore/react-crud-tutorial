import { useState } from 'react';

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  mode: string;
  onSubmit: () => void;
}

function ModalForm({ isOpen, onClose, mode, onSubmit }: ModalFormProps) {
  const [playerName, setPlayerName] = useState('');
  const [team, setTeam] = useState('');
  const [position, setPosition] = useState('');
  const [contractValue, setContractValue] = useState('');
  const [years, setYears] = useState(0);
  const [status, setStatus] = useState(false);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value === 'Active');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Log all form values
    console.log('Form submitted with values:');
    console.log('Player Name:', playerName);
    console.log('Team:', team);
    console.log('Position:', position);
    console.log('Contract Value:', contractValue);
    console.log('Years:', years);
    console.log('Status:', status ? 'Active' : 'Inactive');

    // Log as a single object for easier reading
    const formData = {
      playerName,
      team,
      position,
      contractValue,
      years,
      status: status ? 'Active' : 'Inactive',
    };
    console.log('Form Data Object:', formData);

    onSubmit(); // Call the onSubmit prop if needed
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-full md:max-w-2xl mx-4 md:mx-0">
        <h3 className="font-bold text-lg py-4">
          {mode === 'edit' ? 'Edit Player Contract' : 'Player Contract Details'}
        </h3>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Player Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Team</span>
              </label>
              <select
                className="select select-bordered"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
              >
                <option value="">Select Team</option>
                <option value="Arizona Cardinals">Arizona Cardinals</option>
                <option value="Atlanta Falcons">Atlanta Falcons</option>
                <option value="Baltimore Ravens">Baltimore Ravens</option>
                <option value="Buffalo Bills">Buffalo Bills</option>
                <option value="Carolina Panthers">Carolina Panthers</option>
                <option value="Chicago Bears">Chicago Bears</option>
                <option value="Cincinnati Bengals">Cincinnati Bengals</option>
                <option value="Cleveland Browns">Cleveland Browns</option>
                <option value="Dallas Cowboys">Dallas Cowboys</option>
                <option value="Denver Broncos">Denver Broncos</option>
                <option value="Detroit Lions">Detroit Lions</option>
                <option value="Green Bay Packers">Green Bay Packers</option>
                <option value="Houston Texans">Houston Texans</option>
                <option value="Indianapolis Colts">Indianapolis Colts</option>
                <option value="Jacksonville Jaguars">
                  Jacksonville Jaguars
                </option>
                <option value="Kansas City Chiefs">Kansas City Chiefs</option>
                <option value="Las Vegas Raiders">Las Vegas Raiders</option>
                <option value="Los Angeles Chargers">
                  Los Angeles Chargers
                </option>
                <option value="Los Angeles Rams">Los Angeles Rams</option>
                <option value="Miami Dolphins">Miami Dolphins</option>
                <option value="Minnesota Vikings">Minnesota Vikings</option>
                <option value="New England Patriots">
                  New England Patriots
                </option>
                <option value="New Orleans Saints">New Orleans Saints</option>
                <option value="New York Giants">New York Giants</option>
                <option value="New York Jets">New York Jets</option>
                <option value="Philadelphia Eagles">Philadelphia Eagles</option>
                <option value="Pittsburgh Steelers">Pittsburgh Steelers</option>
                <option value="San Francisco 49ers">San Francisco 49ers</option>
                <option value="Seattle Seahawks">Seattle Seahawks</option>
                <option value="Tampa Bay Buccaneers">
                  Tampa Bay Buccaneers
                </option>
                <option value="Tennessee Titans">Tennessee Titans</option>
                <option value="Washington Commanders">
                  Washington Commanders
                </option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Position</span>
              </label>
              <select
                className="select select-bordered"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              >
                <option value="">Select Position</option>
                <option value="Quarterback">Quarterback</option>
                <option value="Running Back">Running Back</option>
                <option value="Wide Receiver">Wide Receiver</option>
                <option value="Tight End">Tight End</option>
                <option value="Offensive Guard">Offensive Guard</option>
                <option value="Right Guard">Right Guard</option>
                <option value="Left Guard">Left Guard</option>
                <option value="Offensive Tackle">Offensive Tackle</option>
                <option value="Right Tackle">Right Tackle</option>
                <option value="Left Tackle">Left Tackle</option>
                <option value="Center">Center</option>
                <option value="Defensive Tackle">Defensive Tackle</option>
                <option value="Defensive End">Defensive End</option>
                <option value="Middle Linebacker">Middle Linebacker</option>
                <option value="Outside Linebacker">Outside Linebacker</option>
                <option value="Cornerback">Cornerback</option>
                <option value="Safety">Safety</option>
                <option value="Free Safety">Free Safety</option>
                <option value="Strong Safety">Strong Safety</option>
                <option value="Long Snapper">Long Snapper</option>
                <option value="Kicker">Kicker</option>
                <option value="Punter">Punter</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contract Value</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={contractValue}
                onChange={(e) => setContractValue(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Years</span>
              </label>
              <input
                type="number"
                className="input input-bordered"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                className="select select-bordered"
                value={status ? 'Active' : 'Inactive'}
                onChange={handleStatusChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              {mode === 'edit' ? 'Save Changes' : 'Add Player'}
            </button>
          </div>
        </form>

        <button
          type="button"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default ModalForm;
