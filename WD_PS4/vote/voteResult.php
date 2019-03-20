<?php
require_once "app/DataBase.php";
require_once "app/Vote.php";

use shpp\wd\aokunev\Vote;
use shpp\wd\aokunev\DataBase;

$db = new DataBase();
$vote = new Vote($db);
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <title>Vote</title>
  </head>
  <body>
    <div class="wrapper">
      <h1>Vote result</h1>
      <section>
        <div id="piechart" style="width: 900px; height: 500px;"></div>
      </section>
      <a href="index.php">
        <button>Go to main page</button>
      </a>
    </div>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
        google.charts.load('current', {'packages': ['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        let dataObject = <?= json_encode($db->getResult()) ?>;
        const dataArray = [['Language', 'Votes']];

        for (let option in dataObject) {
            dataArray.push([option, dataObject[option]]);
        }

        function drawChart() {
            const data = google.visualization.arrayToDataTable(dataArray);
            const options = {
                title: "<?= $vote->getVoteTheme() ?>",
                sliceVisibilityThreshold: 0
            };
            const chart = new google.visualization.PieChart(document.getElementById('piechart'));
            chart.draw(data, options);
        }
    </script>
  </body>
</html>
