import React, { forwardRef } from 'react';

interface Props {}

interface Ref extends HTMLHeadElement {}

const Typography = forwardRef<Ref, Props>((_, ref) => {
  return <div>Typography</div>;
});

Typography.displayName = 'Typography';

export default Typography;
