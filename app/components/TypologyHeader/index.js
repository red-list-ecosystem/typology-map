/**
 *
 * TypologyHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from 'containers/Breadcrumb';
import NavAncestor from 'components/NavAncestor';
import IconRealm from 'components/IconRealm';

function TypologyHeader({ typology, ancestors, locale }) {
  return (
    <>
      <IconRealm realmId={ancestors ? ancestors[0].id : typology.id} />
      <Breadcrumb
        level={ancestors ? ancestors.length : 0}
        targets={ancestors ? ancestors.map(a => a.nav) : []}
      />
      <h1>{`${typology.id} ${typology.title[locale]}`}</h1>
      {ancestors &&
        ancestors.map(a => (
          <NavAncestor
            key={a.id}
            type={a.typologyType}
            onClick={() => a.nav()}
            id={a.id}
            name={a.title[locale]}
          />
        ))}
    </>
  );
}

TypologyHeader.propTypes = {
  typology: PropTypes.object,
  ancestors: PropTypes.array,
  locale: PropTypes.string,
};

export default TypologyHeader;
