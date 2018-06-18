class DashboardController < ApplicationController
  authorize_resource class: false
  
  def index
    clients = Client.all
    @clients = verify_client(clients)
    @services = Service.count
  end
  
  private
  
  def verify_client(clients)
    hash = {'TOTAL' => 0 , 'CPF' => 0, 'CNPJ' => 0 }
 
    clients.each do |client|
      hash['TOTAL'] += 1
      if client.document.length > 14
        hash['CNPJ'] += 1
      else
        hash['CPF'] += 1
      end
    end  
    hash
  end
  
end
