interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  mode: string;
  onSubmit: () => void;
}

function ModalForm({ isOpen, onClose, mode, onSubmit }: ModalFormProps) {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <>
      <dialog id="my_modal_3" className="modal" open={isOpen}>
        <div className="modal-box">
          <h3 className="font-bold text-lg py-4">
            {mode === 'edit'
              ? 'Edit Player Contract'
              : 'Player Contract Details'}
          </h3>
          <form method="dialog" onSubmit={handleFormSubmit}>
            <div className="flex mb-4 justify-between">
              <label className="input">
                <input type="text" className="grow" placeholder="Player Name" />
              </label>
            </div>

            <div className="flex mb-4 justify-between">
              <select className="select">
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

            <div className="flex mb-4 justify-between">
              <select defaultValue="Quarterback" className="select">
                <option>Quarterback</option>
                <option>Running Back</option>
                <option>Wide Receiver</option>
                <option>Tight End</option>
                <option>Offensive Guard</option>
                <option>Right Guard</option>
                <option>Left Guard</option>
                <option>Offensive Tackle</option>
                <option>Right Tackle</option>
                <option>Left Tackle</option>
                <option>Center</option>
                <option>Defensive Tackle</option>
                <option>Defensive End</option>
                <option>Middle Linebacker</option>
                <option>Outside Linebacker</option>
                <option>Cornerback</option>
                <option>Safety</option>
                <option>Free Safety</option>
                <option>Strong Safety</option>
                <option>Long Snapper</option>
                <option>Kicker</option>
                <option>Punter</option>
              </select>
            </div>

            <div className="flex mb-4 justify-between">
              <label className="input">
                <input
                  type="text"
                  className="grow"
                  placeholder="Contract Terms"
                />
              </label>
            </div>

            <div className="flex mb-4 justify-between">
              <label className="input">
                <input
                  type="text"
                  className="grow"
                  placeholder="Average Salary"
                />
              </label>
            </div>

            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={onClose}
            >
              ✕
            </button>
            <button type="submit" className="btn btn-success">
              {mode === 'edit' ? 'Save Changes' : 'Add Player Contract'}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default ModalForm;
