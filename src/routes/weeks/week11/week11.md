---
solution: false
---
# Week 11: Maps & Cartography

## Introduction
Up until now, we have created non-spatial visualizations. In many cases, including our HDB resale data, data points have an explicit or implicit spatial reference. This information can be used to also visualize the spatial aspects of a dataset. Sometimes this is just a useful way of presenting information, but often it can be an essential step in deriving insight from a visualization. This week, we will create a series of maps based on our previous HDB resale data. In doing so, you will learn how to the grammar of graphics can be extended to spatial visualizations.

## Cartography vis-a-vis the grammar of graphics.
Although the act of map making (cartography!) has much older roots than the concept of the 'grammar of graphics', the two are very much compatible. With some extensions, the grammar of graphics can also be used to create maps of any kind. `florence` supports the visualization of spatial information for a wide variety of marks out-of-the-box but there are two specific concepts to take into account.

## Data format
To make data spatial we need some way to encode the spatial attributes of each observation (often referred to as geometry). There are many different file formats that allow you to do so (e.g. the Shapefile is a mainstay in desktop GIS). In online mapping, [GeoJSON](https://geojson.org/) is the defacto standard. It is an extension of regular json according to a specific specification. For a spatial point that might look like this:

```js
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "name": "Dinagat Islands"
  }
}
```

A 'Feature' has two additional keys: `geometry`, holding information about the spatial attributes; and `properties`, holding any additional non-spatial attributes. Our familiar `florence-datacontainer` library can read and interpret this information straight out of the box. It does this by converting all `properties` to regular columns and storing all geometry-related information in a special `$geometry` column (the `$` indicates it is a special column – and you shouldn't manually touch it). If you are familiar with the spatial data in the `tidyverse`, this is similar to how `sf` stores geometry data in a tibble.

## Scales
A second important particularity is that all maps are projections. They represent the three-dimensional globe on a two dimensional plane. This can be done in all kinds of ways that all have their own pros and cons (see Chapter 5 of Making Maps). In some cases, data is recorded in three-dimensional 'earth' coordinates while in other cases data might already be pre-projected in a two-dimensional plane for you. Even in this latter case, you still need to ensure that the spatial coordinates translate neatly to screen coordinates. To do this, we can no longer treat the `x` and `y` dimension separate but must take them into account together. To do this, `florence` exports a `createGeoScales` utility that, given the domain/bounding box in the following form `{x: [min, max], y: [min, max]}`, will return an object with two scales in the following form `{scaleX: // scaleX here //, scaleY: // scaleY here //}`.