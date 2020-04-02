class Api::V1::SeasonsController < ApplicationController

  before_action :set_season, only: [:show, :update, :destroy]

  def index
  end

  def show
  end

  def create
  end

  def update
  end

  def destroy
  end

  private

  def set_season
    @season = Season.find(params[:id])

    rescue ActiveRecord::RecordNotFound => e
      render json: { error: e, message: params[:id] + " belgili tapgyr tapylmady..."}
  end

  def season_params
    params.require(:season).permit(:title, :order_no, :start_date, :end_date, :return_deadline, :notes)
  end  

end
