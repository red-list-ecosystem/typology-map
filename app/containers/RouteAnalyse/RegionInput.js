/**
 *
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
// import { injectIntl, intlShape } from 'react-intl';
import { Button, TextInput } from 'grommet';
import styled from 'styled-components';

import { Close } from 'components/Icons';

// import { toggleDraw } from 'containers/App/actions';

// import messages from './messages';

const CountryTextInput = styled(p => <TextInput {...p} />)`
  min-height: 35px;
  border: 0;
`;
const TextInputWrap = styled.div`
  position: relative;
  border: 1px solid ${({ theme }) => theme.global.colors['light-4']};
  padding: 0 40px 0 6px;
  border-radius: 3px;
`;

const CloseButton = styled(p => <Button plain {...p} />)`
  position: absolute;
  top: 3px;
  right: 3px;
  border-radius: 9999px;
  padding: 6px;
  background: ${({ theme }) => theme.global.colors.white} !important;
  &:hover {
    background: ${({ theme }) => theme.global.colors.grey} !important;
  }
`;

export function RegionInput({ regionId, onSubmit }) {
  // useEffect(() => {
  //   onToggleCountries
  //   onToggleDraw(true);
  //   return () => onToggleDraw(false);
  // }, []);

  return (
    <TextInputWrap>
      <CountryTextInput
        value={regionId}
        placeholder="Enter eez id"
        onChange={e => {
          const cursor = e.target.selectionStart;
          const element = e.target;
          window.requestAnimationFrame(() => {
            element.selectionStart = cursor;
            element.selectionEnd = cursor;
          });
          onSubmit(e.target.value);
        }}
      />
      {regionId && (
        <CloseButton
          onClick={() => onSubmit('')}
          icon={<Close size="medium" color="black" />}
        />
      )}
    </TextInputWrap>
  );
}

RegionInput.propTypes = {
  onSubmit: PropTypes.func,
  regionId: PropTypes.string,
  // intl: intlShape.isRequired,
};
//
// export function mapDispatchToProps(dispatch) {
//   return {
//     onToggleDraw: active => dispatch(toggleDraw(active)),
//   };
// }

// const withConnect = connect(
//   null,
//   mapDispatchToProps,
// );

// export default RouteExplore;
// export default compose(withConnect)(injectIntl(RegionInput));
export default RegionInput;
