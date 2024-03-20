import React, { useState, useRef, ChangeEvent, memo, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import './ImageUpload.scss';
import classNames from 'classnames';

interface Props {
  onChange: (data: File | null) => void;
  currentInput: boolean;
  clearPreview: boolean;
}

export const ImageUpload: React.FC<Props> = memo(
  ({ onChange, currentInput, clearPreview }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (file: File | null) => {
      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setPreview(reader.result as string);
        };

        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }

      onChange(file);
    };

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      fileInputRef.current?.click();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file && file.type.startsWith('image/')) {
        handleImageChange(file);
      }
    };

    useEffect(() => {
      if (clearPreview) {
        setPreview(null);
      }
    }, [clearPreview]);

    return (
      <div
        className={classNames('image-upload', {
          'image-upload--current': currentInput,
        })}
      >
        {currentInput && (
          <>
            <button
              type="button"
              onClick={handleClick}
              className="image-upload__button"
              aria-label="Add image"
            >
              <div className="image-upload__icon-box">
                <ReactSVG src="img/icon/plus.svg" />
              </div>
            </button>

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleChange}
            />
          </>
        )}

        {!currentInput && preview && (
          <>
            <img src={preview} className="image-upload__img" alt="Preview" />

            <div
              className="
              image-upload__icon-box 
              image-upload__icon-box--remove
              "
            >
              <ReactSVG
                src="img/icon/close.svg"
                className="image-upload__icon"
                onClick={() => handleImageChange(null)}
              />
            </div>
          </>
        )}
      </div>
    );
  },
);
