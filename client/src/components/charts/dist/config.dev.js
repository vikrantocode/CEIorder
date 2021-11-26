"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.smallLineChartOptions = exports.doughnutChartOptions = exports.pieChartOptions = exports.radarChartOptions = exports.barChartOptions = exports.scatterChartOptions = exports.areaChartOptions = exports.polarAreaChartOptions = exports.lineChartOptions = void 0;

var _util = require("./util");

var lineChartOptions = {
  legend: {
    display: false
  },
  responsive: true,
  maintainAspectRatio: false,
  tooltips: _util.chartTooltip,
  plugins: {
    datalabels: {
      display: false
    }
  },
  scales: {
    yAxes: [{
      gridLines: {
        display: true,
        lineWidth: 1,
        color: 'rgba(0,0,0,0.1)',
        drawBorder: false
      },
      ticks: {
        beginAtZero: true,
        stepSize: 5,
        min: 50,
        max: 70,
        padding: 20
      }
    }],
    xAxes: [{
      gridLines: {
        display: false
      }
    }]
  }
};
exports.lineChartOptions = lineChartOptions;
var polarAreaChartOptions = {
  legend: {
    position: 'bottom',
    labels: {
      padding: 30,
      usePointStyle: true,
      fontSize: 12
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  scale: {
    ticks: {
      display: false
    }
  },
  plugins: {
    datalabels: {
      display: false
    }
  },
  tooltips: _util.chartTooltip
};
exports.polarAreaChartOptions = polarAreaChartOptions;
var areaChartOptions = {
  legend: {
    display: false
  },
  responsive: true,
  maintainAspectRatio: false,
  tooltips: _util.chartTooltip,
  scales: {
    yAxes: [{
      gridLines: {
        display: true,
        lineWidth: 1,
        color: 'rgba(0,0,0,0.1)',
        drawBorder: false
      },
      ticks: {
        beginAtZero: true,
        stepSize: 5,
        min: 50,
        max: 70,
        padding: 20
      }
    }],
    xAxes: [{
      gridLines: {
        display: false
      }
    }]
  }
};
exports.areaChartOptions = areaChartOptions;
var scatterChartOptions = {
  legend: {
    position: 'bottom',
    labels: {
      padding: 30,
      usePointStyle: true,
      fontSize: 12
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
      gridLines: {
        display: true,
        lineWidth: 1,
        color: 'rgba(0,0,0,0.1)',
        drawBorder: false
      },
      ticks: {
        beginAtZero: true,
        stepSize: 20,
        min: -80,
        max: 80,
        padding: 20
      }
    }],
    xAxes: [{
      gridLines: {
        display: true,
        lineWidth: 1,
        color: 'rgba(0,0,0,0.1)'
      }
    }]
  },
  tooltips: _util.chartTooltip // legend: {
  //   position: 'bottom',
  //   labels: {
  //     padding: 30,
  //     usePointStyle: true,
  //     fontSize: 12,
  //   },
  // },
  // responsive: true,
  // maintainAspectRatio: false,
  // scales: {
  //   yAxes: [
  //     {
  //       gridLines: {
  //         display: true,
  //         lineWidth: 1,
  //         color: 'rgba(0,0,0,0.1)',
  //         drawBorder: false,
  //       },
  //       ticks: {
  //         beginAtZero: true,
  //         stepSize: 20,
  //         min: -80,
  //         max: 80,
  //         padding: 20,
  //       },
  //     },
  //   ],
  //   xAxes: [
  //     {
  //       gridLines: {
  //         display: true,
  //         lineWidth: 1,
  //         color: 'rgba(0,0,0,0.1)',
  //       },
  //     },
  //   ],
  // },

};
exports.scatterChartOptions = scatterChartOptions;
var barChartOptions = {
  legend: {
    position: 'bottom',
    labels: {
      padding: 30,
      usePointStyle: true,
      fontSize: 12
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
      gridLines: {
        display: true,
        lineWidth: 1,
        color: 'rgba(0,0,0,0.1)',
        drawBorder: false
      },
      ticks: {
        beginAtZero: true,
        stepSize: 100,
        min: 300,
        max: 800,
        padding: 20
      }
    }],
    xAxes: [{
      gridLines: {
        display: false
      }
    }]
  },
  tooltips: _util.chartTooltip
};
exports.barChartOptions = barChartOptions;
var radarChartOptions = {
  legend: {
    position: 'bottom',
    labels: {
      padding: 30,
      usePointStyle: true,
      fontSize: 12
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  scale: {
    ticks: {
      display: false
    }
  },
  tooltips: _util.chartTooltip
};
exports.radarChartOptions = radarChartOptions;
var pieChartOptions = {
  legend: {
    position: 'bottom',
    labels: {
      padding: 30,
      usePointStyle: true,
      fontSize: 12
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  title: {
    display: false
  },
  layout: {
    padding: {
      bottom: 20
    }
  },
  tooltips: _util.chartTooltip
};
exports.pieChartOptions = pieChartOptions;
var doughnutChartOptions = {
  legend: {
    position: 'bottom',
    labels: {
      padding: 30,
      usePointStyle: true,
      fontSize: 12
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  title: {
    display: false
  },
  cutoutPercentage: 80,
  layout: {
    padding: {
      bottom: 20
    }
  },
  tooltips: _util.chartTooltip
};
exports.doughnutChartOptions = doughnutChartOptions;
var smallLineChartOptions = {
  layout: {
    padding: {
      left: 5,
      right: 5,
      top: 10,
      bottom: 10
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      },
      display: false
    }],
    xAxes: [{
      display: false
    }]
  }
};
exports.smallLineChartOptions = smallLineChartOptions;