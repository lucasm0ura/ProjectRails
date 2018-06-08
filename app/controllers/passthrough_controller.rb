class PassthroughController < ApplicationController
  def index

    path = case current_user.role.name
           when 'Administrator', 'Coordenador'
            # maps_path
           else
           end

    redirect_to path unless path.nil?
  end
end
