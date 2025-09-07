import { useState } from 'react';
import './App.css';
import ModalForm from './components/ui/ModalForm';
import NavBar from './components/ui/NavBar';
import TableList from './components/ui/TableList';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');

  const handleOpen = (mode: string) => {
    setIsOpen(true);
    setModalMode(mode);
  }

  const handleSubmit = () => {
    if (modalMode === 'add') {
      console.log('Modal Add Mode Activated');
    } else {
      console.log('Modal Edit Mode Activated');
    }
  }

  return (
    <>
      <div>
        <NavBar onOpen={() => handleOpen('add')} />
        <TableList handleOpen={handleOpen} />
        <ModalForm 
          isOpen={isOpen}
          onSubmit={handleSubmit}
          onClose={() => setIsOpen(false)}
          mode={modalMode}
        />
      </div>
    </>
  );
}

export default App;
