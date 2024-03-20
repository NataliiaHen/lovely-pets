import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import App from './App';
import { HomePage } from './pages/HomePage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { AdoptionPage } from './pages/AdoptionPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { PetDetailPage } from './pages/PetDetailPage';
import { CatalogPage } from './pages/PetsPage';
import { Favourites } from './pages/FavoritesPage';
import { ModalAdoptForm } from './components/ModalAdoptForm';

export const Root: React.FC = () => {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  return (
    <>
      <Routes location={previousLocation || location}>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/pets">
            <Route index element={<CatalogPage />} />
            <Route path=":petId" element={<PetDetailPage />} />
          </Route>
          <Route path="/contacts" element={<ContactUsPage />} />
          <Route path="/pet" element={<PetDetailPage />} />
          <Route path="/give-for-adoption" element={<AdoptionPage />} />
          <Route path="/favorites" element={<Favourites />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {previousLocation && (
        <Routes>
          <Route path="/adopt/:id" element={<ModalAdoptForm />} />
        </Routes>
      )}
    </>
  );
};
