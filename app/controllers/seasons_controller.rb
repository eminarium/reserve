class SeasonsController < ApplicationController
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
  end

  def season_params
    params.require(:season).permit(:title, :order_no, :start_date, :end_date, :return_deadline, :notes)
  end  

end
