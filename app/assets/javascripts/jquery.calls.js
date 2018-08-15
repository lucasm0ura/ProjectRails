// *************************************
//
//   jQuery Calls
//   ->
//
// *************************************

// Mascara de CPF e CNPJ
var CpfCnpjMaskBehavior = function(val) {
    return val.replace(/\D/g, '').length <= 11 ? '000.000.000-009' : '00.000.000/0000-00';
  },
  cpfCnpjpOptions = {
    onKeyPress: function(val, e, field, options) {
      field.mask(CpfCnpjMaskBehavior.apply({}, arguments), options);
    }
  };

jQuery(document).ready(function() {

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


  jQuery('a[data-scroll]').click(function() {
    tag = "#" + $(this).data("scroll");
    jQuery('html, body').animate({
      scrollTop: (jQuery(tag).offset().top - 120)
    }, 'slow');
    return false;
  });


  $("#client_document").mask(CpfCnpjMaskBehavior, cpfCnpjpOptions);
  $("#client_phone_number").mask('(00) 0000-0000');
  $("#client_celphone").mask('(00) 0 0000-0000');
  $("#client_zipcode").mask('00000-000');
  active_mask(null);

  $("#button_create_client").click(function() {
    var phone = $("#client_phone_number").val();
    var cellphone = $("#client_celphone").val();

    if (phone === "" && cellphone === "") {
      alert('Digite o telefone ou celular');
      event.preventDefault();
    }
  });


  $("#insert_service").bind("click", function() {        
    var service_selected = $('#services_list').find(":selected").text();
    var service_id = $('#services_list').find(":selected").val();
    var verify = true;
    
    verify = verify_if_inserted_duplicate(service_selected);
    
    if(verify){
      var mount_html = '<tr class="row-service">';
      mount_html += '<td class="text-center"> <input type="text" class="form-control" name="estimate_service[][service_id]" value="' + service_id + '" readonly> </td>';
      mount_html += '<td class="text-center text-service-selected" style="width: 650px;">' + service_selected + '</td>';
      mount_html += '<td class="text-center"><input type="text" class="form-control" id="service_price' + service_id + '" name="estimate_service[][price]"  onfocusout="calculate_amount_x_service(' + service_id + ')"></td>';
      mount_html += '<td class="text-center"><input type="text" class="form-control" size="2" maxlength="2" id="amount_estimate' + service_id + '" name="estimate_service[][amount]"  onfocusout="calculate_amount_x_service(' + service_id + ')"></td>';
      mount_html += '<td class="text-center"><input type="text" class="form-control total_service" id="total_service' + service_id + '" name="estimate_service[][total_price]" value="" readonly></td>';
      mount_html += '<td class="text-center" onclick="removeServico(' + service_id + ')"><i class="glyphicon glyphicon-trash color-delete" data-toggle="tooltip" data-placement="top" title="Excluir"></i></td>'
      mount_html += '</tr>';


      $('#tableServices > tbody').append(mount_html);

      active_mask(service_id);
    }
  });

});


function active_mask(service_id) {
  if (service_id == null) {
    $('#service_price').mask('00000.00', {
      reverse: true
    });
  } else {
    $('#service_price' + service_id).mask('00000.00', {
      reverse: true
    });
  }
}


function calculate_amount_x_service(id) {
  var total = 0;
  var sum_total_estimate_and_price_service = 0;
  var amount = $('#amount_estimate' + id).val();
  var price_service = $('#service_price' + id).val();
  amount = (amount==="") ? 1 : amount;
  if (price_service !== "" && price_service != null) {
    total = parseFloat(price_service) * parseFloat(amount);
  }

  $("#total_service" + id).val(parseFloat(total).toFixed(2));
  
  $(".total_service").each(function() {
    console.log($(this).val());
    if ($(this).val() === "" || $(this).val() === null){
      sum_total_estimate_and_price_service += parseFloat(0);
    }else {
      sum_total_estimate_and_price_service += parseFloat($(this).val());
    }
  });  
  
  $('#total_estimate').val(sum_total_estimate_and_price_service.toFixed(2));
}


function verify_if_inserted_duplicate(text){
  var verify = true;
	
	$("#tableServices tr.row-service").each(function(){ 
     $(this).find("td.text-service-selected").each(function() {
       var td_text = $(this).text();
        if(text === td_text){
          verify = false;
        }
      });                 
  });
		
return verify;
  
}