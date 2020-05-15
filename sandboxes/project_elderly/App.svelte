<script>
  import { scaleOrdinal, scaleBand, scaleThreshold, scaleLinear } from "d3-scale";
  import { schemeAccent, schemePuBu } from "d3-scale-chromatic";
  import { plnAreas } from "./planning_areas.js";
  import { data } from "./popdata.js";
  import { elder_facilities } from "./elder_facilities.js";
  import { format, formatPrefix } from "d3-format";
  import Box from "./Box.svelte";
  import { hexGrid } from "./hex_grid.js";
  import {
    Graphic,
    Section,
    PointLayer,
    Rectangle,
    RectangleLayer,
    PolygonLayer,
    DiscreteLegend,
    XAxis,
    YAxis,
    createGeoScales,
    Label,
    LabelLayer,
    Title
  } from "@snlab/florence";
  import DataContainer from "@snlab/florence-datacontainer";

  const padding = { left: 90, bottom: 30, top: 0, right: 10 };

  // map data
  const planningAreas = new DataContainer(plnAreas);
  const myGeoScale = createGeoScales(planningAreas.domain("$geometry"));
  const towns = planningAreas.column("PLN_AREA_N");

  // pop data
  const popdata = new DataContainer(data);

  function filterElderly(row) {
    return [
      "60_to_64",
      "65_to_69",
      "70_to_74",
      "75_to_79",
      "80_to_84",
      "85_to_89",
      "90_and_over"
    ].includes(row.age_group);
  }

  // population per town
  const popTowns = popdata
    .groupBy("planning_area")
    .summarise({ residents_per_town: { Resident: "sum" } });

  // elderly in sg 
  const elderly_sg = popdata
    .filter(filterElderly)
    .summarise({ elderly_sg: { Resident: "sum" } });


  // elderly per town
  const elderly = popdata
    .filter(filterElderly)
    .groupBy("planning_area")
    .summarise({ elderly_per_town: { Resident: "sum" } });


  const percentElderly = elderly.map("elderly_per_town", (d, i) => {
    return popTowns.column("residents_per_town")[i] === 0
      ? 0
      : d / 862300;
  });
  elderly.addColumn("percent_elderly", percentElderly);

  // binning
  const numClass = 4;
  const binnedElderly = elderly.bin({
    groupBy: "percent_elderly",
    method: "EqualInterval",
    numClasses: numClass
  });
  const classBins = binnedElderly.column("bins");
  function binsToThreshold(bins) {
    const thresholds = [];
    for (let index = 1; index < bins.length; index++) {
      const bin = bins[index];
      thresholds.push(bin[0]);
    }
    return thresholds;
  }
  const classThresholds = binsToThreshold(classBins);
  const myColorscale = scaleThreshold()
    .domain(classThresholds)
    .range(schemePuBu[numClass]);

  // augment thresholds from
  // [0.06530183727034121, 0.13060367454068242, 0.1959055118110236, 0.26120734908136484] to
  // [0, 0.06530183727034121, 0.13060367454068242, 0.1959055118110236, 0.26120734908136484, 0.32650918635170606]
  const boundedThresholds = [
    binnedElderly.domain("bins")[0],
    ...classThresholds,
    binnedElderly.domain("bins")[1]
  ];
  // round to 2dp
  const boundedThresholds2dp = boundedThresholds.map(format(".2f"));

  // KIM's Code- Adding facilities data and adding boxes of different facilities and their quantity per town
  // facilities data-from Kim
  const el_Facilities = new DataContainer(elder_facilities);
  // filter by hovered area, grouped by number of facilities per town- from Kim
  let filteredTown, facilitiesPerTown;
  $: {
    if (hoveredAreaIndex === undefined) {
      filteredTown = el_Facilities;
    } else {
      filteredTown = el_Facilities.filter(
        row => row["PLANNING AREAS"] === towns[hoveredAreaIndex]
      ); // i changed the key here
    }
    facilitiesPerTown = filteredTown
      .groupBy("TYPE OF FACILITIES")
      .summarise({ total_facilities: { TOTAL: "sum" } });
  }
  // set up hover handlers- from Kim
  let mousePosition = undefined;
  let selectedAreainfo;
  $: selectedAreainfo = planningAreas.column("PLN_AREA_N")[hoveredAreaIndex];
  let hoveredAreaIndex = undefined;

  function handleMouseover(event) {
    hoveredAreaIndex = event.key;
    mousePosition = {
      x: event.localCoordinates.x,
      y: event.localCoordinates.y
    };
  }
  function handleMouseout() {
    hoveredAreaIndex = undefined;
    mousePosition = undefined;
  }

  // Sunny's Code- Containing formatPrefix
  // Population Pyramid- from Sunny
  const tickFormatter = formatPrefix(".0", 1e3); // unit scale on x axis, 1x10^3- unit:thousands

  let townFilter
let filterFemale, filterMale, femaleValues, maleValues, sexDomainMax 
let ageDomain
$: {
  ageDomain = popdata
    .arrange({ age_group: sortAgeRange })
    .groupBy('age_group')
    .column('age_group')
  const sortedAge = popdata.arrange({ age_group: sortAgeRange })
  if (clickedAreaIndex === "") {
    townFilter = sortedAge.groupBy(['age_group', 'sex'])
    filterFemale = townFilter
    .filter(row => row.sex === 'Females')
    .summarise({ residents_per_age_group: { Resident: 'sum' } })
    femaleValues = filterFemale.column('residents_per_age_group')
    filterMale = townFilter
    .filter(row => row.sex === 'Males')
    .summarise({ residents_per_age_group: { Resident: 'sum' } })
    maleValues = filterMale.column('residents_per_age_group')
  } else {
    townFilter = sortedAge
    .filter(row => row.planning_area === towns[clickedAreaIndex])
    .groupBy("sex");
    [femaleValues, maleValues] = townFilter.map("$grouped", group => group.column("Resident"))
  }
  sexDomainMax = Math.max(...femaleValues, ...maleValues)
}
function sortAgeRange (a, b) {
  return a.slice(0, a.indexOf('_')) - b.slice(0, b.indexOf('_'))
}
// scales
// $: scaleXresident = scaleLinear().domain([0, Math.max(filterFemale.domain('residents_per_age_group')[1], filterMale.domain('residents_per_age_group')[1])]);
$: scaleXresident = scaleLinear().domain([0, sexDomainMax])
$: scaleYage_group = scaleBand()
  .domain(ageDomain)
  .padding(0.1);

 // change the bar size

  let clickedAreaIndex = "";
  function handleClick(event) {
    clickedAreaIndex = event.key;
  }

  $: numElderly = hoveredAreaIndex === undefined
  ? elderly_sg.column('elderly_sg')
  : elderly.column('elderly_per_town')[hoveredAreaIndex]
</script>

  <title>Where are the Elderly of Singapore?</title>

  <div class="title">
    <!-- title/header content goes here -->
    <h1>
     WHERE ARE THE ELDERLY OF SINGAPORE?
    </h1>
    <h2>
    VISUALISING THE DISTRIBUTION OF ELDERLY POPULATION ACROSS SINGAPORE
    </h2>
  </div>



<div class="graph">
  <div class="main-chart">
  <Graphic width="100%" height="100%" viewBox="0 0 1250 600">
    <!-- Sunny's Pyramid Chart -->
    <Title   
        x={225}
        y={15}
        title={clickedAreaIndex === "" ? "Singapore" : towns[clickedAreaIndex]} 
        titleFontFamily="Josefin Sans, sans-serif"
      />
      <!-- male chart -->
      <Section
        x1={0}
        x2={200}
        y1={30}
        y2={550}
        scaleX= {scaleXresident}
        scaleY= {scaleYage_group}
        padding={{ top: 0, bottom: 30, left: 20, right: 16}}
        flipX
        flipY
      >
        <RectangleLayer 
          x1={0}
          x2={maleValues}
          y1={ageDomain}
          y2={({scaleY}) => ageDomain.map(age_group => scaleY(age_group) + scaleY.bandwidth())}
          fill={'#315594'}
        />
        <Title title="Male" 
        titleFontFamily="Josefin Sans, sans-serif"
        titleFill="#315594"/>
        <XAxis labelFormat={tickFormatter} baseLine={false} 
        labelRotate=-40 labelFontSize=8 />
      </Section>

      <Section
        x1={200} 
        x2={250}
        y1={30}
        y2={550}
        scaleX={scaleLinear().domain([0, 1])}
        scaleY={scaleYage_group} 
        padding={{ top: 0, bottom: 30, left: 0, right: 0}}
        flipY
      >
        <LabelLayer
          x={new Array(ageDomain.length).fill(0.5)}
          y={({scaleY}) => ageDomain.map(age => scaleY(age) + scaleY.bandwidth() * 0.5)}
          text={ageDomain.map(age => age.replace(/_/gi, ' '))}
          fontSize={9}
          font-family="Josefin Sans, sans-serif"
        />
      <!-- {#each ageDomain as age}
        <Label
          x={0.5}
          y={({scaleY}) => scaleY(age)+ scaleY.bandwidth() * 0.5)}
          text={age}
        />
      {/each} -->
    </Section>

      <!-- female chart -->
      <Section
        x1={250} 
        x2={460}
        y1={30}
        y2={550}
        scaleX= {scaleXresident}
        scaleY= {scaleYage_group}
        padding={{ top: 0, bottom: 30, left: 16, right: 20}}
        flipY
      >
        <RectangleLayer 
          x1={0}
          x2={femaleValues}
          y1={ageDomain}
          y2={({scaleY}) => ageDomain.map(age_group => scaleY(age_group) + scaleY.bandwidth())}
          fill={'#EBA7A4'}
        />
        <Title title="Female" 
        titleFontFamily="Josefin Sans, sans-serif"
        titleFill="#EBA7A4"/>
        <XAxis labelFormat={tickFormatter} baseLine={false} 
        labelRotate=-40 labelFontSize=8/>
      </Section> 

    <!-- </Section> -->

    
    <!-- Adrian's Main map and legend  -->
    <Section
        x1={400}
        x2={1135}
        y1={5}
        y2={610}
      {padding}
      {...myGeoScale}
      flipY>
      {#each planningAreas.rows() as row, i (row.$key)}
      <PolygonLayer 
          geometry={planningAreas.column('$geometry')}
          stroke={'white'}
          strokeWidth={1} 
          fill={elderly.column('percent_elderly').map(myColorscale)}
          onMouseover={handleMouseover}
          onMouseout={handleMouseout}
          onClick={handleClick}
        />
        {/each}
      {#if mousePosition !== undefined}
      <Rectangle
      x1={mousePosition.x + 1200}
      x2={mousePosition.x + 30000}
      y1={mousePosition.y}
      y2={mousePosition.y + 3000}
      fill={'white'}
      opacity={0.7}
      stroke={'white'}
      />
      <Label
      x={mousePosition.x + 1700}
      y={mousePosition.y + 1500}
      anchorPoint={'l'}
      fill={'rgb(10, 96, 132)'}
      fontFamily={'Josefin Sans'}
      text={`${selectedAreainfo}: ${format(".2%")(elderly.column('percent_elderly')[hoveredAreaIndex])}`}
      />
{/if}
      <DiscreteLegend
  title={'Percentage of Elderly'}
  fill={scaleLinear().domain(boundedThresholds2dp).range(schemePuBu[numClass])}
  labels={boundedThresholds2dp}
  titleColor={"#000000"}
  labelFont={'Josefin Sans, sans-serif'}
  labelCount={numClass}
  orient={'horizontal'}
  hjust={'right'}
  vjust={'top'}
  width={50}
  height={20}
  xOffset={-150}
  titleHjust={'right'}
  titleXOffset={10}
/>
    </Section> 

  </Graphic>

  <!-- Kim's Box svelte for Number and Type of Facilities -->
<div class= "style_box">
  <Box>
    <span slot="name">
      National Average per 1000 Elderly
    </span>
    <span slot="address">
      Homecare: 0.0088 <br>
      Day Care: 0.0245 <br>
      Stay in: 0.0129  
    </span>
  </Box>
  <Box>
    <span slot="name">
    {format(".2f")(numElderly === 0 ? 0 : facilitiesPerTown.column('total_facilities')[0] / numElderly * 1000)}
    </span>
    <span slot="address">
      Homecare facilities <br> 
      per <br> 1000 elderly
    </span>
  </Box>
  <Box>
    <span slot="name">
  {format(".2f")(numElderly === 0 ? 0 : facilitiesPerTown.column('total_facilities')[1] / numElderly * 1000)}
    </span>
    <span slot="address">
      Daycare Facilities <br>
      per 1000 <br> elderly
    </span>
  </Box>
  <Box>
    <span slot="name">
  {format(".2f")(numElderly === 0 ? 0 : facilitiesPerTown.column('total_facilities')[2] / numElderly * 1000)}
    </span>
    <span slot="address">
     Stay-in Facilities <br>
      per 1000 <br> elderly
    </span>
  </Box>
</div>
</div>
</div>

<div class="explanation">
<p class="texthead">THE AGEING POPULATION OF SINGAPORE</p>
<p class="textbody1">
Like many Asian societies, Singapore is an ageing society with low birth-replacement rate. As we can see on the population pyramid of Singapore, a significantly large cohort of Singaporeans will progress into their twilight years, many are bound to experience physical deterioration and cognitive decline. 
Therefore, it is important that we identify the ageing towns so that we can pay attention to them for various planning purposes. <br><br>
As an example, we provide information on the elderly facilities provided per 1000 elderly in a town as seen on the right. The purpose of doing so is to show which town has more elderly care resources and which town has lesser elderly care resources. <br><br>
</p>
<p class="texthead2">HOW TO USE OUR DASHBOARD?</p>
<p class="textbody2">
<span class="clicked">Please click </span> on the map to find out the details for each town. The interactive box indicator at the right is based on three primary elderly care services: day-care, home care, and stay-in facilities. <br>
<span class="clicked">Please hover over </span>to show the proportion of elderly care facilities for every 1000 elderly in each planning area of Singapore<br>
<span class="clicked">The translucent box</span> indicates the percentage of elderly living in the planning area. <br> <br>   
</p>
<p class="texthead2">ACKNOWLEDGEMENTS</p>
<p class="textbody2">
This project was done by Adrian, Sunny and Kimberly with the help of Jo Hsi and Dr. Ate Poorthuis.</p>
</div>

<div class="explanation_new">
<p class="texthead3">OBJECTIVES OF OUR VISUALISATION</p>
<p class="textbody3">
We hope to use this visualisation for the following objectives: <br>
1. Create a baseline map showing the percentages of elderly in different Neigborhoods; <br>
2. Allow users to compare the different age groups residing in a Neigborhood using a population pyramid; <br>
3. Give users a sense of the number of elderly care services available in different neighborhoods; <br> 
4. Inform users of where the ageing neighborhoods are. <br><br>
</p>

<p class="texthead3">TOP 5 AGEING TOWNS OF SINGAPORE OF 2019</p>
<p class="textbody3">
1. Bedok (8.48%) <br>
2. Tampines (6.43%) <br>
3. Hougang (6.18%) <br>
4. Jurong West (5.70%) <br>
5. Ang Mo Kio (5.44%) <br>
As we can see, Bedok has the most number of elderly in the entire country! 
</p>
</div>





<style>
  .clicked {
    font-family: "Josefin Sans", sans-serif;
    font-weight: 700;
    text-align: left;
    font-size: 16px;
    text-align: justify;
    line-height: 1.5;
    color: rgb(19,117,174);
  }

  h1,
  h2 {
    font-family: "Josefin Sans", sans-serif;
    font-weight: 200;
    text-align: center;
    color: rgb(0,0,0);
  }

  h1 {
    font-size: 30px;
    font-weight: bold;
  }

  h2 {
    font-size: 20px;
  }

  p {
    font-family: "Josefin Sans", sans-serif;
    font-weight: 200;
    text-align: center;
    font-size: 12px;
    color: rgb(5, 10, 52);
  }

  .texthead {
    font-family: "Josefin Sans", sans-serif;
    font-weight: bold;
    text-align: left;
    font-size: 20px;
    color: rgb(19,117,174);
  }

  .texthead2 {
    font-family: "Josefin Sans", sans-serif;
    font-weight: bold;
    text-align: left;
    font-size: 20px;
    color: rgb(19,117,174);
    left: 3%;
    bottom: 10%;
    width: 100%;
  }

  .texthead3 {
    font-family: "Josefin Sans", sans-serif;
    font-weight: bold;
    text-align: left;
    font-size: 20px;
    color: rgb(19,117,174);
    left: 3%;
    width: 90%;
  }



  .textbody1 {
    font-family: "Josefin Sans", sans-serif;
    font-weight: 100;
    text-align: left;
    font-size: 16px;
    text-align: justify;
    line-height: 1.5;
    color: rgb(0, 0, 0);

    top: 110%;
    left: 3%;
    bottom: 10%;
    width: 90%;
  }
  .textbody2 {
    font-family: "Josefin Sans", sans-serif;
    font-weight: 100;
    text-align: left;
    font-size: 16px;
    text-align: justify;
    line-height: 1.5;
    color: rgb(0, 0, 0);
    top: 110%;
    left: 3%;
    bottom: 30%;
    width: 90%;
  }
  .textbody3 {
    font-family: "Josefin Sans", sans-serif;
    font-weight: 100;
    text-align: left;
    font-size: 16px;
    text-align: justify;
    line-height: 1.5;
    color: rgb(0, 0, 0);

    top: 80%;
    left: 50%;
    width: 90%;
  }

  div.explanation {
    position: absolute;
    top: 110%;
    left: 3%;
    bottom: 10%;
    width: 45%;
    height: 30%;
  }

  div.explanation_new {
    position: absolute;
    top: 110%;
    left: 50%;
    bottom: 10%;
    width: 45%;
    height: 30%;
  }
  
  /* div.explanation_usage{
    position: absolute;
    top: 135%;
    left: 3%;
    bottom: 10%;
    width: 45%;
    height: 10%;
  } */


  /* set up box-style- from Kim */
  .style_box {
    flex-direction: column;
    column-gap: 20%;
    position: absolute;
    top: 20%;
    left: 87%;
    width: 10%;
    height: 20%;
  } 
  </style>