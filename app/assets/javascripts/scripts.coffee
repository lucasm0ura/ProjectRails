# *************************************
#
#   Scripts
#   ->
#
# *************************************

jQuery('.upload input[type="file"]').on 'change', (event, files, label) ->
  file_name = @value.replace(/\\/g, '/').replace(/.*\//, '')
  jQuery(this).prev().text file_name
  return
