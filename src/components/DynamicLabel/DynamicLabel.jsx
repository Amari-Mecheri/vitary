// components/DynamicLabel/DynamicLabel.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const DynamicLabel = ({ id }) => {
  const { t } = useTranslation();
  
  return <label>{t(id)}</label>;
};

export default DynamicLabel;
