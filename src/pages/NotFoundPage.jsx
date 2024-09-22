import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('page_not_found')}</h1>
      <Link to="/">{t('return_home')}</Link>
    </div>
  );
};

export default NotFoundPage;
