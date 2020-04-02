class Api::V1::ShiftsController < ApplicationController

  before_action :set_shift, only: [:show, :update, :destroy]
  respond_to :json

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

  def set_shift
    @shift = Shift.find(params[:id])

    rescue ActiveRecord::RecordNotFound => e
      render json: { error: e, message: params[:id] + " belgili wagt (seans) tapylmady..."}
  end

  def shift_params
    params.require(:shift).permit(:title, :start_time, :end_time, :notes)
  end

end
