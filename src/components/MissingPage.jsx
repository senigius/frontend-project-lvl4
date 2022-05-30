import React from 'react';
import { useTranslation } from 'react-i18next';

const MissingPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container-fluid h-100">
        <div className="row justify-content-center align-items-center">
            <div className="col-md-2 d-flex">
                <div className="display-4 text-uppercase">{t('missingPage.code')}</div>
            </div>
            <div className="col-12 col-md-6">
                <div>{t('missingPage.text')}</div>
            </div>
        </div>
    </div>
  );
};

export default MissingPage;
