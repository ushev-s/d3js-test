(async function() {
  const inputData = await d3.json(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
  );

  const {
    from_date,
    to_date,
    column_names,
    name,
    data,
    source_name,
    code
  } = inputData;

  let gdpMax = 0;

  d3.select('#title').html(source_name);

  //Define max gdp
  data.forEach(arr => {
    if (arr[1] > gdpMax) gdpMax = arr[1];
  });

  let svg = d3.select('svg');
  svg.append('g').attr('transform', 'translate(0,30)');

  const width = +svg.attr('width'),
    height = +svg.attr('height');

  console.log(width);

  // X axis: scale and draw:
  var x = d3
    .scaleLinear()
    .domain([0, 1000]) // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
    .range([0, width - 30]);
  svg
    .append('g')
    .attr('transform', `translate(0,${height - 30})`)
    .call(d3.axisBottom(x));

  // Y axis: scale and draw:
  let y = d3.scaleLinear().range([height, 0]);

  y.domain([0, gdpMax]); // d3.hist has to be called before the Y axis obviously
  svg
    .append('g')
    .attr('transform', `translate(60,0)`)
    .call(d3.axisLeft(y));

  //tooltip style= opacity: 0.9; left: 818.364px; top: 300px; transform: translateX(60px);
  //tooltip content <p>2000 Q2</p><p>$17,913.7 Billion</p>
  //class overlay  opacity: 0.9; height: 400px; width: 2.90909px; left: 797.091px; top: 0px; transform: translate(60px, 0px);
})();
