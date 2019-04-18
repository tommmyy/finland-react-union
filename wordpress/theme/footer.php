    </div> <!-- /.container -->

		<footer class="blog-footer">
      <p>
        <a href="#">Back to top</a>
      </p>
    </footer>

<?php wp_footer(); ?> 
<?php
$manifest = json_decode(file_get_contents(__DIR__ . '/app-demo/assetManifest.json'), true);
?>

    <script src="<?php echo $manifest["runtime.js"]; ?>"></script>
    <script src="<?php echo $manifest["vendor.js"]; ?>"></script>
    <script src="<?php echo $manifest["main.js"]; ?>"></script>
  </body>
</html>
