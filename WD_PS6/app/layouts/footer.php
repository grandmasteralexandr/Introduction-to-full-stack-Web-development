<script
    src="https://code.jquery.com/jquery-3.3.1.min.js"
    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
    crossorigin="anonymous">
</script>
<?= isset($_SESSION['user']) ? '<script src="app/js/chat.js"></script>' : '<script src="app/js/login.js"></script>' ?>
</body>
</html>
