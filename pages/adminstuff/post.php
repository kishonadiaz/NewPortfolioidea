<?php 
        $key = $_SESSION["userkey"];

        $userid = $_SESSION["userid"];
    
    
    
        $r = $db->query("SELECT * FROM `users` WHERE userkey='$key'");

?>
<script>
    window.key = "<?php echo $key?>";
   
</script>


<div class="m-auto d-flex justify-content-between">
    <button  type="button" class="btn ms-4" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><i class="fa-solid fa-ellipsis"></i></button>
    <div class="col-5">
        <input id="posttitInput" class="form-control " type="text" placeholder="Post Title" aria-label="title ">
    </div>
    
    <button id="update" type="button" class="me-4 btn ">Update</button>
</div>
<div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Post Extras</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
     <div>
        <label  class="form-label " for="postimg">Add Post Image</label>
        <input   class="form-control " type="file" name="postimg" accept="Image/*" id="postimg">
     </div>
     <div id="preview" class="mt-5">

     </div>
  </div>
</div>
<div id="editor"></div>




<div id="mtoast" class=" position-absolute bottom-0 end-0 mb-3 toast align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="d-flex">
    <div class="toast-body">
      Hello, world! This is a toast message.
    </div>
    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
</div>

















<script type="module" src="pages/adminstuff/edit.js"></script>