import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ModalForm from './components/ui/ModalForm';
import NavBar from './components/ui/NavBar';
import type { Player } from './interfaces/Player';
import { TableList } from './components/ui/TableList';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all players
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:3000/api/v1/players');

      if (response.data.data && Array.isArray(response.data.data)) {
        setPlayers(response.data.data);
        setFilteredPlayers(response.data.data);
      } else {
        setPlayers([]);
        setFilteredPlayers([]);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setPlayers([]);
      setFilteredPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Search function
  // Search function
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setFilteredPlayers(players); // Show all players if search is empty
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/v1/players/search`,
        {
          params: { name: query }, // Changed from 'q' to 'name'
        }
      );

      if (response.data.data && Array.isArray(response.data.data)) {
        setFilteredPlayers(response.data.data);
      } else if (Array.isArray(response.data)) {
        setFilteredPlayers(response.data);
      } else {
        setFilteredPlayers([]);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Don't set error for empty search - just show all players
        if (err.response?.status !== 400 || !query.trim()) {
          setError(err.response?.data?.message || err.message);
        }
      } else {
        setError('Failed to search players');
      }
      // On search error, show all players instead of empty list
      setFilteredPlayers(players);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (mode: 'add' | 'edit', player?: Player) => {
    setIsOpen(true);
    setModalMode(mode);
    if (mode === 'edit' && player) {
      setSelectedPlayer(player);
    } else {
      setSelectedPlayer(null);
    }
  };

  const handleSubmit = () => {
    // Refresh data after submitting
    fetchData();
  };

  // Delete player function
  const handleDeletePlayer = async (playerId: number) => {
    if (!window.confirm('Are you sure you want to delete this player?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/v1/players/${playerId}`);

      // Update both players and filteredPlayers
      setPlayers((prev) => prev.filter((p) => p.id !== playerId));
      setFilteredPlayers((prev) => prev.filter((p) => p.id !== playerId));

      alert('Player deleted successfully!');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || err.message;
        setError(`Failed to delete player: ${errorMessage}`);
        alert(`Error: ${errorMessage}`);
      } else {
        setError('Failed to delete player: An unknown error occurred');
        alert('Error: An unknown error occurred');
      }
    }
  };

  // Toggle player status function
  const handleTogglePlayerStatus = async (
    playerId: number,
    currentStatus: boolean
  ) => {
    try {
      // Optimistic UI update
      setPlayers((prev) =>
        prev.map((p) =>
          p.id === playerId ? { ...p, isactive: !currentStatus } : p
        )
      );
      setFilteredPlayers((prev) =>
        prev.map((p) =>
          p.id === playerId ? { ...p, isactive: !currentStatus } : p
        )
      );

      await axios.patch(
        `http://localhost:3000/api/v1/players/${playerId}/status`,
        {
          isActive: !currentStatus,
        }
      );
    } catch (err) {
      // Revert on error
      setPlayers((prev) =>
        prev.map((p) =>
          p.id === playerId ? { ...p, isactive: currentStatus } : p
        )
      );
      setFilteredPlayers((prev) =>
        prev.map((p) =>
          p.id === playerId ? { ...p, isactive: currentStatus } : p
        )
      );

      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || err.message;
        setError(`Failed to update status: ${errorMessage}`);
        alert(`Error: ${errorMessage}`);
      } else {
        setError('Failed to update status: An unknown error occurred');
        alert('Error: An unknown error occurred');
      }
    }
  };

  return (
    <>
      <div>
        <NavBar onOpen={() => handleOpen('add')} onSearch={handleSearch} />
        <TableList
          players={filteredPlayers}
          loading={loading}
          error={error}
          onOpenEdit={(player) => handleOpen('edit', player)}
          onDeletePlayer={handleDeletePlayer}
          onTogglePlayerStatus={handleTogglePlayerStatus}
        />
        <ModalForm
          isOpen={isOpen}
          onSubmit={handleSubmit}
          onClose={() => setIsOpen(false)}
          mode={modalMode}
          player={selectedPlayer}
        />
      </div>
    </>
  );
}

export default App;
