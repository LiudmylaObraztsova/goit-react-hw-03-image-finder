import React from 'react';
import style from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, onImgClick }) => (
  <ul className={style.imageGallery}>
    {images.map(({ id, webformatURL, tags, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        image={webformatURL}
        tags={tags}
        largeImageURL={largeImageURL}
        onClickModal={onImgClick}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.shape.isRequired,
    }),
  ).isRequired,
};

export default ImageGallery;