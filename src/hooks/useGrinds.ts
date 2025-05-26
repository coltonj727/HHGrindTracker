import { useState, useEffect } from 'react';
import { Grind } from '../types';

export function useGrinds() {
  const [grinds, setGrinds] = useState<Grind[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('headhunter-grinds');
    if (saved) {
      try {
        setGrinds(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load grinds:', error);
      }
    }
  }, []);

  // Save to localStorage whenever grinds change
  useEffect(() => {
    localStorage.setItem('headhunter-grinds', JSON.stringify(grinds));
  }, [grinds]);

  const addGrind = (species: string, map: string) => {
    const newGrind: Grind = {
      id: Date.now(),
      species,
      map,
      kills: 0,
      diamonds: 0,
      rares: 0,
      goHarvested: false,
      createdAt: new Date().toISOString()
    };
    setGrinds(prev => [...prev, newGrind]);
  };

  const updateGrind = (id: number, updates: Partial<Grind>) => {
    setGrinds(prev => prev.map(grind => 
      grind.id === id ? { ...grind, ...updates } : grind
    ));
  };

  const deleteGrind = (id: number) => {
    setGrinds(prev => prev.filter(grind => grind.id !== id));
  };

  return {
    grinds,
    addGrind,
    updateGrind,
    deleteGrind
  };
}
