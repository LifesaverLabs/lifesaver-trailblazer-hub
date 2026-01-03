// Type declarations for d3-geo-projection
// The library provides additional geographic projections beyond d3-geo

declare module 'd3-geo-projection' {
  import { GeoProjection } from 'd3-geo';

  export interface CylindricalEqualAreaProjection extends GeoProjection {
    parallel(): number;
    parallel(parallel: number): this;
  }

  export function geoCylindricalEqualArea(): CylindricalEqualAreaProjection;
  export function geoEqualEarth(): GeoProjection;
  export function geoGallPeters(): GeoProjection;
  export function geoMollweide(): GeoProjection;
  export function geoSinusoidal(): GeoProjection;
  export function geoRobinson(): GeoProjection;
  export function geoNaturalEarth1(): GeoProjection;
  export function geoWinkel3(): GeoProjection;
}
