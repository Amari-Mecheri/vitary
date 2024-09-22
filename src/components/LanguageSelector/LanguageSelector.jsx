import React, { useEffect, useState } from 'react';
import i18n from '../../config/i18n';
import './LanguageSelector.css';

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || 'en');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
    document.body.dir = lng === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('language', lng);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    i18n.changeLanguage(savedLanguage);
    setSelectedLanguage(savedLanguage);
    document.body.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
  }, []);

  return (
    <div className={`language-selector ${i18n.dir()}`}>
      <img
        src="flags/gb.png"
        alt="English"
        title="English"
        onClick={() => changeLanguage('en')}
        className={selectedLanguage === 'en' ? 'selected' : ''}
      />
      <img
        src="flags/fr.png"
        alt="Français"
        title="Français"
        onClick={() => changeLanguage('fr')}
        className={selectedLanguage === 'fr' ? 'selected' : ''}
      />
      <img
        src="flags/dz.png"
        alt="العربية"
        title="العربية"
        onClick={() => changeLanguage('ar')}
        className={selectedLanguage === 'ar' ? 'selected' : ''}
      />
    </div>
  );
};

export default LanguageSelector;
