class Api::V1::SeasonsController < ApplicationController

  before_action :set_season, only: [:show, :update, :destroy]
  respond_to :json

  def index
    @seasons = Season.includes(:user).order('order_no ASC')
    respond_with @seasons, status: :ok    
  end

  def show
    if @season
      respond_with @season, status: :ok
    else
      render json: { 
        error: @season.errors, 
        message: "Soralan maglumatlar talabalaýyk däl ..." 
      },
      status: :unprocessable_entity
    end     
  end

  def create
    @season = Season.new(season_params)
    @season.user_id = current_user.id

    if @season.save
      respond_with @season
    else
      render json: { 
        error: @season.errors, 
        message: "Berlen maglumatlar talabalaýyk däl ..." 
      },
      status: :unprocessable_entity
    end  

    rescue ActionController::ParameterMissing => e
      render json: {
        error: e,
        message: "Parametrler berilmedik..."
      },
      status: :unprocessable_entity    
  end

  def update
    if @season.update_attributes(season_params)
      respond_with @season, status: :ok
    else
      render json: { 
        error: @season.errors, 
        message: "Berlen maglumatlar talabalaýyk däl ..." 
      },
      status: :unprocessable_entity
    end    
  end

  def destroy
    if @season.destroy
      respond_with @season, status: :ok
    else
      render json: { 
        error: @season.errors, 
        message: "Görkezilen tapgyry bozup bolmady ..." 
      },
      status: :unprocessable_entity
    end    
  end

  private

  def set_season
    @season = Season.find(params[:id])

    rescue ActiveRecord::RecordNotFound => e
      render json: { 
        error: e, 
        message: params[:id] + " belgili tapgyr tapylmady..."
      }, 
      status: 404
  end

  def season_params
    params.require(:season).permit(:title, :order_no, :start_date, :end_date, :return_deadline, :notes)
  end  

end
