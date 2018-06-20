class EstimatesController < ApplicationController
    before_action :set_estimate, only: [:edit, :update, :destroy]
  
  def index
    @client = Client.find(params[:client_id])
    @estimates = Estimate.where(client_id: @client.id)
  end

  def show
  end

  def new
    @estimate = Estimate.new
    @client = Client.find(params[:client_id])
  end

  def edit
  end

  def create
  end
  
  def update
  end
  
  def destroy
  end
  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_estimate
      @estimate = Estimate.find(params[:id])
      @client = Client.find(params[:client_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def estimate_params
      params.require(:estimate).permit(:client_id, :price_total)
    end  
end
