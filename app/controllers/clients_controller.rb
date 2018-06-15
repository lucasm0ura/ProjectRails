class ClientsController < ApplicationController
  before_action :set_client, only: [:show, :edit, :update, :destroy]

  # GET /clients
  # GET /clients.json
  def index
    @clients = Client.all
  end

  # GET /clients/new
  def new
    @client = Client.new
  end

  # GET /clients/1/edit
  def edit
    set_client
  end

  # POST /clients
  # POST /clients.json
  def create
    @client = Client.new(client_params)
    @client.email = params[:email] if params[:email].present?
    @client.phone_number = params[:phone_number] if params[:phone_number].present?
    @client.celphone = params[:celphone] if params[:celphone].present?
    
    respond_to do |format|
      if @client.save 
        format.html { redirect_to clients_path, notice: 'Cliente criado com sucesso.' }
      else
        format.html { render :new }
      end
    end
  end

  # PATCH/PUT /clients/1
  # PATCH/PUT /clients/1.json
  def update
    respond_to do |format|
      @client.email = params[:email] if params[:email].present?
      @client.phone_number = params[:phone_number] if params[:phone_number].present?
      @client.celphone = params[:celphone] if params[:celphone].present?        
      if @client.update(client_params)      
        format.html { redirect_to clients_path, notice: 'Cliente alterado com sucesso.' }
        format.json { render :show, status: :ok, location: @client }
      else
        format.html { render :edit }
        format.json { render json: @client.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /clients/1
  # DELETE /clients/1.json
  def destroy
    @client.destroy
    respond_to do |format|
      format.html { redirect_to clients_url, notice: 'Cliente excluido com sucesso' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_client
      @client = Client.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def client_params
      params.require(:client).permit(:name, :document, :contact_name, :phone_number, :email, :celphone, :zipcode, :address, :neighborhood, :city, :state)
    end
end
