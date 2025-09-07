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
            {mode === 'edit' ? 'Edit Player Contract' : 'Player Contract Details'}
          </h3>
          <form method="dialog" onSubmit={handleFormSubmit}>
            
            
            <div className="flex mb-4 justify-between">
              <label className="input">
                <input type="text" className="grow" placeholder="index.php" />
              </label>
            </div>

            <div className="flex mb-4 justify-between">
              <select defaultValue="Chicago Bears" className="select">
                <option>Crimson</option>
                <option>Amber</option>
                <option>Velvet</option>
              </select>
            </div>

            <div className="flex mb-4 justify-between">
              <select defaultValue="Quarterback" className="select">
                <option>Crimson</option>
                <option>Amber</option>
                <option>Velvet</option>
              </select>
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