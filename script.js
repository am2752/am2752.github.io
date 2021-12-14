let count = 0

const Super_Sectors = {
  "00": 'Total nonfarm',
  "05": 'Total private',
  "06": 'Goods-producing',
  "07": 'Service-providing',
  "08": 'Private service-providing',
  "10": 'Mining and logging',
  "20": 'Construction',
  "30": 'Manufacturing',
  "31": 'Durable Goods',
  "32": 'Nondurable Goods',
  "40": 'Trade, transportation, and utilities',
  "41": 'Wholesale trade',
  "42": 'Retail trade',
  "43": 'Transportation and warehousing',
  "44": 'Utilities',
  "50": 'Information',
  "55": 'Financial activities',
  "60": 'Professional and business services',
  "65": 'Education and health services',
  "70": 'Leisure and hospitality',
  "80": 'Other Services',
  "90": 'Governnment',
}

let Super_Sectors_Keys = Object.keys(Super_Sectors)
console.log(Super_Sectors_Keys)

const CHART_COLORS = {
  red: 'rgb(255, 0, 0)',
  lime: 'rgb(0, 255, 0)',
  blue: 'rgb(0, 0, 255)',
  yellow: 'rgb(255, 255, 0)',
  cyan: 'rgb(0, 255, 255)',
  magenta: 'rgb(255, 0, 255)',
  maroon: 'rgb(128, 0, 0)',
  green: 'rgb(0, 128, 0)',
  navy: 'rgb(0, 0, 128)',
  olive: 'rgb(128, 128, 0)',
  teal: 'rgb(0, 128, 128)',
  purple: 'rgb(165, 42, 42)',
  brown: 'rgb(102, 51, 0)',
  orange: 'rgb(255, 165, 0)',
  pink: 'rgb(255, 192, 203)',
  darkred: 'rgb(64, 0, 0)',
  darkgreen: 'rgb(0, 64, 0)',
  darkblue: 'rgb(0, 0, 64)',
  darkyellow: 'rgb(64, 64, 0)',
  darkcyan: 'rgb(0, 64, 64)',
  darkmagenta: 'rgb(64, 0, 64)',
  gray: 'rgb(128, 128, 128)',
  silver: 'rgb(192, 192, 192)',
  black: 'rgb(0, 0, 0)'
};
let Chart_Color_Keys = Object.keys(CHART_COLORS)

const CHART_COLORS_50_Percent = {
    red: 'rgb(255, 0, 0, 0.5)',
    lime: 'rgb(0, 255, 0, 0.5)',
    blue: 'rgb(0, 0, 255, 0.5)',
    yellow: 'rgb(255, 255, 0, 0.5)',
    cyan: 'rgb(0, 255, 255, 0.5)',
    magenta: 'rgb(255, 0, 255, 0.5)',
    maroon: 'rgb(128, 0, 0, 0.5)',
    green: 'rgb(0, 128, 0, 0.5)',
    navy: 'rgb(0, 0, 128, 0.5)',
    olive: 'rgb(128, 128, 0, 0.5)',
    teal: 'rgb(0, 128, 128, 0.5)',
    purple: 'rgb(165, 42, 42, 0.5)',
    brown: 'rgb(102, 51, 0, 0.5)',
    orange: 'rgb(255, 165, 0, 0.5)',
    pink: 'rgb(255, 192, 203, 0.5)',
    darkred: 'rgb(64, 0, 0, 0.5)',
    darkgreen: 'rgb(0, 64, 0, 0.5)',
    darkblue: 'rgb(0, 0, 64, 0.5)',
    darkyellow: 'rgb(64, 64, 0, 0.5)',
    darkcyan: 'rgb(0, 64, 64, 0.5)',
    darkmagenta: 'rgb(64, 0, 64, 0.5)',
    gray: 'rgb(128, 128, 128, 0.5)',
    silver: 'rgb(192, 192, 192, 0.5)',
    black: 'rgb(0, 0, 0, 0.5)'
};

const data = {
  labels: [],
  datasets: []
}

const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        siaplay: true,
        text: 'Number of Employees (Thousands)'
      }
    }
  }
}

function responseReceivedHandler() {
  if (this.status == 200) {
    console.log(this.response);
    let dataArray = this.response.Results.series[0].data;
    let seriesID = this.response.Results.series[0].seriesID;
    let sectorID = seriesID.substring(3,5)
    let gridline = {
      label: 'Super Sector Name',
      data: [],
      borderColor: [],
      backgroundColor: [],
      hidden: true
    };
    for (let i = dataArray.length-1; i>=0; i--) {
      gridline.data.push(dataArray[i].value)
      if(count==0){
        data.labels.push(dataArray[i].period.substring(1)+ '/'+ dataArray[i].year)
      }
    }
    gridline.label = Super_Sectors[sectorID]
    gridline.borderColor = CHART_COLORS[Chart_Color_Keys[count]]
    gridline.backgroundColor = CHART_COLORS_50_Percent[Chart_Color_Keys[count]]
    data.datasets.push(gridline)
    count++
  }
  else {
    console.log ("error");
  }
  if (count==Super_Sectors_Keys.length) {
    const myChart = new Chart(
      document.getElementById('myChart'),
      config);
  }
}

for (let i=0; i<Super_Sectors_Keys.length; i++) {
  let start = "https://api.bls.gov/publicAPI/v2/timeseries/data/CEU"
  let end = "00000001?registrationkey=1d6aa9856ec04dac9aa6ee99fdafda17"
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("load", responseReceivedHandler);
  xhr.responseType = "json";
  xhr.open("GET", start+Super_Sectors_Keys[i]+end);
  xhr.send();
}
