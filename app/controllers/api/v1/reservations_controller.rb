class Api::V1::ReservationsController < ApplicationController

  before_action :set_reservation, only: [:show, :update, :destroy]

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

  def set_reservation
    @reservation = Reservation.find(params[:id])

    rescue ActiveRecord::RecordNotFound => e
      render json: { error: e, message: params[:id] + " belgili rezerw ýazgy tapylmady..."}
  end

  def reservation_params
    params.require(:reservation).permit(:applicant_id, :season_id, :shift_id, :subject_id, :is_registered, :is_sms_sent, :is_called, :notes)
  end

end
