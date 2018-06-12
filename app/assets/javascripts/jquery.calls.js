// *************************************
//
//   jQuery Calls
//   ->
//
// *************************************

jQuery( document ).ready( function() {

  // Chosen
  $("[data-toggle='tooltip']").tooltip();

  jQuery('select').chosen({
    allow_single_deselect: true,
    no_results_text: 'Nenhuma opção encontrada com o termo ',
    width: '100%'
  });

  jQuery('.chosen-search').append('<i class="glyphicon glyphicon-search"></i>');

  jQuery('.chosen-single b').addClass('icon-arrow-down');

  jQuery('select').on('change', function() {
    jQuery(this).next().find('.search-choice-close').addClass('icon-close');
  });

  // iCheck

  jQuery('.checkbox-icheked input, .radio input').iCheck({
    checkboxClass: 'icheck icheck-checkbox',
    radioClass: 'icheck icheck-radio'
  });

  // Slidebars

 jQuery.slidebars();

 jQuery('.sub-navbar-trigger').bind('click', function() {

   jQuery(this).toggleClass('active');

   jQuery('.tags').toggle();

 });


  jQuery('a[data-scroll]').click(function(){
    tag = "#" + $(this).data("scroll");
    jQuery('html, body').animate({scrollTop: (jQuery(tag).offset().top - 120 )}, 'slow');
    return false;
  });

});

  function processing_xls_job(job_id, origin_graph){
    job_id = job_id
    origin_graph = origin_graph

    var btn_send = document.getElementById("btn_send_"+origin_graph);
    var loading_image = document.getElementById("loading_image_"+origin_graph);

    console.log('sending ' + job_id + ' to /percentage_done')
    $.get('/api/v1/tables/verify_export/',{ job_id: job_id } ,function(data){
      console.log(data)
      if (data.status != false){
          btn_send.style.display = "none";
          loading_image.style.display = "block";

        setTimeout(function() { processing_xls_job(get_link, job_id, origin_graph) }, 5000);
      }else{
        window.open(data.job_link)
          btn_send.style.display = "block";
          loading_image.style.display = "none";
        $('#job_id').val("");
      }
    },'json');
  }