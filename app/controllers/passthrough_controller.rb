class PassthroughController < ApplicationController
  def index

    path = case current_user.role.name
           when 'Administrator'
             dashboard_index_path
           else
           end

    redirect_to path unless path.nil?
  end
end
