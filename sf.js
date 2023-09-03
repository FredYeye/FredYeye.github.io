const stat_names = ["Strength", "Defense", "Agility", "Hp", "Mp", "Crit"];
const chart_colors = [
  {border: '#36A2EBFF', bg: '#36A2EB80'},
  {border: '#FF6384FF', bg: '#FF638480'},
  {border: '#4BC0C0FF', bg: '#4BC0C080'},
  {border: '#FF9F40FF', bg: '#FF9F4080'},
  {border: '#9966FFFF', bg: '#9966FF80'},
  {border: '#FFCD56FF', bg: '#FFCD5680'},
  {border: '#C9CBCFFF', bg: '#C9CBCF80'},
];

const curve = [
    [0, 5, 10, 15, 21, 26, 31, 36, 42, 47, 52, 57, 63, 68, 73, 78, 84, 89, 94, 100], //linear 0
    [0, 16, 33, 50, 60, 70, 75, 80, 85, 90, 91, 92, 93, 95, 95, 96, 97, 98, 99, 100], //early 1
    [0, 2, 4, 6, 8, 11, 13, 15, 17, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 100], //late 2
    [0, 10, 20, 30, 35, 40, 42, 45, 47, 50, 52, 55, 57, 60, 65, 70, 77, 85, 92, 100], //earlylate 3
];

const base_stats = [
  {
    name: "Max", level: 1, base: [6, 4, 4, 12, 8, 3],
    gain: [[17, 16, 14, 23,  4,  4], [23, 48, 35, 46,  2,  8]],
    curve: [[3, 3, 3, 0, 3, 0,], [3, 3, 3, 0, 3, 0]],
  }, {
    name: "Mae", level: 2, base: [5, 5, 7, 11, 0, 3],
    gain: [[15, 15, 14, 24,  0,  1], [18, 35, 45, 43,  0,  4]],
    curve: [[0, 1, 0, 2, 0, 0,], [0, 0, 0, 1, 0, 0]],
  }, {
    name: "Pelle", level: 8, base: [6, 7, 7, 10, 0, 3],
    gain: [[13, 16, 16, 18,  0,  1], [17, 37, 46, 42,  0,  3]],
    curve: [[1, 1, 3, 3, 0, 0,], [3, 0, 2, 3, 0, 0]],
  }, {
    name: "Ken", level: 1, base: [7, 6, 5, 8, 0, 3],
    gain: [[14, 15, 14, 23,  0,  1], [21, 37, 40, 42,  0,  5]],
    curve: [[0, 2, 0, 1, 0, 0,], [2, 2, 0, 0, 0, 3]],
  }, {
    name: "Vankar", level: 8, base: [7, 6, 6, 10, 0, 3],
    gain: [[11, 14, 14, 24,  0,  1], [17, 34, 43, 42,  0,  2]],
    curve: [[3, 0, 0, 1, 0, 0,], [3, 3, 0, 0, 0, 0]],
  }, {
    name: "Earnest", level: 8, base: [7, 7, 7, 10, 0, 3],
    gain: [[12, 11, 15, 20,  0,  1], [20, 34, 46, 41,  0,  2]],
    curve: [[3, 3, 0, 3, 0, 0,], [3, 3, 0, 0, 0, 0]],
  }, {
    name: "Arthur", level: 4, base: [5, 6, 6, 8, 0, 3],
    gain: [[20, 16, 19, 29, 10,  2], [20, 42, 47, 47, 22,  6]],
    curve: [[2, 2, 2, 2, 2, 0,], [2, 2, 2, 2, 0, 0]],
  }, {
    name: "Gort", level: 2, base: [8, 7, 4, 12, 0, 3],
    gain: [[17, 18, 13, 16,  0,  4], [19, 51, 33, 42,  0,  8]],
    curve: [[0, 3, 0, 0, 0, 0,], [0, 0, 3, 0, 0, 0]],
  }, {
    name: "Luke", level: 1, base: [9, 7, 4, 9, 0, 3],
    gain: [[14, 19, 12, 16,  0,  4], [26, 53, 35, 40,  0,  8]],
    curve: [[0, 0, 0, 3, 0, 0,], [0, 0, 3, 0, 0, 0]],
  }, {
    name: "Guntz", level: 8, base: [10, 11, 4, 9, 0, 3],
    gain: [[15, 19, 11, 15,  0,  2], [19, 60, 33, 38,  0,  6]],
    curve: [[0, 0, 1, 0, 0, 0,], [0, 0, 3, 3, 0, 3]],
  }, {
    name: "Anri", level: 3, base: [4, 3, 7, 8, 6, 3],
    gain: [[ 9, 12, 13, 10, 34,  1], [11, 28, 43, 35, 44,  2]],
    curve: [[0, 0, 0, 0, 3, 0,], [3, 1, 3, 0, 0, 0]],
  }, {
    name: "Alef", level: 15, base: [4, 4, 7, 8, 6, 3],
    gain: [[ 8, 10, 15, 12, 36,  1], [10, 27, 45, 36, 47,  2]],
    curve: [[0, 0, 0, 0, 3, 0,], [0, 0, 0, 0, 0, 0]],
  }, {
    name: "Tao", level: 1, base: [4, 4, 6, 10, 7, 3],
    gain: [[ 7, 11, 18, 12, 34,  1], [12, 29, 46, 38, 47,  2]],
    curve: [[0, 0, 0, 0, 3, 0,], [0, 0, 1, 2, 0, 0]],
  }, {
    name: "Domingo", level: 1, base: [10, 15, 18, 15, 15, 4],
    gain: [[20, 33, 22, 40, 35,  1], [ 0,  0,  0,  0,  0,  0]],
    curve: [[0, 0, 0, 0, 0, 0,], [0, 0, 0, 0, 0, 0]],
  }, {
    name: "Lowe", level: 1, base: [6, 5, 5, 11, 10, 3],
    gain: [[10, 10, 13, 15, 25,  2], [13, 30, 40, 40, 38,  6]],
    curve: [[0, 0, 0, 0, 3, 0,], [0, 0, 1, 0, 0, 0]],
  }, {
    name: "Khris", level: 2, base: [6, 5, 4, 10, 7, 3],
    gain: [[10, 11, 13, 15, 25,  1], [14, 31, 38, 37, 38,  4]],
    curve: [[0, 0, 0, 0, 3, 0,], [0, 1, 0, 0, 0, 0]],
  }, {
    name: "Torasu", level: 16, base: [6, 5, 4, 10, 7, 3],
    gain: [[ 9, 11, 14, 16, 26,  1], [12, 30, 38, 38, 44,  4]],
    curve: [[0, 0, 0, 0, 3, 0,], [0, 2, 0, 0, 0, 0]],
  }, {
    name: "Gong", level: 1, base: [11, 4, 6, 11, 8, 3],
    gain: [[29, 16, 11, 19, 16,  4], [26, 31, 39, 42, 28, 20]],
    curve: [[0, 3, 3, 0, 0, 0,], [0, 0, 0, 0, 3, 2]],
  }, {
    name: "Diane", level: 6, base: [6, 4, 6, 10, 0, 3],
    gain: [[11, 13, 13, 16,  0,  2], [12, 30, 42, 37,  0,  5]],
    curve: [[0, 0, 3, 0, 0, 0,], [0, 0, 0, 0, 0, 0]],
  }, {
    name: "Hans", level: 1, base: [6, 5, 6, 12, 0, 3],
    gain: [[12, 13, 12, 18,  0,  4], [14, 31, 41, 39,  0,  9]],
    curve: [[2, 2, 3, 2, 0, 0,], [0, 0, 0, 2, 0, 2]],
  }, {
    name: "Lyle", level: 8, base: [8, 4, 5, 9, 0, 3],
    gain: [[15, 12, 12, 15,  0,  1], [16, 28, 40, 37,  0,  3]],
    curve: [[0, 0, 0, 0, 0, 0,], [0, 0, 0, 0, 0, 0]],
  }, {
    name: "Amon", level: 5, base: [5, 6, 7, 12, 0, 3],
    gain: [[15, 12, 17, 18,  0,  1], [15, 33, 44, 41,  0,  4]],
    curve: [[0, 0, 0, 0, 0, 0,], [0, 0, 0, 2, 0, 0]],
  }, {
    name: "Balbaroy", level: 5, base: [6, 7, 7, 10, 0, 3],
    gain: [[12, 13, 14, 16,  0,  3], [20, 33, 42, 37,  0,  3]],
    curve: [[3, 3, 3, 3, 0, 3,], [0, 0, 0, 0, 0, 0]],
  }, {
    name: "Kokichi", level: 7, base: [7, 5, 6, 10, 0, 3],
    gain: [[12, 12, 13, 18,  0,  1], [18, 33, 41, 40,  0,  3]],
    curve: [[3, 3, 3, 0, 0, 0,], [0, 0, 0, 0, 0, 0]],
  }, {
    name: "Bleu", level: 9, base: [10, 8, 4, 12, 0, 3],
    gain: [[35, 22, 13, 18,  0,  4], [37, 55, 37, 58,  0,  2]],
    curve: [[0, 0, 0, 0, 0, 2,], [0, 0, 0, 0, 0, 0]],
  }, {
    name: "Adam", level: 10, base: [10, 14, 5, 15, 0, 3],
    gain: [[25, 21, 15, 18,  0,  2], [41, 53, 37, 44,  0,  3]],
    curve: [[0, 0, 0, 1, 0, 0,], [0, 0, 0, 0, 0, 0]],
  }, {
    name: "Zylo", level: 9, base: [14, 7, 7, 9, 0, 3],
    gain: [[26, 17, 16, 16,  0,  4], [46, 38, 42, 46,  0,  8]],
    curve: [[3, 0, 0, 1, 0, 3,], [0, 0, 0, 0, 0, 0]],
  }, {
    name: "Musashi", level: 10, base: [18, 17, 16, 28, 0, 7],
    gain: [[22, 53, 24, 52,  0, 18], [ 0,  0,  0,  0,  0,  0]],
    curve: [[0, 0, 3, 0, 0, 0,], [0, 0, 0, 0, 0, 0]],
  }, {
    name: "Hanzou", level: 10, base: [16, 16, 19, 23, 10, 5],
    gain: [[19, 44, 41, 42, 30,  8], [ 0,  0,  0,  0,  0,  0]],
    curve: [[0, 0, 0, 0, 0, 0,], [0, 0, 0, 0, 0, 0]],
  },
];

let chart;
let color_idx = 0;
let stat = 0;

window.onload = function setup() {
  chart = new Chart("myChart", {
    type: "line",
    data: {
      labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
      datasets: []
    },
    options: {
      interaction: {intersect: false, mode: 'index'},
      clip: false,
      legend: {display: false},
      scales: {
        x: {min:1, max:20, grid: {color: '#333'}},
        y: {min:0, suggestedMax: 25, grid: {color: '#777'}},
      },
    }
  });

  for (x of base_stats) {
    let option = document.createElement("option");
    option.text = x.name;
    document.getElementById("character").add(option);
  }

  for (let x = 10; x < 21; x++) {
    let option = document.createElement("option");
    option.text = "LV " + x;
    document.getElementById("promote").add(option);
  }

  for (x of stat_names) {
    let option = document.createElement("option");
    option.text = x;
    document.getElementById("stat").add(option);
  }
}

document.querySelector("#genplot").addEventListener("click",
function target_stats() {
  const current_char = document.getElementById("character").selectedIndex;
  const current_stat = document.getElementById("stat").selectedIndex;
  let promotion = document.getElementById("promote").selectedIndex;
  if (promotion > 0) {
    promotion = promotion + 9;
  }

  stat = get_base_stat(current_char, current_stat, promotion);
  let points = [];
  for (let x = 0; x < 20; x++) {
    increase_stats(x+1, current_char, current_stat, promotion);
    points.push(stat);
  }

  let graph_label = base_stats[current_char].name + " " + stat_names[current_stat];
  if (promotion > 0) {
    graph_label = graph_label + " (promoted LV" + promotion + ")";
  }

  chart.data.datasets.push({
    label: graph_label,
    data: points, borderColor: chart_colors[color_idx].border, backgroundColor: chart_colors[color_idx].bg
  });
  chart.update();
  color_idx++;
  if (color_idx == chart_colors.length) {
    color_idx = 0;
  }
});

function increase_stats(level, current_char, current_stat, promotion) {
  let is_promoted = 0;
  if (promotion > 0) {
    is_promoted = 1;
  }

  const base = get_base_stat(current_char, current_stat, promotion);
  const growth_target = calculate_growth_target(level, current_char, current_stat, is_promoted);
  const target = base + growth_target;
  const gain = calculate_stat_gain(target);
  stat = stat + gain;
}

function get_base_stat(current_char, current_stat, promotion) {
  const stat_value = base_stats[current_char].base[current_stat];
  if (promotion == 0) {
    return stat_value;
  } else {
    const promoted_base_stat = stat_value + calculate_growth_target(promotion, current_char, current_stat, 0);
    return Math.floor((promoted_base_stat * 85) / 100);
  }
}

function calculate_growth_target(level, current_char, current_stat, is_promoted) {
  const growth_percent = curve[base_stats[current_char].curve[is_promoted][current_stat]][level - 1]; //calculate_growth_percent(level);
  return Math.floor((base_stats[current_char].gain[is_promoted][current_stat] * growth_percent) / 100)
}

function calculate_stat_gain(target) {
  const target2 = target;
  return Math.max(target2, stat) - stat;
}