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
    @services = Service.all
  end

  def edit
  end

  def create
    estimate = Estimate.new(estimate_params)
    estimate.status = 'tender'
    validate = false
    client_id = params['estimate']['client_id']

    Estimate.transaction do
      if estimate.save
        p 'Salvou estimate'
        params['estimate_service'].each do |estimate_service_param|
          EstimateService.transaction do
            estimate_service = EstimateService.new

            estimate_service.estimate_id = estimate.id
            estimate_service.service_id = estimate_service_param['service_id']
            estimate_service.amount = estimate_service_param['amount']
            estimate_service.price = estimate_service_param['price']
            estimate_service.total_price = estimate_service_param['total_price']

            estimate_service.save
            p 'Salvou estimate_service'
          end
        end
        validate = true
      end   
    end

    respond_to do |format|
      if validate
        format.html { redirect_to estimates_path(client_id), notice: 'Orçamento cadastrado com sucesso.' }
        format.json { render :show, status: :created, location: @service }
      else
        format.html { redirect_to new_estimate_path(client_id), notice: 'Orçamento não cadastrado.' }
        format.json { render json: @service.errors, status: :unprocessable_entity }
      end
    end        
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
      params.require(:estimate).permit(:client_id, :price_total, :observation)
    end  
end
