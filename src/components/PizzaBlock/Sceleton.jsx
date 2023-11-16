import React from 'react';
import ContentLoader from 'react-content-loader';

const Sceleton = () => (
  <ContentLoader speed={2} width={280} height={465} viewBox="0 0 280 465" backgroundColor="#f3f3f3">
    <rect x="13" y="280" rx="0" ry="0" width="260" height="28" />
    <rect x="10" y="327" rx="12" ry="12" width="259" height="74" />
    <rect x="12" y="421" rx="8" ry="8" width="88" height="39" />
    <rect x="147" y="420" rx="22" ry="22" width="122" height="42" />
    <circle cx="139" cy="131" r="128" />
  </ContentLoader>
);

export default Sceleton;
