import React, { useRef, useState, useEffect } from 'react';
import { select, geoPath, geoMercator, min, max, scaleLinear, zoom } from 'd3';
import useResizeObserver from '../hooks/useResizeObserver';
import useContext from '../hooks/useContext';

const GeoChart = ({ data, property }) => {
  const ref = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const map  = useContext((state) => state.svg);

  useEffect(() => {

    if (dimensions && map) {

      const svg = select(ref.current);

      const g = svg.append('g');

      const { width, height } = dimensions;

      svg.call(
        zoom()
          .on('zoom', (event) => {
            g.attr('transform', event.transform);
          })
          .scaleExtent([1, 5])
          .translateExtent([
            [0, 0],
            [width, height],
          ])
      );

      g.html(map);
    }
  }, [data, dimensions, property, selectedCountry, map]);

  return (
    <div className="map" ref={wrapperRef} /* style={{ marginBottom: '2rem' }} */>
      <svg {...{ ref }}></svg>
    </div>
  );
};

export default GeoChart;
