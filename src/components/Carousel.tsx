import React, { useState } from 'react';
import './Carousel.scss';
import cn from 'classnames';

interface Image {
  id: number;
  src: string;
}

interface Props {
  images: Image[];
}

const Carousel: React.FC<Props> = ({ images }) => {
  const [curentImages, setCurentImages] = useState<Image[]>(images);
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [curentIndex, setCurentIndex] = useState(0);
  const startIndex: number = 1;
  const endIndex: number = 10;

  //console.log(curentIndex);

  function handelPrevClick() {
    const tempImage = [...curentImages];
    let tempIndex = curentIndex;
    let tempStep = step;

    // console.log('curentIndex:', tempIndex);
    // console.log('step:', tempStep);

    if (curentIndex - step < startIndex) {
      tempStep = curentIndex - startIndex;
      tempIndex = curentIndex - tempStep;
    }

    for (let i: number = 1; i <= tempStep; i++) {
      tempImage.unshift(tempImage[tempImage.length - 1]);
      tempImage.pop();
    }

    setCurentImages(tempImage);
    setCurentIndex(tempIndex);
  }

  function handelNextClick() {
    const tempImage = [...curentImages];
    let tempIndex = curentIndex;
    let tempStep = step;

    // console.log('curentIndex:', tempIndex);
    // console.log('step:', tempStep);

    if (curentIndex + step < endIndex) {
      tempStep = endIndex - curentIndex;
      tempIndex = curentIndex + tempStep;
    }

    for (let i: number = 1; i <= tempStep; i++) {
      tempImage.push(tempImage[0]);
      tempImage.shift();
    }

    setCurentImages(tempImage);
    setCurentIndex(tempIndex);
  }

  return (
    <div className="Carousel">
      <div className="Control-panel">
        <div className="Control-item">
          <label htmlFor="itemWidth">Image width</label>
          <input
            type="number"
            name="itemWidth"
            id="itemWidth"
            value={`${itemWidth}`}
            onChange={ev => setItemWidth(Number(ev.target.value))}
          />
        </div>

        <div className="Control-item">
          <label htmlFor="frameSize">Frame size</label>
          <input
            type="number"
            name="frameSize"
            id="frameSize"
            min="1"
            max="10"
            value={`${frameSize}`}
            onChange={ev => setFrameSize(Number(ev.target.value))}
          />
        </div>

        <div className="Control-item">
          <label htmlFor="step">Step</label>
          <input
            type="number"
            name="step"
            id="step"
            min="1"
            max="10"
            value={`${step}`}
            onChange={ev => setStep(Number(ev.target.value))}
          />
        </div>
      </div>

      <ul
        className="Carousel__list"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        {curentImages.map(image => (
          <li key={image.id}>
            <img src={image.src} alt="1" style={{ width: `${itemWidth}px` }} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={cn({
          disabled: curentIndex === startIndex,
        })}
        onClick={() => {
          handelPrevClick();
        }}
      >
        Prev
      </button>

      <button
        type="button"
        data-cy="next"
        className={cn({
          disabled: curentIndex === endIndex,
        })}
        onClick={() => {
          handelNextClick();
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;

{
  /* <div style={{ width: `${myWidth}px` }}>
    Цей елемент матиме ширину, яка залежить від myWidth
  </div> */
}
