// *************************************
//
//   jQuery Calls
//   ->
//
// *************************************

// Mascara de CPF e CNPJ
var CpfCnpjMaskBehavior = function (val) {
			return val.replace(/\D/g, '').length <= 11 ? '000.000.000-009' : '00.000.000/0000-00';
		},
    cpfCnpjpOptions = {
    	onKeyPress: function(val, e, field, options) {
      	field.mask(CpfCnpjMaskBehavior.apply({}, arguments), options);
      }
    };

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
  

	$("#client_document").mask(CpfCnpjMaskBehavior, cpfCnpjpOptions);
  $("#client_phone_number").mask('(00) 0000-0000');
  $("#client_celphone").mask('(00) 0 0000-0000');
  $("#client_zipcode").mask('00000-000');
   active_mask(null);
  
  $("#button_create_client").click(function(){
    var phone = $("#client_phone_number").val();
    var cellphone = $("#client_celphone").val();
    
    if (phone === "" && cellphone === ""){
      alert('Digite o telefone ou celular');
      event.preventDefault();
    }    
   });
  
  
 $("#insert_service").bind( "click", function() {
  var service_selected = $('#services_list').find(":selected").text();
  var service_id = $('#services_list').find(":selected").val();
  var mount_html =  '<tr>';
      mount_html += '<td class="text-center">'+service_id+'</td>';
      mount_html += '<td class="text-center" style="width: 725px;">'+service_selected+'</td>';
      mount_html += '<td class="text-center"><input type="text" class="form-control" id="service_price'+service_id+'" onkeyup="calculate_amount_x_service('+service_id+')"></td>';
      mount_html += '<td class="text-center"><input type="text" class="form-control" size="2" maxlength="2" id="amount_estimate" onkeyup="calculate_amount_x_service('+service_id+')"></td>';
      mount_html += '<td id="total_service"></td>';
      mount_html += '</tr>';
   
   
   $('#tableServices > tbody').append(mount_html);
   
   active_mask(service_id);
 });  

});


function active_mask (service_id) {
  if(service_id == null){
    $('#service_price').mask('000.000.000.000.000,00', {reverse: true});
  }else{
    $('#service_price'+service_id).mask('000.000.000.000.000,00', {reverse: true});
  }  
}

function calculate_amount_x_service(id){
    var total = 0;
  var sum_total_estimate_and_price_service = 0;
    var amount = $('#amount_estimate').val();
    var price_service = $('#service_price'+id).val().replace(",", ".");
      if(amount === "" || amount == null){
        total = price_service;
      }else{
        total = price_service * amount;
      }
  
    var total_estimate = document.getElementById("total_estimate").innerText;
    if(total_estimate === "" || total_estimate == null){
      sum_total_estimate_and_price_service = parseFloat(total);
    }else{
      sum_total_estimate_and_price_service = parseFloat(total) + parseFloat(total_estimate);
    }
    
    document.getElementById("total_service").innerHTML = total;
    document.getElementById("total_estimate").innerHTML = sum_total_estimate_and_price_service;  
}



  function processing_xls_job(job_id, origin_graph){
    job_id = job_id
    origin_graph = origin_graph

    var btn_send = document.getElementById("btn_send_"+origin_graph);
    var loading_image = document.getElementById("loading_image_"+origin_graph);

    console.log('sending ' + job_id + ' to /percentage_done')
    $.get('/api/v1/tables/verify_export/',{ job_id: job_id } ,function(data){
      console.log(data)
      if (data.status !== false){
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