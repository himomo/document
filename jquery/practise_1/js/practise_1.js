$(document).ready(function() {
   $(".point li").click(function() {
       $(".point li").attr("class"," ");
       $(this).attr("class", "active");
       var val = $(this).attr("name");
       var images3DId = "inagesAnimate3D_" + val;
       $('.images_3d').css("animation-name", images3DId);
       $('.images_3d').css("animation-iteration-count", 1);
       $(".images_3d").css("animation-fill-mode", "forwards");
   });
   $(".images_3d").click(function() {
       $(this).css("animation-name", "inagesAnimate3D");
       $(".pointList").css("display", "none");
    });
   $(".images_3d").dblclick(function() {
       $(".point li").attr("class", " ");
       $(".point li").eq(0).attr("class", "active");
       $(this).css("animation-name", "none");
       $(".pointList").css("display", "block");
   });
});