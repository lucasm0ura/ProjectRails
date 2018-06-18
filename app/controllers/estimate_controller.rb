class EstimateController < ApplicationController
  
  def index
  end

  def show
  end

  def new
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
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def estimate_params
      params.require(:estimate).permit(:client_id, :price_total)
    end  
end
