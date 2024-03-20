import React from 'react';

type Props = {
  base64Image: string;
  altText: string;
};

export const ImageComponent: React.FC<Props> = ({
  base64Image,
  altText,
  ...props
}) => {
  return (
    <img
      src={`data:image/png;base64,${base64Image}`}
      alt={altText || 'Image'}
      className="image-component"
      {...props}
    />
  );
};
