import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    company_name: 'ESEND',
    company_phone: '06 51 23 98 41',
    contact_email: 'contact@esendnuisibles.fr',
    company_address: 'Menton, Alpes-Maritimes (06)',
    company_siret: '900 556 838 00010',
    company_zones: "Menton, Monaco, Roquebrune-Cap-Martin, Cap-d'Ail, Beausoleil, Nice, Côte d'Azur (06)"
  });
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const data = await api.getSettings();
      if (data) {
        // On ne garde que les clés qui nous intéressent pour le contact et l'identité
        // tout en fusionnant avec les valeurs par défaut
        setSettings(prev => ({
          ...prev,
          ...data
        }));
      }
    } catch (err) {
      console.error("Failed to fetch settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
